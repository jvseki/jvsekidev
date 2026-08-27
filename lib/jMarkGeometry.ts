import * as THREE from "three";

export type JMarkGeometryOptions = {
  depth?: number;
  bevelThickness?: number;
  bevelSize?: number;
  bevelSegments?: number;
  curveSegments?: number;
};

/**
 * Contorno do J — os mesmos pontos de public/logo/j-mark.svg, só que
 * construídos direto em código em vez de carregados via SVGLoader/fetch.
 * Fica síncrono de propósito: tanto o hero ao vivo quanto o render do
 * Remotion usam isto, e o Remotion precisa de tudo determinístico, sem
 * depender de Suspense assíncrono resolvendo a tempo de cada frame.
 */
export function buildJMarkGeometry(opts: JMarkGeometryOptions = {}) {
  const shape = new THREE.Shape();
  shape.moveTo(37, 30);
  shape.lineTo(80, 0);
  shape.lineTo(66, 80);
  shape.lineTo(66, 108);
  shape.bezierCurveTo(66, 135, 38, 140, 15, 130);
  shape.bezierCurveTo(21, 120, 31, 112, 37, 108);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: opts.depth ?? 22,
    bevelEnabled: true,
    bevelThickness: opts.bevelThickness ?? 2.2,
    bevelSize: opts.bevelSize ?? 2.2,
    bevelSegments: opts.bevelSegments ?? 8,
    curveSegments: opts.curveSegments ?? 24,
  });

  // O contorno é Y-pra-baixo (convenção de tela); centraliza e corrige a
  // orientação pra ficar de pé no espaço 3D.
  geo.center();
  geo.rotateZ(Math.PI);
  geo.rotateY(Math.PI);
  geo.computeVertexNormals();
  return geo;
}

/** Cromo em toda a peça — ver nota em ExtrudedJMark sobre por que não
 * separar face preta do bisel. */
export function createChromeMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    metalness: 1,
    // 0.05 (quase espelho perfeito) refletindo um ambiente Lightformer de
    // resolução baixa (64) lia como manchas chapadas em vez de gradiente
    // metálico — um pouco mais de rugosidade borra o suficiente pra
    // parecer superfície polida de verdade, não plástico liso.
    roughness: 0.16,
    envMapIntensity: 0.85,
    clearcoat: 0.4,
  });
}
