import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: { 50:"#f0f7f4",100:"#dcede6",200:"#bbdbd0",600:"#2d6b60",700:"#1e5248",800:"#1B4D3E",900:"#163d31",950:"#0D2B1E" },
        gold: { 400:"#F4B942",500:"#e8a020",600:"#cc8810" },
        slate: { 50:"#f8fafc",100:"#f1f5f9",200:"#e2e8f0",300:"#cbd5e1",400:"#94a3b8",500:"#64748b",600:"#475569",700:"#334155",800:"#1e293b",900:"#0f172a" },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.06)",
        hero: "0 20px 60px rgba(27,77,62,0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
