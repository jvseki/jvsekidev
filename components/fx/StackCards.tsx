"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export type Principle = {
  n: string;
  title: string;
  body: string;
  proof: { label: string; href: string };
};

function Card({
  p,
  i,
  total,
  progress,
  still,
}: {
  p: Principle;
  i: number;
  total: number;
  progress: MotionValue<number>;
  still: boolean;
}) {
  // Cada card encolhe e escurece um pouco conforme os próximos empilham
  // por cima — o último fica intacto.
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - i) * 0.045]);
  const dim = useTransform(progress, [start, 1], [0, (total - 1 - i) * 0.18]);

  return (
    <div className="sticky" style={{ top: `calc(96px + ${i * 18}px)` }}>
      <motion.article
        style={still ? undefined : { scale, transformOrigin: "50% 0%" }}
        className="panel relative mb-6 overflow-hidden p-7 md:mb-10 md:grid md:min-h-[44vh] md:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] md:items-center md:gap-10 md:p-12"
      >
        <p className="numeral-chrome text-[clamp(4rem,12vw,9rem)] leading-[0.85]">{p.n}</p>
        <div className="mt-6 md:mt-0">
          <h3 className="type-display text-[clamp(1.5rem,3.4vw,2.4rem)] leading-[1.1]">{p.title}</h3>
          <p className="mt-4 max-w-[52ch] text-[1.02rem] leading-relaxed text-mute">{p.body}</p>
          <Link
            href={p.proof.href}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-stroke underline-offset-4 transition-colors hover:decoration-ink"
          >
            {p.proof.label} →
          </Link>
        </div>
        {!still && <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: dim }} />}
      </motion.article>
    </div>
  );
}

/**
 * Princípios em cards que grudam no topo e empilham com a rolagem.
 * Só CSS sticky + transform: funciona igual no desktop e no celular.
 */
export function StackCards({ items }: { items: Principle[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.2", "end end"] });

  return (
    <div ref={ref} className="relative mt-12">
      {items.map((p, i) => (
        <Card key={p.n} p={p} i={i} total={items.length} progress={scrollYProgress} still={still} />
      ))}
    </div>
  );
}
