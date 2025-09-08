import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./shared/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // brand (from your screenshot)
        brand: {
          50:  "#EDF7FF",
          100: "#D9F0FF",
          300: "#89D7FF",
          500: "#29B8FF",
          600: "#00A8FF",
          700: "#0097E6",
          900: "#000093",   // accent for icons/text only
        },
        // neutrals used in cards/pills/borders
        surface:    "#FFFFFF",
        canvas:     "#F2F5F6",
        pill:       "#EEF1F3",
        pillHover:  "#E7EBEE",
        stroke:     "#E4E9EC",
        text:       "#0F1A1C",
        muted:      "#7B8B91",
      },
      boxShadow: {
        card: "0 6px 30px rgba(16,24,40,0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      fontSize: {
        // comfortable, consistent scale
        xs:  ["12px", "18px"],
        sm:  ["14px", "20px"],
        base:["16px", "24px"],
        lg:  ["18px", "26px"],
      },
    },
  },
  plugins: [],
} satisfies Config;
