/** @type {import('tailwindcss').Config} */
plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        dark: "#2C3A42",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("not-last", "&:not(:last-child)");
    }),
  ],
};
