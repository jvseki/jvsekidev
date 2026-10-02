import type { Metadata } from "next";
import Link from "next/link";
import { PixDonation } from "@/components/apoie/PixDonation";
import { Reveal } from "@/components/Reveal";
import { whatBitesBelow as game } from "@/lib/games";
import { pixelFont } from "@/lib/fonts";
import { pageMetadata } from "@/lib/seo";
import "@/styles/wbb.css";

const TITLE = "Apoie o What Bites Below — jvseki dev";
const DESCRIPTION =
  "Apoie o desenvolvimento do What Bites Below com um Pix de qualquer valor. Dev indie, jogo feito por uma pessoa só.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: "/apoie",
    image: { url: game.img.thumbnail, width: 1920, height: 1080, alt: `${game.name} — capa` },
  }),
  title: { absolute: TITLE },
};

export default function ApoiePage() {
  return (
    <div className={`wbb wbb-page ${pixelFont.variable}`}>
      <section className="wbb-section">
        <div className="wrap">
          <Reveal>
            <Link href={game.path} className="wbb-link text-[0.9rem]">
              ← {game.name}
            </Link>
            <h1 className="wbb-title mt-6 text-[clamp(1.6rem,5vw,3rem)]">Apoie o {game.name}</h1>
            <p className="mt-4 max-w-[48ch] text-[1.1rem]">
              Sou dev indie e faço o {game.name} sozinho. Qualquer valor ajuda a continuar.
            </p>
          </Reveal>

          <div className="mt-10">
            <PixDonation />
          </div>

          <p className="wbb-mute mt-8 max-w-[60ch] text-[0.85rem]">
            Pagamento processado pelo Mercado Pago. O e-mail é usado só para gerar o Pix e não aparece em lugar
            nenhum; o nome (se você informar) entra nos créditos do jogo.
          </p>
        </div>
      </section>

      <section className="wbb-section wbb-credits">
        <div className="wrap">
          <p className="wbb-mute text-[0.95rem]">
            Um jogo de jvseki dev · Instagram{" "}
            <a href={game.instagram.url} target="_blank" rel="noopener noreferrer" className="wbb-link">
              {game.instagram.handle}
            </a>{" "}
            · Discord{" "}
            <a href={game.discordUrl} target="_blank" rel="noopener noreferrer" className="wbb-link">
              {game.discordUrl.replace("https://", "")}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
