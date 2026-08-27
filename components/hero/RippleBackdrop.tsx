"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { RipplePoint } from "@/lib/useRipplePointers";

const SIM_SIZE = 128;
const MAX_TOUCHES = 8;
const SETTLE_MS = 2500; // continua simulando um tempo depois do último toque, pra onda decair visivelmente

const simVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const simFragment = /* glsl */ `
  uniform sampler2D uPrevious;
  uniform vec2 uTexel;
  uniform vec2 uTouches[${MAX_TOUCHES}];
  uniform float uTouchCount;
  varying vec2 vUv;

  void main() {
    vec4 prev = texture2D(uPrevious, vUv);
    float pressure = prev.r;
    float vel = prev.g;

    float n = texture2D(uPrevious, vUv + vec2(0.0, uTexel.y)).r;
    float s = texture2D(uPrevious, vUv - vec2(0.0, uTexel.y)).r;
    float e = texture2D(uPrevious, vUv + vec2(uTexel.x, 0.0)).r;
    float w = texture2D(uPrevious, vUv - vec2(uTexel.x, 0.0)).r;

    vel += (n + s + e + w - 4.0 * pressure) * 0.5;
    vel *= 0.978; // decaimento — sem isto a onda nunca some
    pressure += vel;
    pressure *= 0.995;

    for (int i = 0; i < ${MAX_TOUCHES}; i++) {
      if (float(i) < uTouchCount) {
        float d = distance(vUv, uTouches[i]);
        pressure += smoothstep(0.04, 0.0, d) * 0.28;
      }
    }

    gl_FragColor = vec4(pressure, vel, 0.0, 1.0);
  }
`;

const bgVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const bgFragment = /* glsl */ `
  uniform sampler2D uRipple;
  varying vec2 vUv;
  void main() {
    float h = texture2D(uRipple, vUv).r;
    vec3 base = vec3(0.02, 0.02, 0.024);
    vec3 glow = vec3(0.5, 0.52, 0.58);
    float amt = clamp(h * 1.6, 0.0, 1.0);
    gl_FragColor = vec4(base + glow * amt, 1.0);
  }
`;

type RippleBackdropProps = {
  points: MutableRefObject<Map<number, RipplePoint>>;
  reduceMotion: boolean;
};

/**
 * Onda de distorção sutil no fundo, atrás do J — ping-pong entre dois
 * render targets: cada frame lê o estado anterior, propaga (equação de
 * onda discreta) e injeta energia nos pontos de toque ativos. Aplicado
 * sutil de propósito (amt clamp baixo) — é ambientação, não brinquedo.
 *
 * Sem ripple sob prefers-reduced-motion — spec pede desligar.
 */
export function RippleBackdrop({ points, reduceMotion }: RippleBackdropProps) {
  const { gl } = useThree();
  const invalidate = useThree((s) => s.invalidate);
  const flip = useRef(false);
  // Só começa a rodar no primeiro toque real — nada de simular os
  // primeiros SETTLE_MS de todo carregamento de página à toa. Isso
  // sozinho custava a mesma janela de tempo inteira em render passes +
  // invalidate() contínuo antes de qualquer interação, pesando no
  // Lighthouse. O material já nasce apontando pra sim.rtA.texture (um
  // RT válido, só que preto/plano) — sem ripple ativo o fundo fica
  // exatamente igual ao void da página, que é o estado de repouso certo.
  const lastActive = useRef<number | null>(null);

  const sim = useMemo(() => {
    const opts: THREE.RenderTargetOptions = {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      depthBuffer: false,
      stencilBuffer: false,
    };
    const rtA = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, opts);
    const rtB = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, opts);
    const material = new THREE.ShaderMaterial({
      vertexShader: simVertex,
      fragmentShader: simFragment,
      uniforms: {
        uPrevious: { value: null },
        uTexel: { value: new THREE.Vector2(1 / SIM_SIZE, 1 / SIM_SIZE) },
        uTouches: { value: Array.from({ length: MAX_TOUCHES }, () => new THREE.Vector2(-10, -10)) },
        uTouchCount: { value: 0 },
      },
    });
    const scene = new THREE.Scene();
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    return { rtA, rtB, material, scene, camera };
  }, []);

  const bgMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: bgVertex,
        fragmentShader: bgFragment,
        uniforms: { uRipple: { value: sim.rtA.texture } },
      }),
    [sim]
  );

  useFrame(() => {
    if (reduceMotion) return;

    const active = Array.from(points.current.values()).slice(0, MAX_TOUCHES);
    if (active.length > 0) lastActive.current = performance.now();
    if (lastActive.current === null) return; // ninguém tocou ainda — sem trabalho nenhum
    const stillSettling = performance.now() - lastActive.current < SETTLE_MS;
    if (!stillSettling) return; // parado: nada a simular, não precisa nem trocar os RTs

    const read = flip.current ? sim.rtB : sim.rtA;
    const write = flip.current ? sim.rtA : sim.rtB;

    const uniforms = sim.material.uniforms;
    uniforms.uPrevious.value = read.texture;
    const arr = uniforms.uTouches.value as THREE.Vector2[];
    for (let i = 0; i < MAX_TOUCHES; i++) {
      if (i < active.length) arr[i].set(active[i].u, active[i].v);
      else arr[i].set(-10, -10);
    }
    uniforms.uTouchCount.value = active.length;

    const prevTarget = gl.getRenderTarget();
    gl.setRenderTarget(write);
    gl.render(sim.scene, sim.camera);
    gl.setRenderTarget(prevTarget);

    bgMaterial.uniforms.uRipple.value = write.texture;
    flip.current = !flip.current;

    invalidate();
  });

  return (
    <mesh position={[0, 0, -6]} scale={[40, 40, 1]} renderOrder={-1}>
      <planeGeometry args={[1, 1]} />
      <primitive object={bgMaterial} attach="material" />
    </mesh>
  );
}
