import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Brutalist: everything monospace
        mono: ["IBM Plex Mono", "Space Mono", "Courier New", "monospace"],
        sans: ["IBM Plex Mono", "Space Mono", "Courier New", "monospace"],
      },
      colors: {
        brut: {
          black: "#000000",
          white: "#FFFFFF",
          yellow: "#FFE500",
          red: "#FF0000",
          blue: "#0000FF",
          gray: "#808080",
          "off-white": "#F5F5F0",
        },
      },
      borderWidth: {
        "3": "3px",
        "5": "5px",
        "6": "6px",
      },
      borderRadius: {
        // Brutalist: no rounding anywhere
        none: "0px",
        sm: "0px",
        DEFAULT: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "0px",
      },
      boxShadow: {
        brut: "4px 4px 0px 0px #000000",
        "brut-sm": "2px 2px 0px 0px #000000",
        "brut-lg": "8px 8px 0px 0px #000000",
        "brut-white": "4px 4px 0px 0px #FFFFFF",
        "brut-accent": "4px 4px 0px 0px #FFE500",
      },
      letterSpacing: {
        brut: "-0.02em",
        "brut-wide": "0.08em",
      },
    },
  },
  plugins: [],
};

export default config;
