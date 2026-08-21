import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { skills, sobreParagraphs } from "@/lib/content";
import { site, waLink, waMessages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "João Victor Seki Mantovani — desenvolvedor de software focado em back-end Python, APIs REST e modelagem de banco de dados relacional. Cursando ADS na AEMS.",
};

export default function SobrePage() {
  return (
    <section className="py-16 md:py-20">
      <div className="wrap grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-14">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-md border border-stroke md:mx-0">
          <Image
            src="/brand/joao-foto.png"
            alt="João Victor, desenvolvedor JVSEKI"
            fill
            sizes="(min-width: 768px) 320px, 80vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <p className="eyebrow">Sobre</p>
          <h1 className="type-display mt-3 text-[clamp(1.9rem,4vw,2.5rem)] leading-tight">
            João Victor Seki Mantovani
          </h1>

          <div className="mt-5 space-y-4">
            {sobreParagraphs.map((p) => (
              <p key={p} className="max-w-[58ch] text-[1.02rem] leading-relaxed text-mute">
                {p}
              </p>
            ))}
          </div>

          <p className="eyebrow mt-9">Stack</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack técnica">
            {skills.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button variant="chrome" href={waLink(waMessages.sobre)} target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp
            </Button>
            <Button variant="ghost" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
              Baixar currículo (PDF)
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
