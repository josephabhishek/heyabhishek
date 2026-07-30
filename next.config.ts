import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Stamped once per build and published in the footer. A site arguing that
  // everything can be checked should say which version of itself you are
  // looking at.
  env: { BUILD_TIME: new Date().toISOString() },

  // Fail the production build on type errors. The quality gates are not
  // advisory; see docs/QUALITY_GATES.md.
  //
  // Next 16 removed the `eslint` key from NextConfig: linting is no longer
  // part of `next build`. It runs as its own step in `npm run verify` and in
  // CI, which is stricter — a lint failure now blocks the pipeline rather
  // than only the build.
  typescript: { ignoreBuildErrors: false },

  // Modern formats only. Exhibits must stay legible after compression, so the
  // per-image budget in config/performance.ts is the binding constraint.
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],
  },

  // Static export is not used: /api/check (v1.1) needs a runtime handler.
  // Everything else is statically generated.
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
      {
        // Fonts are self-hosted and content-hashed by the build.
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
