import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
      maxWidth: {
        1200: `${1200 / 16}rem`,
        800: `${800 / 16}rem`,
        708: `${708 / 16}rem`,
        358: `${358 / 16}rem`,
      },
      textColor: {
        orange: "#FFD674",
      },
      backgroundColor: {
        secondary: "#333",
        lights: "#F3F1EC",
        gray: "#F5F5F5",
        line: "#7F7F7F",
        orange: "#F49100",
      },

      borderColor: {
        light: "#ddd",
      },
      // backgroundColor: {
      //   dashboard: {
      //     light: "#1D2022",
      //   },
      // },
      colors: {
        primary: "#0CB0A2",
        dark: "#2D4162",
        lightGray: "#F2F4F7",
        light: "#959FB0",
        success: "#219653",
        danger: "#D34053",
        error: "#ff3333",
      },
    },
  },
  plugins: [],
};
export default config;
