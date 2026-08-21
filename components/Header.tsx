"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./Button";
import { site, waLink, waMessages } from "@/lib/site";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre mim" },
  { href: "/projetos", label: "Projetos" },
  { href: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-stroke bg-void/85 backdrop-blur">
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex flex-shrink-0 items-center gap-3"
          aria-label="JVSEKI — início"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo-chrome.jpg"
            alt=""
            width={36}
            height={36}
            className="rounded-md"
            priority
          />
          <span className="type-display text-[1.05rem]">
            JVSEKI <span className="text-mute">DEV</span>
          </span>
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center gap-[5px] rounded-md border border-stroke md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-[18px] bg-ink transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span className={`block h-px w-[18px] bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-px w-[18px] bg-ink transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>

        <nav
          aria-label="Principal"
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-[72px] flex-col gap-1 border-b border-stroke bg-void p-4 md:static md:flex md:flex-row md:items-center md:gap-1 md:border-none md:bg-transparent md:p-0`}
        >
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2.5 text-[0.92rem] font-medium transition-colors md:py-2 ${
                  active ? "text-ink" : "text-mute hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Button
            variant="chrome"
            href={waLink(waMessages.generic)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 md:ml-2 md:mt-0"
          >
            {site.serviceArea}
          </Button>
        </nav>
      </div>
    </header>
  );
}
