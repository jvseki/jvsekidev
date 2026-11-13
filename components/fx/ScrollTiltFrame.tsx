"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Moldura que "levanta" conforme entra na tela: começa inclinada pra trás
 * e menor, e assenta reta quando chega no meio da viewport. Mesmo efeito
 * no desktop e no celular (só transform — barato pra GPU).
 */
export function ScrollTiltFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 0.55"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const rotateX = useTransform(p, [0, 1], [22, 0]);
  const scale = useTransform(p, [0, 1], [0.86, 1]);
  const y = useTransform(p, [0, 1], [60, 0]);
  const opacity = useTransform(p, [0, 0.4], [0.3, 1]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      <motion.div style={reduce ? undefined : { rotateX, scale, y, opacity, transformOrigin: "50% 100%" }}>
        {children}
      </motion.div>
    </div>
  );
}
