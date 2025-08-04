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
            screens: {
                'xs': '480px', // Added xs breakpoint for small mobile devices
            },
            keyframes: {
                'fade-in-up': {
                    '0%': { opacity: 0, transform: 'translateY(32px)' },
                    '60%': { opacity: 0.7, transform: 'translateY(-8px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                'slide-down': {
                    '0%': { transform: 'translateY(-100%)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                },
            },
            animation: {
                'fade-in-up': 'fade-in-up 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
                'slide-down': 'slide-down 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            },
            fontFamily: {
                title: ["Aeonik", "sans-serif"],
                paragraph: ["Aeonik", "sans-serif"],

            },
            colors: {
                //azul: "#224483",
                negro: "#242424",

                /**CAMBIO Y GERENCIA */
                accent:"#07132D",
                secondary:"#FF3D2A",
                primary:"#195AEA",
                constrast:"#07132D",
                "neutral-dark":"#07132D",
                "neutral":"#07132D",
                "neutral-light":"#07132D99",
            },
            // Puedes agregar personalizaciones aquí si es necesario
            lineClamp: {
                1: '1',
                2: '2',
                3: '3',
                4: '4',
            },
        },
    },
    plugins: [
        require("tailwindcss-animated"),
        require('@tailwindcss/line-clamp'),
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
