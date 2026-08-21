import type { Metadata } from "next";
import { ChannelCard } from "@/components/ChannelCard";
import { ContactForm } from "@/components/ContactForm";
import { site, waLink, waMessages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a JVSEKI pelo WhatsApp, e-mail, Instagram ou GitHub. Atendimento remoto para todo o Brasil.",
};

export default function ContatoPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="wrap">
        <p className="eyebrow">Contato</p>
        <h1 className="type-display mt-3 max-w-[24ch] text-[clamp(2rem,4.5vw,2.75rem)] leading-tight">
          Vamos conversar sobre o seu projeto.
        </h1>
        <p className="mt-4 max-w-[52ch] text-mute">
          {site.serviceArea}. Descreva o que você precisa — respondo com prazo e próximos passos.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ChannelCard
            label="WhatsApp"
            value={site.phoneDisplay}
            body="Canal mais rápido para orçamento."
            href={waLink(waMessages.contato)}
            target="_blank"
            rel="noopener noreferrer"
          />
          <ChannelCard
            label="E-mail"
            value={site.email}
            body="Para propostas mais detalhadas."
            href={`mailto:${site.email}`}
          />
          <ChannelCard
            label="Instagram"
            value={site.instagramHandle}
            body="Direct e bastidores dos projetos."
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          />
          <ChannelCard
            label="GitHub"
            value={site.githubHandle}
            body="Repositórios públicos."
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>

        <div className="mt-14 max-w-[720px]">
          <p className="eyebrow">Ou, se preferir</p>
          <h2 className="type-display mt-2 text-[1.25rem]">Manda os detalhes por e-mail</h2>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
