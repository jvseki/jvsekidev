"use client";

import { useState } from "react";

type YouTubeEmbedProps = {
  id: string;
  title: string;
  /** Imagem de capa até o clique (a thumbnail do jogo combina mais que a do YouTube). */
  poster: string;
  className?: string;
};

/**
 * Embed "leve": até o clique é só uma imagem com botão de play — o player
 * do YouTube (~1 MB de JS + cookies de terceiros) só carrega quando a
 * pessoa quer assistir. Domínio youtube-nocookie.com, sem rastreio antes
 * do play.
 */
export function YouTubeEmbed({ id, title, poster, className = "" }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`wbb-frame ${className}`.trim()}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="wbb-play-cover" aria-label={`Assistir: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- pixel art: sem reamostragem do next/image */}
          <img src={poster} alt="" loading="lazy" className="wbb-pixel absolute inset-0 h-full w-full object-cover" />
          <span className="wbb-play-btn">▶ Trailer</span>
        </button>
      )}
    </div>
  );
}
