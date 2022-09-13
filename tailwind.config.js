/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{njk,html}"],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
