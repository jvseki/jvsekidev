// Dados do jogo What Bites Below. Os arquivos em /public/jogos/what-bites-below
// vêm prontos do `npm run site:pack` do projeto do jogo — em nova versão,
// substitui a pasta inteira e atualiza `version` aqui (o nome do .zip
// offline depende dela). O trailer fica FORA dessa pasta (public/video/)
// de propósito, pra não sumir quando a pasta for substituída.

const base = "/jogos/what-bites-below";
const version = "0.3.2";

export const whatBitesBelow = {
  slug: "what-bites-below",
  path: base,
  name: "What Bites Below",
  version,
  tagline: "Pescaria aconchegante. Até não ser mais.",
  playSrc: `${base}/jogar/index.html`,
  trailerSrc: "/video/what-bites-below-trailer-pt.mp4",
  img: {
    cover: `${base}/img/capa-itch-630x500-pt.png`,
    thumbnail: `${base}/img/thumbnail-1920x1080-pt.png`,
    logo: `${base}/img/logo-whatbitesbelow-1080.png`,
  },
  offlineZip: `${base}/downloads/WhatBitesBelow-Demo-${version}-offline.zip`,
  // Ainda sem link. Enquanto for null, o botão/card correspondente não
  // aparece (em vez de apontar pra lugar nenhum).
  windowsZipUrl: null as string | null,
  itchUrl: null as string | null,
  instagram: { handle: "@jvsekidev", url: "https://instagram.com/jvsekidev" },
  about:
    "Seu avô Walter pescou neste lago por quarenta anos. Há um mês, o barco dele voltou sozinho para o cais — com o lampião ainda aceso. Agora o barco é seu. Pesque à noite, venda para a Marta no cais, compre linhas mais longas e desça mais fundo… e repare no que muda.",
  features: [
    "5 noites (~25 min)",
    "14 criaturas cada vez mais erradas",
    "Terror psicológico, sem jumpscare barato",
    "Pixel art",
    "Português e inglês",
  ],
  controls: [
    { keys: "Segurar e soltar", action: "Lançar a linha" },
    { keys: "Segurar", action: "Afundar / puxar" },
    { keys: "R", action: "Recolher" },
    { keys: "J", action: "Caderno" },
    { keys: "Q", action: "Isca" },
    { keys: "T", action: "Sino" },
    { keys: "E", action: "Voltar ao cais" },
    { keys: "ESC ou P", action: "Pausa" },
    { keys: "F", action: "Tela cheia" },
  ],
} as const;
