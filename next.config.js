/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ? "export" : undefined,
  images: {
    unoptimized: process.env.NEXT_PUBLIC_STATIC_EXPORT === "true",
  },

  // Security headers applied to every response
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Control referrer information
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restrict browser features
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          // Force HTTPS for 2 years (only effective in production)
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // XSS protection for legacy browsers
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Allow cross-origin resource sharing for fonts/assets
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://api.anthropic.com https://hooks.n8n.cloud https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https:",
              "media-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  webpack: (config, { dev }) => {
    if (dev) {
      // Disable persistent cache on Windows — atomic rename fails on NTFS
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
