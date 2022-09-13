/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{njk,html}"],
    theme: {
        extend: {
            colors: {
                light: {
                    bg: {
                        default: "#FFFFFF",
                    },
                    label: {
                        default: "#000000",
                        secondary: "rgba(60,60,67,0.6)",
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
