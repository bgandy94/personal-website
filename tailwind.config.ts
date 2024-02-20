import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#003159",
      white: "#fff",
      background: "#1E1E1D",
    },
    textColor: {
      primary: "#EDF2F4",
    },
  },
  plugins: [],
};
export default config;
