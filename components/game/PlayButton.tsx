"use client";

type PlayButtonProps = {
  targetId: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Rola até o jogo embutido e já inicia — um clique em vez de dois.
 * Dispara o clique no botão da capa (se ainda estiver lá) em vez de
 * compartilhar estado com o <GameEmbed>, que fica em outra seção.
 */
export function PlayButton({ targetId, className = "", children }: PlayButtonProps) {
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    target.querySelector<HTMLButtonElement>(".wbb-play-cover")?.click();
  }

  return (
    <a href={`#${targetId}`} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
