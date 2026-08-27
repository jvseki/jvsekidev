"use client";

import { Suspense, forwardRef, useEffect, useState, type Ref } from "react";
import dynamic from "next/dynamic";
import type { Group } from "three";
import { JMarkErrorBoundary } from "./JMarkErrorBoundary";
import { ExtrudedJMark } from "./ExtrudedJMark";

// GLTFLoader + DRACOLoader custam ~200kB de JS e, no Lighthouse mobile,
// mediram sozinhos uns bons segundos de scripting — só pra tentar (e
// falhar) carregar um GLB que não existe ainda. Em vez de montar
// <GlbJMark> sempre e deixar o erro acontecer depois, checa primeiro com
// um HEAD leve; só importa o código do GLTFLoader se o arquivo realmente
// existir. Sem isso, o custo dessas libs cai pra zero.
const GlbJMark = dynamic(() => import("./GlbJMark").then((m) => m.GlbJMark), { ssr: false });

function useGlbAvailable() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    let cancelled = false;
    fetch("/models/j-logo.glb", { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return available;
}

/**
 * GLB real se existir em /public/models/j-logo.glb; senão, o J extrudado
 * a partir do SVG. O grupo exposto via ref é o que o PointerRig gira.
 */
function JMarkInner(_props: object, ref: Ref<Group>) {
  const glbAvailable = useGlbAvailable();

  return (
    <group ref={ref}>
      {glbAvailable ? (
        <JMarkErrorBoundary fallback={<ExtrudedJMark />}>
          <Suspense fallback={null}>
            <GlbJMark />
          </Suspense>
        </JMarkErrorBoundary>
      ) : (
        <ExtrudedJMark />
      )}
    </group>
  );
}

export const JMark = forwardRef(JMarkInner);
