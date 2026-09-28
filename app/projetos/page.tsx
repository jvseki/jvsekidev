import { ScrambleText } from "@/components/fx/ScrambleText";
import { SplitWords } from "@/components/fx/SplitWords";
import Link from "next/link";
import { CaseCard } from "@/components/CaseCard";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { cases, labReserva } from "@/lib/content";
import { whatBitesBelow } from "@/lib/games";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projetos",
  description:
    "Cases reais da JVSEKI: DS A Fonte, Agendamentos Augusto Mariani, Aprendizado7, Pastelaria Delivery, MTHS.PUBLI e Seklyn — sistemas em produção, do banco ao deploy.",
  path: "/projetos",
});

export default function ProjetosPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="wrap">
        <p className="eyebrow"><ScrambleText text="Projetos" /></p>
        <h1 className="type-display mt-3 max-w-[22ch] text-[clamp(2rem,4.5vw,2.75rem)] leading-tight">
          <SplitWords text="Seis sistemas reais, do banco ao deploy." />
        </h1>
        <p className="mt-4 max-w-[52ch] text-mute">
          Loja, escola, estúdio, delivery, portfólio audiovisual e uma plataforma SaaS em operação.
          Produção de cliente fica privada — o repositório aberto abaixo mostra a arquitetura sem
          expor dados de negócio.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.n} delay={Math.min(i, 5) * 0.05}>
              <CaseCard {...c} />
            </Reveal>
          ))}
        </div>

        {/* Jogos — card com a capa pixel art levando pra página do jogo */}
        <Reveal className="mt-6">
          <Link
            href={whatBitesBelow.path}
            className="panel group grid grid-cols-1 overflow-hidden transition-colors hover:border-mute sm:grid-cols-[minmax(0,260px)_1fr]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- pixel art: sem reamostragem do next/image */}
            <img
              src={whatBitesBelow.img.cover}
              alt={`Capa do jogo ${whatBitesBelow.name}`}
              width={630}
              height={500}
              loading="lazy"
              className="aspect-[630/500] h-full w-full object-cover [image-rendering:pixelated]"
            />
            <div className="flex flex-col justify-center p-6">
              <p className="eyebrow">Jogo · Demo grátis</p>
              <h2 className="type-display mt-2 text-[1.25rem]">{whatBitesBelow.name}</h2>
              <p className="mt-2 max-w-[48ch] text-[0.95rem] text-mute">
                {whatBitesBelow.tagline} Pesca em pixel art que vira terror psicológico — jogue no navegador.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-stroke underline-offset-4 transition-colors group-hover:decoration-ink">
                Ver o jogo →
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Substitui o iframe embutido do Lab Reserva: link direto pra demo e pro repo. */}
        <Reveal className="panel mt-6 flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
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
        </Reveal>

        <p className="mt-8 max-w-[60ch] text-sm text-mute">
          Como eu trabalho: a produção de cada cliente fica em repositório privado. O código aberto do
          Lab Reserva (TCC) mostra a mesma arquitetura — PWA, Flask e Sheets — sem vazar credenciais
          de negócio.
        </p>
      </div>
    </section>
  );
}
