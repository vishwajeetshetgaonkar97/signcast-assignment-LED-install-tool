/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-color": "rgb(var(--background))",
        "text-color": "rgb(var(--text))",
        border: "rgb(var(--border))",
        card: "rgb(var(--card))",
        "copy-primary": "rgb(var(--copy-primary))",
        "copy-secondary": "rgb(var(--copy-secondary))",
        cta: "rgb(var(--cta))",
        "cta-active": "rgb(var(--cta-active))",
        "cta-text": "rgb(var(--cta-text))",
      },
    },
  },
  plugins: [],
  darkMode: false, // Since there are more than two modes, disable darkMode default handling.
};
