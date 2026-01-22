/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
        },
        secondary: {
          DEFAULT: '#dc004e',
          light: '#f50057',
          dark: '#c51162',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
