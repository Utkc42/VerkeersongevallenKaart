/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "../frontend/src/Filters.jsx"],
  theme: {
    extend: {
      colors: {
        "cyber-blue": "#0ff",
        "cyber-green": "#0f0",
        dark: "#121212",
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(to right, #0f0f0f, #003366)",
      },
    },
  },
  plugins: [],
};
