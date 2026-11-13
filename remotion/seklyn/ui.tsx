import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { GRAD_BTN, GRAD_TEXT, INTER, SHADOW_BIG, SHADOW_CARD, SK } from "./theme";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const easeOut = Easing.bezier(0.22, 1, 0.36, 1);

/** 0→1 entre os frames a e b, com o ease padrão do site. */
export function prog(frame: number, a: number, b: number) {
  return interpolate(frame, [a, b], [0, 1], { ...clamp, easing: easeOut });
}

/* ------------------------------------------------------------------------ */
/* Fundo = .hero-fundo do seklyn.com.br: lavanda clara, brilho violeta e    */
/* piso quadriculado em perspectiva "andando" pro horizonte.                */
/* ------------------------------------------------------------------------ */

export function Backdrop({ floor = 1, glowX = 0.72 }: { floor?: number; glowX?: number }) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const vertical = height > width;
  const t = frame / 30;
  const gx = glowX * 100 + Math.sin(t * 0.4) * 3;
  const gy = (vertical ? 58 : 44) + Math.cos(t * 0.35) * 3;
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: `radial-gradient(${width * 0.55}px ${height * 0.62}px at ${gx}% ${gy}%, rgba(124,58,237,0.17), transparent 62%),
          radial-gradient(${width * 0.45}px ${height * 0.4}px at 8% 0%, rgba(124,58,237,0.08), transparent 70%),
          linear-gradient(180deg, ${SK.bgTop} 0%, ${SK.bg} 100%)`,
      }}
    >
      {floor > 0 ? (
        <div
          style={{
            opacity: floor,
            position: "absolute",
            left: "-25%",
            right: "-25%",
            bottom: -2,
            height: vertical ? "40%" : "56%",
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.32) 2px, transparent 2px), linear-gradient(90deg, rgba(124,58,237,0.32) 2px, transparent 2px)",
            backgroundSize: "96px 96px",
            backgroundPosition: `0 ${((frame % 180) / 180) * 96}px, 0 0`,
            transform: "perspective(780px) rotateX(64deg)",
            transformOrigin: "50% 100%",
            maskImage: "linear-gradient(180deg, transparent 0%, #000 45%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 45%, transparent 100%)",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
}

/* ------------------------------------------------------------- */
/* Logo oficial: S cromado (public/seklyn/logo-s.png, 512x498).   */
/* `shine` (0→1) passa um reflexo recortado pelo próprio S.       */
/* ------------------------------------------------------------- */

const LOGO = staticFile("seklyn/logo-s.png");
const HALTER = staticFile("seklyn/hero-halter.png");

export function SeklynMark({ size = 128, shine = -1, glow = 0 }: { size?: number; shine?: number; glow?: number }) {
  const h = size * (498 / 512);
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: h,
        flexShrink: 0,
        filter: glow ? `drop-shadow(0 ${size * 0.08}px ${size * 0.22}px rgba(124,58,237,${glow}))` : undefined,
      }}
    >
      <Img src={LOGO} style={{ width: size, height: h, display: "block" }} />
      {shine >= 0 && shine <= 1 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            WebkitMaskImage: `url(${LOGO})`,
            WebkitMaskSize: "100% 100%",
            maskImage: `url(${LOGO})`,
            maskSize: "100% 100%",
            background: `linear-gradient(110deg, transparent ${shine * 160 - 40}%, rgba(255,255,255,0.9) ${shine * 160 - 25}%, transparent ${shine * 160 - 10}%)`,
          }}
        />
      ) : null}
    </div>
  );
}

/** Marca escrita como no site: "Sek" escuro + "lyn" em violeta. */
export function Wordmark({ size = 40 }: { size?: number }) {
  return (
    <span style={{ fontFamily: INTER, fontWeight: 800, fontSize: size, letterSpacing: "-0.04em", color: SK.text }}>
      Sek<span style={{ color: SK.v600 }}>lyn</span>
    </span>
  );
}

/** Logo + nome, lado a lado (como na nav do site). */
export function Brand({ size = 40 }: { size?: number }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: size * 0.3 }}>
      <SeklynMark size={size * 1.05} />
      <Wordmark size={size * 0.72} />
    </div>
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
  highlightIdx = [],
}: {
  text: string;
  start?: number;
  stagger?: number;
  style?: React.CSSProperties;
  highlight?: string[];
  /** Destaca por posição (quando a palavra se repete na frase). */
  highlightIdx?: number[];
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  const clean = (s: string) => s.replace(/[.,!?—]/g, "");
  return (
    <div style={{ fontFamily: INTER, display: "flex", flexWrap: "wrap", columnGap: "0.26em", color: SK.text, ...style }}>
      {words.map((w, i) => {
        const s = spring({ frame: frame - start - i * stagger, fps, config: { damping: 18, stiffness: 140, mass: 0.7 } });
        const hl = highlightIdx.includes(i) || highlight.some((h) => clean(h) === clean(w));
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.1em" }}>
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${(1 - s) * 105}%)`,
                opacity: interpolate(s, [0, 0.4], [0, 1], clamp),
                ...(hl ? { backgroundImage: GRAD_TEXT, WebkitBackgroundClip: "text", color: "transparent" } : null),
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

/** Selo "• Feito para Personal Trainers" do site. */
export function Pill({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        fontFamily: INTER,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        borderRadius: 999,
        padding: "10px 22px",
        background: SK.v50,
        border: `1px solid ${SK.v100}`,
        color: SK.v700,
        fontWeight: 600,
        fontSize: 24,
        ...style,
      }}
    >
      <span style={{ width: 9, height: 9, borderRadius: 99, background: SK.v600 }} />
      {children}
    </span>
  );
}

export function Button({ children, size = 1, style }: { children: React.ReactNode; size?: number; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        fontFamily: INTER,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: `${16 * size}px ${30 * size}px`,
        borderRadius: 14 * size,
        background: GRAD_BTN,
        color: "white",
        fontWeight: 700,
        fontSize: 22 * size,
        boxShadow: "0 12px 30px rgba(124,58,237,0.38), inset 0 1px 0 rgba(255,255,255,0.25)",
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

/** Chip flutuante do hero ("Série 3 · Supino reto — concluída agora"). */
export function Chip({ kind, p }: { kind: "serie" | "adesao"; p: number }) {
  const s = interpolate(p, [0, 1], [0.6, 1], clamp);
  return (
    <div
      style={{
        fontFamily: INTER,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 20px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.92)",
        border: `1px solid ${SK.line}`,
        boxShadow: SHADOW_CARD,
        opacity: p,
        transform: `scale(${s})`,
      }}
    >
      {kind === "serie" ? (
        <>
          <span style={{ width: 38, height: 38, borderRadius: 99, background: SK.green, display: "grid", placeItems: "center" }}>
            <Check size={22} />
          </span>
          <span>
            <div style={{ fontWeight: 700, fontSize: 21, color: SK.text }}>Série 3 · Supino reto</div>
            <div style={{ fontSize: 17, color: SK.mute }}>concluída agora</div>
          </span>
        </>
      ) : (
        <span>
          <div style={{ fontWeight: 800, fontSize: 34, letterSpacing: "-0.03em", backgroundImage: GRAD_TEXT, WebkitBackgroundClip: "text", color: "transparent" }}>
            {Math.round(92 * interpolate(p, [0, 1], [0.4, 1], clamp))}%
          </div>
          <div style={{ fontSize: 17, color: SK.mute }}>aderência na semana</div>
        </span>
      )}
    </div>
  );
}

/** O halter do hero, flutuando, com os dois chips orbitando. */
export function HeroHalter({ size = 620, enter = 1, chips = 1 }: { size?: number; enter?: number; chips?: number }) {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const bob = Math.sin(t * 1.6) * 14;
  const tilt = Math.sin(t * 0.9) * 4;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      {/* sombra/brilho no chão */}
      <div
        style={{
          position: "absolute",
          left: "22%",
          right: "22%",
          bottom: "8%",
          height: "12%",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(124,58,237,0.45), transparent)",
          filter: "blur(18px)",
          opacity: 0.7 * enter,
          transform: `scaleX(${1 - bob / 140})`,
        }}
      />
      <Img
        src={HALTER}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          // mesma máscara do .hero-palco no site: some o fundo quadrado do PNG
          maskImage: "radial-gradient(closest-side, #000 62%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(closest-side, #000 62%, transparent 100%)",
          opacity: enter,
          transform: `translateY(${bob + (1 - enter) * 120}px) rotate(${tilt + (1 - enter) * -25}deg) scale(${0.7 + enter * 0.3})`,
        }}
      />
      <div style={{ position: "absolute", left: "-4%", top: "10%", transform: `translateY(${Math.sin(t * 1.2 + 1) * 10}px)` }}>
        <Chip kind="serie" p={interpolate(chips, [0, 0.5], [0, 1], clamp)} />
      </div>
      <div style={{ position: "absolute", right: "-2%", bottom: "16%", transform: `translateY(${Math.sin(t * 1.3 + 2.5) * 10}px)` }}>
        <Chip kind="adesao" p={interpolate(chips, [0.4, 1], [0, 1], clamp)} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- */
/* Celular do aluno: treino do dia, séries marcadas uma a uma  */
/* ---------------------------------------------------------- */

const ALUNO_TREINO = [
  { nome: "Supino reto", series: ["12 reps · 40kg", "10 reps · 45kg", "8 reps · 50kg"] },
  { nome: "Crucifixo inclinado", series: ["12 reps · 14kg", "12 reps · 14kg", "10 reps · 16kg"] },
  { nome: "Tríceps corda", series: ["15 reps · 25kg", "12 reps · 30kg"] },
];
export const ALUNO_TOTAL_SERIES = ALUNO_TREINO.reduce((n, e) => n + e.series.length, 0);

/** `done` é contínuo: 2.5 = duas séries feitas e a terceira no meio da animação. */
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
        boxShadow: `0 50px 110px rgba(76, 29, 149, 0.35), 0 0 0 2px rgba(124,58,237,0.25)`,
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
          background: SK.bg,
          color: SK.text,
          padding: "56px 20px 18px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ position: "absolute", top: 14, left: "50%", width: 110, height: 30, marginLeft: -55, borderRadius: 20, background: "#000" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Brand size={26} />
          <span style={{ fontSize: 13, color: SK.mute, fontWeight: 500 }}>Olá, Ana</span>
        </div>
        <div style={{ marginTop: 16, fontSize: 14, color: SK.mute, fontWeight: 500 }}>Treino A · hoje</div>
        <div style={{ fontSize: 25, fontWeight: 800, marginTop: 2, letterSpacing: "-0.03em" }}>Peito e tríceps</div>

        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 13, color: SK.mute }}>
          <span>
            {Math.min(ALUNO_TOTAL_SERIES, Math.floor(done))} de {ALUNO_TOTAL_SERIES} séries
          </span>
          <span style={{ color: pct >= 1 ? SK.green : SK.v600, fontWeight: 700 }}>{Math.round(pct * 100)}%</span>
        </div>
        <div style={{ marginTop: 7, height: 8, borderRadius: 99, background: SK.v100, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct * 100}%`, borderRadius: 99, background: pct >= 1 ? SK.green : GRAD_BTN }} />
        </div>

        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
          {ALUNO_TREINO.map((ex) => (
            <div key={ex.nome}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 7 }}>{ex.nome}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {ex.series.map((s, si) => {
                  const my = idx++;
                  const p = Math.min(1, Math.max(0, done - my));
                  const on = p > 0.5;
                  return (
                    <div
                      key={si}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 13px",
                        borderRadius: 12,
                        fontSize: 14.5,
                        fontWeight: 600,
                        background: on ? SK.green : SK.card,
                        border: `1px solid ${on ? SK.green : SK.line}`,
                        boxShadow: on ? "0 6px 16px rgba(22,163,74,0.25)" : "0 1px 2px rgba(15,23,42,0.05)",
                        transform: `scale(${1 + Math.sin(p * Math.PI) * 0.035})`,
                        color: on ? "white" : SK.text,
                      }}
                    >
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 99,
                          display: "grid",
                          placeItems: "center",
                          border: on ? "none" : `2px solid ${SK.lineStrong}`,
                          background: on ? "rgba(255,255,255,0.25)" : "transparent",
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
                      <span style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 500, opacity: on ? 0.9 : 0.7 }}>{s}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 6,
            padding: 5,
            borderRadius: 14,
            background: SK.card,
            border: `1px solid ${SK.line}`,
            fontSize: 13.5,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          <span style={{ padding: "9px 0", borderRadius: 10, background: GRAD_BTN, color: "white" }}>Treino</span>
          <span style={{ padding: "9px 0", color: SK.mute }}>Dicas do Personal</span>
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
  const nav = ["Resumo", "Treinos", "Alunos", "Dicas"];
  return (
    <div
      style={{
        width: W,
        height: H,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        borderRadius: 24,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        background: SK.card,
        border: `1px solid ${SK.line}`,
        boxShadow: SHADOW_BIG,
        fontFamily: INTER,
        color: SK.text,
        flexShrink: 0,
      }}
    >
      <aside style={{ padding: 22, borderRight: `1px solid ${SK.line}`, background: SK.bg }}>
        <Brand size={32} />
        <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 6 }}>
          {nav.map((n) => (
            <div
              key={n}
              style={{
                padding: "11px 14px",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                background: n === "Treinos" ? GRAD_BTN : "transparent",
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
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em" }}>Ana Souza · Treino A</div>
          <span style={{ fontSize: 14, fontWeight: 700, padding: "8px 14px", borderRadius: 10, background: SK.v50, color: SK.v700, border: `1px solid ${SK.v100}` }}>
            + Exercício
          </span>
        </div>
        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            fontSize: 12.5,
            color: SK.faint,
            padding: "0 16px 10px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 700,
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
            const fresh = p > 0 && p < 1;
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
                  background: fresh ? SK.v50 : SK.card,
                  border: `1px solid ${fresh ? SK.v300 : SK.line}`,
                  opacity: p,
                  transform: `translateY(${(1 - easeOut(p)) * 24}px)`,
                }}
              >
                <span style={{ fontWeight: 700 }}>{f.ex}</span>
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
            gap: 14,
            opacity: interpolate(rows, [FICHA.length - 0.2, FICHA.length + 0.4], [0, 1], clamp),
          }}
        >
          <Button size={0.75}>Salvar e enviar link</Button>
          <span style={{ color: SK.mute, fontSize: 15 }}>Pronto em poucos minutos.</span>
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
  const total = Math.round(interpolate(p, [0, 1], [0, 92], clamp));
  return (
    <div
      style={{
        width: 700,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        padding: 34,
        borderRadius: 24,
        background: SK.card,
        border: `1px solid ${SK.line}`,
        boxShadow: SHADOW_BIG,
        fontFamily: INTER,
        color: SK.text,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 16, color: SK.mute }}>Adesão · Ana Souza</div>
          <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4, letterSpacing: "-0.03em" }}>Últimos 7 dias</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              backgroundImage: GRAD_TEXT,
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
                <span style={{ fontWeight: 600 }}>{a.ex}</span>
                <span style={{ color: a.bad ? SK.red : SK.mute, fontWeight: a.bad ? 700 : 500, opacity: interpolate(local, [0.6, 1], [0, 1], clamp) }}>
                  {a.label}
                </span>
              </div>
              <div style={{ height: 12, borderRadius: 99, background: SK.v50, overflow: "hidden", border: `1px solid ${SK.v100}` }}>
                <div style={{ height: "100%", width: `${a.v * local * 100}%`, borderRadius: 99, background: a.bad ? SK.red : GRAD_BTN }} />
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
          background: SK.redLight,
          border: "1px solid #fecaca",
          color: "#991b1b",
          fontSize: 17,
          fontWeight: 600,
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
  const bubbleIn = interpolate(p, [0, 0.35], [0, 1], { ...clamp, easing: easeOut });
  const cardIn = interpolate(p, [0.25, 0.6], [0, 1], { ...clamp, easing: easeOut });
  const replyIn = interpolate(p, [0.75, 1], [0, 1], { ...clamp, easing: easeOut });
  return (
    <div
      style={{
        width: 620,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        padding: 28,
        borderRadius: 26,
        background: SK.card,
        border: `1px solid ${SK.line}`,
        boxShadow: SHADOW_BIG,
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
            fontWeight: 800,
            fontSize: 20,
            color: "white",
          }}
        >
          A
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 19 }}>Ana Souza</div>
          <div style={{ fontSize: 14, color: SK.mute }}>aluna</div>
        </div>
      </div>

      <div
        style={{
          alignSelf: "flex-end",
          maxWidth: "86%",
          padding: "14px 18px",
          borderRadius: "20px 20px 6px 20px",
          background: GRAD_BTN,
          color: "white",
          fontSize: 19,
          fontWeight: 500,
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
          background: SK.v50,
          border: `1px solid ${SK.v100}`,
          opacity: cardIn,
          transform: `translateY(${(1 - cardIn) * 20}px) scale(${1 - tap * 0.03})`,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "center", padding: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "white", border: `1px solid ${SK.v100}`, display: "grid", placeItems: "center" }}>
            <SeklynMark size={44} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>Treino A · Peito e tríceps</div>
            <div style={{ fontSize: 15, color: SK.v700, marginTop: 2, fontWeight: 600 }}>seklyn.com.br/t/ana-8f2k</div>
          </div>
        </div>
        <div style={{ padding: "10px 14px", fontSize: 15, color: SK.mute, borderTop: `1px solid ${SK.v100}` }}>Sem senha · sem app · abre no celular</div>
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
            border: `3px solid ${SK.v600}`,
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
          background: SK.bg,
          border: `1px solid ${SK.line}`,
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

/** Lista com checks verdes, igual ao bloco "Pronto para acompanhar..." do site. */
export function CheckList({ items, p, size = 1 }: { items: string[]; p: number; size?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 * size, fontFamily: INTER }}>
      {items.map((it, i) => {
        const local = interpolate(p, [i * 0.15, i * 0.15 + 0.35], [0, 1], { ...clamp, easing: easeOut });
        return (
          <div key={it} style={{ display: "flex", alignItems: "center", gap: 12 * size, fontSize: 24 * size, color: SK.text, opacity: local, transform: `translateX(${(1 - local) * -20}px)` }}>
            <Check size={26 * size} color={SK.green} />
            {it}
          </div>
        );
      })}
    </div>
  );
}
