module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      cda: {
        darkest: "#333333",
        darker: "#666666",
        dark: "#9C9C9C",
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
