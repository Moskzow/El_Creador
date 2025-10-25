import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Here we link the CSS variables from layout.tsx to Tailwind's font utility classes
        sans: ['var(--font-inter)'],
        roboto: ['var(--font-roboto)'],
        montserrat: ['var(--font-montserrat)'],
        lora: ['var(--font-lora)'],
        oswald: ['var(--font-oswald)'],
      },
    },
  },
  plugins: [],
};
export default config;