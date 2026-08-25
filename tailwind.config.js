/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,html,js}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#F2F4FE",
          100: "#E1E5FB",
          200: "#BCC4F5",
          300: "#8A96EC",
          400: "#5567E0",
          500: "#2B3FD1",
          600: "#1E2FB8",
          700: "#162297",
          800: "#101B5C",
          900: "#0B1440",
          950: "#060B2E",
        },
        gold: {
          50: "#FEF8E9",
          100: "#FDEEC2",
          200: "#FADD8A",
          300: "#F7CB57",
          400: "#F4B443",
          500: "#F0A824",
          600: "#D89A22",
          700: "#B67D16",
          800: "#96650F",
          900: "#7A4E0A",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px 0 rgba(11, 20, 64, 0.06)",
        card: "0 4px 24px -4px rgba(11, 20, 64, 0.10)",
        "card-hover": "0 12px 40px -8px rgba(11, 20, 64, 0.20)",
        glow: "0 0 0 1px rgba(244,180,67,0.25), 0 8px 30px -6px rgba(244,180,67,0.35)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};
