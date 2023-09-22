import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      inter: ["var(--font-inter)"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
