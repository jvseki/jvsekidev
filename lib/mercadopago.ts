// Cliente mínimo da API de pagamentos do Mercado Pago — só o que a página
// /apoie usa. Importar SÓ das rotas em app/api/pix. O token vem SÓ da
// variável de ambiente MP_ACCESS_TOKEN (Vercel → Settings → Environment
// Variables); sem prefixo NEXT_PUBLIC_, o Next nunca a manda pro navegador.

const API = "https://api.mercadopago.com/v1/payments";

export const DONATION_MIN = 1;
export const DONATION_MAX = 100;
export const NAME_MAX = 40;

export class MercadoPagoError extends Error {}

function token(): string {
  const t = process.env.MP_ACCESS_TOKEN;
  if (!t) throw new MercadoPagoError("MP_ACCESS_TOKEN não configurado");
  return t;
}

export type PixCharge = {
  id: string;
  qrCode: string;
  qrCodeBase64: string;
};

export async function createPixDonation({
  amount,
  email,
  name,
}: {
  amount: number;
  email: string;
  name: string;
}): Promise<PixCharge> {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({
      transaction_amount: amount,
      description: "Apoio ao What Bites Below",
      payment_method_id: "pix",
      payer: { email },
      metadata: { nome: name },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new MercadoPagoError(`Mercado Pago respondeu ${res.status}: ${await res.text().catch(() => "")}`);
  }

  const data = await res.json();
  const tx = data?.point_of_interaction?.transaction_data;
  if (!data?.id || !tx?.qr_code || !tx?.qr_code_base64) {
    throw new MercadoPagoError("Resposta do Mercado Pago sem dados do Pix");
  }

  return { id: String(data.id), qrCode: tx.qr_code, qrCodeBase64: tx.qr_code_base64 };
}

export async function getPaymentStatus(id: string): Promise<string> {
  const res = await fetch(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token()}` },
    cache: "no-store",
  });
  if (!res.ok) throw new MercadoPagoError(`Mercado Pago respondeu ${res.status} ao consultar ${id}`);
  const data = await res.json();
  return String(data?.status ?? "unknown");
}
