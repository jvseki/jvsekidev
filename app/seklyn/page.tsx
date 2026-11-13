import type { Metadata } from "next";
import { AutoVideo } from "@/components/fx/AutoVideo";
import { ScrollRevealText } from "@/components/fx/ScrollRevealText";
import { ScrollTiltFrame } from "@/components/fx/ScrollTiltFrame";
import { SplitWords } from "@/components/fx/SplitWords";
import { Reveal } from "@/components/Reveal";
import { GlowCard } from "@/components/seklyn/GlowCard";
import { HorizontalDecisions } from "@/components/seklyn/HorizontalDecisions";
import { SeklynSteps } from "@/components/seklyn/SeklynSteps";
import { SeklynBrand } from "@/components/seklyn/SeklynBrand";
import { interFont } from "@/lib/fonts";
import { seklyn, seklynDecisions, seklynFeatures, seklynStack, seklynSteps } from "@/lib/seklyn";
import { pageMetadata } from "@/lib/seo";
import { waLink } from "@/lib/site";
import "@/styles/seklyn.css";

const TITLE = "Seklyn — acompanhamento de treinos para personal trainers";
const DESCRIPTION =
  "Seklyn é o SaaS do João (JVSEKI) para personal trainers: ficha de treino digital, aluno marca série por série por link sem senha, e analytics de aderência. Do banco ao deploy.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: seklyn.path,
    image: { url: seklyn.video.promo.poster, width: 1280, height: 720, alt: "Seklyn — treino acompanhado de verdade" },
  }),
  title: { absolute: TITLE },
};

const waSeklyn = waLink("Olá João, vi a Seklyn no seu site e quero conversar sobre um produto parecido pro meu negócio.");

export default function SeklynPage() {
  return (
    <div className={`sk sk-page overflow-x-clip ${interFont.variable}`}>
      {/* 1 · HERO — mesmo fundo do seklyn.com.br (brilho + piso quadriculado) */}
      <section className="relative overflow-hidden">
        <div className="sk-hero-bg" aria-hidden="true" />
        <div className="wrap relative grid items-center gap-12 py-14 md:py-20 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-4">
                <SeklynBrand size={44} priority />
                <span className="sk-badge">
                  <span className="sk-badge__dot" aria-hidden="true" />
                  Meu produto · SaaS no ar
                </span>
              </div>
            </Reveal>
            <h1 className="sk-title mt-7 text-[clamp(2.5rem,7vw,4.6rem)]">
              <SplitWords text="Treino acompanhado" delay={0.1} />{" "}
              <SplitWords text="de verdade." delay={0.3} whole innerClassName="sk-grad" />
            </h1>
            <Reveal delay={0.45}>
              <p className="sk-body mt-6 max-w-[44ch] text-[1.1rem] font-medium leading-relaxed">{seklyn.pitch}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={seklyn.url} target="_blank" rel="noopener noreferrer" className="sk-btn sk-btn--primary">
                  Conhecer a Seklyn ↗
                </a>
                <a href="#como-funciona" className="sk-btn">
                  Ver como funciona
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.92rem]">
                {["Link sem senha", "Série por série", "Na cor da sua marca"].map((t) => (
                  <li key={t} className="sk-body flex items-center gap-2 font-medium">
                    <span className="text-[color:var(--sk-green)]" aria-hidden="true">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            {/* desktop: 16:9 · celular: 9:16, em tela quase cheia */}
            <div className="sk-frame mx-auto hidden aspect-video w-full md:block">
              <AutoVideo src={seklyn.video.promo.src} poster={seklyn.video.promo.poster} label="Vídeo de apresentação da Seklyn" />
            </div>
            <div className="sk-frame mx-auto aspect-[9/16] w-full max-w-[400px] md:hidden">
              <AutoVideo src={seklyn.video.vertical.src} poster={seklyn.video.vertical.poster} label="Vídeo de apresentação da Seklyn" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 · O PROBLEMA — frase que acende com a rolagem */}
      <section className="sk-section">
        <div className="wrap">
          <p className="sk-eyebrow">O problema</p>
          <ScrollRevealText
            as="h2"
            text="O personal monta o treino, manda no WhatsApp… e nunca sabe se o aluno fez. A Seklyn transforma cada série marcada em dado."
            className="sk-title mt-5 max-w-[22ch] text-[clamp(2rem,5.6vw,4.4rem)]"
          />
        </div>
      </section>

      {/* 3 · COMO FUNCIONA — sticky storytelling */}
      <section id="como-funciona" className="sk-section scroll-mt-16">
        <div className="wrap">
          <Reveal>
            <p className="sk-eyebrow">Como funciona</p>
            <h2 className="sk-h2 mt-4 max-w-[20ch]">
              Do treino que você monta até o aluno marcando <span className="sk-grad">a última série.</span>
            </h2>
          </Reveal>
          <div className="mt-10 lg:mt-4">
            <SeklynSteps steps={seklynSteps} />
          </div>
        </div>
      </section>

      {/* 4 · RECURSOS */}
      <section className="sk-section sk-section--alt">
        <div className="wrap">
          <Reveal>
            <p className="sk-eyebrow">Recursos</p>
            <h2 className="sk-h2 mt-4 max-w-[22ch]">Sem planilha, sem grupo de WhatsApp perdido.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {seklynFeatures.map((f, i) => (
              <Reveal key={f.title} delay={Math.min(i, 5) * 0.06} className="h-full">
                <GlowCard className="h-full p-7">
                  <span className="sk-icon">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-[1.15rem] font-bold tracking-tight">{f.title}</h3>
                  <p className="sk-mute mt-2 leading-relaxed">{f.body}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · POR TRÁS — as decisões (scroll horizontal no desktop) */}
      <section className="relative border-t border-[color:var(--sk-line)] py-[clamp(4.5rem,10vw,8rem)] lg:py-0">
        <HorizontalDecisions
          items={seklynDecisions}
          heading={
            <Reveal>
              <p className="sk-eyebrow">Por trás da Seklyn</p>
              <h2 className="sk-h2 mt-4 max-w-[24ch]">
                Cada detalhe é uma decisão. <span className="sk-grad">Aqui está o porquê.</span>
              </h2>
            </Reveal>
          }
        />
      </section>

      {/* 6 · VERTICAL + STACK */}
      <section className="sk-section overflow-hidden">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Reveal>
              <p className="sk-eyebrow">Construído por mim</p>
              <h2 className="sk-h2 mt-4 max-w-[18ch]">Do banco ao deploy, sem terceirizar nada.</h2>
              <p className="sk-mute mt-5 max-w-[48ch] text-[1.05rem] leading-relaxed">
                Sou o João, dev back-end Python por trás da JVSEKI. A Seklyn é meu produto: modelei o banco, escrevi a
                API, desenhei as telas, configurei servidor, domínio e pagamento — e continuo mantendo e evoluindo com
                o retorno de quem usa.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tecnologias da Seklyn">
                {seklynStack.map((t) => (
                  <li key={t} className="sk-chip">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <ScrollTiltFrame className="mx-auto w-full max-w-[340px]">
            <div className="sk-frame aspect-[9/16] w-full">
              <AutoVideo src={seklyn.video.vertical.src} poster={seklyn.video.vertical.poster} label="Seklyn no formato vertical, para celular" />
            </div>
          </ScrollTiltFrame>
        </div>
      </section>

      {/* 7 · CTA duplo: personal → Seklyn · negócio → João */}
      <section className="sk-section relative overflow-hidden">
        <div className="sk-hero-bg" aria-hidden="true" />
        <div className="wrap relative">
          <ScrollRevealText
            as="h2"
            text="Dois jeitos de continuar daqui."
            className="sk-title max-w-[16ch] text-[clamp(2.2rem,6vw,4.6rem)]"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <GlowCard className="flex h-full flex-col p-8">
                <p className="sk-eyebrow">Você é personal trainer?</p>
                <h3 className="sk-title mt-4 text-[1.7rem]">Acompanhe seus alunos de verdade.</h3>
                <p className="sk-mute mt-3 flex-1 leading-relaxed">
                  Alunos e treinos ilimitados, link único por aluno, analytics de aderência e suporte em português.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href={seklyn.signupUrl} target="_blank" rel="noopener noreferrer" className="sk-btn sk-btn--primary">
                    Criar minha conta ↗
                  </a>
                  <a href={seklyn.url} target="_blank" rel="noopener noreferrer" className="sk-btn">
                    seklyn.com.br
                  </a>
                </div>
              </GlowCard>
            </Reveal>
            <Reveal delay={0.08} className="h-full">
              <GlowCard className="flex h-full flex-col p-8">
                <p className="sk-eyebrow">Tem uma ideia de produto?</p>
                <h3 className="sk-title mt-4 text-[1.7rem]">Eu construo o seu, do mesmo jeito.</h3>
                <p className="sk-mute mt-3 flex-1 leading-relaxed">
                  SaaS, sistema interno, painel, agendamento ou delivery — escopo fechado por escrito, entregas parciais
                  e aplicação no ar com manutenção.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href={waSeklyn} target="_blank" rel="noopener noreferrer" className="sk-btn sk-btn--primary">
                    Falar com o João ↗
                  </a>
                  <a href="/projetos" className="sk-btn">
                    Outros projetos
                  </a>
                </div>
              </GlowCard>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
