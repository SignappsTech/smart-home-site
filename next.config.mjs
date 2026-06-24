/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: produces a fully static site in /out, host anywhere
  // (Cloudflare Pages, Netlify, Vercel, S3, nginx…).
  output: "export",

  // Static export can't use the Next Image optimizer (no server at runtime),
  // so serve images unoptimized.
  images: {
    unoptimized: true,
  },

  // Cleaner URLs as folders (/cenik/ -> /cenik/index.html) for static hosts.
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
