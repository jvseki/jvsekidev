import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-stroke">
      <div className="wrap flex flex-col items-center gap-4 py-10 text-sm text-mute md:flex-row md:justify-between">
        <div className="flex items-center gap-2.5">
          <Image src="/brand/logo-chrome.jpg" alt="" width={28} height={28} className="rounded-md" />
          <span className="type-display text-ink">JVSEKI DEV</span>
        </div>

        <p>{site.serviceArea}</p>

        <nav aria-label="Rodapé" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            Instagram
          </a>
          <a href={site.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            GitHub
          </a>
          <Link href="/contato" className="hover:text-ink">
            Contato
          </Link>
        </nav>
      </div>
    </footer>
  );
}
