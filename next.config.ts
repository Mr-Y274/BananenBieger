import type { NextConfig } from "next";

// On GitHub Pages the site is served from https://<user>.github.io/BananenBieger
// so a base path is needed in production. In dev we serve from the root.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/BananenBieger" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["remotion", "@remotion/player"],
  // Static HTML export so it can be hosted on GitHub Pages.
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  // Exposed to the client so we can prefix static asset URLs (e.g. the MP4).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
