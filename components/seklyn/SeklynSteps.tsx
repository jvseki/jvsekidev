"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { AutoVideo } from "@/components/fx/AutoVideo";
import { Reveal } from "@/components/Reveal";
import type { SeklynStep } from "@/lib/seklyn";

function StepBlock({ step, index, active, onActive }: { step: SeklynStep; index: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  // "ativo" = o bloco cruza a faixa central da tela
  const inCenter = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inCenter) onActive(index);
  }, [inCenter, index, onActive]);

  return (
    <div ref={ref} className="relative py-6 lg:flex lg:min-h-[78vh] lg:items-center lg:py-0">
      <Reveal className="w-full">
        {/* celular/tablet: o vídeo vem junto com o passo */}
        <div className="sk-frame mb-7 aspect-square w-full lg:hidden">
          <AutoVideo src={step.video.src} poster={step.video.poster} label={`Animação: ${step.title}`} />
        </div>

        <div className={`transition-opacity duration-500 lg:max-w-[30rem] ${active ? "lg:opacity-100" : "lg:opacity-35"}`}>
          <p className="flex items-center gap-3">
            <span className="sk-icon sk-icon--solid">{index + 1}</span>
            <span className="sk-eyebrow">Passo {index + 1} de 4</span>
          </p>
          <h3 className="sk-title mt-5 text-[clamp(1.8rem,4vw,2.8rem)]">{step.title}</h3>
          <p className="mt-4 text-[1.08rem] leading-relaxed">{step.body}</p>
          <p className="sk-mute mt-3 text-[0.98rem] leading-relaxed">{step.detail}</p>
        </div>
      </Reveal>
    </div>
  );
}

/**
 * "Como funciona" contado pela rolagem.
 * Desktop: texto rola à esquerda, vídeo fica preso (sticky) à direita e
 * troca de cena conforme o passo ativo; a trilha à esquerda enche com o
 * progresso. Mobile: passos empilhados, cada um com seu vídeo.
 */
export function SeklynSteps({ steps }: { steps: SeklynStep[] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  return (
    <div ref={ref} className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
      <div className="relative lg:pl-10">
        {/* trilha de progresso (desktop) */}
        <span className="absolute bottom-[10vh] left-0 top-[10vh] hidden w-px bg-[color:var(--sk-line)] lg:block" aria-hidden="true" />
        <motion.span
          className="absolute bottom-[10vh] left-0 top-[10vh] hidden w-px origin-top lg:block"
          style={{ scaleY: fill, width: 2, background: "linear-gradient(var(--sk-v400), var(--sk-v700))" }}
          aria-hidden="true"
        />
        {steps.map((s, i) => (
          <StepBlock key={s.n} step={s} index={i} active={active === i} onActive={setActive} />
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-[14vh] flex h-[72vh] items-center">
          <div className="sk-frame relative aspect-square w-full">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="absolute inset-0 transition-[opacity,transform] duration-700 ease-standard"
                style={{ opacity: active === i ? 1 : 0, transform: `scale(${active === i ? 1 : 1.04})` }}
                aria-hidden={active !== i}
              >
                <AutoVideo src={s.video.src} poster={s.video.poster} label={`Animação: ${s.title}`} active={active === i} restartOnActive />
              </div>
            ))}
            {/* indicador de cena */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden="true">
              {steps.map((s, i) => (
                <span
                  key={s.n}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ width: active === i ? 28 : 8, background: active === i ? "var(--sk-v600)" : "var(--sk-v100)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
