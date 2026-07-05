import React, { memo, useEffect, useRef } from "react";

// Pixel-block / halftone portrait rendered from a photo onto a TRANSPARENT canvas.
// Luminance -> red/black/gray cells; dark studio background falls below threshold
// and stays transparent, so the figure dissolves into scattered broken pixels.

const RED = "#dd2316";
const RED_DEEP = "#7c1f10";
const WHITE = "#ece8e3";
const GRAY = "#4a4641";

function rampColor(l) {
  if (l > 0.78) return WHITE; // rim-light highlights
  if (l > 0.46) return RED; // lit midtones
  if (l > 0.26) return RED_DEEP; // shadow side
  if (l > 0.1) return GRAY; // hair + faint edges (dim, blends on near-black)
  return null; // background -> transparent
}

function AsciiPortrait({ src = "/images/nipun.jpg", cols = 104, cell = 8, className, style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      if (cancelled) return;
      const aspect = img.height / img.width;
      const rows = Math.round(cols * aspect);

      // sample the photo down to the cell grid
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      octx.drawImage(img, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const W = cols * cell;
      const H = rows * cell;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      // deterministic rng
      let s = 20260627 >>> 0;
      const rnd = () => {
        s = (s * 1664525 + 1013904223) >>> 0;
        return s / 4294967296;
      };

      // figure: one block per lit cell, size scaled by luminance (halftone)
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const l = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          const col = rampColor(l);
          if (!col) continue;
          const size = cell * (0.42 + 0.58 * l);
          const o = (cell - size) / 2;
          ctx.fillStyle = col;
          ctx.fillRect(x * cell + o, y * cell + o, size, size);
        }
      }

      // broken-pixel scatter across the WHOLE frame, denser low/center
      const scatter = Math.round(cols * rows * 0.014);
      for (let k = 0; k < scatter; k++) {
        const x = rnd() * W;
        const y = rnd() < 0.6 ? (0.45 + rnd() * 0.55) * H : rnd() * H;
        const sz = cell * (0.3 + rnd() * 0.6);
        ctx.fillStyle = rnd() > 0.32 ? RED : RED_DEEP;
        ctx.globalAlpha = 0.5 + rnd() * 0.5;
        ctx.fillRect(x, y, sz, sz);
      }
      ctx.globalAlpha = 1;

      // a few horizontal corruption streaks
      for (let k = 0; k < 6; k++) {
        const by = rnd() * H;
        const bh = cell * (0.4 + rnd() * 1.3);
        const bx = rnd() * W * 0.5;
        const bw = W * (0.15 + rnd() * 0.5);
        ctx.fillStyle = RED;
        ctx.globalAlpha = 0.4;
        ctx.fillRect(bx, by, bw, bh);
      }
      ctx.globalAlpha = 1;
    };

    img.onerror = () => {}; // file not added yet — render nothing
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src, cols, cell]);

  return <canvas ref={canvasRef} className={className} style={style} role="img" aria-label="Nipun Sujesh" />;
}

export default memo(AsciiPortrait);
