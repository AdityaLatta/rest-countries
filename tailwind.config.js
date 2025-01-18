/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "Dark-Blue-Elements": "hsl(209, 23%, 22%)",
                "Very-Dark-Blue-Background": "hsl(207, 26%, 17%)",
                "Very-Dark-Blue-light-text": "hsl(200, 15%, 8%)",
                "Dark-Gray-light-input": "hsl(0, 0%, 52%)",
                "Very-Light-Gray-light-Background": "hsl(0, 0%, 98%)",
                White: "hsl(0, 0%, 100%)",
            },
            maxWidth: {
                desktop: "1440px",
            },
            backgroundColor: {
                "dark-white": "#FAFAFA",
            },
        },
    },
    plugins: [],
};
