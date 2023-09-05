/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      'fortune-cookie': ['Fortune Cookie', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
      sedgwick: ['Sedgwick Ave', 'cursive'],
    },
  },
  plugins: [],
};
