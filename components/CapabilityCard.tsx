import type { Capability } from "@/lib/content";

/**
 * `data-tilt` marca o card para o tilt+glare que a etapa 3 liga via JS.
 * Sem JS, ele permanece um card estático perfeitamente legível.
 */
export function CapabilityCard({ n, title, body }: Capability) {
  return (
    <article data-tilt className="panel p-6">
      <p className="numeral-chrome">{n}</p>
      <h3 className="type-display mt-4 text-[1.1rem]">{title}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">{body}</p>
    </article>
  );
}
