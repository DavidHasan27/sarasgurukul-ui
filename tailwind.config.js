/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["GFS Didot"],
      body: ["GFS Didot"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      tahiti: {
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
      },
      blue: {
        50: "#eff8ff",
        100: "#dbeffe",
        200: "#bee4ff",
        300: "#92d3fe",
        400: "#5fbafb",
        500: "#399cf8",
        600: "#237ded",
        700: "#1b67da",
        800: "#1d53b0",
        900: "#1f4d94",
        950: "#162d55",
      },

      // ...
    },
    extend: {},
  },
  plugins: [],
});
