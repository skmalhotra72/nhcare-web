import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        green: { 50:"#f0f7f4",100:"#dcede6",200:"#bbdbd0",600:"#2d6b60",700:"#1e5248",800:"#1B4D3E",900:"#163d31",950:"#0D2B1E" },
        gold: { 300:"#fcd34d",400:"#F4B942",500:"#d4971a",600:"#a06000" },
        ink: { 50:"#f8fafc",100:"#f1f5f9",200:"#e2e8f0",300:"#cbd5e1",400:"#94a3b8",500:"#64748b",600:"#475569",700:"#334155",800:"#1e293b",900:"#0f172a",950:"#070d14" },
      },
      fontFamily: {
        display:["'Playfair Display'","Georgia","serif"],
        body:["'Inter'","system-ui","sans-serif"],
      },
    },
  },
  plugins:[],
} satisfies Config;
