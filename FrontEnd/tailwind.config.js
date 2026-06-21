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
    marrom:   "#B5651D",  // cor "Vinu" no logo
    oliva:    "#6B7C3A",  // cor asterisco e "caffè"
    escuro:   "#4A3728",  // marrom escuro
    creme:    "#F5F0E8",  // fundo claro/cardápios
    offwhite: "#FAFAF8",  // fundo da aplicação
    branco:   "#FFFFFF",
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