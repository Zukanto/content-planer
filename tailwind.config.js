/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        vektrus: {
          primary: '#00B8D9',
          'primary-light': '#00E1F0',
          'primary-dark': '#0095B0',
          blue: {
            light: '#E6FBFF',
            DEFAULT: '#00B8D9',
            dark: '#0095B0'
          },
          gray: {
            light: '#F5F5F5',
            dark: '#333333'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'top': '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
      }
    }
  },
  plugins: []
};