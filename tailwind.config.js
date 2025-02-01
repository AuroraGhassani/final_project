/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Pastikan path file proyekmu benar
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Tambahkan plugin DaisyUI
};
