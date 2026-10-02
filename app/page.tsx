import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/Button";
import { CapabilityCard } from "@/components/CapabilityCard";
import { FeaturedGame } from "@/components/game/FeaturedGame";
import { HeroBackdrop } from "@/components/fx/HeroBackdrop";
import { Marquee } from "@/components/fx/Marquee";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { ScrollRevealText } from "@/components/fx/ScrollRevealText";
import { SplitWords } from "@/components/fx/SplitWords";
import { StepsTimeline } from "@/components/fx/StepsTimeline";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { capabilities, howWeWork, skills, timelines } from "@/lib/content";
import { whatBitesBelow } from "@/lib/games";
import { waLink, waMessages } from "@/lib/site";

// three.js + fiber + drei são pesados demais pra ir no bundle inicial —
// carrega só no cliente, sob demanda. Nunca roda no servidor (WebGL não
// existe lá) e o próprio HeroScene já lida com o fallback estático
// enquanto isto carrega.
const HeroScene = dynamic(() => import("@/components/hero/HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => (
    <Image
      src="/brand/logo-chrome.jpg"
      alt=""
      width={460}
      height={460}
      priority
      className="h-full w-full object-contain"
    />
  ),
});

export default function HomePage() {
  return (
    <>
      {/* 01 · HERO — fundo #050506 com grid de pontos que acende em volta
          do ponteiro, headline entrando palavra por palavra, J cromado em
          WebGL à direita. */}
      <section className="relative -mt-[72px] overflow-hidden pt-[72px]">
        <HeroBackdrop />
        <div className="wrap relative grid gap-10 py-14 md:min-h-[calc(100svh-72px)] md:grid-cols-2 md:items-center md:gap-12 md:py-24">
          <div>
            <Reveal transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              {/* Chamada pro jogo logo no topo — o "Atendimento remoto ·
                  Brasil" que ficava aqui continua no botão do header. */}
              <Link href={whatBitesBelow.path} className="status-pill status-pill--game">
                <span className="status-dot" aria-hidden="true" />
                <span>
                  <span className="text-ink">Novo:</span> {whatBitesBelow.name} — jogue grátis
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
            <h1 className="type-display mt-6 max-w-[16ch] text-[clamp(2.1rem,8vw,3.75rem)] leading-[1.08]">
              <SplitWords text="Sistemas sob medida," delay={0.1} />{" "}
              <SplitWords text="do banco ao deploy." delay={0.3} whole innerClassName="text-shine" />
            </h1>
            <Reveal delay={0.55} transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <p className="mt-5 max-w-[38ch] text-[1.05rem] text-mute md:mt-6">
                Desenvolvedor back-end Python. Freelance, remoto, para todo o Brasil.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-9">
                <Button
                  variant="chrome"
                  href={waLink(waMessages.hero)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  Falar sobre seu projeto →
                </Button>
                <Button variant="ghost" href="/projetos" className="w-full sm:w-auto">
                  Ver projetos
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Bloco próprio, em opacidade plena, tanto no mobile quanto no
              desktop — antes o mobile jogava o canvas como marca d'água
              atrás do texto (opacity 0.22) e o J praticamente sumia. Sem
              sobreposição com o texto, não tem risco de contraste, e o
              conteúdo crítico (headline/CTA) continua vindo primeiro no
              DOM — o canvas pesado só entra depois, sem afetar LCP. */}
          <div className="relative mx-auto aspect-square w-full max-w-[360px] md:mx-0 md:aspect-auto md:h-full md:max-w-none">
            <HeroScene />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden flex-col items-center gap-3 md:flex" aria-hidden="true">
          <span className="eyebrow text-[0.65rem]">Role</span>
          <span className="scroll-cue" />
        </div>
      </section>

      {/* Destaque do jogo — primeira coisa depois do hero */}
      <FeaturedGame />

      {/* Faixa da stack */}
      <section className="border-t border-stroke py-8 md:py-10">
        <Marquee items={skills} />
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

          <StepsTimeline steps={howWeWork} />

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

      {/* CTA final — frase gigante que acende palavra por palavra com o scroll */}
      <section className="relative overflow-hidden border-t border-stroke py-[var(--space-section)]">
        <div className="wrap">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-6 bg-mute" aria-hidden="true" />
            <ScrambleText text="Próximo passo" />
          </p>
          <ScrollRevealText
            as="h2"
            text="Tem um sistema em mente? Vamos conversar sobre ele."
            className="type-display mt-5 max-w-[18ch] text-[clamp(2.2rem,7vw,5.5rem)] leading-[1.02]"
          />
          <Reveal className="mt-10 flex flex-wrap gap-3">
            <Button variant="chrome" href={waLink(waMessages.hero)} target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp →
            </Button>
            <Button variant="ghost" href="/projetos">
              Ver projetos
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
