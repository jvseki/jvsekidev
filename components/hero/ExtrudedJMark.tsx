"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

/**
 * Fallback quando não existe /models/j-logo.glb: extruda o contorno do J
 * (public/logo/j-mark.svg) com bevel, reproduzindo o bisel do render
 * original. Cromo em toda a peça — testado com faces de frente/verso em
 * preto piano separado do bisel e ficou lendo como "bloco escuro com
 * borda", não como o logo cromado da referência. O bisel sozinho já
 * entrega o rim light quando a luz reativa varre a superfície.
 */
export function ExtrudedJMark() {
  const data = useLoader(SVGLoader, "/logo/j-mark.svg");

  const geometry = useMemo(() => {
    const path = data.paths[0];
    const shapes = path.toShapes();

    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 22,
      bevelEnabled: true,
      bevelThickness: 2.2,
      bevelSize: 2.2,
      bevelSegments: 8,
      curveSegments: 24,
    });

    // O SVG usa o sistema de coordenadas de tela (Y pra baixo, origem
    // canto sup. esquerdo). Centraliza e inverte pra ficar de pé no 3D.
    geo.center();
    geo.rotateZ(Math.PI);
    geo.rotateY(Math.PI);
    geo.computeVertexNormals();
    return geo;
  }, [data]);

  // Cromo em toda a peça — o bisel (normais variando ao longo da borda)
  // já cria o "rim light branco fino" sozinho quando a luz reativa passa
  // por cima, sem precisar de uma segunda face preta separada.
  const chrome = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        metalness: 1,
        roughness: 0.05,
        envMapIntensity: 1.6,
        clearcoat: 0.4,
      }),
    []
  );

  return <mesh geometry={geometry} material={chrome} scale={0.024} castShadow receiveShadow />;
}
