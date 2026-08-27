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
  const geometry = useMemo(() => buildJMarkGeometry(), []);
  const chrome = useMemo(() => createChromeMaterial(), []);

  return <mesh geometry={geometry} material={chrome} scale={0.024} castShadow receiveShadow />;
}
