import type { AnchorHTMLAttributes } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "chrome" | "ghost";
};

/**
 * CTA compartilhado. `variant="chrome"` é o único lugar (além do logo e dos
 * numerais de seção) onde o gradiente cromado pode aparecer — e mesmo assim
 * só no traço, nunca preenchendo o botão inteiro.
 */
export function Button({ variant = "ghost", className = "", children, ...props }: ButtonProps) {
  const base = variant === "chrome" ? "btn btn-chrome" : "btn btn-ghost";
  return (
    <a className={`${base} ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}
