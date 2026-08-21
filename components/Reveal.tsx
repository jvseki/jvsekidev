"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useLayoutEffect, useState } from "react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

/**
 * Fade + slide-up ao entrar na viewport, via Framer Motion. Substitui o
 * IntersectionObserver manual do site antigo (.reveal / .is-visible).
 *
 * A checagem de prefers-reduced-motion roda em useLayoutEffect, não no
 * primeiro render: o servidor nunca sabe a preferência do cliente, então
 * o primeiro render (o que o React usa pra bater com o HTML do servidor
 * na hidratação) sempre assume "com movimento". A correção pra
 * reduced-motion acontece antes do navegador pintar o frame — sem
 * flash e sem warning de hydration mismatch.
 */
export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
