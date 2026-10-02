"use client";

import { useEffect, useRef, useState } from "react";

const MIN = 1;
const MAX = 100;
const START = 5;
const PRESETS = [2, 5, 10, 20, 50];
const NAME_MAX = 40;
const POLL_MS = 5000;
const POLL_LIMIT_MS = 15 * 60 * 1000;

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

type Charge = { id: string; qrCode: string; qrCodeBase64: string };
type Status = "idle" | "loading" | "waiting" | "paid" | "expired" | "error";

/**
 * Doação por Pix: barrinha de valor (R$ 1–100) → POST /api/pix → QR +
 * copia e cola → consulta /api/pix/:id a cada 5 s, por no máximo 15 min,
 * até o Mercado Pago marcar como "approved".
 */
export function PixDonation() {
  const [amount, setAmount] = useState(START);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [charge, setCharge] = useState<Charge | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const fill = ((amount - MIN) / (MAX - MIN)) * 100;

  // Polling do status enquanto houver cobrança aguardando.
  useEffect(() => {
    if (!charge || status !== "waiting") return;
    const startedAt = Date.now();
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    async function poll() {
      if (cancelled) return;
      if (Date.now() - startedAt > POLL_LIMIT_MS) {
        setStatus("expired");
        return;
      }
      try {
        const res = await fetch(`/api/pix/${charge!.id}`, { cache: "no-store" });
        if (res.ok) {
          const { status: s } = await res.json();
          if (s === "approved") {
            setStatus("paid");
            return;
          }
          if (s === "cancelled" || s === "rejected") {
            setStatus("expired");
            return;
          }
        }
      } catch {
        // rede instável: tenta de novo no próximo ciclo
      }
      if (!cancelled) timer = setTimeout(poll, POLL_MS);
    }

    timer = setTimeout(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [charge, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("loading");
    setCopied(false);
    try {
      const res = await fetch("/api/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valor: amount, email, nome: name }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Não foi possível gerar o Pix agora. Tente de novo em instantes.");
        setStatus("error");
        return;
      }
      setCharge(data as Charge);
      setStatus("waiting");
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
    } catch {
      setError("Não foi possível gerar o Pix agora. Tente de novo em instantes.");
      setStatus("error");
    }
  }

  async function copy() {
    if (!charge) return;
    try {
      await navigator.clipboard.writeText(charge.qrCode);
    } catch {
      // Fallback pra navegadores sem clipboard API (ou sem permissão).
      const ta = document.getElementById("pix-copia-cola") as HTMLTextAreaElement | null;
      ta?.select();
      document.execCommand?.("copy");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function reset() {
    setCharge(null);
    setStatus("idle");
    setCopied(false);
  }

  const locked = status === "loading" || status === "waiting";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
      <form onSubmit={onSubmit} className="wbb-panel" aria-describedby={error ? "pix-erro" : undefined}>
        <label htmlFor="pix-valor" className="wbb-label">
          Valor do apoio
        </label>
        <div className="mt-3 flex items-center gap-5">
          <input
            id="pix-valor"
            type="range"
            min={MIN}
            max={MAX}
            step={1}
            value={amount}
            disabled={locked}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="wbb-range flex-1"
            style={{ "--fill": `${fill}%` } as React.CSSProperties}
            aria-valuetext={brl.format(amount)}
          />
          <output htmlFor="pix-valor" className="wbb-amount" aria-live="polite">
            {brl.format(amount)}
          </output>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Valores rápidos">
          {PRESETS.map((v) => (
            <button
              key={v}
              type="button"
              disabled={locked}
              onClick={() => setAmount(v)}
              className="wbb-chip"
              aria-pressed={amount === v}
            >
              R$ {v}
            </button>
          ))}
        </div>

        <label htmlFor="pix-nome" className="wbb-label mt-7 block">
          Seu nome ou apelido <span className="wbb-mute normal-case tracking-normal">(aparece nos créditos do jogo)</span>
        </label>
        <input
          id="pix-nome"
          type="text"
          value={name}
          maxLength={NAME_MAX}
          disabled={locked}
          onChange={(e) => setName(e.target.value)}
          autoComplete="nickname"
          placeholder="Opcional"
          className="wbb-input mt-2"
        />

        <label htmlFor="pix-email" className="wbb-label mt-5 block">
          E-mail <span className="wbb-mute normal-case tracking-normal">(o Mercado Pago exige pra gerar o Pix)</span>
        </label>
        <input
          id="pix-email"
          type="email"
          required
          value={email}
          disabled={locked}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          inputMode="email"
          placeholder="voce@email.com"
          className="wbb-input mt-2"
        />

        {error ? (
          <p id="pix-erro" role="alert" className="wbb-error mt-5">
            {error}
          </p>
        ) : null}

        <button type="submit" disabled={locked} className="wbb-btn wbb-btn--primary mt-7 w-full">
          {status === "loading" ? "Gerando Pix…" : `Gerar Pix de ${brl.format(amount)}`}
        </button>
      </form>

      <div ref={resultRef} className="wbb-panel wbb-pix-result" aria-live="polite">
        {charge && status !== "idle" ? (
          <>
            {status === "paid" ? (
              <div className="py-6 text-center">
                <p className="wbb-paid">♥</p>
                <p className="wbb-h2 mt-4">Pagamento recebido!</p>
                <p className="mt-3">Obrigado pelo apoio{name.trim() ? `, ${name.trim()}` : ""}.</p>
                <button type="button" onClick={reset} className="wbb-btn mt-7">
                  Fazer outra doação
                </button>
              </div>
            ) : (
              <>
                <p className="wbb-label">Pix de {brl.format(amount)}</p>
                {/* eslint-disable-next-line @next/next/no-img-element -- data URI do Mercado Pago */}
                <img
                  src={`data:image/png;base64,${charge.qrCodeBase64}`}
                  alt="QR Code do Pix"
                  width={320}
                  height={320}
                  className="wbb-qr mx-auto mt-4"
                />
                <label htmlFor="pix-copia-cola" className="wbb-label mt-6 block">
                  Pix copia e cola
                </label>
                <div className="mt-2 flex gap-2">
                  <textarea
                    id="pix-copia-cola"
                    readOnly
                    rows={2}
                    value={charge.qrCode}
                    onFocus={(e) => e.currentTarget.select()}
                    className="wbb-input min-w-0 flex-1 resize-none font-mono text-[0.75rem]"
                  />
                  <button type="button" onClick={copy} className="wbb-btn shrink-0">
                    {copied ? "Copiado!" : "Copiar"}
                  </button>
                </div>
                {status === "expired" ? (
                  <div className="mt-6">
                    <p className="wbb-mute">Este Pix expirou ou paramos de acompanhar. Se já pagou, obrigado!</p>
                    <button type="button" onClick={reset} className="wbb-btn mt-4">
                      Gerar outro Pix
                    </button>
                  </div>
                ) : (
                  <p className="wbb-waiting mt-6">
                    <span className="wbb-waiting__dot" aria-hidden="true" />
                    Aguardando pagamento...
                  </p>
                )}
              </>
            )}
          </>
        ) : (
          <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center">
            <PixPlaceholder />
            <p className="wbb-mute mt-5 max-w-[30ch] text-[0.95rem]">
              Escolha o valor e toque em “Gerar Pix”. O QR Code aparece aqui.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/** QR "fantasma" em pixel art, só ilustração do lugar onde o QR real vai aparecer. */
function PixPlaceholder() {
  const cells = "1110101111100010110101011101100010101011100001110110100111110101100011011111101".split("");
  return (
    <svg viewBox="0 0 9 9" width="120" height="120" shapeRendering="crispEdges" aria-hidden="true" className="opacity-30">
      {cells.map((c, i) =>
        c === "1" ? <rect key={i} x={i % 9} y={Math.floor(i / 9)} width="1" height="1" fill="currentColor" /> : null
      )}
    </svg>
  );
}
