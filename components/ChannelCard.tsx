import type { AnchorHTMLAttributes } from "react";

type ChannelCardProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  value: string;
  body: string;
};

export function ChannelCard({ label, value, body, ...props }: ChannelCardProps) {
  return (
    <a data-tilt className="panel block p-6 transition-colors hover:border-text-mute" {...props}>
      <p className="eyebrow">{label}</p>
      <h3 className="type-display mt-2 text-[1.25rem]">{value}</h3>
      <p className="mt-2 text-[0.95rem] text-mute">{body}</p>
    </a>
  );
}
