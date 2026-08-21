"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group, PointLight } from "three";
import { MathUtils } from "three";
import type { PointerRigState } from "@/lib/usePointerRig";
import { JMark } from "./JMark";

const MAX_Y_DEG = 18;
const MAX_X_DEG = 10;
const DAMPING = 0.08;
const EPSILON = 0.0005;

// Pose de repouso: de frente é o ângulo que menos mostra o bisel (a
// referência de "chapa cinza sem HDRI" do spec, ironicamente, também
// acontece de frente mesmo COM HDRI — a face fica alinhada com a parte
// escura do ambiente atrás da câmera). Girado, várias faces do bisel
// pegam luz ao mesmo tempo.
const REST_Y_DEG = 22;
const REST_X_DEG = 6;

type PointerRigProps = {
  pointerState: React.MutableRefObject<PointerRigState>;
  reduceMotion: boolean;
};

/**
 * Gira o J conforme o ponteiro (parallax) e desloca uma pointLight junto
 * — é essa luz seguindo o dedo/mouse que faz o reflexo escorrer pelo
 * cromo. frameloop="demand" no Canvas pai: só continua invalidando (e
 * portanto renderizando) enquanto rotação/luz ainda não convergiram no
 * alvo — parado, o loop some sozinho.
 */
export function PointerRig({ pointerState, reduceMotion }: PointerRigProps) {
  const group = useRef<Group>(null);
  const light = useRef<PointLight>(null);
  const invalidate = useThree((s) => s.invalidate);

  useFrame((_, delta) => {
    const g = group.current;
    const l = light.current;
    if (!g || !l) return;

    const { nx, ny, isTouch, dragging } = pointerState.current;
    const active = reduceMotion ? false : isTouch ? dragging : true;
    const tx = active ? nx : 0;
    const ty = active ? ny : 0;

    const targetY = MathUtils.degToRad(REST_Y_DEG + tx * MAX_Y_DEG);
    const targetX = MathUtils.degToRad(REST_X_DEG - ty * MAX_X_DEG);

    // Damping independente de frame-rate: mesmo "peso" do lerp em 30fps e 144fps.
    const t = 1 - Math.pow(1 - DAMPING, delta * 60);

    g.rotation.y = MathUtils.lerp(g.rotation.y, targetY, t);
    g.rotation.x = MathUtils.lerp(g.rotation.x, targetX, t);

    const targetLightX = tx * 5;
    const targetLightY = -ty * 5 + 2;
    l.position.x = MathUtils.lerp(l.position.x, targetLightX, t);
    l.position.y = MathUtils.lerp(l.position.y, targetLightY, t);

    const settled =
      Math.abs(g.rotation.y - targetY) < EPSILON &&
      Math.abs(g.rotation.x - targetX) < EPSILON &&
      Math.abs(l.position.x - targetLightX) < EPSILON &&
      Math.abs(l.position.y - targetLightY) < EPSILON;

    if (!settled) invalidate();
  });

  return (
    <>
      <pointLight ref={light} position={[0, 2, 4]} intensity={22} color="#ffffff" />
      <JMark ref={group} />
    </>
  );
}
