/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  screens: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1440px",
  },
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E5D7FE",
          200: "#C9AFFE",
          300: "#AA86FD",
          400: "#9168FB",
          500: "#6837FA",
          600: "#4F28D7",
          700: "#3A1BB3",
          800: "#271190",
          900: "#1A0A77",
        },
      },
    },
    fontFamily: {},
    backgroundImage: {},
  },

  plugins: [],
};
