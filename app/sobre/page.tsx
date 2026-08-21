import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "João Victor Seki Mantovani — desenvolvedor de software focado em back-end Python, APIs REST e modelagem de banco de dados relacional.",
};

export default function SobrePage() {
  return (
    <section className="wrap py-20">
      <p className="type-display text-xs uppercase tracking-[0.14em] text-mute">Sobre</p>
      <h1 className="type-display mt-3 max-w-[20ch] text-[clamp(1.9rem,4vw,2.75rem)]">
        Conteúdo completo chega na etapa 2.
      </h1>
      <p className="mt-4 max-w-[52ch] text-mute">
        Esta rota já existe e usa o mesmo sistema de tokens do restante do site — falta preencher
        com o texto real da seção 05 (bio + stack técnica + currículo).
      </p>
    </section>
  );
}
