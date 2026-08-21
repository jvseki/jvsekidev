import type { Config } from "tailwindcss";

// Design tokens live in one place: app/theme.css (CSS custom properties).
// Tailwind only references them by var(...) — it never hardcodes a hex value,
// so the theme file stays the single source of truth.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    // No `extend` — the default Tailwind color palette (red-500, blue-600, etc.)
    // is switched off entirely. Only tokens defined below exist.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      void: "var(--bg-void)",
      panel: "var(--bg-panel)",
      stroke: "var(--stroke)",
      ink: "var(--text)",
      mute: "var(--text-mute)",
      white: "#FFFFFF",
      black: "#000000",
    },
    fontFamily: {
      sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
    },
    borderRadius: {
      none: "0px",
      sm: "4px",
      DEFAULT: "6px",
      md: "8px",
      full: "9999px",
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      maxWidth: {
        wrap: "1200px",
      },
      letterSpacing: {
        display: "-0.03em",
      },
      boxShadow: {
        none: "none",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
