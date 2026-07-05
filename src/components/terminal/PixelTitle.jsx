import React, { memo, useMemo } from "react";

// 5x7 bitmap font — only the glyphs the wordmark needs.
const GLYPHS = {
  N: ["1...1", "11..1", "1.1.1", "1.1.1", "1..11", "1...1", "1...1"],
  I: ["11111", "..1..", "..1..", "..1..", "..1..", "..1..", "11111"],
  P: ["1111.", "1...1", "1...1", "1111.", "1....", "1....", "1...."],
  U: ["1...1", "1...1", "1...1", "1...1", "1...1", "1...1", ".111."],
  S: [".1111", "1....", "1....", ".111.", "....1", "....1", "1111."],
  J: ["..111", "...1.", "...1.", "...1.", "...1.", "1..1.", ".11.."],
  E: ["11111", "1....", "1....", "1111.", "1....", "1....", "11111"],
  H: ["1...1", "1...1", "1...1", "11111", "1...1", "1...1", "1...1"],
  " ": [".....", ".....", ".....", ".....", ".....", ".....", "....."],
};

const COLS = 5;
const ROWS = 7;
const LETTER_GAP = 1; // empty columns between letters
const LINE_GAP = 2.5; // empty rows between lines
const SUBDIV = 3; // each font pixel = SUBDIV x SUBDIV smaller squares

// Render words as a grid of square tiles. Each "on" cell is a real rect,
// so the pixel look is exact (not a font). Extrusion via stacked drop-shadows.
function PixelTitle({ lines, fill = "#dd2316", shadow = "#70180f", style, className }) {
  const { rects, vbW, vbH } = useMemo(() => {
    const out = [];
    let maxW = 0;
    lines.forEach((word, li) => {
      const yBase = li * (ROWS + LINE_GAP);
      let x = 0;
      for (const ch of word.toUpperCase()) {
        const g = GLYPHS[ch] || GLYPHS[" "];
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            if (g[r][c] === "1") out.push({ x: x + c, y: yBase + r });
          }
        }
        x += COLS + LETTER_GAP;
      }
      maxW = Math.max(maxW, x - LETTER_GAP);
    });
    return { rects: out, vbW: maxW, vbH: lines.length * ROWS + (lines.length - 1) * LINE_GAP };
  }, [lines]);

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      role="img"
      aria-label={lines.join(" ")}
      className={className}
      style={{
        display: "block",
        overflow: "visible",
        // Lifted extrusion: thin red transition, muted-BLACK middle (the lift), deep-red base.
        filter: `drop-shadow(2px 2px 0 #9a1c0f) drop-shadow(5px 6px 0 #100b09) drop-shadow(9px 11px 0 ${shadow})`,
        ...style,
      }}
    >
      {rects.flatMap((p) => {
        const u = 1 / SUBDIV;
        const g = u * 0.16; // gutter between the small squares
        const tiles = [];
        for (let sy = 0; sy < SUBDIV; sy++) {
          for (let sx = 0; sx < SUBDIV; sx++) {
            // ~1.5% of tiles run darker — intentional imperfection, not random noise.
            const off = (p.x * 31 + p.y * 17 + sx * 7 + sy * 13) % 61 === 0;
            tiles.push(
              <rect
                key={`${p.x}.${p.y}.${sx}.${sy}`}
                x={p.x + sx * u + g}
                y={p.y + sy * u + g}
                width={u - 2 * g}
                height={u - 2 * g}
                rx={u * 0.16}
                ry={u * 0.16}
                fill={off ? "#a81d11" : fill}
              />
            );
          }
        }
        return tiles;
      })}
    </svg>
  );
}

export default memo(PixelTitle);
