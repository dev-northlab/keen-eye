// Motion differences: the mixer drum turns faster on picture B; the excavator beacon blinks only on B.
import { bird } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { stones, wheelbarrow } from '../shapes.ts'
import { cloud, coffeeCup, cone, person, pigeon, sandwichBoard, skyline } from './shapes.ts'

/** Hard hat on a person standing at (x, y). Bounds: x ±10, y from −66 to −56. */
const hardHat = (x: number, y: number, color: string) => `<path d="M${x - 10} ${y - 56}a10 10 0 0 1 20 0Z" fill="${color}"/><rect x="${x - 11}" y="${y - 58}" width="22" height="3" fill="${color}"/>`

/** Lattice between (x0, y) and (x1, y + h): a frame with zigzag braces. */
const lattice = (x0: number, x1: number, y: number, h: number, color: string) => {
  let d = `M${x0} ${y}H${x1}M${x0} ${y + h}H${x1}`
  for (let x = x0; x < x1; x += h) d += `M${x} ${y + h}L${Math.min(x + h / 2, x1)} ${y}L${Math.min(x + h, x1)} ${y + h}`
  return `<path d="${d}" stroke="${color}" stroke-width="3" fill="none"/>`
}

/** Mixer drum; (x, y) = drum center. Bounds: x ±26, y ±18. */
const drum = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse rx="26" ry="18" fill="#ff9f1c"/><path d="M-20 -10q20 14 40 -4M-22 4q22 14 44 0" stroke="#d97706" stroke-width="3" fill="none"/></g>`

/** Barrier, 44 wide, with `stripes` red stripes; (x, y) = ground center. Bounds: x ±22, y from −26 to 0. */
const barrier = (x: number, y: number, stripes: number) => {
  let s = `<rect x="${x - 22}" y="${y - 26}" width="44" height="14" fill="#fff"/>`
  const w = 44 / (stripes * 2 - 1)
  for (let i = 0; i < stripes; i++) s += `<path d="M${x - 22 + i * 2 * w} ${y - 12}l${w} -14h${w * 0.6}l${-w} 14Z" fill="#e63946"/>`
  return s + `<path d="M${x - 18} ${y - 12}v12M${x + 18} ${y - 12}v12" stroke="#3d4a55" stroke-width="3"/>`
}

/** Cable drum; (x, y) = ground center, radius r. */
const cableDrum = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y - r}" r="${r}" fill="#a0703f"/><circle cx="${x}" cy="${y - r}" r="${r * 0.62}" fill="#3a86ff"/>` +
  `<circle cx="${x}" cy="${y - r}" r="${r * 0.22}" fill="#6b4226"/>`

/** Diamond warning sign; (x, y) = center. Bounds: radius 15. */
const warning = (x: number, y: number) =>
  `<path d="M${x} ${y - 15}L${x + 15} ${y}L${x} ${y + 15}L${x - 15} ${y}Z" fill="#ffd23f" stroke="#2b2b2b" stroke-width="2"/>` +
  `<path d="M${x} ${y - 7}v8" stroke="#2b2b2b" stroke-width="3" stroke-linecap="round"/><circle cx="${x}" cy="${y + 6}" r="1.8" fill="#2b2b2b"/>`

const brick = (x: number, y: number) => `<rect x="${x}" y="${y}" width="22" height="9" fill="#c0573f" stroke="#9a3f2c" stroke-width="1"/>`

const beacon = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="6" fill="#ff9f1c"/><circle cx="${x}" cy="${y}" r="10" fill="#ff9f1c" fill-opacity="0.3"/>`

export default svgLevel({
  id: 118,
  chapter: 'city',
  title: 'buildingSite',
  parTimeSec: 85,
  scene: ({ diff, anim, rand, extra }) => {
    let frame = ''
    for (let y = 140; y <= 400; y += 65) frame += `<rect x="60" y="${y}" width="300" height="8" fill="#5b7fa8"/>`
    for (let x = 60; x <= 360; x += 60) frame += `<rect x="${x - 4}" y="140" width="8" height="270" fill="#5b7fa8"/>`
    let glass = ''
    for (let x = 64; x < 356; x += 60) for (const y of [278, 343]) glass += `<rect x="${x + 4}" y="${y}" width="44" height="52" fill="#bde3f2" fill-opacity="0.8"/>`
    let scaffold = `<path d="M364 140V408M392 140V408" stroke="#8d99ae" stroke-width="3"/>`
    for (let y = 150; y < 408; y += 32) scaffold += `<path d="M364 ${y}H392M364 ${y}L392 ${y + 32}" stroke="#8d99ae" stroke-width="2"/>`
    let gravel = ''
    for (let i = 0; i < 40; i++) gravel += `<circle cx="${(rand() * 800).toFixed(1)}" cy="${(412 + rand() * 86).toFixed(1)}" r="${(1 + rand() * 2).toFixed(1)}" fill="#a8844f"/>`
    const turning = (period: number) => anim({ type: 'rotate', pivot: [486, 432], period }, drum(486, 432))

    return (
      `<rect width="800" height="500" fill="#cfe6f5"/>` +
      anim({ type: 'path', points: [[0, 0], [70, 0]], period: 30 }, cloud(150, 60, 0.6)) +
      skyline(rand, 330, '#c3cedb') +
      // Tower crane
      `<rect x="586" y="60" width="28" height="350" fill="none"/>` + `<g transform="rotate(90 600 235)">${lattice(425, 775, 221, 28, '#ffb703')}</g>` +
      lattice(300, 770, 50, 18, '#ffb703') + `<rect x="700" y="68" width="60" height="30" fill="#5c677d"/>` +
      `<path d="M600 50L640 14L600 14Z" fill="#ffb703"/><path d="M640 14L300 50M640 14L770 50" stroke="#3d4a55" stroke-width="1.5"/>` +
      `<rect x="590" y="70" width="32" height="26" fill="#3d4a55"/><rect x="594" y="74" width="24" height="12" fill="#bde3f2"/>` +
      diff(700, 40, 22, '', pigeon(700, 50, true, '#3d4a55')) +
      `<rect x="410" y="64" width="20" height="8" fill="#3d4a55"/>` +
      anim({ type: 'sway', angle: 3, pivot: [420, 72], period: 4 }, `<path d="M420 72V190" stroke="#3d4a55" stroke-width="2"/><path d="M420 190l-26 12M420 190l26 12" stroke="#3d4a55" stroke-width="1.5"/><rect x="380" y="202" width="80" height="12" fill="#5b7fa8"/>`) +
      // Building frame with scaffolding and workers
      frame + glass + scaffold +
      person(130, 205, '#ff9f1c') + hardHat(130, 205, '#ffd23f') + person(300, 270, '#ff9f1c', true) + hardHat(300, 270, '#ffd23f') +
      person(240, 335, '#3a86ff') + diff(240, 284, 22, hardHat(240, 335, '#ffd23f'), hardHat(240, 335, '#f2a93b')) +
      person(378, 248, '#ff9f1c') + hardHat(378, 248, '#ffffff') +
      // Ground
      `<rect y="404" width="800" height="96" fill="#c9a46b"/>` + gravel +
      `<path d="M0 404H800" stroke="#a8844f" stroke-width="4"/>` +
      // Mixer truck
      `<rect x="440" y="440" width="96" height="30" rx="4" fill="#e6e6f0"/><rect x="536" y="424" width="34" height="46" rx="4" fill="#3a86ff"/>` +
      `<rect x="544" y="430" width="20" height="16" fill="#bde3f2"/><circle cx="462" cy="474" r="11" fill="#2b2b2b"/><circle cx="550" cy="474" r="11" fill="#2b2b2b"/>` +
      diff(486, 432, 28, turning(6), turning(1.8)) +
      // Excavator
      `<rect x="650" y="420" width="120" height="26" rx="10" fill="#3d3d3d"/><circle cx="668" cy="433" r="9" fill="#5c5c5c"/><circle cx="752" cy="433" r="9" fill="#5c5c5c"/>` +
      `<rect x="664" y="378" width="78" height="44" rx="4" fill="#ffb703"/><rect x="700" y="384" width="34" height="24" fill="#bde3f2"/>` +
      `<path d="M670 390L620 330L590 380" stroke="#ffb703" stroke-width="12" fill="none" stroke-linejoin="round"/><path d="M580 372h24l-4 22h-18Z" fill="#5c5c5c"/>` +
      `<rect x="672" y="370" width="8" height="8" fill="#3d3d3d"/>` +
      diff(676, 364, 22, beacon(676, 364), anim({ type: 'blink', duty: 0.5, period: 0.7 }, beacon(676, 364))) +
      // Small things on the ground
      diff(100, 466, 26, cableDrum(100, 488, 19), cableDrum(100, 488, 22)) +
      barrier(150, 492, 4) + diff(206, 474, 26, barrier(206, 492, 4), barrier(206, 492, 5)) +
      cone(300, 490) + diff(330, 474, 22, cone(330, 490), '') + cone(360, 490) +
      `<path d="M420 404V364" stroke="#3d4a55" stroke-width="3"/>` +
      diff(420, 362, 24, warning(420, 362), `<g transform="rotate(20 420 362)">${warning(420, 362)}</g>`) +
      brick(536, 486) + brick(560, 486) + brick(548, 477) + diff(560, 468, 22, brick(548, 468), brick(556, 468)) + brick(584, 486) +
      `<rect x="760" y="410" width="36" height="64" rx="4" fill="#2a9d8f"/><rect x="772" y="420" width="12" height="4" fill="#1d7468"/>` +
      person(612, 488, '#ff9f1c', true) + hardHat(612, 488, '#ffd23f') +
      wheelbarrow(60, 425) +
      coffeeCup(265, 470) +
      stones(392, 486) +
      sandwichBoard(700, 490) +
      bird(470, 48) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['balloon', 702, 175, '#ff006e'],
        ['birds', 94, 92],
        ['bin', 396, 465],
        ['ball', 247, 429, '#ffb703'],
        ['shoppingBag', 158, 439],
      ])
    )
  },
})
