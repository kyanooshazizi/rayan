/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        5: "5px",
      },
      colors: {
        utils: {
          // 300: "#facc15",
          300: "#FFC300",
        },
        colorgray:"#5B6271",
        colorgreen:"#46C86E",
        iconbox: "#ffffff",
        bgcolor: "#283764",
        bgcolor_hover: "#30437a",
        txcolor: "#ffffff",
        txnotcolor: "#000000",
        tickboxprice: "#FFC300",
        bgboxprice: "BBFBDA",
        navbarrequst: "#000b76",
        bgbtnhover: "#ffffff",
        dashboard:"#f3f6fb"
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("daisyui")],
};
