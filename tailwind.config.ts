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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryAccent: '#FF3B3C',
        secondaryAccent: '#AF9CF3',
        textSecondary: '#AEAEAE',
        textTertairy: '#747B77',
        successPrimary: '#44B77B',
        successSecondary: '#E9F6EF',
        errorPrimary: '#FF3B3F',
        errorSecondary: '#FFE8E8',
      },
    },
  },
  plugins: [],
};
export default config;
