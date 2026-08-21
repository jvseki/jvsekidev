"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";

export type PointerRigState = {
  nx: number; // -1..1
  ny: number; // -1..1
  isTouch: boolean;
  dragging: boolean;
};

/**
 * Estado de ponteiro compartilhado com a cena R3F via ref (sem re-render
 * React a cada pointermove — quem lê isso é o useFrame do PointerRig).
 *
 * Mouse/caneta: nx/ny seguem o ponteiro o tempo todo (hover).
 * Touch: só atualiza enquanto "dragging" (pointerdown até pointerup) —
 * solta e o Rig faz a rotação voltar sozinha ao repouso.
 */
export function usePointerRig() {
  const state = useRef<PointerRigState>({ nx: 0, ny: 0, isTouch: false, dragging: false });

  function toNormalized(e: ReactPointerEvent) {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    return { nx, ny };
  }

  const handlers = {
    onPointerMove(e: ReactPointerEvent) {
      const touch = e.pointerType === "touch";
      state.current.isTouch = touch;
      if (touch && !state.current.dragging) return;
      const { nx, ny } = toNormalized(e);
      state.current.nx = nx;
      state.current.ny = ny;
    },
    onPointerDown(e: ReactPointerEvent) {
      const touch = e.pointerType === "touch";
      state.current.isTouch = touch;
      if (touch) {
        state.current.dragging = true;
        const { nx, ny } = toNormalized(e);
        state.current.nx = nx;
        state.current.ny = ny;
      }
    },
    onPointerUp() {
      state.current.dragging = false;
    },
    onPointerCancel() {
      state.current.dragging = false;
    },
    onPointerLeave() {
      if (!state.current.isTouch) {
        state.current.nx = 0;
        state.current.ny = 0;
      }
    },
  };

  return { pointerState: state, handlers };
}
