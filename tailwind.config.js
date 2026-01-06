/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal-primary': '#04737d',
        'teal-dark': '#035057',
        'orange-primary': '#fd9300',
        'orange-hover': '#e48400',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
