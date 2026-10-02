import { Silkscreen } from "next/font/google";

// Fonte pixel das páginas do jogo (/jogos/what-bites-below e /apoie) —
// importada só por elas, não pelo layout, pra não pesar no resto do site.
// Só o peso 400: no 700 o "W" vira um bloco ilegível ("WHAT" lia como "▀HAT").
export const pixelFont = Silkscreen({ weight: ["400"], subsets: ["latin"], variable: "--font-pixel", display: "swap" });
