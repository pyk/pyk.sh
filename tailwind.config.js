/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./_includes/**/*.{njk,html}"],
    theme: {
        extend: {
            colors: {
                bg: {
                    dark: {
                        base: {
                            primary: "#000000",
                        },
                        elevated: {
                            primary: "#1C1C1E",
                        },
                    },
                },
                label: {
                    dark: {
                        primary: "#FFFFFF",
                        secondary: "rgba(235,235,245,0.6)",
                    },
                },
                blue: {
                    dark: "#0A84FF",
                },
                pink: {
                    dark: "#FF2D55",
                },
                green: {
                    dark: "#30D158",
                },
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
