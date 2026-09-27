import { ScrambleText } from "@/components/fx/ScrambleText";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lead?: string;
};

export function SectionHeading({ eyebrow, title, lead }: SectionHeadingProps) {
  return (
    <div className="max-w-[46ch]">
      <p className="eyebrow flex items-center gap-3">
        <span className="h-px w-6 bg-mute" aria-hidden="true" />
        <ScrambleText text={eyebrow} />
      </p>
      <h2 className="type-display mt-3 text-[clamp(1.6rem,3.4vw,2.25rem)] leading-tight">{title}</h2>
      {lead ? <p className="mt-3 text-mute">{lead}</p> : null}
    </div>
  );
}
