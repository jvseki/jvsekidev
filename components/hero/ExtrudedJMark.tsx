"use client";

import { useMemo } from "react";
import { buildJMarkGeometry, createChromeMaterial } from "@/lib/jMarkGeometry";

/**
 * Fallback quando não existe /models/j-logo.glb: extruda o contorno do J
 * com bevel, reproduzindo o bisel do render original. Cromo em toda a
 * peça — testado com faces de frente/verso em preto piano separado do
 * bisel e ficou lendo como "bloco escuro com borda", não como o logo
 * cromado da referência. O bisel sozinho já entrega o rim light quando a
 * luz reativa varre a superfície.
 */
export function ExtrudedJMark() {
  // curveSegments/bevelSegments bem abaixo do padrão (24/8): o contorno
  // vetorizado (potrace) já vem com muitos comandos de curva próprios —
  // cada um subdividido pelo curveSegments — então o mesmo valor usado no
  // J antigo (14) gerava ~20 mil triângulos aqui. 5/3 volta pra ~4.8 mil
  // (o antigo, mais simples, ficava em ~760) sem ficar visivelmente
  // facetado nas curvas.
  const geometry = useMemo(() => buildJMarkGeometry({ curveSegments: 5, bevelSegments: 3 }), []);
  const chrome = useMemo(() => createChromeMaterial(), []);

  return <mesh geometry={geometry} material={chrome} scale={0.024} />;
}
