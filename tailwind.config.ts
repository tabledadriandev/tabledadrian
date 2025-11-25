import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // OPUS Design System - Masterful Palette
        'bg-primary': '#FAF8F3', // Light Cream
        'text-primary': '#2B2520', // Dark Walnut
        'accent-primary': '#0F4C81', // Cobalt Blue
        'hover-state': '#D4C5B9', // Coffee Beige
        'border-light': '#E8E3DC', // Soft Gray
        'accent-dark': '#1A2332', // Deep Navy
        
        // Semantic Colors
        'success': '#4CAF50',
        'warning': '#FF9800',
        'error': '#F44336',
        
        // Text Hierarchy
        'text-secondary': '#6B6560',
        'text-tertiary': '#8B8580',
        
        // Legacy support (will be replaced gradually)
        'gold': {
          DEFAULT: '#0F4C81', // Cobalt Blue as primary accent
          light: '#D4C5B9', // Coffee Beige
          dark: '#1A2332', // Deep Navy
        },
        'cream': {
          DEFAULT: '#FAF8F3',
          light: '#FAF8F3',
          dark: '#E8E3DC',
        },
        'charcoal': '#2B2520',
      },
      fontFamily: {
        // OPUS Typography: Chango for titles, clean sans for body
        display: ['Chango', 'var(--font-display)', 'Impact', 'Arial Black', 'sans-serif'],
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Reduced font sizes for titles (4-5px smaller)
        '2xl': ['1.25rem', { lineHeight: '1.2' }], // 20px (reduced from 24px)
        '3xl': ['1.625rem', { lineHeight: '1.2' }], // 26px (reduced from 30px)
        '4xl': ['1.9375rem', { lineHeight: '1.2' }], // 31px (reduced from 36px)
        '5xl': ['2.6875rem', { lineHeight: '1.2' }], // 43px (reduced from 48px)
        '6xl': ['3.4375rem', { lineHeight: '1.2' }], // 55px (reduced from 60px)
        '7xl': ['4.1875rem', { lineHeight: '1.2' }], // 67px (reduced from 72px)
        '8xl': ['5.6875rem', { lineHeight: '1.2' }], // 91px (reduced from 96px)
      },
      spacing: {
        // OPUS 8px baseline grid
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
        '26': '6.5rem', // 104px
        '30': '7.5rem', // 120px
        '34': '8.5rem', // 136px
        '38': '9.5rem', // 152px
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        'fade-in': 'fadeIn 1s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'opus': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'opus-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'opus-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config
