/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "themeBlue1":"#251D3A",
        "themeBlue2":"#4D4C7D",
        "themeOrange":"#F99417",
        "themeGray":"#F5F5F5",
      },
    },
  },
  plugins: [],
}

