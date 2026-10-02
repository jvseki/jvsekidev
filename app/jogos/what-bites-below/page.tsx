import type { Metadata } from "next";
import Link from "next/link";
import { GameEmbed } from "@/components/game/GameEmbed";
import { PixelIcon } from "@/components/game/PixelIcon";
import { PlayButton } from "@/components/game/PlayButton";
import { YouTubeEmbed } from "@/components/game/YouTubeEmbed";
import { Reveal } from "@/components/Reveal";
import { whatBitesBelow as game } from "@/lib/games";
import { pageMetadata } from "@/lib/seo";
import { pixelFont } from "@/lib/fonts";
import "@/styles/wbb.css";

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
    <div className={`wbb wbb-page ${pixelFont.variable}`}>
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
              <Link href={game.supportPath} className="wbb-btn">
                ♥ Apoie
              </Link>
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

      {/* 3 · Trailer — YouTube (nocookie), carregado só no clique */}
      <section className="wbb-section" aria-labelledby="wbb-trailer">
        <div className="wrap">
          <h2 id="wbb-trailer" className="wbb-h2">
            Trailer
          </h2>
          <div className="mx-auto mt-6 max-w-[960px]">
            <YouTubeEmbed id={game.trailerYouTubeId} title={`${game.name} — trailer`} poster={game.img.thumbnail} />
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
          <div className="wbb-pc-only mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Windows */}
            {game.windowsZipUrl ? (
              <a href={game.windowsZipUrl} target="_blank" rel="noopener noreferrer" className="wbb-dl">
                <span className="wbb-dl__icon">
                  <PixelIcon name="windows" />
                </span>
                <span className="wbb-dl__title">Windows</span>
                <span className="wbb-dl__tags">
                  <span>.zip</span>
                  <span>166 MB</span>
                  <span>v{game.version}</span>
                </span>
                <span className="wbb-dl__body">
                  Na primeira vez o Windows pode avisar “O Windows protegeu o computador”. Clique em{" "}
                  <b>Mais informações → Executar assim mesmo</b>.
                </span>
                <span className="wbb-dl__cta">↓ Baixar para Windows</span>
              </a>
            ) : (
              <div className="wbb-dl wbb-dl--soon" aria-disabled="true">
                <span className="wbb-dl__ribbon">Em breve</span>
                <span className="wbb-dl__icon">
                  <PixelIcon name="windows" />
                </span>
                <span className="wbb-dl__title">Windows</span>
                <span className="wbb-dl__tags">
                  <span>.zip</span>
                  <span>166 MB</span>
                </span>
                <span className="wbb-dl__body">
                  Versão instalável para PC, com tela cheia nativa. Chegando por aqui em breve.
                </span>
                <span className="wbb-dl__cta">Em breve</span>
              </div>
            )}

            {/* Offline — destaque: é o download disponível agora */}
            <a href={game.offlineZip} download className="wbb-dl wbb-dl--featured">
              <span className="wbb-dl__ribbon">Recomendado</span>
              <span className="wbb-dl__icon">
                <PixelIcon name="floppy" />
              </span>
              <span className="wbb-dl__title">Offline</span>
              <span className="wbb-dl__tags">
                <span>.zip</span>
                <span>0,3 MB</span>
                <span>v{game.version}</span>
              </span>
              <ol className="wbb-dl__steps">
                <li>Baixe e extraia o .zip</li>
                <li>Dois cliques no index.html</li>
                <li>Joga sem internet</li>
              </ol>
              <span className="wbb-dl__cta">↓ Baixar .zip</span>
            </a>

            {/* Navegador */}
            <PlayButton targetId={GAME_ID} className="wbb-dl">
              <span className="wbb-dl__icon">
                <PixelIcon name="browser" />
              </span>
              <span className="wbb-dl__title">Navegador</span>
              <span className="wbb-dl__tags">
                <span>HTML5</span>
                <span>Sem instalar</span>
              </span>
              <span className="wbb-dl__body">
                Jogue aqui mesmo, nesta página. O progresso fica salvo no próprio navegador (3 slots).
              </span>
              <span className="wbb-dl__cta">▶ Jogar agora</span>
            </PlayButton>
          </div>

          <p className="wbb-pc-only wbb-mute mt-6 text-[0.9rem]">
            Curtiu?{" "}
            <Link href={game.supportPath} className="wbb-link">
              Apoie o desenvolvimento com um Pix de qualquer valor
            </Link>
            .
          </p>
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
            </a>{" "}
            · Discord{" "}
            <a href={game.discordUrl} target="_blank" rel="noopener noreferrer" className="wbb-link">
              {game.discordUrl.replace("https://", "")}
            </a>{" "}
            ·{" "}
            <Link href={game.supportPath} className="wbb-link">
              Apoie
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
