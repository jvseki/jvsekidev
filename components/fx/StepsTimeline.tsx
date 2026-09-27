"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { HowWeWorkStep } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

function Step({
  step,
  index,
  total,
  progress,
  still,
}: {
  step: HowWeWorkStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  still: boolean;
}) {
  // Cada etapa preenche o próprio traço na sua fatia do progresso — em
  // 4 colunas vira uma linha única correndo da esquerda pra direita, e
  // empilhado no mobile vira uma sequência de cima pra baixo. Mesmo código.
  const fill = useTransform(progress, [index / total, (index + 1) / total], [0, 1]);
  const textOpacity = useTransform(progress, [index / total, (index + 0.6) / total], [0.35, 1]);

  return (
    <article className="relative pt-5">
      <span className="absolute inset-x-0 top-0 h-px bg-stroke" aria-hidden="true" />
      <motion.span
        className="absolute inset-x-0 top-0 h-px origin-left bg-ink"
        style={{ scaleX: still ? 1 : fill }}
        aria-hidden="true"
      />
      <motion.div style={{ opacity: still ? 1 : textOpacity }}>
        <p className="numeral-chrome text-[1.35rem]">{step.n}</p>
        <h3 className="type-display mt-3 text-[1.05rem]">{step.title}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">{step.body}</p>
      </motion.div>
    </article>
  );
}

/** "Como trabalho" com uma linha de progresso que corre pelas etapas conforme o scroll. */
export function StepsTimeline({ steps }: { steps: HowWeWorkStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });

  return (
    <div ref={ref} className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {steps.map((step, i) => (
        <Step
          key={step.n}
          step={step}
          index={i}
          total={steps.length}
          progress={scrollYProgress}
          still={reduceMotion}
        />
      ))}
    </div>
  );
}
