"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";

export type RipplePoint = { u: number; v: number };

/**
 * Posições ativas de ponteiro em coordenadas UV (0..1), por pointerId —
 * é isso que dá multi-touch de verdade pro ripple (cada dedo é uma
 * entrada independente no Map). Mouse: atualiza em qualquer pointermove
 * (hover já "molha" a superfície, sem precisar clicar — é ambientação).
 * Touch: só enquanto o dedo está de fato tocando (pointerdown→up).
 */
export function useRipplePointers() {
  const points = useRef<Map<number, RipplePoint>>(new Map());

  function toUV(e: ReactPointerEvent): RipplePoint {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const u = (e.clientX - rect.left) / rect.width;
    const v = 1 - (e.clientY - rect.top) / rect.height;
    return { u, v };
  }

  const handlers = {
    onPointerDown(e: ReactPointerEvent) {
      points.current.set(e.pointerId, toUV(e));
    },
    onPointerMove(e: ReactPointerEvent) {
      if (e.pointerType === "touch" && !points.current.has(e.pointerId)) return;
      points.current.set(e.pointerId, toUV(e));
    },
    onPointerUp(e: ReactPointerEvent) {
      points.current.delete(e.pointerId);
    },
    onPointerCancel(e: ReactPointerEvent) {
      points.current.delete(e.pointerId);
    },
    onPointerLeave(e: ReactPointerEvent) {
      if (e.pointerType !== "touch") points.current.delete(e.pointerId);
    },
  };

  return { points, handlers };
}
