import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-void': '#050505',
        'black-metal': '#0a0a0a',
        'black-steel': '#1a1a1a',
        'orange-burn': '#ff5e1a',
        'orange-flame': '#ff8a3d',
        'orange-embers': '#ffb07a',
        'cyan-cyber': '#00d1ff',
        'cyan-electric': '#33dcff',
        'cyan-neon': '#66e7ff',
        'gray-titanium': '#333333',
        'gray-aluminum': '#666666',
        'gray-brushed': '#999999',
        'gray-silver': '#cccccc',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Alegreya Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Exo 2', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Alegreya Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'monospace'],
      },
      animation: {
        'scan': 'scan 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'stripes': 'stripes 1s linear infinite',
        'grow-shrink': 'grow-shrink 1.5s ease-in-out infinite',
        'spin-reverse': 'spin-reverse 1s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(255, 94, 26, 0.5)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 40px rgba(255, 94, 26, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        stripes: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 0' },
        },
        'grow-shrink': {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
      backgroundImage: {
        'striped': 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
      },
      backgroundSize: {
        'stripes': '60px 60px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
export default config;
