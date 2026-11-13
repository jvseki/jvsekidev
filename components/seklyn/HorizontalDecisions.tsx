"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { GlowCard } from "./GlowCard";

type Decision = { n: string; title: string; body: string };

function Card({ d }: { d: Decision }) {
  return (
    <GlowCard className="flex h-full flex-col p-7 md:p-8">
      <span className="sk-title sk-grad text-[3.2rem] leading-none">{d.n}</span>
      <h3 className="sk-title mt-6 text-[1.45rem]">{d.title}</h3>
      <p className="sk-mute mt-3 text-[1rem] leading-relaxed">{d.body}</p>
    </GlowCard>
  );
}

/**
 * Desktop (lg+): a seção prende na tela e a rolagem vertical vira
 * deslocamento horizontal dos cards. Mobile: carrossel nativo de arrastar
 * (scroll-snap) — no toque, arrastar de lado é o gesto natural; sequestrar
 * o scroll vertical ali só atrapalha.
 */
export function HorizontalDecisions({ items, heading }: { items: readonly Decision[]; heading: React.ReactNode }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 48));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <>
      {/* desktop */}
      <div ref={section} className="relative hidden lg:block" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="wrap">{heading}</div>
          <motion.div ref={track} style={{ x }} className="mt-12 flex gap-6 pl-[max(1.5rem,calc((100vw-1200px)/2))] pr-24">
            {items.map((d) => (
              <div key={d.n} className="w-[400px] flex-shrink-0">
                <Card d={d} />
              </div>
            ))}
          </motion.div>
          <div className="wrap mt-10">
            <div className="h-px w-full bg-[color:var(--sk-line)]">
              <motion.div className="h-px origin-left" style={{ scaleX: bar, background: "var(--sk-v400)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* mobile / tablet */}
      <div className="wrap lg:hidden">
        {heading}
        <div className="sk-snap mt-8 pb-2">
          {items.map((d) => (
            <div key={d.n}>
              <Card d={d} />
            </div>
          ))}
        </div>
        <p className="sk-mute mt-3 text-[0.82rem]">Arraste para o lado →</p>
      </div>
    </>
  );
}
