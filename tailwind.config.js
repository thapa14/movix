/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*{js,jsx,html}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: 0,
      },
    },
    extend: {
      width: {
        18: "4.5rem",
        "50px": "50px",
        "100px": "100px",
        "150px": "150px",
      },
      height: {
        "50px": "50px",
        "100px": "100px",
        "150px": "150px",
      },
      spacing: {
        7.5: "1.875rem",
        12.5: "3.125rem",
        13: "3.25rem",
        15: "3.75rem",
        25: "6.25rem",
      },
      colors: {
        black1: "#04152d",
        black2: "#041226",
        black3: "#020c1b",
        "t-black": "#00000050",
        "black-lighter": "#1c4b91",
        "black-light": "#173d77",
        pink1: "#da2f68",
        orange1: "#f89e00",
        gradient: "linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)",
      },
      boxShadow: {
        "icons-shadow": "0 0 0.625em rgba(190 24 93)",
      },
      keyframes: {
        mobileMenu: {
          "0%": { transform: "translateY(-130%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        mobileMenu: "mobileMenu 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
