/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        accent: {
          pink: '#EC4899',
          coral: '#F43F5E',
          cyan: '#06B6D4',
          sky: '#0EA5E9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(124, 58, 237, 0.15)',
        'glow-violet': '0 0 25px rgba(124, 58, 237, 0.3)',
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'dash': 'dash 20s linear infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        dash: {
          to: {
            strokeDashoffset: '-1000',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
