import type { Metadata } from "next";
import { site } from "./site";

type PageSeoInput = {
  title: string;
  description: string;
  /** Caminho absoluto a partir da raiz, ex.: "/", "/sobre". */
  path: string;
};

/**
 * Monta título, descrição, canonical, OG e Twitter card de um jeito
 * consistente pra cada página — nenhuma menção a Andradina ou "negócios
 * locais" em lugar nenhum aqui, o eixo é: dev Python freelancer, sistemas
 * sob medida, atendimento remoto no Brasil inteiro.
 */
export function pageMetadata({ title, description, path }: PageSeoInput): Metadata {
  const url = `${site.siteUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.brand,
      locale: "pt_BR",
      type: "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${site.brand} — ${site.role}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.jpg"],
    },
  };
}
