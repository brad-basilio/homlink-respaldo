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
            fontFamily: {
                bebas: ["Bebas Neue", "serif"],
                poppins: ["Aspekta ", "serif"],
                Poppins_Light: ["Poppins_Light"],
                Poppins_Regular: ["Poppins_Regular"],
                Poppins_Medium: ["Poppins_Medium"],
                Poppins_SemiBold: ["Poppins_SemiBold"],
                Poppins_Bold: ["Poppins_Bold"],
            },
            colors: {
                azul: "#224483",
                negro: "#242424",
            },
            // Puedes agregar personalizaciones aquí si es necesario
        },
    },
    plugins: [
        require("tailwindcss-animated"),
        function ({ addUtilities }) {
            const newUtilities = {
                ".scrollbar-hide": {
                    /* IE and Edge */
                    "-ms-overflow-style": "none",

                    /* Firefox */
                    "scrollbar-width": "none",

                    /* Safari and Chrome */
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
            };

            addUtilities(newUtilities);
        },
        // Otros plugins si los tienes
    ],
};
