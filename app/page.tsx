import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CapabilityCard } from "@/components/CapabilityCard";
import { StepCard } from "@/components/StepCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { capabilities, howWeWork, timelines } from "@/lib/content";
import { waLink, waMessages } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* 01 · HERO — fundo #050506 puro. O canvas WebGL com o "J" cromado
          entra na etapa 4 no lugar da imagem estática abaixo. */}
      <section className="relative overflow-hidden">
        <div className="wrap grid min-h-[68svh] items-center gap-8 py-14 md:min-h-[calc(100svh-72px)] md:grid-cols-2 md:gap-12 md:py-24">
          <Reveal className="relative z-10" transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="type-display max-w-[16ch] text-[clamp(2.1rem,8vw,3.75rem)] leading-[1.08]">
              Sistemas sob medida, do banco ao deploy.
            </h1>
            <p className="mt-5 max-w-[38ch] text-[1.05rem] text-mute md:mt-6">
              Desenvolvedor back-end Python. Freelance, remoto, para todo o Brasil.
            </p>
            <div className="mt-8 md:mt-9">
              <Button
                variant="chrome"
                href={waLink(waMessages.hero)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                Falar sobre seu projeto →
              </Button>
            </div>
          </Reveal>

          {/* Placeholder estático do logo — vira <Canvas> do R3F na etapa 4. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.22] md:static md:opacity-100"
          >
            <Image
              src="/brand/logo-chrome.jpg"
              alt=""
              width={460}
              height={460}
              priority
              className="h-auto w-[68vw] max-w-[420px] rounded-md object-contain md:w-full"
            />
          </div>
        </div>
      </section>

      {/* 02 · O QUE EU CONSTRUO */}
      <section className="border-t border-stroke py-[var(--space-section)]">
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="O que eu construo"
              title="Cinco frentes, um mesmo padrão: funcional do primeiro dia."
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal key={c.n} delay={Math.min(i, 3) * 0.06}>
                <CapabilityCard {...c} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/projetos"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-stroke underline-offset-4 transition-colors hover:decoration-ink"
            >
              Ver os projetos que já estão no ar →
            </Link>
          </div>
        </div>
      </section>

      {/* 04 · COMO TRABALHO */}
      <section className="border-t border-stroke py-[var(--space-section)]">
        <div className="wrap">
          <Reveal>
            <SectionHeading eyebrow="Como trabalho" title="Do primeiro contato à manutenção contínua." />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howWeWork.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.06}>
                <StepCard {...step} />
              </Reveal>
            ))}
          </div>

          <Reveal className="panel mt-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="eyebrow">Prazo médio</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {timelines.map((t) => (
                <p key={t.label} className="text-[0.95rem] text-mute">
                  <span className="text-ink">{t.value}</span> · {t.label}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-stroke py-16">
        <div className="wrap flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="type-display max-w-[24ch] text-[clamp(1.4rem,3vw,1.9rem)]">
            Tem um sistema em mente? Vamos conversar sobre ele.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="chrome" href={waLink(waMessages.hero)} target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp
            </Button>
            <Button variant="ghost" href="/projetos">
              Ver projetos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
