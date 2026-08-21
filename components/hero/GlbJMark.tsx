"use client";

import { useGLTF } from "@react-three/drei";

/**
 * Tenta carregar /models/j-logo.glb. Se o arquivo não existir (404) ou
 * falhar o parse, o erro sobe pra JMarkErrorBoundary, que troca pra
 * ExtrudedJMark automaticamente.
 */
export function GlbJMark() {
  const { scene } = useGLTF("/models/j-logo.glb");
  return <primitive object={scene} />;
}
