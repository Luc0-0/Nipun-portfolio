import sharp from "sharp";
import { writeFileSync } from "fs";

const RED = "#dd2316";
const F = {
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  ".": ["00000", "00000", "00000", "00000", "00000", "01100", "01100"],
};

function word(text, x0, y0, s, color, gap = 1) {
  let out = "";
  let x = x0;
  for (const ch of text) {
    const g = F[ch];
    if (!g) { x += s * 3; continue; }
    g.forEach((row, ry) => {
      [...row].forEach((b, rx) => {
        if (b === "1") out += `<rect x="${x + rx * s}" y="${y0 + ry * s}" width="${s}" height="${s}" fill="${color}"/>`;
      });
    });
    x += s * (5 + gap);
  }
  return { svg: out, width: x - x0 - s * gap };
}

// ---------- favicon ----------
const NGRID = [
  "11000011",
  "11100011",
  "11110011",
  "11011011",
  "11011011",
  "11001111",
  "11001111",
  "11000111",
  "11000011",
  "11000011",
];
let npix = "";
NGRID.forEach((row, y) =>
  [...row].forEach((b, x) => {
    if (b === "1") npix += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="#ee2a18"/>`;
  })
);
const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="7" fill="#080808"/>
<g transform="translate(6,6) scale(2.5,2)">${npix}</g>
</svg>`;
writeFileSync("C:/projects/Nipun-portfolio/public/favicon.svg", fav);
await sharp(Buffer.from(fav)).resize(32, 32).png().toFile("C:/projects/Nipun-portfolio/public/favicon-32.png");
await sharp(Buffer.from(fav)).resize(180, 180).png().toFile("C:/projects/Nipun-portfolio/public/apple-touch-icon.png");
await sharp(Buffer.from(fav)).resize(256, 256).png().toFile("C:/projects/Nipun-portfolio/public/favicon-256.png");

// ---------- og image 1200x630 ----------
const S = 14;
const wm = word("NIPUN.OS", 0, 0, S, RED);
const wx = (1200 - wm.width) / 2;
const grid = (() => {
  let g = "";
  for (let x = 0; x <= 1200; x += 40) g += `<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="rgba(170,160,155,0.055)" stroke-width="1"/>`;
  for (let y = 0; y <= 630; y += 40) g += `<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="rgba(170,160,155,0.055)" stroke-width="1"/>`;
  return g;
})();
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#050505"/>
${grid}
<rect x="0" y="0" width="1200" height="3" fill="${RED}"/>
<g transform="translate(${wx},170)">${wm.svg}</g>
<rect x="${wx + wm.width + 18}" y="${170 + S * 5}" width="${S * 0.9}" height="${S * 2}" fill="${RED}"/>
<text x="600" y="365" text-anchor="middle" font-family="Consolas, 'Courier New', monospace" font-size="34" fill="#ece8e3">AI Engineer · RAG, Agents &amp; Full-Stack</text>
<text x="600" y="425" text-anchor="middle" font-family="Consolas, 'Courier New', monospace" font-size="24" fill="#8a857f">builds AI products end to end · Serenity · PRAGATI · Uni-Verse</text>
<text x="600" y="520" text-anchor="middle" font-family="Consolas, 'Courier New', monospace" font-size="26" fill="${RED}">&gt; ask LucBot anything_</text>
<text x="1160" y="600" text-anchor="end" font-family="Consolas, 'Courier New', monospace" font-size="20" fill="#4f4a45">nipun.space</text>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile("C:/projects/Nipun-portfolio/public/og.png");
const { size } = await import("fs").then((f) => f.statSync("C:/projects/Nipun-portfolio/public/og.png"));
console.log("done. og.png", Math.round(size / 1024) + "KB");
