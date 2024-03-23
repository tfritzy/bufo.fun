/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        bufo: {
          100: "#cee0a3",
          200: "#9ec079",
          300: "#8a9e6e",
          400: "#789760",
          500: "#51693d",
          600: "#233417",
          700: "#1d2013",
        },
      },
    },
  },
  plugins: [],
};
