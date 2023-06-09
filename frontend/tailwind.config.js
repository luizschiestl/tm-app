/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: "11.5px",
        xs: "2px",
      },
      colors: {
        clear: { DEFAULT: "#FFFBFB", dark: "#cdc6c6" },
        primary: "#3E9F96",
        secondary: { DEFAULT: "#284F72", dark: "#16324a", light: "#96ABBE" },
        danger: { DEFAULT: "#991616", light: "#F6BCBC" },
        success: { DEFAULT: "#28625C", light: "#B4D7D4" },
        detail: {
          darker: "#5C5959",
          dark: "#7C7C7C",
        },
      },
      fontFamily: {
        title: "Almarai, sans-serif",
        info: "Alata, sans-serif",
        display: "Comfortaa, sans-serif",
      },
      fontSize: {
        title: "20px",
        info: "12px",
      },
      boxShadow: {
        DEFAULT: "3.06189px 3.06189px 3.06189px 3.06189px rgba(0, 0, 0, 0.22)",
        inset: "inset 4px 0px 4px rgba(0, 0, 0, 0.25)",
        button: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
