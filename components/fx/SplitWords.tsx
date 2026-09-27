"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type SplitWordsProps = {
  text: string;
  className?: string;
  /** Classe aplicada no span que de fato anima (cada palavra, ou o bloco inteiro com `whole`). */
  innerClassName?: string;
  /** Atraso antes da primeira palavra, em segundos. */
  delay?: number;
  stagger?: number;
  /**
   * Anima o texto como uma peça só. Necessário quando o texto usa
   * background-clip: text (ex.: .text-shine) — o Chrome não pinta o
   * fundo recortado através de filhos com transform/filter próprios.
   */
  whole?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Cada palavra sobe de dentro de uma máscara (overflow hidden) com um
 * leve blur saindo — o texto inteiro continua no HTML do servidor, então
 * SEO e leitores de tela veem a frase normal (aria-label no wrapper,
 * spans visuais aria-hidden).
 */
export function SplitWords({
  text,
  className = "",
  innerClassName = "",
  delay = 0,
  stagger = 0.07,
  whole = false,
}: SplitWordsProps) {
  const reduceMotion = usePrefersReducedMotion();
  const words = whole ? [text] : text.split(" ");

  return (
    <span aria-label={text} role="text" className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block max-w-full overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block max-w-full will-change-transform ${innerClassName}`.trim()}
            initial={reduceMotion ? false : { y: "105%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
