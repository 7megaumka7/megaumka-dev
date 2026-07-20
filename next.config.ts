import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The dev-tools badge gets captured into the Playwright screenshots that double as
  // the portfolio's project galleries — keep it out of the frame.
  devIndicators: false,
};

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(nextConfig);
