"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline branca no topo da viewport que acompanha a rolagem da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px origin-left bg-ink"
      style={{ scaleX }}
    />
  );
}
