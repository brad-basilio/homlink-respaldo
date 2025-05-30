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
                title: ["Archivo", "sans-serif"],
                paragraph: ["Archivo", "sans-serif"],
            },
            colors: {
                //azul: "#224483",
                negro: "#242424",

                /**CAMBIO Y GERENCIA */
                accent:"#D62828",
                secondary:"#F77F00",
                primary:"#003049",
                constrast:"#0082D8",
                "neutral-dark":"#001520",
                "neutral":"#003049",
                "neutral-light":"#F2F2F2",
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
