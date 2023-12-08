/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        utils: {
          // 300: "#facc15",
          300: "#FF5500",
        },
        iconbox: "#ffffff",
        bgcolor:"#000b76",
        txcolor:"#ffffff",
        txnotcolor:"#000000",
        tickboxprice:"#FF5500",
        bgboxprice:"BBFBDA",
        navbarrequst:"#FF5500",
        bgbtnhover:"#ffffff"
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(),require("daisyui")],
};
