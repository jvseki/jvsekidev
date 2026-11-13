import React from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { INTER, SK } from "./theme";
import {
  ALUNO_TOTAL_SERIES,
  AdesaoCard,
  Backdrop,
  ChatLink,
  DashboardFicha,
  Pill,
  PhoneAluno,
  SeklynMark,
  Words,
  clamp,
  prog,
} from "./ui";

/**
 * Vídeo de divulgação da Seklyn. O mesmo componente renderiza 16:9
 * (página/YouTube) e 9:16 (celular/Reels): a orientação vem do tamanho
 * da composição, cada cena só troca linha por coluna.
 */

export const SCENES = {
  intro: { from: 0, dur: 90 },
  problema: { from: 90, dur: 120 },
  ficha: { from: 210, dur: 150 },
  link: { from: 360, dur: 120 },
  aluno: { from: 480, dur: 150 },
  adesao: { from: 630, dur: 120 },
  cta: { from: 750, dur: 105 },
} as const;
export const PROMO_DURATION = SCENES.cta.from + SCENES.cta.dur;

function useVertical() {
  const { width, height } = useVideoConfig();
  return height > width;
}

/** Entrada/saída de cada cena: fade + leve zoom + blur. */
function Scene({ dur, children, last = false }: { dur: number; children: React.ReactNode; last?: boolean }) {
  const frame = useCurrentFrame();
  const inP = prog(frame, 0, 14);
  const outP = last ? 0 : prog(frame, dur - 12, dur);
  const opacity = inP * (1 - outP);
  const scale = 0.97 + inP * 0.03 + outP * 0.04;
  return (
    <AbsoluteFill style={{ opacity, transform: `scale(${scale})`, filter: `blur(${outP * 10}px)` }}>{children}</AbsoluteFill>
  );
}

/** Layout padrão: texto + mockup. Horizontal lado a lado; vertical empilhado. */
function Split({ text, visual, reverse = false }: { text: React.ReactNode; visual: React.ReactNode; reverse?: boolean }) {
  const vertical = useVertical();
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: vertical ? "column" : reverse ? "row-reverse" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: vertical ? 70 : 90,
        padding: vertical ? "150px 70px 120px" : "0 120px",
      }}
    >
      <div style={{ flex: vertical ? "0 0 auto" : "1 1 0", width: vertical ? "100%" : undefined }}>{text}</div>
      <div
        style={{
          flex: vertical ? "1 1 0" : "1.25 1 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: vertical ? "100%" : undefined,
          minHeight: 0,
        }}
      >
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
      <div style={{ opacity: prog(frame, 2, 14) }}>
        <Pill>
          <span style={{ color: SK.v400 }}>{n}</span>
          <span style={{ width: 1, height: 18, background: SK.lineStrong }} />
          <span>Como funciona</span>
        </Pill>
      </div>
      <Words
        text={title}
        start={6}
        highlight={highlight}
        style={{
          marginTop: 30,
          fontSize: vertical ? 92 : 84,
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: "-0.045em",
        }}
      />
      <p
        style={{
          marginTop: 26,
          fontSize: vertical ? 36 : 32,
          lineHeight: 1.4,
          color: SK.mute,
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
  const pop = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const draw = prog(frame, 8, 40);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", fontFamily: INTER }}>
      <div style={{ transform: `scale(${0.6 + pop * 0.4}) rotate(${(1 - pop) * -12}deg)`, filter: `drop-shadow(0 30px 80px ${SK.v700})` }}>
        <SeklynMark size={vertical ? 240 : 220} draw={draw} dot={spring({ frame: frame - 34, fps, config: { damping: 9 } })} />
      </div>
      <Words
        text="Seklyn"
        start={24}
        stagger={0}
        style={{ marginTop: 40, fontSize: vertical ? 150 : 140, fontWeight: 800, letterSpacing: "-0.05em", color: SK.text }}
      />
      <div style={{ marginTop: 18, opacity: prog(frame, 44, 60) }}>
        <Pill style={{ fontSize: vertical ? 30 : 28 }}>Feito para personal trainers</Pill>
      </div>
    </AbsoluteFill>
  );
}

function Problema() {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  const strike = prog(frame, 70, 86);
  return (
    <AbsoluteFill
      style={{
        alignItems: vertical ? "flex-start" : "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: vertical ? "0 80px" : "0 160px",
        fontFamily: INTER,
        color: SK.text,
        textAlign: vertical ? "left" : "center",
      }}
    >
      <Words
        text="Você monta o treino e manda no WhatsApp."
        start={0}
        style={{
          fontSize: vertical ? 82 : 78,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1.08,
          justifyContent: vertical ? "flex-start" : "center",
          color: SK.mute,
          maxWidth: 1400,
        }}
      />
      <div style={{ position: "relative", marginTop: 36 }}>
        <Words
          text="E nunca sabe se o aluno fez."
          start={34}
          highlight={["nunca"]}
          style={{
            fontSize: vertical ? 104 : 100,
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 1.04,
            justifyContent: vertical ? "flex-start" : "center",
          }}
        />
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: vertical ? 38 : 34,
          color: SK.v300,
          fontWeight: 600,
          opacity: strike,
          transform: `translateY(${(1 - strike) * 14}px)`,
        }}
      >
        A Seklyn resolve isso — série por série.
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
      text={<StepText n="01" title="Você monta a ficha." body="Exercícios, séries, reps e carga pra cada aluno — em poucos minutos, no painel." highlight={["ficha"]} />}
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
      text={<StepText n="02" title="Envia um link. Sem senha." body="Cada aluno tem um link só dele. Abre no celular, sem cadastro e sem baixar app." highlight={["link."]} />}
      visual={<ChatLink p={p} tap={tap} scale={vertical ? 1.3 : 1.1} />}
    />
  );
}

function Aluno() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vertical = useVertical();
  // séries caindo num ritmo de academia: rápido no começo, depois uma por vez
  const done = interpolate(frame, [20, 128], [0, ALUNO_TOTAL_SERIES], clamp);
  const enter = spring({ frame: frame - 2, fps, config: { damping: 16 } });
  return (
    <Split
      text={<StepText n="03" title="O aluno marca cada série." body="Treino só conta como feito quando todas as séries foram marcadas. Com uma mão só, na academia." highlight={["série."]} />}
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
      text={<StepText n="04" title="Você vê quem leva a sério." body="Descubra quais exercícios são pulados e ajuste o plano antes que o aluno desista." highlight={["sério."]} />}
      visual={<AdesaoCard p={p} scale={vertical ? 1.3 : 1.05} />}
    />
  );
}

function Cta() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vertical = useVertical();
  const pop = spring({ frame: frame - 4, fps, config: { damping: 14 } });
  const shine = interpolate(frame, [30, 80], [-30, 130], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", fontFamily: INTER, color: SK.text, textAlign: "center", padding: "0 80px" }}>
      <div style={{ transform: `scale(${pop})` }}>
        <SeklynMark size={vertical ? 170 : 150} />
      </div>
      <Words
        text="Treino acompanhado de verdade."
        start={8}
        highlight={["verdade."]}
        style={{
          marginTop: 40,
          fontSize: vertical ? 96 : 92,
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 1.04,
          justifyContent: "center",
          maxWidth: vertical ? 900 : 1500,
        }}
      />
      <div
        style={{
          marginTop: 50,
          position: "relative",
          overflow: "hidden",
          padding: vertical ? "28px 56px" : "26px 56px",
          borderRadius: 22,
          background: SK.v600,
          fontSize: vertical ? 50 : 46,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          boxShadow: `0 20px 60px rgba(124,58,237,0.55)`,
          opacity: prog(frame, 24, 40),
          transform: `translateY(${(1 - prog(frame, 24, 40)) * 24}px)`,
        }}
      >
        seklyn.com.br
        <span
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${shine}%`,
            width: "18%",
            background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent)",
            transform: "skewX(-20deg)",
          }}
        />
      </div>
      <div style={{ marginTop: 28, fontSize: vertical ? 32 : 28, color: SK.mute, opacity: prog(frame, 40, 56) }}>
        Link sem senha · Série por série · Na cor da sua marca
      </div>
    </AbsoluteFill>
  );
}

export function SeklynPromo() {
  const S = SCENES;
  return (
    <AbsoluteFill style={{ background: SK.bg }}>
      <Backdrop />
      <Sequence from={S.intro.from} durationInFrames={S.intro.dur}>
        <Scene dur={S.intro.dur}>
          <Intro />
        </Scene>
      </Sequence>
      <Sequence from={S.problema.from} durationInFrames={S.problema.dur}>
        <Scene dur={S.problema.dur}>
          <Problema />
        </Scene>
      </Sequence>
      <Sequence from={S.ficha.from} durationInFrames={S.ficha.dur}>
        <Scene dur={S.ficha.dur}>
          <Ficha />
        </Scene>
      </Sequence>
      <Sequence from={S.link.from} durationInFrames={S.link.dur}>
        <Scene dur={S.link.dur}>
          <Link />
        </Scene>
      </Sequence>
      <Sequence from={S.aluno.from} durationInFrames={S.aluno.dur}>
        <Scene dur={S.aluno.dur}>
          <Aluno />
        </Scene>
      </Sequence>
      <Sequence from={S.adesao.from} durationInFrames={S.adesao.dur}>
        <Scene dur={S.adesao.dur}>
          <Adesao />
        </Scene>
      </Sequence>
      <Sequence from={S.cta.from} durationInFrames={S.cta.dur}>
        <Scene dur={S.cta.dur} last>
          <Cta />
        </Scene>
      </Sequence>
    </AbsoluteFill>
  );
}
