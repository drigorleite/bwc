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
    },
  },
  plugins: [],
}
export default config
