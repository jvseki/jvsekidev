import Image from "next/image";
import Link from "next/link";
import { AutoVideo } from "@/components/fx/AutoVideo";
import { ScrollTiltFrame } from "@/components/fx/ScrollTiltFrame";
import { Reveal } from "@/components/Reveal";
import { interFont } from "@/lib/fonts";
import { seklyn } from "@/lib/seklyn";
import "@/styles/seklyn.css";

/**
 * Destaque da Seklyn na home. Mesma ideia do FeaturedGame: um "produto
 * dentro do portfólio", com a paleta violeta dela encaixada no preto+cromo.
 * O vídeo (Remotion) levanta com a rolagem.
 */
export function FeaturedSeklyn() {
  return (
    <section className={`sk overflow-hidden ${interFont.variable}`} aria-labelledby="featured-seklyn">
      <div className="sk-blobs" aria-hidden="true">
        <span />
      </div>
      <div className="sk-dots" aria-hidden="true" />
      <div className="wrap relative grid gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <Image src={seklyn.logo} alt="" width={40} height={40} />
            <span className="sk-badge">
              <span className="sk-badge__dot" aria-hidden="true" />
              Meu SaaS · no ar
            </span>
          </div>
          <h2 id="featured-seklyn" className="sk-title mt-6 text-[clamp(2rem,5vw,3.4rem)]">
            Seklyn: treino acompanhado <span className="sk-grad">de verdade.</span>
          </h2>
          <p className="sk-mute mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed">
            Plataforma pra personal trainers: o personal monta a ficha, o aluno marca série por série por um link sem
            senha, e o painel mostra quais exercícios estão sendo pulados. Ideia, banco, API, telas e servidor — tudo
            meu.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={seklyn.path} className="sk-btn sk-btn--primary">
              Ver o case completo →
            </Link>
            <a href={seklyn.url} target="_blank" rel="noopener noreferrer" className="sk-btn">
              seklyn.com.br ↗
            </a>
          </div>
        </Reveal>

        <ScrollTiltFrame>
          <div className="sk-frame aspect-video w-full">
            <AutoVideo src={seklyn.video.promo.src} poster={seklyn.video.promo.poster} label="Vídeo de apresentação da Seklyn" />
          </div>
        </ScrollTiltFrame>
      </div>
    </section>
  );
}
