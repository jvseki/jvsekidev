import React from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GRAD_TEXT, INTER, SHADOW_BIG, SK } from "./theme";
import {
  ALUNO_TOTAL_SERIES,
  AdesaoCard,
  Backdrop,
  Button,
  ChatLink,
  CheckList,
  DashboardFicha,
  HeroHalter,
  Pill,
  PhoneAluno,
  SeklynMark,
  Words,
  Wordmark,
  clamp,
  prog,
} from "./ui";

/**
 * Vídeo de divulgação da Seklyn, no visual real de seklyn.com.br (tema
 * claro, roxo, piso quadriculado, halter do hero). O mesmo componente
 * renderiza 16:9 e 9:16 — a orientação vem do tamanho da composição.
 */

export const SCENES = {
  intro: { from: 0, dur: 84 },
  hero: { from: 84, dur: 135 },
  problema: { from: 219, dur: 114 },
  ficha: { from: 333, dur: 141 },
  link: { from: 474, dur: 120 },
  aluno: { from: 594, dur: 150 },
  adesao: { from: 744, dur: 126 },
  cta: { from: 870, dur: 126 },
} as const;
export const PROMO_DURATION = SCENES.cta.from + SCENES.cta.dur;

function useVertical() {
  const { width, height } = useVideoConfig();
  return height > width;
}

function Scene({ dur, children, last = false }: { dur: number; children: React.ReactNode; last?: boolean }) {
  const frame = useCurrentFrame();
  const inP = prog(frame, 0, 14);
  const outP = last ? 0 : prog(frame, dur - 12, dur);
  const opacity = inP * (1 - outP);
  const scale = 0.97 + inP * 0.03 + outP * 0.04;
  return <AbsoluteFill style={{ opacity, transform: `scale(${scale})`, filter: `blur(${outP * 10}px)` }}>{children}</AbsoluteFill>;
}

function Split({ text, visual, reverse = false }: { text: React.ReactNode; visual: React.ReactNode; reverse?: boolean }) {
  const vertical = useVertical();
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: vertical ? "column" : reverse ? "row-reverse" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: vertical ? 60 : 90,
        padding: vertical ? "140px 70px 110px" : "0 120px",
      }}
    >
      <div style={{ flex: vertical ? "0 0 auto" : "1 1 0", width: vertical ? "100%" : undefined }}>{text}</div>
      <div style={{ flex: vertical ? "1 1 0" : "1.25 1 0", display: "flex", alignItems: "center", justifyContent: "center", width: vertical ? "100%" : undefined, minHeight: 0 }}>
        {visual}
      </div>
    </AbsoluteFill>
  );
}

function StepText({ n, title, body, highlight }: { n: string; title: string; body: string; highlight?: string[] }) {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  return (
    <div style={{ fontFamily: INTER, color: SK.text }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: prog(frame, 2, 14) }}>
        <span
          style={{
            width: 52,
            height: 52,
            borderRadius: 99,
            display: "grid",
            placeItems: "center",
            background: `linear-gradient(135deg, ${SK.v600}, ${SK.v800})`,
            color: "white",
            fontWeight: 800,
            fontSize: 24,
            boxShadow: "0 8px 20px rgba(124,58,237,0.35)",
          }}
        >
          {n}
        </span>
        <span style={{ fontSize: 24, fontWeight: 700, color: SK.v700, letterSpacing: "0.02em" }}>Como funciona</span>
      </div>
      <Words
        text={title}
        start={6}
        highlight={highlight}
        style={{ marginTop: 28, fontSize: vertical ? 90 : 80, fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.045em" }}
      />
      <p
        style={{
          marginTop: 24,
          fontSize: vertical ? 36 : 31,
          lineHeight: 1.42,
          color: SK.body,
          fontWeight: 500,
          maxWidth: 680,
          opacity: prog(frame, 22, 38),
          transform: `translateY(${(1 - prog(frame, 22, 38)) * 16}px)`,
        }}
      >
        {body}
      </p>
    </div>
  );
}

/* ------------------------------- cenas ------------------------------- */

function Intro() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vertical = useVertical();
  const spin = spring({ frame, fps, config: { damping: 15, stiffness: 70 } });
  const shine = interpolate(frame, [26, 58], [0, 1], clamp);
  const wm = prog(frame, 24, 44);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", fontFamily: INTER }}>
      <div style={{ perspective: 1200 }}>
        <div style={{ transform: `rotateY(${(1 - spin) * -150}deg) scale(${0.55 + spin * 0.45})`, opacity: interpolate(spin, [0, 0.2], [0, 1], clamp) }}>
          <SeklynMark size={vertical ? 300 : 270} shine={shine} glow={0.35} />
        </div>
      </div>
      <div style={{ marginTop: 34, opacity: wm, transform: `translateY(${(1 - wm) * 30}px)` }}>
        <Wordmark size={vertical ? 150 : 140} />
      </div>
      <div style={{ marginTop: 22, opacity: prog(frame, 40, 56) }}>
        <Pill style={{ fontSize: vertical ? 30 : 27 }}>Feito para Personal Trainers</Pill>
      </div>
    </AbsoluteFill>
  );
}

/** Recria o topo de seklyn.com.br: headline + halter 3D + chips. */
function Hero() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vertical = useVertical();
  const enter = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 80 } });
  const chips = interpolate(frame, [30, 70], [0, 1], clamp);
  const text = (
    <div style={{ fontFamily: INTER }}>
      <Words
        text="Saiba exatamente quais séries seus alunos treinaram e quais eles pularam"
        start={8}
        stagger={2}
        highlightIdx={[2, 3]}
        style={{ fontSize: vertical ? 84 : 76, fontWeight: 600, lineHeight: 1.06, letterSpacing: "-0.04em", maxWidth: vertical ? 940 : 820 }}
      />
      <p style={{ marginTop: 26, fontSize: vertical ? 34 : 29, lineHeight: 1.45, color: SK.body, fontWeight: 500, maxWidth: 760, opacity: prog(frame, 40, 58) }}>
        O Seklyn acompanha a execução dos treinos série por série e gera um link único pra cada aluno acessar sem senha.
      </p>
    </div>
  );
  return <Split text={text} visual={<HeroHalter size={vertical ? 780 : 640} enter={enter} chips={chips} />} />;
}

function Problema() {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  const fix = prog(frame, 70, 86);
  return (
    <AbsoluteFill
      style={{
        alignItems: vertical ? "flex-start" : "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: vertical ? "0 80px" : "0 160px",
        fontFamily: INTER,
        textAlign: vertical ? "left" : "center",
      }}
    >
      <Words
        text="Você monta o treino e manda no WhatsApp."
        style={{ fontSize: vertical ? 80 : 74, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.08, justifyContent: vertical ? "flex-start" : "center", color: SK.mute, maxWidth: 1400 }}
      />
      <Words
        text="E nunca sabe se o aluno fez."
        start={32}
        highlight={["nunca"]}
        style={{ marginTop: 30, fontSize: vertical ? 104 : 100, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1.04, justifyContent: vertical ? "flex-start" : "center" }}
      />
      <div style={{ marginTop: 40, opacity: fix, transform: `translateY(${(1 - fix) * 14}px)` }}>
        <Pill style={{ fontSize: vertical ? 34 : 30 }}>Sem planilhas. Cada série marcada vira dado.</Pill>
      </div>
    </AbsoluteFill>
  );
}

function Ficha() {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  const rows = interpolate(frame, [26, 110], [0, 4.4], clamp);
  const enter = prog(frame, 4, 30);
  return (
    <Split
      text={<StepText n="1" title="Monte o treino." body="Cadastre o aluno e monte os treinos com exercícios, séries e repetições." highlight={["treino."]} />}
      visual={
        <div style={{ transform: `translateY(${(1 - enter) * 60}px) rotate(${(1 - enter) * 2}deg)`, opacity: enter }}>
          <DashboardFicha rows={rows} scale={vertical ? 0.9 : 0.94} />
        </div>
      }
    />
  );
}

function Link() {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  const p = interpolate(frame, [14, 100], [0, 1], clamp);
  const tap = interpolate(frame, [64, 84], [0, 1], clamp);
  return (
    <Split
      reverse
      text={<StepText n="2" title="Envie o link." body="Compartilhe o link único do aluno por WhatsApp — sem senha pra lembrar, sem app pra baixar." highlight={["link."]} />}
      visual={<ChatLink p={p} tap={tap} scale={vertical ? 1.3 : 1.1} />}
    />
  );
}

function Aluno() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vertical = useVertical();
  const done = interpolate(frame, [20, 128], [0, ALUNO_TOTAL_SERIES], clamp);
  const enter = spring({ frame: frame - 2, fps, config: { damping: 16 } });
  return (
    <Split
      text={<StepText n="3" title="O aluno marca cada série." body="Um treino só conta como feito quando todas as séries foram marcadas. Mobile-first, com uma mão só." highlight={["série."]} />}
      visual={
        <div style={{ transform: `translateY(${(1 - enter) * 200}px)` }}>
          <PhoneAluno done={done} scale={vertical ? 1.28 : 1.0} />
        </div>
      }
    />
  );
}

function Adesao() {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  const p = interpolate(frame, [14, 96], [0, 1], clamp);
  return (
    <Split
      reverse
      text={<StepText n="4" title="Acompanhe." body="Veja em tempo real o que foi treinado e o que ficou pra trás — e ajuste antes do aluno desistir." highlight={["Acompanhe."]} />}
      visual={<AdesaoCard p={p} scale={vertical ? 1.3 : 1.05} />}
    />
  );
}

/** Final = bloco "Pronto para acompanhar seus alunos de verdade?" do site. */
function Cta() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vertical = useVertical();
  const pop = spring({ frame: frame - 2, fps, config: { damping: 15 } });
  const shine = interpolate(frame, [70, 105], [-30, 130], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: INTER }}>
      <div
        style={{
          width: vertical ? 900 : 860,
          padding: vertical ? "70px 64px" : "56px 64px",
          borderRadius: 32,
          background: "white",
          border: `1px solid ${SK.line}`,
          boxShadow: SHADOW_BIG,
          textAlign: "center",
          transform: `translateY(${(1 - pop) * 80}px) scale(${0.92 + pop * 0.08})`,
          opacity: interpolate(pop, [0, 0.3], [0, 1], clamp),
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
          <SeklynMark size={vertical ? 84 : 70} shine={interpolate(frame, [10, 40], [0, 1], clamp)} />
          <Wordmark size={vertical ? 64 : 54} />
        </div>
        <div style={{ fontSize: vertical ? 64 : 56, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.08, color: SK.text, marginTop: 30 }}>
          Pronto para acompanhar seus alunos{" "}
          <span style={{ backgroundImage: GRAD_TEXT, WebkitBackgroundClip: "text", color: "transparent" }}>de verdade?</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 34 }}>
          <div style={{ textAlign: "left" }}>
            <CheckList
              items={["Alunos e treinos ilimitados", "Link de acesso único por aluno", "Analytics de aderência", "Suporte em português"]}
              p={interpolate(frame, [18, 70], [0, 1], clamp)}
              size={vertical ? 1.15 : 1}
            />
          </div>
        </div>
        <div style={{ marginTop: 40, opacity: prog(frame, 56, 72), transform: `translateY(${(1 - prog(frame, 56, 72)) * 20}px)` }}>
          <Button size={vertical ? 1.6 : 1.45} style={{ position: "relative", overflow: "hidden", width: "100%" }}>
            Criar minha conta · seklyn.com.br
            <span
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${shine}%`,
                width: "16%",
                background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.45), transparent)",
                transform: "skewX(-20deg)",
              }}
            />
          </Button>
        </div>
      </div>
    </AbsoluteFill>
  );
}

const ORDER: [keyof typeof SCENES, React.FC][] = [
  ["intro", Intro],
  ["hero", Hero],
  ["problema", Problema],
  ["ficha", Ficha],
  ["link", Link],
  ["aluno", Aluno],
  ["adesao", Adesao],
  ["cta", Cta],
];

export function SeklynPromo() {
  const frame = useCurrentFrame();
  // o piso some nas cenas de interface (deixa o mockup respirar) e volta no fim
  const floor = interpolate(
    frame,
    [SCENES.problema.from - 10, SCENES.problema.from + 10, SCENES.cta.from - 10, SCENES.cta.from + 10],
    [1, 0.35, 0.35, 1],
    clamp,
  );
  return (
    <AbsoluteFill style={{ background: SK.bg }}>
      <Backdrop floor={floor} />
      {ORDER.map(([key, C]) => (
        <Sequence key={key} from={SCENES[key].from} durationInFrames={SCENES[key].dur}>
          <Scene dur={SCENES[key].dur} last={key === "cta"}>
            <C />
          </Scene>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
