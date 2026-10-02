import { NextResponse } from "next/server";
import { createPixDonation, DONATION_MAX, DONATION_MIN, NAME_MAX } from "@/lib/mercadopago";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
const GENERIC_ERROR = "Não foi possível gerar o Pix agora. Tente de novo em instantes.";

/**
 * POST { valor, email, nome } → { id, qrCode, qrCodeBase64 }.
 * Tudo validado aqui — o slider do navegador não é garantia de nada.
 * Erro do Mercado Pago vai pro log do servidor; o visitante só vê a
 * mensagem genérica.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const { valor, email, nome } = (body ?? {}) as Record<string, unknown>;

  const amount = typeof valor === "number" ? valor : Number(valor);
  if (!Number.isInteger(amount) || amount < DONATION_MIN || amount > DONATION_MAX) {
    return NextResponse.json({ error: `Escolha um valor entre R$ ${DONATION_MIN} e R$ ${DONATION_MAX}.` }, { status: 400 });
  }

  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (cleanEmail.length > 254 || !EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }

  // Nome vai pros créditos do jogo: sem tags/sinais de HTML, sem
  // caracteres de controle, espaços colapsados, no máximo NAME_MAX.
  const rawName = typeof nome === "string" ? nome : "";
  const cleanName = rawName
    .replace(/<[^>]*>/g, "")
    .replace(/[<>"'`&\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (cleanName.length > NAME_MAX) {
    return NextResponse.json({ error: `O nome pode ter no máximo ${NAME_MAX} caracteres.` }, { status: 400 });
  }

  try {
    const pix = await createPixDonation({ amount, email: cleanEmail, name: cleanName });
    return NextResponse.json(pix, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[api/pix] falha ao gerar Pix:", err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }
}
