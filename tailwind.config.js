// tailwind.config.js

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        loading: {
          "0%": { width: "0%" },
          "80%": { width: "100%" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        loading: "loading 4s ease-out infinite",
        blink: "blink 1.5s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
