import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "7xl": "88rem",
      },
      colors: {
        brand: {
          red: "#E50914",
          "red-dark": "#990000",
          "red-light": "#FF2D3B",
          burgundy: "#350E0E",
          "burgundy-dark": "#2A0C0C",
          "burgundy-deep": "#1E0808",
          "burgundy-light": "#451010",
          black: "#100D0D",
          dark: "#151111",
          surface: "#151111",
          card: "#181313",
          "card-hover": "#221414",
          border: "rgba(255, 255, 255, 0.08)",
          "dark-burgundy": "#1E0808",
          "cream": "#F5F0E6",
          "border-hover": "rgba(229, 9, 20, 0.4)",
          orange: "#FF5E36",
          pink: "#FF3366",
          gold: "#F59E0B",
          veg: "#10B981",
          "non-veg": "#EF4444",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Impact", "Oswald", "system-ui", "sans-serif"],
        sans: ["var(--font-jakarta)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-red": "0 0 30px -5px rgba(229, 9, 20, 0.35)",
        "glow-red-lg": "0 0 60px -10px rgba(229, 9, 20, 0.5)",
        "glow-burgundy": "0 0 40px -5px rgba(53, 14, 14, 0.6)",
        "glow-orange": "0 0 30px -5px rgba(255, 94, 54, 0.35)",
        "card-depth": "0 20px 40px -15px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(180deg, rgba(16,13,13,0.2) 0%, rgba(42,12,12,0.4) 60%, #100D0D 100%)",
        "flame-gradient": "linear-gradient(135deg, #E50914 0%, #FF5E36 50%, #FF3366 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-reverse": "floatReverse 7s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(10px) rotate(-2deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
