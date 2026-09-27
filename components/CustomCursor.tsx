"use client";

import { useEffect, useRef } from "react";

const RING_EASE = 0.18;

/**
 * Ponto de 4px colado no ponteiro + anel de 1px que vem atrás com
 * inércia (lerp por frame). Sobre clicáveis o anel cresce e vira um
 * disco em mix-blend difference — inverte o que estiver embaixo, texto
 * incluído. Desktop only — some completamente em touch. Desligado sob
 * prefers-reduced-motion (é, no fim das contas, um efeito de movimento).
 *
 * O loop de rAF só roda enquanto o anel ainda não alcançou o ponteiro;
 * parado, não custa nada.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduceMotion || isTouch) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    document.documentElement.classList.add("has-custom-cursor");

    let tx = -100;
    let ty = -100;
    let rx = tx;
    let ry = ty;
    let raf = 0;

    function loop() {
      rx += (tx - rx) * RING_EASE;
      ry += (ty - ry) * RING_EASE;
      ring!.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (Math.abs(tx - rx) > 0.1 || Math.abs(ty - ry) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    }

    let shown = false;

    function onPointerMove(e: PointerEvent) {
      // mouseenter não dispara se a página já carrega com o mouse dentro
      // dela — o primeiro movimento é que revela o cursor.
      if (!shown) {
        shown = true;
        rx = e.clientX;
        ry = e.clientY;
        setVisible(true);
      }
      tx = e.clientX;
      ty = e.clientY;
      dot!.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      setActive(e.target as Element | null);
      if (!raf) raf = requestAnimationFrame(loop);
    }

    function setActive(target: Element | null) {
      const active = !!target?.closest?.("a, button, [data-tilt], input, textarea");
      ring!.setAttribute("data-active", active ? "true" : "false");
      dot!.setAttribute("data-active", active ? "true" : "false");
    }

    // Rolar com o mouse parado não gera pointermove — sem isto o anel
    // continuaria "ativo" em cima de algo que já saiu de baixo dele.
    let scrollRaf = 0;
    function onScroll() {
      if (!shown || scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        setActive(document.elementFromPoint(tx, ty));
      });
    }

    function onPointerDown() {
      ring!.setAttribute("data-pressed", "true");
    }

    function onPointerUp() {
      ring!.setAttribute("data-pressed", "false");
    }

    function setVisible(v: boolean) {
      ring!.style.opacity = v ? "1" : "0";
      dot!.style.opacity = v ? "1" : "0";
    }

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor" style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  );
}
