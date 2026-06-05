/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cafe:     "#3D2B1F",
          madeira:  "#7A5C3A",
          amber:    "#C4943A",
          oliva:    "#6B7C3A",
          creme:    "#F2E8D0",
          offwhite: "#FAF6EE",
        }
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans:    ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}