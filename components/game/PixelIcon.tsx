// Ícones em pixel art desenhados como grade de caracteres: "#" = cor
// cheia (currentColor), "+" = brilho (var(--wbb-text)), "." = vazio.
// SVG com shape-rendering crispEdges, então escala sem borrar.

const ICONS = {
  windows: [
    "..........",
    ".####.####",
    ".####.####",
    ".####.####",
    ".####.####",
    "..........",
    ".####.####",
    ".####.####",
    ".####.####",
    ".####.####",
  ],
  floppy: [
    "#########.",
    "#.+++++.##",
    "#.+++++.##",
    "#.......##",
    "##########",
    "#++++++++#",
    "#+######+#",
    "#++++++++#",
    "#+######+#",
    "##########",
  ],
  browser: [
    "##########",
    "#+.+.+####",
    "##########",
    "#........#",
    "#.##.....#",
    "#.#.#....#",
    "#.##..##.#",
    "#....##..#",
    "#........#",
    "##########",
  ],
  heart: [
    "..........",
    ".###..###.",
    "##+####+##",
    "##########",
    "##########",
    ".########.",
    "..######..",
    "...####...",
    "....##....",
    "..........",
  ],
} as const;

export type PixelIconName = keyof typeof ICONS;

export function PixelIcon({ name, size = 40, className = "" }: { name: PixelIconName; size?: number; className?: string }) {
  const rows = ICONS[name];
  return (
    <svg
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {rows.flatMap((row, y) =>
        row.split("").map((c, x) =>
          c === "." ? null : (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="1"
              height="1"
              fill={c === "+" ? "var(--wbb-text)" : "currentColor"}
            />
          )
        )
      )}
    </svg>
  );
}
