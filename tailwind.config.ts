import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: { 50:"#f0f7f4", 100:"#dcede6", 200:"#bbdbd0", 300:"#8ec2b4", 400:"#5ea394", 500:"#3d8577", 600:"#2d6b60", 700:"#245650", 800:"#1e453f", 900:"#1B4D3E", 950:"#0D2B1E" },
        gold: { 50:"#fef9ee", 400:"#f4b942", 500:"#e8a020", 600:"#cc8810" },
        cream: { 50:"#fdfcf8", 100:"#F5F0E6", 200:"#ede3d0" },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-right": "slideRight 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: { "0%": { opacity:"0", transform:"translateY(24px)" }, "100%": { opacity:"1", transform:"translateY(0)" } },
        fadeIn: { "0%": { opacity:"0" }, "100%": { opacity:"1" } },
        slideRight: { "0%": { opacity:"0", transform:"translateX(-24px)" }, "100%": { opacity:"1", transform:"translateX(0)" } },
        float: { "0%,100%": { transform:"translateY(0px)" }, "50%": { transform:"translateY(-12px)" } },
        shimmer: { "0%": { backgroundPosition:"-200% 0" }, "100%": { backgroundPosition:"200% 0" } },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "radial-gradient(ellipse at 20% 50%, rgba(27,77,62,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(244,185,66,0.1) 0%, transparent 50%)",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(27,77,62,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
        "gold": "0 4px 24px rgba(244,185,66,0.3)",
        "forest": "0 4px 24px rgba(27,77,62,0.25)",
        "3d": "0 20px 60px rgba(0,0,0,0.15), 0 6px 20px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
