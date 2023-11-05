/* TailwindCSS imports */
import { fontFamily } from "tailwindcss/defaultTheme";

/* NextUI imports */
import { nextui } from "@nextui-org/react";

/* Types imports */
import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#dc2626",
        secondary: "#ef4444",
      },
      screens: {
        xs: "480px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
    }),
    require("tailwind-scrollbar"),
  ],
} satisfies Config;
