"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { useEffect, useRef } from "react";

type ButtonProps = HTMLMotionProps<"a"> & {
  variant?: "chrome" | "ghost";
};

const MAGNET_RADIUS = 80;
const MAGNET_MAX_OFFSET = 8;
const SPRING = { stiffness: 300, damping: 20, mass: 0.5 };

/**
 * CTA compartilhado. `variant="chrome"` é o único lugar (além do logo e dos
 * numerais de seção) onde o gradiente cromado pode aparecer — e mesmo assim
 * só no traço, nunca preenchendo o botão.
 *
 * Magnetic: desloca até 8px em direção ao ponteiro dentro de 80px, volta
 * com spring ao sair. Desligado sob prefers-reduced-motion e em telas sem
 * hover (touch) — lá o efeito não faz sentido de qualquer forma.
 */
export function Button({ variant = "ghost", className = "", children, ...props }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (reduceMotion || !canHover) return;

    function onPointerMove(e: PointerEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < MAGNET_RADIUS) {
        const pull = (1 - dist / MAGNET_RADIUS) * MAGNET_MAX_OFFSET;
        const nx = dist === 0 ? 0 : dx / dist;
        const ny = dist === 0 ? 0 : dy / dist;
        x.set(nx * pull);
        y.set(ny * pull);
      } else {
        x.set(0);
        y.set(0);
      }
    }

    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [x, y]);

  const base = variant === "chrome" ? "btn btn-chrome" : "btn btn-ghost";

  return (
    <motion.a
      ref={ref}
      className={`${base} ${className}`.trim()}
      style={{ x: springX, y: springY }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
