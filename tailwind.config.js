/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1d9e75',
        'primary-dark': '#178c6b',
        'primary-light': '#e0f7ed',
        'primary-pale': '#b2f2e0',
        warning: '#ef9f27',
        purple: '#6d4cc0',
        gray: {
          50: '#f7f7f8',
          100: '#f0f0f1',
          200: '#e0e0e5',
          400: '#9999a6',
          600: '#666673',
          900: '#1a1a1f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
