import { NextResponse } from "next/server";
import dns from "node:dns/promises";
import net from "node:net";

// Runs in Node, not edge - dns.lookup() (used below to block SSRF against the
// private network) isn't available in the edge runtime.
export const runtime = "nodejs";

const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 15 };
const hits = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT.max;
}

const FETCH_TIMEOUT_MS = 6000;
const MAX_BODY_BYTES = 300_000;
const MAX_REDIRECTS = 4;

// This is the flagship security tool on a security-positioned site - it must
// not itself be an SSRF vector. Every hostname (including every redirect hop)
// is DNS-resolved and checked against private/loopback/link-local ranges
// (169.254.169.254 is cloud instance metadata - the classic SSRF target)
// before this server ever sends it a request.
function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    if (a === 127 || a === 10 || a === 0) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true;
    return false;
  }
  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase();
    if (lower === "::1" || lower === "::") return true;
    if (lower.startsWith("fe80") || lower.startsWith("fc") || lower.startsWith("fd")) return true;
    if (lower.startsWith("::ffff:")) {
      const v4 = lower.split(":").pop();
      if (v4 && net.isIPv4(v4)) return isPrivateIp(v4);
    }
    return false;
  }
  return true; // unrecognized format - fail closed
}

class AuditError extends Error {}

async function assertPublicHost(hostname: string): Promise<void> {
  if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local")) {
    throw new AuditError("blocked_host");
  }
  let addrs: { address: string }[];
  try {
    addrs = await dns.lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new AuditError("dns_failed");
  }
  if (addrs.length === 0 || addrs.some((a) => isPrivateIp(a.address))) {
    throw new AuditError("blocked_host");
  }
}

function parseTarget(raw: string): URL {
  let candidate = raw.trim();
  if (!/^https?:\/\//i.test(candidate)) candidate = `https://${candidate}`;
  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw new AuditError("invalid_url");
  }
  if (!["http:", "https:"].includes(url.protocol)) throw new AuditError("invalid_protocol");
  return url;
}

async function fetchWithGuard(startUrl: URL) {
  let current = startUrl;
  let hops = 0;
  while (true) {
    await assertPublicHost(current.hostname);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const started = Date.now();
    let res: Response;
    try {
      res = await fetch(current, {
        redirect: "manual",
        signal: controller.signal,
        headers: { "User-Agent": "megaumka-audit/1.0 (+https://megaumka.dev)" },
      });
    } finally {
      clearTimeout(timer);
    }
    const elapsedMs = Date.now() - started;

    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      hops++;
      if (hops > MAX_REDIRECTS) throw new AuditError("too_many_redirects");
      current = new URL(res.headers.get("location")!, current);
      if (!["http:", "https:"].includes(current.protocol)) throw new AuditError("invalid_protocol");
      continue;
    }
    return { res, finalUrl: current, elapsedMs };
  }
}

async function readCappedText(res: Response): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let out = "";
  let received = 0;
  while (received < MAX_BODY_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    out += decoder.decode(value, { stream: true });
  }
  reader.cancel().catch(() => {});
  return out;
}

type Check = { id: string; label: string; pass: boolean; detail: string };

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { url?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  if (typeof body.url !== "string" || body.url.length === 0 || body.url.length > 300) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }

  let target: URL;
  try {
    target = parseTarget(body.url);
  } catch {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }

  let result: { res: Response; finalUrl: URL; elapsedMs: number };
  try {
    result = await fetchWithGuard(target);
  } catch (e) {
    const code = e instanceof AuditError ? e.message : "fetch_failed";
    return NextResponse.json({ error: code }, { status: code === "blocked_host" ? 400 : 502 });
  }

  const { res, finalUrl, elapsedMs } = result;
  const h = res.headers;
  const html = (h.get("content-type") ?? "").includes("text/html") ? await readCappedText(res) : "";

  const checks: Check[] = [
    {
      id: "https",
      label: "HTTPS",
      pass: finalUrl.protocol === "https:",
      detail: finalUrl.protocol === "https:" ? "Сайт открывается по HTTPS" : "Сайт не форсирует HTTPS",
    },
    {
      id: "hsts",
      label: "Strict-Transport-Security",
      pass: h.has("strict-transport-security"),
      detail: h.has("strict-transport-security")
        ? "HSTS включён - браузер не даст даунгрейднуть до HTTP"
        : "Заголовок HSTS отсутствует",
    },
    {
      id: "csp",
      label: "Content-Security-Policy",
      pass: h.has("content-security-policy"),
      detail: h.has("content-security-policy") ? "CSP настроен" : "CSP не настроен - нет защиты от XSS на уровне заголовков",
    },
    {
      id: "frame",
      label: "Защита от кликджекинга",
      pass: h.has("x-frame-options") || (h.get("content-security-policy") ?? "").includes("frame-ancestors"),
      detail:
        h.has("x-frame-options") || (h.get("content-security-policy") ?? "").includes("frame-ancestors")
          ? "X-Frame-Options или frame-ancestors заданы"
          : "Сайт можно встроить в чужой iframe",
    },
    {
      id: "nosniff",
      label: "X-Content-Type-Options",
      pass: (h.get("x-content-type-options") ?? "").toLowerCase() === "nosniff",
      detail:
        (h.get("x-content-type-options") ?? "").toLowerCase() === "nosniff"
          ? "nosniff включён"
          : "Браузер может неверно определить тип файла",
    },
    {
      id: "referrer",
      label: "Referrer-Policy",
      pass: h.has("referrer-policy"),
      detail: h.has("referrer-policy") ? "Referrer-Policy задан" : "Referrer-Policy не задан",
    },
    {
      id: "viewport",
      label: "Мобильная адаптация",
      pass: /<meta[^>]+name=["']viewport["']/i.test(html),
      detail: /<meta[^>]+name=["']viewport["']/i.test(html) ? "viewport meta найден" : "viewport meta не найден - на телефоне может выглядеть сломанным",
    },
    {
      id: "title",
      label: "Title и базовое SEO",
      pass: /<title>[^<]{3,}<\/title>/i.test(html),
      detail: /<title>[^<]{3,}<\/title>/i.test(html) ? "Title заполнен" : "Title пустой или отсутствует",
    },
  ];

  // Best-effort, informational - a missing robots.txt/sitemap shouldn't fail the whole audit.
  const origin = `${finalUrl.protocol}//${finalUrl.host}`;
  for (const [id, label, path] of [
    ["robots", "robots.txt", "/robots.txt"],
    ["sitemap", "sitemap.xml", "/sitemap.xml"],
  ] as const) {
    try {
      await assertPublicHost(finalUrl.hostname);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);
      const r = await fetch(`${origin}${path}`, { signal: controller.signal, redirect: "manual" }).finally(() =>
        clearTimeout(timer)
      );
      checks.push({
        id,
        label,
        pass: r.status === 200,
        detail: r.status === 200 ? `${label} найден` : `${label} не найден (${r.status})`,
      });
    } catch {
      checks.push({ id, label, pass: false, detail: `${label} не удалось проверить` });
    }
  }

  const passCount = checks.filter((c) => c.pass).length;
  return NextResponse.json({
    url: finalUrl.toString(),
    status: res.status,
    responseTimeMs: elapsedMs,
    score: passCount,
    total: checks.length,
    checks,
  });
}
