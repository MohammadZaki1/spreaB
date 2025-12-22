/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          600: '#9333ea',
          700: '#7c3aed',
        }
      }
    },
  },
  plugins: [],
}