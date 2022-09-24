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
                        secondary: "#6C6C70",
                    },
                    separator: {
                        default: "#3C3C434A",
                    },
                    blue: "#0969da",
                },
            },
        },
    },
    plugins: [],
};
