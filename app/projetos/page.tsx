import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Cases reais da JVSEKI: DS A Fonte, Agendamentos Augusto Mariani, Aprendizado7, Pastelaria Delivery, MTHS.PUBLI e Seklyn.",
};

export default function ProjetosPage() {
  return (
    <section className="wrap py-20">
      <p className="type-display text-xs uppercase tracking-[0.14em] text-mute">Projetos</p>
      <h1 className="type-display mt-3 max-w-[20ch] text-[clamp(1.9rem,4vw,2.75rem)]">
        Os 6 cases entram na etapa 2.
      </h1>
      <p className="mt-4 max-w-[52ch] text-mute">
        DS A Fonte, Agendamentos Augusto Mariani, Aprendizado7, Pastelaria Delivery, MTHS.PUBLI e
        Seklyn — cards com tilt+glare chegam na etapa 3.
      </p>
    </section>
  );
}
