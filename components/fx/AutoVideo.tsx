"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type AutoVideoProps = {
  src: string;
  poster: string;
  label: string;
  className?: string;
  /** Controle externo (ex.: passo ativo no scroll). undefined = toca quando visível. */
  active?: boolean;
  /** Volta pro começo toda vez que fica ativo — pra cada passo "contar a história" de novo. */
  restartOnActive?: boolean;
};

/**
 * <video> mudo em loop que só baixa e toca quando aparece na tela
 * (preload="none" + IntersectionObserver). Fora da tela pausa — economiza
 * bateria e dados no celular. Elemento com display:none nunca intersecta,
 * então versões escondidas por breakpoint nem chegam a baixar.
 * Sob prefers-reduced-motion: não toca sozinho, mostra o poster com controles.
 */
export function AutoVideo({ src, poster, label, className = "", active, restartOnActive = false }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;

    const sync = () => {
      const shouldPlay = visible.current && active !== false;
      if (shouldPlay && v.paused) v.play().catch(() => {});
      if (!shouldPlay && !v.paused) v.pause();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    sync();
    return () => io.disconnect();
  }, [active, reduce]);

  useEffect(() => {
    const v = ref.current;
    if (v && active && restartOnActive && !reduce) {
      try {
        v.currentTime = 0;
      } catch {
        /* metadados ainda não carregados — começa do zero de qualquer jeito */
      }
    }
  }, [active, restartOnActive, reduce]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      controls={reduce}
      className={className}
    />
  );
}
