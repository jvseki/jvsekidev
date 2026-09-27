"use client";

import { MotionConfig } from "framer-motion";

/**
 * reducedMotion="user": sob prefers-reduced-motion, o framer pula
 * animações de transform/layout sozinho (opacidade continua) — cobre
 * de uma vez todos os motion.* do site sem cada componente checar.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
