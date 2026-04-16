/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        brand: {
          50: '#fcfaf5', // soft off-white/parchment
          100: '#f2eee3', // cream
          200: '#e1d7c6', // warm beige
          300: '#c5b497', // muted earth
          400: '#a38f6b',
          500: '#8c7751',
          600: '#736040',
          700: '#5c4b31',
          800: '#473a25',
          900: '#332a1a',
        },
        primary: {
          light: '#e56b55', // rustic red light
          DEFAULT: '#cc4b33', // rustic red
          dark: '#a63923', // rustic red dark
        },
        secondary: '#5a6b47', // olive green
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
