import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f7ff',
          100: '#e0efff',
          200: '#b9ddff',
          300: '#7cc1ff',
          400: '#36a3ff',
          500: '#0a84ff',
          600: '#0066dd',
          700: '#0052b3',
          800: '#004494',
          900: '#003778',
          950: '#001e47',
        },
        accent: {
          DEFAULT: '#ff6b35',
          dark:    '#e55a28',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-in-up':     'fadeInUp 0.7s ease both',
        'fade-in':        'fadeIn 0.6s ease both',
        'float-slow':     'floatSlow 6s ease-in-out infinite',
        'float-med':      'floatMed 4s ease-in-out infinite',
        'count-up':       'countUp 0.6s ease both',
        'slide-in-left':  'slideInLeft 0.7s ease both',
        'slide-in-right': 'slideInRight 0.7s ease both',
        'gradient-shift': 'gradientShift 6s ease infinite',
        'spin-slow':      'spinSlow 20s linear infinite',
        'marquee':        'marquee 28s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        floatMed: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        gradientShift: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
