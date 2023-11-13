/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        yellowGradient: "linear-gradient(114.04deg, #E25901 0%, #FEB400 100%)",
        darkGradient: "linear-gradient(62deg, #121417 0%, #282A33 100%)",
      },
      colors: {
        cusEL: {
          100: "#1A1B1D",
          200: "#2D2F32",
        },
        cusYellow: "#FFA800",
        cusViolet: "#ff9240",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
        "4xs": "0.4rem",
      },
    },
    screens: {
      xs: "0px",
      sm: "100px",
      ssm: "420px",
      xsm: "640px",
      md: "700px",
      mdd: "900px",
      mmd: "1100px",
      lg: "1200px",
      lgg: "1270px",
      llg: "1400px",
      "2xl": "1536px",
      xl: "1640px",
      "3xl": "1780px",
      xxl: "2600px",
      xxxl: "4000px",
      xxxxl: "5000px",
    },
  },
  plugins: [],
};
