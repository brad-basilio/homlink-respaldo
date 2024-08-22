/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      // Puedes agregar personalizaciones aquí si es necesario
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    // Otros plugins si los tienes
  ],
}
