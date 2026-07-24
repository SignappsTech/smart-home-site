// The site is served from the root of its custom domain (https://signapps.si),
// so no path prefix is needed and basePath stays empty by default.
// For a github.io project-page PREVIEW (served from a subpath) set
// BASE_PATH=/smart-home-site, raw <img>/next-image sources read it too.
const basePath = process.env.BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: produces a fully static site in /out, host anywhere
  // (GitHub Pages, Cloudflare Pages, Netlify, Vercel, S3, nginx…).
  output: "export",

  // Subpath prefix for GitHub Pages project hosting (empty in dev).
  basePath,
  // Exposed to client code so raw <img>/<a> tags (which Next does NOT
  // auto-prefix, unlike <Link> and next/image) can build correct URLs.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

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
