import type { Metadata } from "next";
import { CaseCard } from "@/components/CaseCard";
import { Button } from "@/components/Button";
import { cases, labReserva } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Cases reais da JVSEKI: DS A Fonte, Agendamentos Augusto Mariani, Aprendizado7, Pastelaria Delivery, MTHS.PUBLI e Seklyn — sistemas em produção, do banco ao deploy.",
};

export default function ProjetosPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="wrap">
        <p className="eyebrow">Projetos</p>
        <h1 className="type-display mt-3 max-w-[22ch] text-[clamp(2rem,4.5vw,2.75rem)] leading-tight">
          Seis sistemas reais, do banco ao deploy.
        </h1>
        <p className="mt-4 max-w-[52ch] text-mute">
          Loja, escola, estúdio, delivery, portfólio audiovisual e uma plataforma SaaS em operação.
          Produção de cliente fica privada — o repositório aberto abaixo mostra a arquitetura sem
          expor dados de negócio.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <CaseCard key={c.n} {...c} />
          ))}
        </div>

        {/* Substitui o iframe embutido do Lab Reserva: link direto pra demo e pro repo. */}
        <div className="panel mt-6 flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[52ch]">
            <p className="eyebrow">Código aberto · TCC</p>
            <h2 className="type-display mt-2 text-[1.25rem]">{labReserva.name} — demo funcional</h2>
            <p className="mt-2 text-[0.95rem] text-mute">{labReserva.description}</p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap gap-3">
            <Button variant="chrome" href={labReserva.demoHref} target="_blank" rel="noopener noreferrer">
              Abrir demo
            </Button>
            <Button variant="ghost" href={labReserva.repoHref} target="_blank" rel="noopener noreferrer">
              Ver código
            </Button>
          </div>
        </div>

        <p className="mt-8 max-w-[60ch] text-sm text-mute">
          Como eu trabalho: a produção de cada cliente fica em repositório privado. O código aberto do
          Lab Reserva (TCC) mostra a mesma arquitetura — PWA, Flask e Sheets — sem vazar credenciais
          de negócio.
        </p>
      </div>
    </section>
  );
}
