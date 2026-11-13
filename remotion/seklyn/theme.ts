import { loadFont } from "@remotion/google-fonts/Inter";

// Mesma identidade do produto em produção (C:\Saas\frontend): Inter +
// escala violeta do Tailwind, fundo slate-950 no modo escuro. O roxo é
// da Seklyn — no site da JVSEKI ele só aparece dentro da área da Seklyn.
export const { fontFamily: INTER } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const SK = {
  bg: "#07040f",
  bgCard: "rgba(17, 12, 34, 0.86)",
  bgCardSolid: "#120c22",
  line: "rgba(167, 139, 250, 0.16)",
  lineStrong: "rgba(167, 139, 250, 0.32)",
  text: "#f5f3ff",
  mute: "#a39cbd",
  faint: "#6b6485",
  v300: "#c4b5fd",
  v400: "#a78bfa",
  v500: "#8b5cf6",
  v600: "#7c3aed",
  v700: "#6d28d9",
  v900: "#4c1d95",
  v950: "#2e1065",
  green: "#10b981",
  greenDeep: "#047857",
  red: "#f87171",
} as const;

export const FPS = 30;
