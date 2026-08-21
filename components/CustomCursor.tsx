"use client";

import { useEffect, useRef } from "react";

/**
 * Anel de 1px que cresce e inverte pra branco sólido sobre clicáveis.
 * Desktop only — some completamente em touch. Desligado sob
 * prefers-reduced-motion (é, no fim das contas, um efeito de movimento).
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduceMotion || isTouch) return;

    const el = ref.current;
    if (!el) return;

    document.documentElement.classList.add("has-custom-cursor");

    function onPointerMove(e: PointerEvent) {
      if (!el) return;
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const target = e.target as Element | null;
      const active = !!target?.closest?.("a, button, [data-tilt], input, textarea");
      el.setAttribute("data-active", active ? "true" : "false");
    }

    function onPointerLeaveWindow() {
      el?.style.setProperty("opacity", "0");
    }

    function onPointerEnterWindow() {
      el?.style.setProperty("opacity", "1");
    }

    window.addEventListener("pointermove", onPointerMove);
    document.documentElement.addEventListener("mouseleave", onPointerLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onPointerEnterWindow);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onPointerEnterWindow);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return <div ref={ref} className="custom-cursor" style={{ opacity: 0 }} aria-hidden="true" />;
}
