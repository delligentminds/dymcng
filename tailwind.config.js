/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  "#E6F7F7",
          100: "#C2EBEB",
          200: "#99DEDE",
          300: "#66CFCF",
          400: "#33BFBF",
          500: "#0D8F8F",
          600: "#0A7A7A",
          700: "#086666",
          800: "#065252",
          900: "#043D3D",
        },
      },
      fontFamily: {
        sans: [
          "'Segoe UI'",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      borderWidth: {
        3: "3px",
      },
      ringWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
