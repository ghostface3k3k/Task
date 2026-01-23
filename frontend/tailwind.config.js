/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f6bbc',
          dark: '#003fad',
        },
        dark: {
          DEFAULT: '#151d48',
          light: '#051d49',
        },
        light: {
          DEFAULT: '#fafafa',
          blue: '#f4f8fe',
        },
        gray: {
          DEFAULT: '#737791',
          medium: '#959fb0',
          light: '#e7eaee',
        },
        accent: '#16c098',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(237, 237, 237, 0.5)',
        'card-alt': '0 4px 20px rgba(238, 238, 238, 0.5)',
      },
    },
  },
  plugins: [],
}
