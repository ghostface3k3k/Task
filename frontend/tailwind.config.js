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
          main: '#0f6bbc',
          dark: '#003fad',
        },
        light: '#fafafa',
        text: {
          primary: '#151d48',
          secondary: '#737791',
        },
        accent: '#16c098',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(237, 237, 237, 0.5)',
      },
    },
  },
  plugins: [],
  important: '#root',
}
