import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { whatBitesBelow as game } from "@/lib/games";
import { pixelFont } from "@/lib/fonts";
import { PixelIcon } from "./PixelIcon";
import { YouTubeEmbed } from "./YouTubeEmbed";
import "@/styles/wbb.css";

/**
 * Destaque do What Bites Below na home, logo depois do hero. Usa a paleta
 * do jogo (.wbb) de propósito: é um "cartucho" diferente encaixado no
 * site preto+cromo — o contraste é o que chama atenção.
 */
export function FeaturedGame() {
  return (
    <section className={`wbb wbb-featured ${pixelFont.variable}`} aria-labelledby="featured-game">
      {/* eslint-disable-next-line @next/next/no-img-element -- pixel art: sem reamostragem do next/image */}
      <img src={game.img.thumbnail} alt="" loading="lazy" className="wbb-pixel wbb-featured__bg" />
      <div className="wrap relative grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
        <Reveal>
          <p className="flex flex-wrap items-center gap-3">
            <span className="wbb-badge">Novo</span>
            <span className="wbb-label">Meu jogo · demo grátis</span>
          </p>
          <h2 id="featured-game" className="wbb-title mt-5 text-[clamp(1.8rem,5vw,3.25rem)]">
            {game.name}
          </h2>
          <p className="mt-4 text-[1.15rem]">{game.tagline}</p>
          <p className="wbb-mute mt-4 max-w-[46ch] text-[0.98rem] leading-relaxed">
            Pesca em pixel art que começa aconchegante e vira terror psicológico. 5 noites, 14 criaturas cada vez
            mais erradas — jogue agora no navegador, sem instalar nada.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={`${game.path}#jogar`} className="wbb-btn wbb-btn--primary">
              ▶ Jogar agora
            </Link>
            <Link href={game.path} className="wbb-btn">
              Ver o jogo
            </Link>
            <Link href={game.supportPath} className="wbb-btn">
              <PixelIcon name="heart" size={16} className="mr-2" />
              Apoie
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <YouTubeEmbed id={game.trailerYouTubeId} title={`${game.name} — trailer`} poster={game.img.thumbnail} />
        </Reveal>
      </div>
    </section>
  );
}
