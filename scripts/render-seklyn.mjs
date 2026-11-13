// Renderiza todos os vídeos da Seklyn em public/video/seklyn/ + posters.
// Compõe em 1080p e exporta em 720p (--scale): na página o vídeo nunca
// passa de ~1200px de largura, e o arquivo fica bem mais leve.
import { execSync } from "node:child_process";

const OUT = "public/video/seklyn";
const jobs = [
  { id: "SeklynPromo", file: "promo", scale: 0.6667, poster: 170 },
  { id: "SeklynPromoVertical", file: "promo-vertical", scale: 0.6667, poster: 170 },
  { id: "SeklynLoopFicha", file: "loop-ficha", scale: 0.6667, poster: 120 },
  { id: "SeklynLoopLink", file: "loop-link", scale: 0.6667, poster: 120 },
  { id: "SeklynLoopAluno", file: "loop-aluno", scale: 0.6667, poster: 150 },
  { id: "SeklynLoopAdesao", file: "loop-adesao", scale: 0.6667, poster: 140 },
];

const only = process.argv[2];
for (const j of jobs) {
  if (only && !j.id.includes(only)) continue;
  const run = (cmd) => execSync(cmd, { stdio: "inherit" });
  run(
    `npx remotion render remotion/index.ts ${j.id} ${OUT}/${j.file}.mp4 --codec=h264 --crf=24 --scale=${j.scale} --pixel-format=yuv420p --log=error`,
  );
  run(
    `npx remotion still remotion/index.ts ${j.id} ${OUT}/${j.file}.jpg --frame=${j.poster} --scale=${j.scale} --jpeg-quality=82 --log=error`,
  );
  console.log(`✓ ${j.file}`);
}
