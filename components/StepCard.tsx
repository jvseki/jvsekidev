import type { HowWeWorkStep } from "@/lib/content";

export function StepCard({ n, title, body }: HowWeWorkStep) {
  return (
    <article className="border-t border-stroke pt-5">
      <p className="numeral-chrome text-[1.35rem]">{n}</p>
      <h3 className="type-display mt-3 text-[1.05rem]">{title}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">{body}</p>
    </article>
  );
}
