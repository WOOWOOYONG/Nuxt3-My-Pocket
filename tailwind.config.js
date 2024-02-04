/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './content/**/*.{md,yml,json,yaml,toml,csv}',
    './container/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.{js,ts,vue}'
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        sand: {
          50: '#FDFDFC',
          100: '#FBFAF9',
          200: '#F5F3EF',
          300: '#F1EEE9',
          400: '#EBE7E0',
          500: '#E6E1D8',
          600: '#C3B8A2',
          700: '#A18F6D',
          800: '#6D5F46',
          900: '#383124',
          950: '#1C1812'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
