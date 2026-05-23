import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08090d",
        panel: "#11131a",
        line: "rgba(255,255,255,0.09)",
        limefit: "#b8ff3c",
        cyanfit: "#52e0ff",
        rosefit: "#ff5f8f",
        goldfit: "#ffc857"
      },
      boxShadow: {
        glow: "0 0 34px rgba(184,255,60,0.16)",
        panel: "0 18px 80px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
