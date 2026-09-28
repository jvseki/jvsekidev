"use client";

import { useState } from "react";

type GameEmbedProps = {
  src: string;
  cover: string;
  title: string;
};

/**
 * O jogo só entra na página quando alguém clica em "Jogar" — até lá é
 * só a capa (uma imagem leve). Evita baixar e rodar o bundle do jogo pra
 * quem só veio ler, e garante que o áudio comece a partir de um gesto
 * do usuário (autoplay de som exige isso).
 */
export function GameEmbed({ src, cover, title }: GameEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="wbb-frame">
      {playing ? (
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          // Foco direto no iframe: sem isto o teclado (R, J, Q…) continua
          // indo pra página até a pessoa clicar dentro do jogo.
          onLoad={(e) => e.currentTarget.focus()}
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="wbb-play-cover" aria-label={`Jogar ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- pixel art: sem otimização/reamostragem do next/image */}
          <img src={cover} alt="" className="wbb-pixel absolute inset-0 h-full w-full object-cover" />
          <span className="wbb-play-btn">▶ Jogar</span>
        </button>
      )}
    </div>
  );
}
