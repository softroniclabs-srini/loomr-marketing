/**
 * Two build targets share this config:
 *
 *   static  — `output: 'export'`, deployed to GitHub Pages under a repo subpath.
 *             Needs basePath/assetPrefix and unoptimized images.
 *   server  — the default, for Vercel once we have an account. Enables the
 *             /api/waitlist route so email capture is first-party.
 *
 * Set BUILD_TARGET=server to switch. Everything else is env-driven so the
 * same commit deploys to both without edits.
 */
const isStatic = (process.env.BUILD_TARGET ?? 'static') === 'static';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isStatic
    ? {
        output: 'export',
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  poweredByHeader: false,
};

export default nextConfig;
