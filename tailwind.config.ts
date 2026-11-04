import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#141518",
          black: "#0b0c0e",
          card: "#1b1c20",
          border: "#28292e",
          gold: "#c59a63",
          goldHover: "#b38852",
          gray: "#8e919a",
          light: "#f4f4f5"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-heading)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
