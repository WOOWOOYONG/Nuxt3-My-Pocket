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
          600: '#D5CDBE',
          700: '#BFB39C',
          800: '#A59473',
          900: '#796A4E',
          950: '#5A4F3A'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
