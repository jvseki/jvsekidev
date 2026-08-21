// Fonte única dos dados de contato/identidade. Nada de telefone ou
// handle repetido à mão em componentes — importa daqui.

export const site = {
  name: "João Victor Seki Mantovani",
  brand: "JVSEKI",
  role: "Desenvolvedor de software · back-end Python",
  phoneDisplay: "(18) 99764-0335",
  phoneIntl: "5518997640335",
  email: "jv.s.m2006@hotmail.com",
  instagramHandle: "@jvseki_dev",
  instagramUrl: "https://instagram.com/jvseki_dev",
  githubHandle: "jvseki",
  githubUrl: "https://github.com/jvseki",
  domain: "jvsekidev.com.br",
  siteUrl: "https://jvsekidev.com.br",
  serviceArea: "Atendimento remoto · Brasil",
} as const;

/** Link do WhatsApp com texto pré-preenchido, sem menção a Andradina. */
export function waLink(message: string): string {
  return `https://wa.me/${site.phoneIntl}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  hero: "Olá João, vim pelo site da JVSEKI e quero conversar sobre um projeto.",
  generic: "Olá João, vim pelo site da JVSEKI.",
  sobre: "Olá João, vim pela página Sobre e quero conversar sobre um projeto.",
  contato: "Olá João, vim pela página de Contato e quero conversar sobre um projeto.",
  projeto: (name: string) =>
    `Olá João, vi o case ${name} no site da JVSEKI e quero conversar sobre um projeto parecido.`,
} as const;
