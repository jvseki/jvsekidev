import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { buildJMarkGeometry, createChromeMaterial } from "../lib/jMarkGeometry";
import { useMemo } from "react";

export const LOGO_LOOP_FPS = 30;
export const LOGO_LOOP_DURATION_SECONDS = 6;
export const LOGO_LOOP_SIZE = 1080;

const REST_TILT_X = (6 * Math.PI) / 180;

/**
 * J cromado girando 360° em Y com luz varrendo a superfície. Loop
 * perfeito: o giro completo (2π) é distribuído em (duração - 1) frames,
 * então o último frame (2π ≡ 0) fica visualmente idêntico ao primeiro —
 * sem precisar duplicar nem cortar frame nenhum.
 *
 * Sem <Environment>/<Lightformer>: a primeira tentativa usava isso pra
 * simular o ambiente do hero ao vivo, mas o PMREM é recalculado a cada
 * frame (o Remotion re-renderiza a cena do zero em cada um dos 180
 * frames) — um único frame estourou os 30s de timeout. Em troca, vários
 * pontos de luz fixos ao redor do objeto garantem que alguma faceta do
 * bisel sempre pegue brilho conforme ele gira, sem custo de PMREM.
 */
export function LogoLoop() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = frame / (durationInFrames - 1);
  const rotationY = progress * Math.PI * 2;

  // A luz varre mais rápido que o giro do objeto, pra parecer que o
  // reflexo "passa" pela superfície em vez de girar junto e parado. Duas
  // luzes em fases opostas garantem que o lado "de costas" pro giro
  // também pegue brilho em algum momento — uma luz só deixava buracos
  // apagados perto dos 90°/270°.
  const sweep = progress * Math.PI * 2 * 2;
  const lightX = Math.sin(sweep) * 6;
  const lightY = Math.cos(sweep * 0.6) * 3 + 1.5;
  const lightX2 = Math.sin(sweep + Math.PI) * 6;
  const lightY2 = Math.cos(sweep * 0.6 + Math.PI) * 3 + 1.5;

  // Depth bem maior que a versão ao vivo (22): girando 360° completos, uma
  // placa fina some de vista em perfil perto de 90°/270°. Mais espessura
  // garante silhueta reconhecível no giro inteiro, não só nos ±18° de
  // parallax que o hero ao vivo usa.
  const geometry = useMemo(() => buildJMarkGeometry({ depth: 70 }), []);
  const chrome = useMemo(() => createChromeMaterial(), []);

  return (
    <AbsoluteFill style={{ backgroundColor: "#050506" }}>
      <ThreeCanvas width={LOGO_LOOP_SIZE} height={LOGO_LOOP_SIZE} camera={{ position: [0, 0, 8], fov: 32 }}>
        {/* Bem mais luz do que parece precisar, de propósito: sem
            <Environment>, metal puro só aparece onde uma luz direta acerta,
            então cada faceta do bisel precisa da sua própria fonte — mas as
            intensidades da versão ao vivo (pensadas para cima do envMap)
            estouravam tudo em branco aqui. Reduzido bastante. */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 6]} intensity={0.7} />
        <directionalLight position={[-4, -2, 5]} intensity={0.35} />
        <pointLight position={[0, 0, 10]} intensity={10} />
        <pointLight position={[lightX, lightY, 4]} intensity={9} color="#ffffff" />
        <pointLight position={[lightX2, lightY2, 4]} intensity={9} color="#ffffff" />
        <pointLight position={[6, 2, 2]} intensity={6} />
        <pointLight position={[-6, -2, 2]} intensity={6} />

        <group rotation={[REST_TILT_X, rotationY, 0]}>
          <mesh geometry={geometry} material={chrome} scale={0.024} />
        </group>
      </ThreeCanvas>
    </AbsoluteFill>
  );
}
