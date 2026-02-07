import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050510',
        foreground: '#e0e0ff',
        cyber: {
          neon: '#0ff', // Cyan
          pink: '#f0f', // Magenta
          purple: '#bd00ff',
          green: '#0f0',
          yellow: '#ff0',
        },
        card: {
          DEFAULT: 'rgba(20, 20, 40, 0.8)',
          foreground: '#e0e0ff',
        },
        popover: {
          DEFAULT: '#101025',
          foreground: '#e0e0ff',
        },
        primary: {
          DEFAULT: '#0ff',
          foreground: '#000',
        },
        secondary: {
          DEFAULT: '#f0f',
          foreground: '#fff',
        },
        muted: {
          DEFAULT: '#1a1a35',
          foreground: '#8888aa',
        },
        accent: {
          DEFAULT: '#bd00ff',
          foreground: '#fff',
        },
        destructive: {
          DEFAULT: '#ff0055',
          foreground: '#fff',
        },
        border: 'rgba(0, 255, 255, 0.2)',
        input: 'rgba(20, 20, 40, 0.9)',
        ring: '#0ff',
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)'],
        inter: ['var(--font-inter)'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1a1a35 1px, transparent 1px), linear-gradient(to bottom, #1a1a35 1px, transparent 1px)",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
