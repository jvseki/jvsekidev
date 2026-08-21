"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

const MAX_TILT_DEG = 6;
const TOUCH_DECAY_MS = 400;

/**
 * Tilt + glare unificado para mouse e touch via Pointer Events — mesmo
 * código para os dois, como pedido: pointermove/pointerdown/pointerup,
 * nunca handlers separados de mouse e touch.
 *
 * Mouse/caneta: segue o ponteiro em tempo real, some no pointerleave.
 * Touch: dispara no toque (pointerdown) e decai sozinho em 400ms —
 * não há "arrastar" contínuo num card de conteúdo.
 *
 * Desligado inteiro sob prefers-reduced-motion.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const decayTimeout = useRef<number>();
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => window.clearTimeout(decayTimeout.current);
  }, []);

  function apply(clientX: number, clientY: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const px = (clientX - rect.left) / rect.width;
    const py = (clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 2 * MAX_TILT_DEG;
    const rotateX = -(py - 0.5) * 2 * MAX_TILT_DEG;
    el.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
    el.style.setProperty("--glare-x", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--glare-y", `${(py * 100).toFixed(1)}%`);
    el.style.setProperty("--glare-o", "1");
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--glare-o", "0");
  }

  return {
    ref,
    tiltHandlers: {
      onPointerMove(e: ReactPointerEvent) {
        if (reduceMotion.current || e.pointerType === "touch") return;
        apply(e.clientX, e.clientY);
      },
      onPointerLeave(e: ReactPointerEvent) {
        // Touch fires pointerleave right after pointerup (no persistent hover) —
        // the 400ms decay timer owns the reset there, not this handler.
        if (reduceMotion.current || e.pointerType === "touch") return;
        reset();
      },
      onPointerDown(e: ReactPointerEvent) {
        if (reduceMotion.current || e.pointerType !== "touch") return;
        apply(e.clientX, e.clientY);
        window.clearTimeout(decayTimeout.current);
        decayTimeout.current = window.setTimeout(reset, TOUCH_DECAY_MS);
      },
    },
  };
}
