/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Lexend", "sans-serif"],
      monospace: ["Monaco", "monospace"],
    },
    extend: {
      colors: {
        pastelPurple: "#8C7EFF",
        pastelPink: "#EDA1FF",
        pastelBlue: "#466CF7",
        pastelOrange: "#FF7764",
        pastelGreen: "#31A67B",
        pastelYellow: "#FFE471",
        bgDark1: "#22103A",
        bgDark2: "#321E4C",
        bgDark3: "#514167",
        bgLight1: "#706383",
        bgLight2: "#AFA8BA",
        white1: "#CECBD5",
        white2: "#EEEDF1",
        purpleOp15: "#8C7EFF29",
        purpleOp50: "#8C7EFF29",
        pinkOp: "#EDA1FF47",
        greenOp: "#31A67B80",
        orangeOp: "#FF776469",
        blackOp: "#00000057",
        bgLight1OP: "#70638380",
      },
      boxShadow: {
        "box-shadow-md": "0px 2px 7px 3px rgba(0, 0, 0, 0.3)",
        "box-shadow-sm": "1px 3px 5px rgba(0, 0, 0, 0.3)",
      },

      screens: {
        "below-lg": { max: "1210px" },
        "below-mobile": { max: "715px" },
        "above-2k": { min: "2561px" },
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
      },
    },
  },
};
