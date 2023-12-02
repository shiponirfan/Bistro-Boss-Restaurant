/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter": "'Inter', sans-serif"
      },
      colors: {
        "bistro-primary": "rgba(209, 160, 84, 0.70)"
      }
    },
  },
  plugins: [require("daisyui")],
}

