import type { CaseStudy } from "@/lib/content";

export function CaseCard({ n, name, kind, description, stack, href, linkLabel }: CaseStudy) {
  return (
    <article data-tilt className="panel flex flex-col p-6">
      <p className="numeral-chrome">{n}</p>
      <p className="eyebrow mt-3">{kind}</p>
      <h3 className="type-display mt-1 text-[1.2rem]">{name}</h3>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-mute">{description}</p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
        {stack.map((tech) => (
          <li key={tech} className="chip">
            {tech}
          </li>
        ))}
      </ul>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-stroke underline-offset-4 transition-colors hover:decoration-ink"
      >
        {linkLabel} →
      </a>
    </article>
  );
}
