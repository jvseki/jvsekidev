"use client";

import { useLayoutEffect, useState } from "react";

/**
 * Mesma estratégia do <Reveal>: o primeiro render (o que bate com o HTML
 * do servidor na hidratação) sempre assume "com movimento", e a correção
 * pra reduced-motion acontece no layout effect, antes do navegador
 * pintar — sem flash e sem hydration mismatch. Não usar o
 * useReducedMotion do framer direto em markup renderizado no servidor.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduce;
}
