import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      inter: ["var(--font-inter)"],
    },
    extend: {
      colors: {
        "clr-one": "#e63946",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
