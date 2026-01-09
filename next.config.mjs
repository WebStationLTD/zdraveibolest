/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  
  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zdraveibolest.admin-panels.com",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours cache
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Security settings
  poweredByHeader: false, // Remove X-Powered-By header
  
  // React settings
  reactStrictMode: true,
  
  // Compiler settings
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remove console.log in production
  },
  
  // Experimental features for better build stability
  experimental: {
    // Optimize package imports for better performance
    optimizePackageImports: ['@headlessui/react', '@heroicons/react'],
  },
};

export default nextConfig;
