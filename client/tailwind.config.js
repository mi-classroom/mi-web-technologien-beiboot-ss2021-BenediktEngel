module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      cda: {
        darkest: "#333333",
        dark: "#666666",
        light: "#E5E5E5",
        lightest: "#FFFFFF",
        accent: "#FFCC00",
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
