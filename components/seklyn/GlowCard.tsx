"use client";

/** Card .sk com brilho violeta seguindo o ponteiro (só onde há hover). */
export function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <div className={`sk-card sk-card--glow ${className}`} onPointerMove={onPointerMove}>
      {children}
    </div>
  );
}
