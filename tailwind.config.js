/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {

    

    screens: {
      'xs': '120px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },

    extend: {

      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      },

      colors: {
        primary: '#3490dc', // Puedes cambiar el código de color según tus preferencias
        fondo: '#1e2f33',
        fondoboton: '#FFFFFF66',
        azulmundoweb: '#303BE4',
        azuloscuro: '#080B44',
        azulanding: '#091CA6',
        azulecommerce:  '#0017d7',
        azulmoviles: '#0018ff',
        azulform:  '#040a45',
        fondoinput: '#FFFFFF66',
        textyellow: '#FDD448',
        azuloscuro: '#050A41',
        mwnaranja: '#E15A29 ',
        formmw: 'rgba(255, 255, 255, 0.10)',
        inputmw: 'rgba(255, 255, 255, 0.40)',
      },

      fontFamily: {
        RightgroteskMedium: ['RightgroteskMedium', 'sans-serif'],
        PoppinsSemiBold: ['Poppins-SemiBold', 'sans-serif'],
        MontserratMedium: ['Montserrat-Medium', 'sans-serif'],
        MontserratSemibold: ['Montserrat-Semibold', 'sans-serif'],
        MontserratRegular: ['Montserrat-Regular', 'sans-serif'],

      },

      margin: {
        '30': '7.5rem',

      }

    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
}

