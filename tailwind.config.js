module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary scale
        primaryLight: "#f08a4a",
        primary: "#e8732a",
        primaryDark: "#87563a",

        // Backgrounds
        background: "#ffe8d2",
        backgroundSoft: "#fff3e6",

        // Accent / secondary
        accent: "#005246",
        accentLight: "#1f6f63",

        // Text
        textMuted: "#6b7280",

        // Base
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};