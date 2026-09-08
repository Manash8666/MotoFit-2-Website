/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export', // Disabled to allow Dynamic API Routes (Bridge)
    reactStrictMode: true,
    images: {
        // unoptimized: false, // Re-enabled optimization for performance
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "plus.unsplash.com",
            },
        ],
    },
    experimental: {
        // optimizeCss: true, // Disabled on Windows due to critters worker crash
        optimizePackageImports: ["@react-three/fiber"],
        // reactCompiler: true - excluding as it might be unstable or require specific setup
    },
    eslint: {
        // ESLint runs during builds. Fix any lint errors before deploying.
        ignoreDuringBuilds: false,
    },
    webpack: (config) => {
        config.cache = false;
        return config;
    },
    // Mid-Tier Cybersecurity Headers
    async headers() {
        return [
            {
                source: '/(.*)',
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
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
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
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://maps.googleapis.com https://maps.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://images.unsplash.com https://plus.unsplash.com https://maps.googleapis.com https://maps.gstatic.com https://*.tile.openstreetmap.org; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://openrouter.ai https://api.sarvam.ai https://api.portkey.ai https://api.tavily.com https://maps.googleapis.com; frame-src 'self' https://www.google.com https://maps.google.com; object-src 'none'; base-uri 'self';"
                    }
                ]
            }
        ];
    }
};

export default nextConfig;
