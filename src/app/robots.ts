import type { MetadataRoute } from "next";

// "*" already allows every crawler, including AI ones - these entries are
// listed explicitly so it's obvious at a glance that AI agents are welcome,
// not blocked by default the way some sites do.
const AI_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://megaumka.dev/sitemap.xml",
  };
}
