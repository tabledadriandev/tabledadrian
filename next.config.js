/** @type {import('next').NextConfig} */
const nextConfig = {
  // PWA Configuration
  reactStrictMode: true,
  
  // For Electron: Use standalone output only in production builds
  // Don't use standalone in dev mode as it causes chunk loading issues
  // output: 'standalone', // Only use for production builds
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Use webpack for Electron compatibility (Turbopack doesn't support all webpack features we need)
  turbopack: {}, // Empty config to silence Next.js 16 warning about webpack config
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  
  // Webpack optimizations
  webpack: (config, { isServer, dev }) => {
    // Fix chunk loading issues in Electron (development)
    if (!isServer && dev) {
      config.output.publicPath = '/';
    }
    // Suppress warnings for optional React Native dependencies
    // These are only needed in React Native environments, not in web/Electron
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@react-native-async-storage/async-storage': false,
      'pino-pretty': false,
    };
    
    // Ignore these modules in webpack
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
    };
    
    // Ignore warnings for these modules
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      {
        module: /node_modules\/@metamask\/sdk/,
        message: /Can't resolve '@react-native-async-storage\/async-storage'/,
      },
      {
        module: /node_modules\/pino/,
        message: /Can't resolve 'pino-pretty'/,
      },
    ];
    
    if (!isServer) {
      // In development, minimize chunking for Electron
      if (dev) {
        // Prevent RainbowKit from being split - keep it in main bundle
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Explicitly exclude RainbowKit from chunking
            rainbowkit: {
              test: /[\\/]node_modules[\\/]@rainbow-me[\\/]/,
              name: false, // Don't create separate chunk
              chunks: 'all',
              priority: -10, // Low priority, won't create chunk
              enforce: false,
            },
            // Only split React/ReactDOM, exclude RainbowKit
            largeVendors: {
              test: /[\\/]node_modules[\\/](react|react-dom|@tanstack)[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
              minChunks: 1,
              // Explicitly exclude RainbowKit
              exclude: /[\\/]node_modules[\\/]@rainbow-me[\\/]/,
            },
          },
          maxAsyncRequests: 3,
          maxInitialRequests: 2,
        };
        config.optimization.runtimeChunk = 'single';
        config.optimization.concatenateModules = true;
      } else {
        // Production chunking strategy
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            rainbowkit: {
              test: /[\\/]node_modules[\\/]@rainbow-me[\\/]/,
              name: 'rainbowkit',
              chunks: 'all',
              priority: 35,
              enforce: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
            },
          },
          maxAsyncRequests: 25,
          maxInitialRequests: 25,
        };
      }
      
      // Use deterministic chunk IDs for better caching (only in production)
      if (!dev) {
        config.optimization.moduleIds = 'deterministic';
        config.optimization.chunkIds = 'deterministic';
      }
    }
    return config;
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
