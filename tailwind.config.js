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
        iconbox: "#ffffff",
        bgcolor: "#000b76",
        txcolor: "#ffffff",
        txnotcolor: "#000000",
        tickboxprice: "#FFC300",
        bgboxprice: "BBFBDA",
        navbarrequst: "#000b76",
        bgbtnhover: "#ffffff",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("daisyui")],
};
