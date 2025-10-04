/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for Cloudflare Workers deployment
  trailingSlash: false,
  output: "standalone", // Required for OpenNext deployment

  // Optimize images for static export
  images: {
    domains: [
      "images.clerk.dev",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
    unoptimized: true, // Required for static export
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Webpack configuration for Cloudflare Workers compatibility
  webpack: (config, { isServer }) => {
    // Configure for edge runtime
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        path: false,
        os: false,
        child_process: false,
      };
    }

    return config;
  },

  // PoweredByHeader
  poweredByHeader: false,

  // React strict mode
  reactStrictMode: true,

  // Configure ESLint
  eslint: {
    dirs: ["app", "components", "lib", "src"],
    ignoreDuringBuilds: true, // Temporarily disabled due to circular structure issue
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  // Configure modularize imports for tree shaking
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },

  // Development configuration
  ...(process.env.NODE_ENV === "development" && {
    // Enable source maps in development
    productionBrowserSourceMaps: false,
    // Disable static optimization for development
    staticPageGenerationTimeout: 1000,
  }),

  // Production optimizations
  ...(process.env.NODE_ENV === "production" && {
    // Optimize production builds
    productionBrowserSourceMaps: false,
  }),
};

export default nextConfig;

// Initialize OpenNext Cloudflare for development
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}
