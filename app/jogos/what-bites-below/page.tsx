import type { Metadata } from "next";
import { Silkscreen } from "next/font/google";
import { GameEmbed } from "@/components/game/GameEmbed";
import { PlayButton } from "@/components/game/PlayButton";
import { Reveal } from "@/components/Reveal";
import { whatBitesBelow as game } from "@/lib/games";
import { pageMetadata } from "@/lib/seo";
import "./wbb.css";

// Fonte pixel só pros títulos desta página — carregada aqui, não no
// layout, pra não pesar no resto do site. Só o peso 400: no 700 o "W"
// vira um bloco ilegível ("WHAT" lia como "▀HAT").
const pixel = Silkscreen({ weight: ["400"], subsets: ["latin"], variable: "--font-pixel", display: "swap" });

const TITLE = "What Bites Below (demo) — jvseki dev";
const DESCRIPTION =
  "Jogo de pesca em pixel art que começa aconchegante e vira terror psicológico. Demo grátis no navegador e para Windows.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: game.path,
    image: { url: game.img.thumbnail, width: 1920, height: 1080, alt: `${game.name} — capa` },
  }),
  // absolute: fora do template "%s — JVSEKI" do layout, o título é esse exato.
  title: { absolute: TITLE },
};

const GAME_ID = "jogar";

export default function WhatBitesBelowPage() {
  return (
    <div className={`wbb ${pixel.variable}`}>
      {/* 1 · Topo */}
      <section className="wbb-hero">
        {/* eslint-disable-next-line @next/next/no-img-element -- pixel art: sem reamostragem do next/image */}
        <img src={game.img.thumbnail} alt="" className="wbb-pixel wbb-hero__bg" />
        <div className="wrap relative py-20 md:py-32">
          <Reveal>
            <span className="wbb-badge">Demo</span>
            <h1 className="wbb-title mt-5 text-[clamp(2rem,7vw,4.25rem)]">{game.name}</h1>
            <p className="mt-4 max-w-[36ch] text-[1.15rem] md:text-[1.3rem]">{game.tagline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PlayButton targetId={GAME_ID} className="wbb-btn wbb-btn--primary">
                Jogar no navegador
              </PlayButton>
              {game.windowsZipUrl ? (
                <a href={game.windowsZipUrl} target="_blank" rel="noopener noreferrer" className="wbb-btn wbb-pc-only">
                  Baixar para Windows
                </a>
              ) : null}
              {game.itchUrl ? (
                <a href={game.itchUrl} target="_blank" rel="noopener noreferrer" className="wbb-btn">
                  Ver no itch.io
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 · Jogo embutido */}
      <section className="wbb-section" aria-labelledby="wbb-jogar">
        <div className="wrap">
          <h2 id="wbb-jogar" className="wbb-h2">
            Jogar
          </h2>
          <div id={GAME_ID} className="mx-auto mt-6 max-w-[960px] scroll-mt-24">
            <GameEmbed src={game.playSrc} cover={game.img.thumbnail} title={game.name} />
            <p className="wbb-mute mt-3 text-[0.88rem]">
              Dica: F ou o botão de tela cheia. Salve seu progresso no próprio navegador (3 slots).
            </p>
          </div>
        </div>
      </section>

      {/* 3 · Trailer — hospedado no próprio site (preload=none: só baixa ao dar play) */}
      <section className="wbb-section" aria-labelledby="wbb-trailer">
        <div className="wrap">
          <h2 id="wbb-trailer" className="wbb-h2">
            Trailer
          </h2>
          <div className="mx-auto mt-6 max-w-[960px]">
            <video
              src={game.trailerSrc}
              poster={game.img.thumbnail}
              controls
              preload="none"
              playsInline
              className="wbb-frame wbb-pixel block h-auto w-full"
            >
              Seu navegador não reproduz vídeo. <a href={game.trailerSrc}>Baixe o trailer</a>.
            </video>
          </div>
        </div>
      </section>

      {/* 4 · Sobre */}
      <section className="wbb-section" aria-labelledby="wbb-sobre">
        <div className="wrap grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-start">
          <div>
            <h2 id="wbb-sobre" className="wbb-h2">
              Sobre o jogo
            </h2>
            <p className="mt-6 max-w-[60ch] text-[1.05rem] leading-relaxed">{game.about}</p>
          </div>
          <ul className="wbb-features">
            {game.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · Downloads — só no computador: os .zip (Windows e offline) não
          rodam no celular. Lá fica só um aviso + o atalho pra jogar aqui. */}
      <section className="wbb-section" aria-labelledby="wbb-downloads">
        <div className="wrap">
          <h2 id="wbb-downloads" className="wbb-h2">
            Downloads
          </h2>
          <div className="wbb-mobile-only mt-6">
            <p className="wbb-mute max-w-[48ch] text-[0.95rem]">
              Os downloads (Windows e versão offline) ficam disponíveis no computador. No celular, dá pra
              jogar direto aqui no navegador.
            </p>
            <PlayButton targetId={GAME_ID} className="wbb-btn wbb-btn--primary mt-5 w-full">
              Jogar no navegador
            </PlayButton>
          </div>
          <div className="wbb-pc-only mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {game.windowsZipUrl ? (
              <a href={game.windowsZipUrl} target="_blank" rel="noopener noreferrer" className="wbb-card">
                <span className="wbb-card__label">Windows</span>
                <span className="wbb-card__meta">.zip · 166 MB</span>
                <span className="wbb-mute mt-3 block text-[0.9rem]">
                  Na primeira vez o Windows pode avisar “O Windows protegeu o computador”. Clique em Mais
                  informações → Executar assim mesmo.
                </span>
              </a>
            ) : (
              <div className="wbb-card wbb-card--soon" aria-disabled="true">
                <span className="wbb-card__label">Windows</span>
                <span className="wbb-card__meta">Em breve</span>
              </div>
            )}
            <a href={game.offlineZip} download className="wbb-card">
              <span className="wbb-card__label">Offline</span>
              <span className="wbb-card__meta">.zip · 0,3 MB</span>
              <span className="wbb-mute mt-3 block text-[0.9rem]">
                Abra o index.html com dois cliques; funciona sem internet.
              </span>
            </a>
            <PlayButton targetId={GAME_ID} className="wbb-card">
              <span className="wbb-card__label">Navegador</span>
              <span className="wbb-card__meta">Sem instalar nada</span>
              <span className="wbb-mute mt-3 block text-[0.9rem]">Jogue aqui mesmo, nesta página.</span>
            </PlayButton>
          </div>
        </div>
      </section>

      {/* 6 · Controles */}
      <section className="wbb-section" aria-labelledby="wbb-controles">
        <div className="wrap">
          <h2 id="wbb-controles" className="wbb-h2">
            Controles
          </h2>
          <table className="wbb-table mt-6">
            <thead>
              <tr>
                <th scope="col">Tecla</th>
                <th scope="col">Ação</th>
              </tr>
            </thead>
            <tbody>
              {game.controls.map((c) => (
                <tr key={c.keys}>
                  <td>
                    <kbd>{c.keys}</kbd>
                  </td>
                  <td>{c.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7 · Créditos */}
      <section className="wbb-section wbb-credits">
        <div className="wrap">
          <p className="wbb-mute text-[0.95rem]">
            Um jogo de jvseki dev · Instagram{" "}
            <a href={game.instagram.url} target="_blank" rel="noopener noreferrer" className="wbb-link">
              {game.instagram.handle}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
