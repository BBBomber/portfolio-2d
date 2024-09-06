/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Include all HTML files in the root directory
    "./css/**/*.css", // Include any CSS files in the CSS folder
    "./js/**/*.js", // (Optional) Include any JS files in the JS folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
