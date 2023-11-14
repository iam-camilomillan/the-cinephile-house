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
      themes: {
        dark: {
          colors: {
            background: "#0a0a0a",
            foreground: "#fafafa",
            divider: "#fafafa",
            overlay: "#0a0a0a",
            focus: "#dc2626",
            primary: {
              DEFAULT: "#ef4444",
              foreground: "#fafafa",
            },
          },
        },
      },
    }),
    require("tailwind-scrollbar"),
  ],
} satisfies Config;
