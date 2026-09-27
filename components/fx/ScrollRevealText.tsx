"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type ScrollRevealTextProps = {
  text: string;
  className?: string;
  as?: "p" | "h2";
};

function Word({
  word,
  progress,
  range,
  still,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span aria-hidden="true" className="inline-block" style={{ opacity: still ? 1 : opacity }}>
      {word}
      {" "}
    </motion.span>
  );
}

/**
 * Frase grande que "acende" palavra por palavra conforme a seção
 * atravessa a viewport — cada palavra ganha sua fatia do progresso do
 * scroll. Sob reduced-motion, texto cheio direto.
 */
export function ScrollRevealText({ text, className = "", as: Tag = "p" }: ScrollRevealTextProps) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] });
  const words = text.split(" ");

  return (
    <Tag ref={ref} aria-label={text} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          still={reduceMotion}
        />
      ))}
    </Tag>
  );
}
