"use client";

import { useTilt } from "@/lib/useTilt";
import type { Capability } from "@/lib/content";

export function CapabilityCard({ n, title, body }: Capability) {
  const { ref, tiltHandlers } = useTilt<HTMLElement>();

  return (
    <article ref={ref} data-tilt className="panel tilt p-6" {...tiltHandlers}>
      <p className="numeral-chrome">{n}</p>
      <h3 className="type-display mt-4 text-[1.1rem]">{title}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">{body}</p>
      <span className="tilt-glare" aria-hidden="true" />
    </article>
  );
}
