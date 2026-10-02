import { NextResponse } from "next/server";
import { getPaymentStatus } from "@/lib/mercadopago";

export const dynamic = "force-dynamic";

/**
 * GET /api/pix/:id → { status }. Só o status sai daqui — nada de valor,
 * e-mail ou nome de quem pagou. O id é validado como numérico antes de
 * entrar na URL do Mercado Pago (sem path injection).
 */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!/^\d{1,20}$/.test(params.id)) {
    return NextResponse.json({ error: "Pagamento inválido." }, { status: 400 });
  }

  try {
    const status = await getPaymentStatus(params.id);
    return NextResponse.json({ status }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[api/pix/:id] falha ao consultar status:", err);
    return NextResponse.json({ error: "Não foi possível consultar o pagamento." }, { status: 502 });
  }
}
