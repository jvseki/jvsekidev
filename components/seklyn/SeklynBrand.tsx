import Image from "next/image";
import { seklyn } from "@/lib/seklyn";

/** Logo oficial (S cromado) + "Sek" escuro e "lyn" roxo — igual à nav do seklyn.com.br. */
export function SeklynBrand({ size = 36, priority = false }: { size?: number; priority?: boolean }) {
  return (
    <span className="sk-brand">
      <Image src={seklyn.logo} alt="" width={size} height={Math.round(size * (498 / 512))} priority={priority} />
      <span className="sk-wordmark" style={{ fontSize: size * 0.72 }}>
        Sek<span>lyn</span>
      </span>
    </span>
  );
}
