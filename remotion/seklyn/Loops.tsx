import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { ALUNO_TOTAL_SERIES, AdesaoCard, Backdrop, ChatLink, DashboardFicha, PhoneAluno, clamp, prog } from "./ui";

/**
 * Loops curtos (quadrados) que ilustram cada passo na página /seklyn.
 * Sem texto dentro — o texto fica no HTML, pra ser lido/indexado e não
 * duplicar com a legenda. Começam e terminam no mesmo estado "vazio",
 * com fade nas pontas, pra emendar sem salto quando o <video loop> volta.
 */

export const LOOP_DURATION = 180;

function LoopShell({ children }: { children: React.ReactNode }) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fade = prog(frame, 0, 10) * (1 - prog(frame, durationInFrames - 14, durationInFrames - 1));
  return (
    <AbsoluteFill>
      <Backdrop intensity={0.8} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: fade }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
}

export function LoopFicha() {
  const frame = useCurrentFrame();
  const rows = interpolate(frame, [8, 110], [0, 4.4], clamp);
  return (
    <LoopShell>
      <div style={{ transform: "perspective(1600px) rotateY(-10deg) rotateX(6deg)" }}>
        <DashboardFicha rows={rows} scale={0.92} />
      </div>
    </LoopShell>
  );
}

export function LoopLink() {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [6, 110], [0, 1], clamp);
  const tap = interpolate(frame, [70, 92], [0, 1], clamp);
  return (
    <LoopShell>
      <ChatLink p={p} tap={tap} scale={1.35} />
    </LoopShell>
  );
}

export function LoopAluno() {
  const frame = useCurrentFrame();
  const done = interpolate(frame, [10, 140], [0, ALUNO_TOTAL_SERIES], clamp);
  return (
    <LoopShell>
      <PhoneAluno done={done} scale={1.18} />
    </LoopShell>
  );
}

export function LoopAdesao() {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [8, 120], [0, 1], clamp);
  return (
    <LoopShell>
      <AdesaoCard p={p} scale={1.3} />
    </LoopShell>
  );
}
