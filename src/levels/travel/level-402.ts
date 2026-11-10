// Venice: palaces along a canal, a bell tower, a gondola with its gondolier and a mooring pole.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, gull, person, sky, sun, water } from './shapes.ts'

/** Arched window; (x, y) = top left, w wide, h high. */
const arch = (x: number, y: number, w: number, h: number, color = '#4b5d73') =>
  `<path d="M${x} ${y + h}V${y + w / 2}A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2}V${y + h}Z" fill="${color}"/>`

/** Palace front from x to x + w, roof at `top`, standing in the water at y = 330. */
function palace(x: number, w: number, top: number, wall: string) {
  const cols = Math.floor((w - 16) / 40)
  const pad = (w - cols * 40 + 16) / 2
  let s = `<rect x="${x}" y="${top}" width="${w}" height="${330 - top}" fill="${wall}"/><rect x="${x - 4}" y="${top - 8}" width="${w + 8}" height="10" fill="#ffffff" fill-opacity="0.55"/>`
  for (let wy = top + 26; wy + 44 < 300; wy += 70)
    for (let i = 0; i < cols; i++) s += arch(x + pad + i * 40, wy, 24, 44) + `<rect x="${x + pad + i * 40 - 3}" y="${wy + 44}" width="30" height="4" fill="#ffffff" fill-opacity="0.7"/>`
  return s + arch(x + w / 2 - 16, 296, 32, 34, '#2f3b4a')
}

/** Bell tower; (x, y) = foot at the water. The roof is separate. Bounds: x ±29, y from −270 to 0. */
const campanile = (x: number, y: number) =>
  `<rect x="${x - 25}" y="${y - 230}" width="50" height="230" fill="#c0583f"/>` +
  [-150, -100, -50].map((dy) => `<rect x="${x - 25}" y="${y + dy}" width="50" height="3" fill="#a3452f"/>`).join('') +
  `<rect x="${x - 29}" y="${y - 268}" width="58" height="40" fill="#f3e3c3"/>` +
  [-18, -2, 14].map((dx) => arch(x + dx - 5, y - 262, 10, 28, '#2f3b4a')).join('') +
  `<rect x="${x - 31}" y="${y - 272}" width="62" height="6" fill="#ffffff"/>`
/** Bell tower roof on `campanile` at (x, y). Bounds: x ±29, y from −316 to −272. */
const spire = (x: number, y: number, color: string) => `<path d="M${x - 29} ${y - 272}L${x} ${y - 316}L${x + 29} ${y - 272}Z" fill="${color}"/>`

/** Gondola hull, prow to the right; (x, y) = waterline middle. The prow comb is separate. Bounds: x ±140, y from −34 to +14. */
const gondola = (x: number, y: number) =>
  `<path d="M${x - 140} ${y - 18}Q${x - 120} ${y + 14} ${x - 80} ${y + 14}H${x + 80}Q${x + 120} ${y + 14} ${x + 136} ${y - 34}L${x + 128} ${y - 32}Q${x + 112} ${y}${x + 80} ${y}H${x - 80}Q${x - 116} ${y} ${x - 132} ${y - 22}Z" fill="#1d1d1d"/>` +
  `<rect x="${x + 10}" y="${y - 12}" width="44" height="12" rx="3" fill="#b23a48"/><rect x="${x + 6}" y="${y - 20}" width="6" height="20" fill="#c9a227"/>`
/** The silver comb on the prow of `gondola` at (x, y). Bounds: x from +126 to +146, y from −50 to −30. */
const ferro = (x: number, y: number) =>
  `<path d="M${x + 132} ${y - 30}L${x + 138} ${y - 50}M${x + 134} ${y - 36}h10M${x + 135} ${y - 41}h10M${x + 137} ${y - 46}h8" stroke="#c9ced6" stroke-width="3" stroke-linecap="round"/>`

/** Stripes of the gondolier's shirt (a `person` standing at (x, y)). Bounds: x ±12, y from −44 to −25. */
const stripes = (x: number, y: number, color: string) =>
  `<path d="M${x - 11} ${y - 42}h22M${x - 11} ${y - 35}h22M${x - 12} ${y - 28}h24" stroke="${color}" stroke-width="3.4"/>`
/** Straw boater with a ribbon on a `person` standing at (x, y). */
const boater = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 60}" rx="14" ry="3" fill="#e9c46a"/><rect x="${x - 8}" y="${y - 70}" width="16" height="10" fill="#e9c46a"/><rect x="${x - 8}" y="${y - 64}" width="16" height="3" fill="#e63946"/>`

/** Striped mooring pole; (x, y) = top. The painted top is separate. Bounds: x ±6, y from 0 to +130. */
const pole = (x: number, y: number) =>
  `<rect x="${x - 6}" y="${y}" width="12" height="130" fill="#ffffff"/>` +
  [40, 64, 88].map((dy) => `<path d="M${x - 6} ${y + dy}l12 -8v8l-12 8Z" fill="#2b59c3"/>`).join('')

export default travelLevel({
  id: 402,
  title: 'venice',
  parTimeSec: 62,
  place: { region: 'europe', country: 'it', lat: 45.44, lon: 12.33 },
  scene: ({ diff, anim, rand, extra }) =>
    sky() +
    sun(110, 70) +
    anim({ type: 'path', points: [[0, 0], [60, 0]], period: 38 }, cloud(300, 70, 0.6)) +
    anim({ type: 'path', points: [[0, 0], [-50, 0]], period: 44 }, cloud(760, 90, 0.5)) +
    palace(0, 150, 170, '#f2a7a0') +
    palace(150, 150, 130, '#f2c46d') +
    palace(300, 130, 150, '#d9764f') +
    diff(
      368,
      288,
      24,
      `<rect x="352" y="290" width="32" height="8" rx="2" fill="#7a5233"/>` +
        [358, 368, 378].map((fx) => `<circle cx="${fx}" cy="286" r="5" fill="#e63946"/>`).join(''),
      '',
    ) +
    palace(430, 150, 180, '#f3e3c3') +
    campanile(625, 330) +
    diff(625, 38, 36, spire(625, 330, '#5f9e7a'), spire(625, 330, '#c0583f')) +
    palace(660, 140, 160, '#e9b7a0') +
    water(330, '#3a9fb0', rand) +
    `<rect y="330" width="800" height="6" fill="#2d8494"/>` +
    pole(150, 340) +
    `<rect x="144" y="326" width="12" height="20" fill="#2b59c3"/>` +
    pole(720, 350) +
    diff(720, 344, 24, `<rect x="714" y="330" width="12" height="20" fill="#2b59c3"/>`, `<rect x="714" y="330" width="12" height="20" fill="#e63946"/>`) +
    gondola(440, 440) +
    diff(578, 400, 24, ferro(440, 440), '') +
    `<path d="M340 414L392 484" stroke="#7a5233" stroke-width="4" stroke-linecap="round"/>` +
    person(330, 436, '#ffffff', false, '#f2d29b', '#3a2a1c') +
    diff(330, 401, 24, stripes(330, 436, '#2b59c3'), stripes(330, 436, '#e63946')) +
    boater(330, 436) +
    gull(240, 110) +
    gull(470, 80, '#5c677d') +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['lifeRing', 632, 468],
      ['duck', 88, 440],
      ['bottle', 424, 396],
      ['duck', 240, 456],
      ['birds', 216, 60],
      ['cloud', 532, 100],
      ['birds', 420, 112],
    ]) +
    extras({ extra, anim }, [
      ['bottle', 500, 480],
      ['lifeRing', 516, 364],
      ['bottle', 640, 360],
      ['bottle', 356, 480],
      ['lifeRing', 184, 364],
    ]),
})
