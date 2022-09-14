/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{njk,html}"],
    theme: {
        extend: {
            colors: {
                light: {
                    bg: {
                        default: "#FFFFFF",
                        secondary: "#F2F2F7",
                    },
                    label: {
                        default: "#000000",
                        secondary: "rgba(60,60,67,0.6)",
                    },
                    separator: {
                        default: "#3C3C434A",
                    },
                },
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
