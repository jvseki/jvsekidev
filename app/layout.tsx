import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const HOME_TITLE = "JVSEKI — Desenvolvedor Python freelancer, sistemas web sob medida";
const HOME_DESCRIPTION =
  "Desenvolvedor de software focado em back-end Python, APIs REST e sistemas web sob medida. Freelancer remoto para todo o Brasil.";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  robots: { index: true, follow: true },
  // OG/Twitter/canonical da home vêm do helper; title fica por último de
  // propósito — sobrescreve o title simples do helper pelo objeto
  // {default, template}, que é o que permite "Sobre" virar "Sobre — JVSEKI"
  // nas páginas filhas sem cada uma repetir o sufixo.
  ...pageMetadata({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" }),
  title: {
    default: HOME_TITLE,
    template: `%s — ${site.brand}`,
  },
  description: HOME_DESCRIPTION,
};

export const viewport: Viewport = {
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SmoothScroll />
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
