import { loadFont } from "@remotion/google-fonts/Inter";

// Espelha os tokens de seklyn.com.br (assets/css/variables.css): tema claro
// branco + roxo, texto slate, Inter. O roxo é da Seklyn — no site da JVSEKI
// ele só aparece dentro da área da Seklyn.
export const { fontFamily: INTER } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const SK = {
  bgTop: "#fbfaff",
  bg: "#f8fafc",
  card: "#ffffff",
  line: "#e2e8f0",
  lineStrong: "#cbd5e1",
  text: "#0f172a",
  body: "#3f3358",
  mute: "#64748b",
  faint: "#94a3b8",
  v50: "#f5f3ff",
  v100: "#ede9fe",
  v300: "#c4b5fd",
  v400: "#a78bfa",
  v500: "#8b5cf6",
  v600: "#7c3aed",
  v700: "#6d28d9",
  v800: "#5b21b6",
  v900: "#4c1d95",
  pink: "#c446c4", // ponta do gradiente .destaque do hero (violeta → #ff4fa3)
  green: "#16a34a",
  greenLight: "#dcfce7",
  red: "#dc2626",
  redLight: "#fee2e2",
} as const;

export const GRAD_TEXT = `linear-gradient(100deg, ${SK.v600} 10%, ${SK.pink} 90%)`;
export const GRAD_BTN = `linear-gradient(135deg, ${SK.v600}, ${SK.v800})`;
export const SHADOW_CARD = "0 12px 32px rgba(76, 29, 149, 0.16), 0 1px 2px rgba(15, 23, 42, 0.06)";
export const SHADOW_BIG = "0 40px 90px rgba(76, 29, 149, 0.22), 0 2px 6px rgba(15, 23, 42, 0.06)";

export const FPS = 30;
