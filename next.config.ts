import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The dev-tools badge gets captured into the Playwright screenshots that double as
  // the portfolio's project galleries — keep it out of the frame.
  devIndicators: false,
  // Security-first is the whole brand promise (see /audit) - the site's own
  // headers have to hold up, not just the copy. 'unsafe-inline' is needed for
  // the theme anti-flash/JSON-LD inline scripts and the many inline style={}
  // props across components; 'unsafe-eval' is dev-only for Turbopack HMR.
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(nextConfig);
