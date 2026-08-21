import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { site, waLink, waMessages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a JVSEKI pelo WhatsApp, e-mail, Instagram ou GitHub. Atendimento remoto para todo o Brasil.",
};

export default function ContatoPage() {
  return (
    <section className="wrap py-20">
      <p className="type-display text-xs uppercase tracking-[0.14em] text-mute">Contato</p>
      <h1 className="type-display mt-3 max-w-[20ch] text-[clamp(1.9rem,4vw,2.75rem)]">
        Vamos conversar sobre o seu projeto.
      </h1>
      <p className="mt-4 max-w-[52ch] text-mute">{site.serviceArea}. Canais completos chegam na etapa 2.</p>
      <div className="mt-8">
        <Button variant="chrome" href={waLink(waMessages.contato)} target="_blank" rel="noopener noreferrer">
          {site.phoneDisplay}
        </Button>
      </div>
    </section>
  );
}
