/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFC107",
        base: {
          100: "#F5F5F7",
          200: "#A2A2A5",
        },
      },
    },
  },
  plugins: [],
};

