"use client";

import { Suspense, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Canvas, type RootState } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { usePointerRig } from "@/lib/usePointerRig";
import { useRipplePointers } from "@/lib/useRipplePointers";
import { useInView } from "@/lib/useInView";
import { PointerRig } from "./PointerRig";
import { RippleBackdrop } from "./RippleBackdrop";

function detectCapable(): boolean {
  if (typeof window === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 8;
  if (cores <= 4) return false;
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}

/**
 * Fundo #050506 puro + J cromado em 3D. SSR e o primeiro paint do
 * cliente sempre renderizam o fallback estático (a checagem de WebGL2 /
 * hardwareConcurrency só existe no navegador) — depois de montar, se a
 * máquina aguentar, troca pro <Canvas> de verdade. Isso evita qualquer
 * mismatch de hidratação e, de quebra, já cobre o fallback exigido pra
 * hardware fraco: em vez de imagem estática, o loop .webm do Remotion
 * (public/video/logo-loop.webm) — mesmo J, girando sozinho, sem depender
 * de WebGL nenhum.
 */
export function HeroScene() {
  const [capable, setCapable] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const { pointerState, handlers } = usePointerRig();
  const { points: ripplePoints, handlers: rippleHandlers } = useRipplePointers();
  const [wrapRef, inView] = useInView<HTMLDivElement>();
  const invalidateRef = useRef<(() => void) | null>(null);
  // Escopado ao próprio hero (não a página inteira): frameloop já pausa
  // fora da viewport, então só a rolagem que atravessa a seção importa —
  // rastrear a página toda faria a rotação mal se mover antes do canvas
  // sumir de vista.
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end start"] });

  // Com frameloop="demand", nada re-renderiza sozinho: cada handler de
  // ponteiro (e cada mudança de scroll) precisa cutucar o loop do R3F
  // manualmente pra ele pegar o novo estado no próximo useFrame.
  const wrappedHandlers = {
    onPointerMove(e: ReactPointerEvent) {
      handlers.onPointerMove(e);
      rippleHandlers.onPointerMove(e);
      invalidateRef.current?.();
    },
    onPointerDown(e: ReactPointerEvent) {
      handlers.onPointerDown(e);
      rippleHandlers.onPointerDown(e);
      invalidateRef.current?.();
    },
    onPointerUp(e: ReactPointerEvent) {
      handlers.onPointerUp();
      rippleHandlers.onPointerUp(e);
      invalidateRef.current?.();
    },
    onPointerCancel(e: ReactPointerEvent) {
      handlers.onPointerCancel();
      rippleHandlers.onPointerCancel(e);
      invalidateRef.current?.();
    },
    onPointerLeave(e: ReactPointerEvent) {
      handlers.onPointerLeave();
      rippleHandlers.onPointerLeave(e);
      invalidateRef.current?.();
    },
  };

  useMotionValueEvent(scrollYProgress, "change", () => {
    invalidateRef.current?.();
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);

    // O <Canvas> (three.js + WebGLRenderer + primeiro render) é a maior
    // fatia de trabalho de JS da página — medido no Lighthouse mobile,
    // sozinho já passava de segundos de bloqueio da main thread bem no
    // meio da janela de LCP/TTI. O vídeo/imagem de fallback já entrega
    // um J cromado visível e legível na hora; o upgrade pro canvas
    // interativo espera o navegador ficar ocioso (ou um teto curto), em
    // vez de competir pelo thread principal durante o carregamento
    // crítico. Mesmo conteúdo, só chega um instante depois.
    const win = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

    const upgrade = () => setCapable(detectCapable());

    if (typeof win.requestIdleCallback === "function") {
      idleHandle = win.requestIdleCallback(upgrade, { timeout: 2500 });
    } else {
      timeoutHandle = setTimeout(upgrade, 1200);
    }

    return () => {
      mq.removeEventListener("change", onChange);
      if (idleHandle !== undefined) win.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full w-full" {...wrappedHandlers}>
      {capable ? (
        <Canvas
          dpr={[1, 2]}
          frameloop={inView ? "demand" : "never"}
          camera={{ position: [0, 0, 8], fov: 32 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={(state: RootState) => {
            invalidateRef.current = state.invalidate;
            // frameloop="demand" não desenha o primeiro frame sozinho —
            // sem isto o canvas fica vazio (limpo, alpha 0) até o
            // primeiro pointermove.
            state.invalidate();
          }}
        >
          {/* <Environment preset="studio"> media ~8s de JS no Lighthouse
              mobile (fetch de um HDR externo + PMREM). Cranking a
              intensidade de pointLights não resolveu: metal só reflete de
              ângulos específicos — sem luz vindo de uma direção, aquele
              trecho do bisel fica escuro não importa a intensidade das
              outras. <Environment> com <Lightformer> gera o mapa de
              reflexo localmente (sem fetch nenhum), então cobre muito mais
              direções ao mesmo custo de uma textura pequena computada uma
              vez no mount — não por frame, como acontecia no Remotion. */}
          <ambientLight intensity={0.15} />
          <Environment resolution={64} background={false}>
            <Lightformer form="rect" intensity={1.1} position={[0, 3, 4]} scale={[6, 3, 1]} />
            <Lightformer form="rect" intensity={0.7} position={[-4, 0, 3]} scale={[3, 5, 1]} rotation-y={Math.PI / 3} />
            <Lightformer form="rect" intensity={0.7} position={[4, 0, 3]} scale={[3, 5, 1]} rotation-y={-Math.PI / 3} />
            <Lightformer form="ring" intensity={0.9} position={[0, 0, 6]} scale={4} />
          </Environment>
          <RippleBackdrop points={ripplePoints} reduceMotion={reduceMotion} />
          <Suspense fallback={null}>
            <PointerRig pointerState={pointerState} reduceMotion={reduceMotion} scrollYProgress={scrollYProgress} />
          </Suspense>
        </Canvas>
      ) : reduceMotion ? (
        // Sem WebGL e com reduced-motion: nem o vídeo autoplay entra —
        // fica só a imagem parada, igual ao resto do site nesse modo.
        <img src="/brand/logo-chrome.jpg" alt="" className="h-full w-full object-contain" />
      ) : (
        <video
          src="/video/logo-loop.webm"
          poster="/brand/logo-chrome.jpg"
          className="h-full w-full object-contain"
          autoPlay
          loop
          muted
          playsInline
        />
      )}
    </div>
  );
}
