import Image from "next/image";
import { Button } from "@/components/Button";
import { waLink, waMessages } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* 01 · HERO — fundo #050506 puro. O canvas WebGL com o "J" cromado
          entra na etapa 4 no lugar da imagem estática abaixo. */}
      <section className="relative overflow-hidden">
        <div className="wrap grid min-h-[68svh] items-center gap-8 py-14 md:min-h-[calc(100svh-72px)] md:grid-cols-2 md:gap-12 md:py-24">
          <div className="relative z-10">
            <h1 className="type-display max-w-[16ch] text-[clamp(2.1rem,8vw,3.75rem)] leading-[1.08]">
              Sistemas sob medida, do banco ao deploy.
            </h1>
            <p className="mt-5 max-w-[38ch] text-[1.05rem] text-mute md:mt-6">
              Desenvolvedor back-end Python. Freelance, remoto, para todo o Brasil.
            </p>
            <div className="mt-8 md:mt-9">
              <Button
                variant="chrome"
                href={waLink(waMessages.hero)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                Falar sobre seu projeto →
              </Button>
            </div>
          </div>

          {/* Placeholder estático do logo — vira <Canvas> do R3F na etapa 4. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.22] md:static md:opacity-100"
          >
            <Image
              src="/brand/logo-chrome.jpg"
              alt=""
              width={460}
              height={460}
              priority
              className="h-auto w-[68vw] max-w-[420px] rounded-md object-contain md:w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
