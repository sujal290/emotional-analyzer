/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        love: ["var(--font-dancing)"],
        royal: ["var(--font-playfair)"],
      },
    },
  },
  plugins: [],
};
