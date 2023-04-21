/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'netflix': '#E50914'
      },
      gradientColorStops: {
        'custom-gradient': ['#7c3aed', '#1565c0', '#b92b27', '#d32f2f', '#ff9800', '#fdd835', '#43a047', '#7b1fa2', '#8e24aa'],
      }
    },

  },
  plugins: [],
}
