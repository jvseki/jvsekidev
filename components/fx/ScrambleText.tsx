"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_#$%&*+=";
const DURATION_MS = 900;

type ScrambleTextProps = {
  text: string;
  className?: string;
};

/**
 * Efeito "decode": ao entrar na viewport, os caracteres passam por
 * glifos aleatórios e vão travando da esquerda pra direita no texto
 * real. Roda uma vez só. O SSR já entrega o texto final (sem flash de
 * lixo pra quem não tem JS nem pra crawler) e reduced-motion pula tudo.
 */
export function ScrambleText({ text, className = "" }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          const locked = Math.floor(progress * text.length);
          let out = "";
          for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            out += i < locked || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          setDisplay(out);
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "-40px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <span ref={ref} aria-label={text} role="text" className={className}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
