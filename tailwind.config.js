/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        secondary: "#1B2135",
        primary: "#1C4DDC",
      },
      fontFamily: {
        roboto: ["Roboto", "arial", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
