"use client";

import { Suspense, forwardRef, type Ref } from "react";
import type { Group } from "three";
import { JMarkErrorBoundary } from "./JMarkErrorBoundary";
import { GlbJMark } from "./GlbJMark";
import { ExtrudedJMark } from "./ExtrudedJMark";

/**
 * GLB real se existir em /public/models/j-logo.glb; senão, o J extrudado
 * a partir do SVG. O grupo exposto via ref é o que o PointerRig gira.
 */
function JMarkInner(_props: object, ref: Ref<Group>) {
  return (
    <group ref={ref}>
      <JMarkErrorBoundary fallback={<ExtrudedJMark />}>
        <Suspense fallback={null}>
          <GlbJMark />
        </Suspense>
      </JMarkErrorBoundary>
    </group>
  );
}

export const JMark = forwardRef(JMarkInner);
