const { resolveProjectPath } = require("wasp/dev");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [resolveProjectPath("./src/**/*.{js,jsx,ts,tsx}")],
  theme: {
    extend: {
      backgroundImage: {
        brick: 'url("/images/bg.jpg")',
        map: "url('/images/map.png')",
      },
    },
  },
  plugins: [],
};
