import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import sharp from 'sharp';
const require = createRequire(new URL('../../.scratch/qr-tools/package.json', import.meta.url));
const QRCode = require('qrcode');
const jsQR = require('jsqr');
const folder = new URL('./', import.meta.url);
const url = 'https://leifnevenermusic.com/';
const cream = '#F0E9DC', ink = '#26332C';
const matrix = QRCode.create(url, { errorCorrectionLevel: 'H' }).modules;
const font = (await readFile(new URL('../../src/assets/DMSans-Latin.woff2', import.meta.url))).toString('base64');
const text = (x, y, value, size, anchor = 'middle', weight = 500, color = ink, spacing = 0) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="DM Sans,Arial,sans-serif" font-size="${size}" font-weight="${weight}" letter-spacing="${spacing}" fill="${color}">${value}</text>`;
function code(x, y, side, round = .12) {
  const n = matrix.size, cell = side / (n + 8);
  let bits = `<rect width="${n + 8}" height="${n + 8}" fill="${cream}"/>`;
  const finder = (r, c) => (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  for (let row = 0; row < n; row++) for (let col = 0; col < n; col++) {
    if (matrix.get(row, col) && !finder(row, col)) bits += `<rect x="${col + 4}" y="${row + 4}" width="1" height="1" rx="${round}" fill="${ink}"/>`;
  }
  for (const [row, col] of [[0, 0], [0, n - 7], [n - 7, 0]]) {
    bits += `<rect x="${col + 4}" y="${row + 4}" width="7" height="7" rx="1" fill="${ink}"/><rect x="${col + 5}" y="${row + 5}" width="5" height="5" rx=".65" fill="${cream}"/><rect x="${col + 6}" y="${row + 6}" width="3" height="3" rx=".45" fill="${ink}"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${cell})">${bits}</g>`;
}
const art = async (name, x, y, w, h) => `<image x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" href="data:image/png;base64,${(await readFile(new URL(`assets/${name}.png`, folder))).toString('base64')}"/>`;
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Leif Nevener music QR code"><title>Leif Nevener — scan for shows and music</title><desc>QR code opens ${url}</desc><defs><style>@font-face{font-family:'DM Sans';src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:400 700}</style></defs><rect width="${w}" height="${h}" fill="${cream}"/>${body}</svg>`;
const designs = [
  { name: '01-prairie-print', label: '1 · PRAIRIE PRINT', w: 1000, h: 1400, body:
    text(500, 110, 'Leif Nevener', 64, 'middle', 600) + text(500, 160, 'GUITAR · LIVE MUSIC', 18, 'middle', 500, ink, 4) +
    await art('prairie-print', 65, 195, 870, 360) + code(200, 565, 600, .15) +
    text(500, 1250, 'SHOWS · MUSIC · FOLLOW', 21, 'middle', 500, ink, 3) + text(500, 1310, 'leifnevenermusic.com', 30) },
  { name: '02-guitar-label', label: '2 · GUITAR LABEL', w: 1000, h: 1500, body:
    text(500, 88, 'Leif Nevener', 60, 'middle', 600) + await art('guitar-label', 100, 130, 800, 1210) +
    `<rect x="299" y="889" width="402" height="402" rx="10" fill="${cream}" stroke="${ink}" stroke-width="2"/>` + code(310, 900, 380, .32) +
    text(500, 1410, 'SCAN FOR SHOWS &amp; MUSIC', 20, 'middle', 500, ink, 3) + text(500, 1460, 'leifnevenermusic.com', 28) },
  { name: '03-scissortail-seal', label: '3 · SCISSORTAIL SEAL', w: 1200, h: 1200, body:
    await art('scissortail-seal', 35, 10, 1130, 1130) + code(370, 390, 520, .05) +
    text(705, 1000, 'Leif Nevener', 58, 'middle', 600) + text(705, 1050, 'SHOWS · MUSIC · FOLLOW', 18, 'middle', 500, ink, 3) +
    text(705, 1110, 'leifnevenermusic.com', 28) },
];
const checks = [];
for (const design of designs) {
  const source = svg(design.w, design.h, design.body);
  await writeFile(new URL(`${design.name}.svg`, folder), source);
  await sharp(Buffer.from(source)).png().toFile(new URL(`${design.name}.png`, folder).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
  for (const width of [design.w, 600, 400]) {
    const { data, info } = await sharp(Buffer.from(source)).resize({ width }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const decoded = jsQR(new Uint8ClampedArray(data), info.width, info.height);
    checks.push({ design: design.name, width, decoded: decoded?.data ?? null, passed: decoded?.data === url });
  }
}
const labels = designs.map((d, i) => text(450 + i * 900, 65, d.label, 27, 'middle', 600)).join('');
let panels = '';
for (const [i, design] of designs.entries()) {
  const png = await readFile(new URL(`${design.name}.png`, folder));
  panels += `<image x="${i * 900 + 25}" y="110" width="850" height="1270" preserveAspectRatio="xMidYMid meet" href="data:image/png;base64,${png.toString('base64')}"/>`;
}
await sharp(Buffer.from(svg(2700, 1420, labels + panels))).png().toFile(new URL('comparison.png', folder).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
await writeFile(new URL('scan-checks.json', folder), JSON.stringify({ url, errorCorrection: 'H', quietZoneModules: 4, checks }, null, 2));
console.log(JSON.stringify(checks, null, 2));
if (checks.some(check => !check.passed)) process.exitCode = 1;
