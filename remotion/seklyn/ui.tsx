import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { INTER, SK } from "./theme";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const easeOut = Easing.bezier(0.22, 1, 0.36, 1);

/** 0→1 entre os frames a e b, com o ease padrão do site. */
export function prog(frame: number, a: number, b: number) {
  return interpolate(frame, [a, b], [0, 1], { ...clamp, easing: easeOut });
}

/* ------------------------------------------------------------------ */
/* Fundo: blobs violeta respirando (mesmo GradientBackdrop do produto) */
/* ------------------------------------------------------------------ */

export function Backdrop({ intensity = 1 }: { intensity?: number }) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const t = frame / 30;
  const big = Math.max(width, height);
  const blobs = [
    { c: SK.v500, x: 0.12 + Math.sin(t * 0.35) * 0.06, y: 0.1 + Math.cos(t * 0.3) * 0.05, s: 0.62 },
    { c: SK.v900, x: 0.92 + Math.cos(t * 0.28) * 0.05, y: 0.22 + Math.sin(t * 0.33) * 0.06, s: 0.75 },
    { c: SK.v400, x: 0.38 + Math.sin(t * 0.25 + 1) * 0.07, y: 1.02 + Math.cos(t * 0.31) * 0.04, s: 0.6 },
  ];
  return (
    <AbsoluteFill style={{ background: SK.bg, overflow: "hidden" }}>
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.x * width - (b.s * big) / 2,
            top: b.y * height - (b.s * big) / 2,
            width: b.s * big,
            height: b.s * big,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.c} 0%, transparent 65%)`,
            opacity: 0.42 * intensity,
            filter: "blur(40px)",
          }}
        />
      ))}
      {/* grade sutil de pontos — dá textura sem competir com o conteúdo */}
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(rgba(196,181,253,0.10) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
    </AbsoluteFill>
  );
}

/* ---------------------------------------------- */
/* Logo S — desenhado com o traço (pathLength = 1) */
/* ---------------------------------------------- */

export function SeklynMark({ size = 128, draw = 1, dot = 1 }: { size?: number; draw?: number; dot?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
      <defs>
        <linearGradient id="skbg" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4c1d95" />
          <stop offset="1" stopColor="#2e1065" />
        </linearGradient>
        <linearGradient id="skac" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="30" fill="url(#skbg)" />
      <circle cx="93" cy="35" r={7 * dot} fill="url(#skac)" />
      <path
        d="M79 46c0-8-8-13-19-13-12 0-20 6-20 15 0 20 32 12 32 26 0 6-6 10-14 10-9 0-16-4-18-11"
        stroke="white"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      />
    </svg>
  );
}

/* ---------------------------------------- */
/* Texto: palavras subindo com spring        */
/* ---------------------------------------- */

export function Words({
  text,
  start = 0,
  stagger = 3,
  style,
  highlight = [],
}: {
  text: string;
  start?: number;
  stagger?: number;
  style?: React.CSSProperties;
  highlight?: string[];
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  return (
    <div style={{ fontFamily: INTER, display: "flex", flexWrap: "wrap", columnGap: "0.26em", ...style }}>
      {words.map((w, i) => {
        const s = spring({ frame: frame - start - i * stagger, fps, config: { damping: 18, stiffness: 140, mass: 0.7 } });
        const clean = (s: string) => s.replace(/[.,!?]/g, "");
        const hl = highlight.some((h) => clean(h) === clean(w));
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.08em" }}>
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${(1 - s) * 105}%)`,
                opacity: interpolate(s, [0, 0.4], [0, 1], clamp),
                ...(hl
                  ? {
                      backgroundImage: `linear-gradient(100deg, ${SK.v300}, ${SK.v500})`,
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }
                  : null),
              }}
            >
              {w}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function Pill({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        fontFamily: INTER,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        borderRadius: 999,
        padding: "10px 22px",
        background: "rgba(124, 58, 237, 0.16)",
        border: `1px solid ${SK.lineStrong}`,
        color: SK.v300,
        fontWeight: 600,
        fontSize: 24,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function Check({ size = 22, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color}>
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ---------------------------------------------------------- */
/* Celular do aluno: treino do dia, séries marcadas uma a uma  */
/* ---------------------------------------------------------- */

const ALUNO_TREINO = [
  {
    nome: "Supino reto",
    series: ["12 reps · 40kg", "10 reps · 45kg", "8 reps · 50kg"],
  },
  {
    nome: "Crucifixo inclinado",
    series: ["12 reps · 14kg", "12 reps · 14kg", "10 reps · 16kg"],
  },
  {
    nome: "Tríceps corda",
    series: ["15 reps · 25kg", "12 reps · 30kg"],
  },
];
export const ALUNO_TOTAL_SERIES = ALUNO_TREINO.reduce((n, e) => n + e.series.length, 0);

/**
 * `done` é contínuo: 2.5 = duas séries feitas e a terceira no meio da
 * animação de check. `tap` (0→1) desenha o "dedo" tocando na próxima.
 */
export function PhoneAluno({ done, scale = 1 }: { done: number; scale?: number }) {
  const W = 400;
  const H = 820;
  const pct = Math.min(1, Math.max(0, done) / ALUNO_TOTAL_SERIES);
  let idx = 0;
  return (
    <div
      style={{
        width: W,
        height: H,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        borderRadius: 56,
        padding: 12,
        background: "linear-gradient(160deg, #2a2340, #0c0915)",
        boxShadow: `0 50px 120px rgba(76, 29, 149, 0.55), 0 0 0 2px rgba(196,181,253,0.18), inset 0 0 0 1px rgba(255,255,255,0.06)`,
        fontFamily: INTER,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 44,
          overflow: "hidden",
          background: "#0b0a12",
          color: SK.text,
          padding: "58px 22px 20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* notch */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: "50%",
            width: 110,
            height: 30,
            marginLeft: -55,
            borderRadius: 20,
            background: "#000",
          }}
        />
        <div style={{ fontSize: 15, color: SK.mute, fontWeight: 500 }}>Treino A · hoje</div>
        <div style={{ fontSize: 26, fontWeight: 700, marginTop: 4, letterSpacing: "-0.02em" }}>Peito e tríceps</div>

        <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontSize: 14, color: SK.mute }}>
          <span>
            {Math.min(ALUNO_TOTAL_SERIES, Math.floor(done))} de {ALUNO_TOTAL_SERIES} séries
          </span>
          <span style={{ color: pct >= 1 ? SK.green : SK.v300, fontWeight: 600 }}>{Math.round(pct * 100)}%</span>
        </div>
        <div style={{ marginTop: 8, height: 8, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${pct * 100}%`,
              borderRadius: 99,
              background: pct >= 1 ? SK.green : `linear-gradient(90deg, ${SK.v600}, ${SK.v400})`,
            }}
          />
        </div>

        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          {ALUNO_TREINO.map((ex) => (
            <div key={ex.nome}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ex.nome}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {ex.series.map((s, si) => {
                  const my = idx++;
                  const p = Math.min(1, Math.max(0, done - my)); // 0..1 para esta série
                  const on = p > 0.5;
                  return (
                    <div
                      key={si}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "11px 14px",
                        borderRadius: 14,
                        fontSize: 15,
                        fontWeight: 500,
                        background: on ? SK.greenDeep : "rgba(255,255,255,0.05)",
                        border: `1px solid ${on ? "rgba(16,185,129,0.6)" : "rgba(255,255,255,0.06)"}`,
                        transform: `scale(${1 + Math.sin(p * Math.PI) * 0.035})`,
                        color: on ? "white" : "#cfcbe0",
                      }}
                    >
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 99,
                          display: "grid",
                          placeItems: "center",
                          border: on ? "none" : "2px solid rgba(255,255,255,0.22)",
                          background: on ? "rgba(255,255,255,0.22)" : "transparent",
                          flexShrink: 0,
                        }}
                      >
                        {on ? (
                          <span style={{ transform: `scale(${interpolate(p, [0.5, 1], [0.3, 1], clamp)})` }}>
                            <Check size={16} />
                          </span>
                        ) : null}
                      </span>
                      <span>Série {si + 1}</span>
                      <span style={{ marginLeft: "auto", fontSize: 13, opacity: 0.8 }}>{s}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* tabs inferiores: treino | dicas do personal */}
        <div
          style={{
            marginTop: "auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 6,
            padding: 5,
            borderRadius: 16,
            background: "rgba(255,255,255,0.05)",
            fontSize: 14,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          <span style={{ padding: "10px 0", borderRadius: 12, background: SK.v600 }}>Treino</span>
          <span style={{ padding: "10px 0", color: SK.mute }}>Dicas do personal</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- */
/* Painel do personal: montando a ficha do aluno no desktop */
/* ------------------------------------------------------- */

const FICHA = [
  { ex: "Supino reto", s: "3 séries", r: "12 · 10 · 8", c: "40–50kg" },
  { ex: "Crucifixo inclinado", s: "3 séries", r: "12 · 12 · 10", c: "14–16kg" },
  { ex: "Tríceps corda", s: "2 séries", r: "15 · 12", c: "25–30kg" },
  { ex: "Paralelas", s: "3 séries", r: "até a falha", c: "corporal" },
];

export function DashboardFicha({ rows, scale = 1 }: { rows: number; scale?: number }) {
  const W = 1040;
  const H = 640;
  const nav = ["Resumo", "Treinos", "Alunos", "Dicas", "Agenda"];
  return (
    <div
      style={{
        width: W,
        height: H,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        borderRadius: 26,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        background: SK.bgCardSolid,
        border: `1px solid ${SK.lineStrong}`,
        boxShadow: "0 50px 120px rgba(46, 16, 101, 0.6)",
        fontFamily: INTER,
        color: SK.text,
        flexShrink: 0,
      }}
    >
      <aside style={{ padding: 22, borderRight: `1px solid ${SK.line}`, background: "rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SeklynMark size={34} />
          <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em" }}>Seklyn</span>
        </div>
        <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 6 }}>
          {nav.map((n) => (
            <div
              key={n}
              style={{
                padding: "11px 14px",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 500,
                background: n === "Treinos" ? SK.v600 : "transparent",
                color: n === "Treinos" ? "white" : SK.mute,
              }}
            >
              {n}
            </div>
          ))}
        </div>
      </aside>
      <main style={{ padding: 30 }}>
        <div style={{ fontSize: 14, color: SK.mute }}>Ficha de treino</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>Ana Souza · Treino A</div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              padding: "8px 14px",
              borderRadius: 10,
              background: "rgba(124,58,237,0.18)",
              color: SK.v300,
            }}
          >
            + Exercício
          </span>
        </div>
        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            fontSize: 13,
            color: SK.faint,
            padding: "0 16px 10px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 600,
          }}
        >
          <span>Exercício</span>
          <span>Séries</span>
          <span>Reps</span>
          <span>Carga</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FICHA.map((f, i) => {
            const p = Math.min(1, Math.max(0, rows - i));
            return (
              <div
                key={f.ex}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
                  alignItems: "center",
                  padding: "16px",
                  borderRadius: 14,
                  fontSize: 17,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${p > 0.98 && i === Math.floor(rows) - 1 ? SK.lineStrong : SK.line}`,
                  opacity: p,
                  transform: `translateY(${(1 - easeOut(p)) * 24}px)`,
                }}
              >
                <span style={{ fontWeight: 600 }}>{f.ex}</span>
                <span style={{ color: SK.mute }}>{f.s}</span>
                <span style={{ color: SK.mute }}>{f.r}</span>
                <span style={{ color: SK.mute }}>{f.c}</span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 22,
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: interpolate(rows, [FICHA.length - 0.2, FICHA.length + 0.4], [0, 1], clamp),
          }}
        >
          <span
            style={{
              padding: "12px 20px",
              borderRadius: 12,
              background: SK.v600,
              fontWeight: 600,
              fontSize: 16,
              boxShadow: "0 10px 30px rgba(124,58,237,0.45)",
            }}
          >
            Salvar e enviar link
          </span>
          <span style={{ color: SK.mute, fontSize: 15 }}>Pronto em menos de 2 minutos.</span>
        </div>
      </main>
    </div>
  );
}

/* ------------------------------------------- */
/* Card de adesão: barras + exercício esquecido */
/* ------------------------------------------- */

const ADESAO = [
  { ex: "Agachamento", v: 0.92, label: "4x essa semana" },
  { ex: "Supino reto", v: 0.84, label: "3x essa semana" },
  { ex: "Remada baixa", v: 0.66, label: "2x essa semana" },
  { ex: "Leg press", v: 0.04, label: "nunca feito", bad: true },
];

export function AdesaoCard({ p, scale = 1 }: { p: number; scale?: number }) {
  const W = 700;
  const total = Math.round(interpolate(p, [0, 1], [0, 92], clamp));
  return (
    <div
      style={{
        width: W,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        padding: 34,
        borderRadius: 28,
        background: SK.bgCard,
        border: `1px solid ${SK.lineStrong}`,
        boxShadow: "0 50px 120px rgba(46, 16, 101, 0.6)",
        fontFamily: INTER,
        color: SK.text,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 16, color: SK.mute }}>Adesão · Ana Souza</div>
          <div style={{ fontSize: 26, fontWeight: 700, marginTop: 4 }}>Últimos 7 dias</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              backgroundImage: `linear-gradient(100deg, ${SK.v300}, ${SK.v500})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {total}%
          </div>
          <div style={{ fontSize: 14, color: SK.mute, marginTop: 4 }}>aderência na semana</div>
        </div>
      </div>
      <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 22 }}>
        {ADESAO.map((a, i) => {
          const local = interpolate(p, [i * 0.12, 0.55 + i * 0.12], [0, 1], { ...clamp, easing: easeOut });
          return (
            <div key={a.ex}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, marginBottom: 9 }}>
                <span style={{ fontWeight: 500 }}>{a.ex}</span>
                <span
                  style={{
                    color: a.bad ? SK.red : SK.mute,
                    fontWeight: a.bad ? 700 : 500,
                    opacity: interpolate(local, [0.6, 1], [0, 1], clamp),
                  }}
                >
                  {a.label}
                </span>
              </div>
              <div style={{ height: 12, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${Math.max(a.v * local, a.bad ? 0.04 * local : 0) * 100}%`,
                    borderRadius: 99,
                    background: a.bad ? SK.red : `linear-gradient(90deg, ${SK.v600}, ${SK.v400})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 28,
          padding: "14px 18px",
          borderRadius: 14,
          background: "rgba(248,113,113,0.1)",
          border: "1px solid rgba(248,113,113,0.35)",
          color: "#fecaca",
          fontSize: 17,
          fontWeight: 500,
          opacity: interpolate(p, [0.85, 1], [0, 1], clamp),
          transform: `translateY(${interpolate(p, [0.85, 1], [12, 0], clamp)}px)`,
        }}
      >
        Leg press pulado 3 treinos seguidos — hora de conversar com a Ana.
      </div>
    </div>
  );
}

/* --------------------------------------------- */
/* Conversa: personal manda o link único do aluno */
/* --------------------------------------------- */

export function ChatLink({ p, tap, scale = 1 }: { p: number; tap: number; scale?: number }) {
  const W = 620;
  const bubbleIn = interpolate(p, [0, 0.35], [0, 1], { ...clamp, easing: easeOut });
  const cardIn = interpolate(p, [0.25, 0.6], [0, 1], { ...clamp, easing: easeOut });
  const replyIn = interpolate(p, [0.75, 1], [0, 1], { ...clamp, easing: easeOut });
  return (
    <div
      style={{
        width: W,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        padding: 28,
        borderRadius: 30,
        background: SK.bgCard,
        border: `1px solid ${SK.line}`,
        boxShadow: "0 50px 120px rgba(46, 16, 101, 0.55)",
        fontFamily: INTER,
        color: SK.text,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 16, borderBottom: `1px solid ${SK.line}` }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 99,
            background: `linear-gradient(135deg, ${SK.v400}, ${SK.v700})`,
            display: "grid",
            placeItems: "center",
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          A
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 19 }}>Ana Souza</div>
          <div style={{ fontSize: 14, color: SK.mute }}>aluna</div>
        </div>
      </div>

      <div
        style={{
          alignSelf: "flex-end",
          maxWidth: "86%",
          padding: "14px 18px",
          borderRadius: "20px 20px 6px 20px",
          background: SK.v700,
          fontSize: 19,
          opacity: bubbleIn,
          transform: `translateY(${(1 - bubbleIn) * 20}px)`,
        }}
      >
        Oi Ana! Seu treino novo tá aqui, é só abrir 👇
      </div>
      <div
        style={{
          alignSelf: "flex-end",
          width: "86%",
          borderRadius: "20px 20px 6px 20px",
          overflow: "hidden",
          background: SK.v700,
          opacity: cardIn,
          transform: `translateY(${(1 - cardIn) * 20}px) scale(${1 - tap * 0.03})`,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "center", padding: 14, background: "rgba(0,0,0,0.22)" }}>
          <SeklynMark size={54} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Treino A · Peito e tríceps</div>
            <div style={{ fontSize: 15, color: SK.v300, marginTop: 2 }}>seklyn.com.br/t/ana-8f2k</div>
          </div>
        </div>
        <div style={{ padding: "10px 14px", fontSize: 15, color: "#ddd6fe" }}>Sem senha · sem app · abre no celular</div>
        {/* toque */}
        <div
          style={{
            position: "absolute",
            left: "58%",
            top: "38%",
            width: 70,
            height: 70,
            marginLeft: -35,
            marginTop: -35,
            borderRadius: 99,
            border: "3px solid rgba(255,255,255,0.8)",
            opacity: tap > 0 ? 1 - tap : 0,
            transform: `scale(${0.4 + tap * 1.4})`,
          }}
        />
      </div>
      <div
        style={{
          alignSelf: "flex-start",
          padding: "12px 18px",
          borderRadius: "20px 20px 20px 6px",
          background: "rgba(255,255,255,0.08)",
          fontSize: 19,
          opacity: replyIn,
          transform: `translateY(${(1 - replyIn) * 20}px)`,
        }}
      >
        Abri! Já vou marcando aqui 💪
      </div>
    </div>
  );
}
