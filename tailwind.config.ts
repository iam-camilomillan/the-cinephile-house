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
      defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            default: {
              50: "#f97316", // temp orange
              100: "#262626", // checked
              200: "#404040", // checked
              300: "#eab308", // temp yellow
              400: "#a3a3a3", // checked
              500: "#fafafa", // temp green
              600: "#10b981", // temp emerald
              700: "#06b6d4", // temp cyan
              800: "##fda4af", // temp pink
              900: "#7e22ce", // temp purple
              DEFAULT: "#ef4444", //  temp olive
              foreground: "#fafafa", // checked
            },
            background: "#0a0a0a", // checked
            foreground: "#fafafa", // checked
            divider: "#262626", // checked
            overlay: "#881337",
            focus: "#881337",
            primary: {
              100: "#dc2626",
              200: "#ef4444",
              DEFAULT: "#dc2626", // checked
              foreground: "#fafafa", // checked
            },
            content1: "#262626", // checked
            content2: "#5b21b6", // dark purple
            content3: "#5b21b6", // dark purple
            content4: "#5b21b6", // dark purple
          },
        },
      },
    }),
    require("tailwind-scrollbar"),
  ],
} satisfies Config;
