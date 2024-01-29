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
        "themeGray":"#191919",
        "themeRed":"#CF0A0A",
        "themeOrange":"#E85E18",
        "themeWhite":"#EEEEEE"

      },
    },
  },
  plugins: [],
}

