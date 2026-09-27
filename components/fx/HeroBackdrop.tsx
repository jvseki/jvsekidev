"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo do hero: um grid de pontos quase invisível que "acende" num raio
 * em volta do ponteiro, mais um halo branco bem difuso. Tudo em CSS —
 * o JS só escreve --mx/--my no elemento (1x por frame, via rAF), sem
 * re-render do React. Em touch/reduced-motion o spot fica parado no
 * centro-direita, atrás do J.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (reduceMotion || !canHover) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    function write() {
      raf = 0;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${x - rect.left}px`);
      el.style.setProperty("--my", `${y - rect.top}px`);
      el.style.setProperty("--spot-o", "1");
    }

    function onPointerMove(e: PointerEvent) {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(write);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="hero-backdrop" aria-hidden="true">
      <div className="hero-backdrop__grid" />
      <div className="hero-backdrop__grid hero-backdrop__grid--lit" />
      <div className="hero-backdrop__halo" />
    </div>
  );
}
