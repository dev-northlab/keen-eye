// Motion differences: the left lantern swings wider and faster on picture B; the cat's tail swishes only on B.
import { bird } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bucket, chick, eggNest, hayBale, hen, pumpkin, wateringCan } from '../shapes.ts'
import { level103Redesign } from './level-103-redesign.ts'

/** Hanging lantern; (x, y) = hook on the beam. Bounds: x ±10, y from 0 to +44. */
const lantern = (x: number, y: number) =>
  `<path d="M${x} ${y}v12" stroke="#3d3d3d" stroke-width="2"/>` +
  `<path d="M${x - 8} ${y + 14}h16l-3 -4h-10Z" fill="#3d3d3d"/>` +
  `<rect x="${x - 8}" y="${y + 14}" width="16" height="24" rx="3" fill="#ffd166" stroke="#3d3d3d" stroke-width="2"/>` +
  `<rect x="${x - 9}" y="${y + 38}" width="18" height="4" rx="1" fill="#3d3d3d"/>`

/** Cow head looking over the stall door, faces the viewer; (x, y) = muzzle center; `bell` = bell radius. */
const cowHead = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-20 -46l-10 -8M20 -46l10 -8" stroke="#c9b79c" stroke-width="5" stroke-linecap="round"/>` +
  `<ellipse cx="-28" cy="-34" rx="10" ry="6" fill="#f2f2f2"/><ellipse cx="28" cy="-34" rx="10" ry="6" fill="#f2f2f2"/>` +
  `<rect x="-22" y="-50" width="44" height="52" rx="18" fill="#ffffff"/><ellipse cx="-10" cy="-38" rx="9" ry="7" fill="#2b2b2b"/>` +
  `<circle cx="-10" cy="-26" r="3" fill="#222"/><circle cx="10" cy="-26" r="3" fill="#222"/>` +
  `<ellipse cy="-4" rx="18" ry="11" fill="#f7b6c2"/><circle cx="-6" cy="-4" r="2.5" fill="#c97a88"/><circle cx="6" cy="-4" r="2.5" fill="#c97a88"/></g>`

const bell = (x: number, y: number, r: number) =>
  `<path d="M${x - r} ${y + r * 0.6}q0 ${-r * 1.8} ${r} ${-r * 1.8}q${r} 0 ${r} ${r * 1.8}Z" fill="#f2c14e" stroke="#b8862b" stroke-width="1.5"/>` +
  `<circle cx="${x}" cy="${y + r * 0.7}" r="${r * 0.3}" fill="#b8862b"/>`

const horseshoe = (x: number, y: number) =>
  `<path d="M${x - 8} ${y + 8}a10 10 0 1 1 16 0" fill="none" stroke="#8d99ae" stroke-width="5" stroke-linecap="round"/>`

/** Sleeping cat lying on a beam; (x, y) = beam top under its middle. Tail separate. Bounds: x ±24, y from −20 to 0. */
const cat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-8" rx="22" ry="9" fill="#7d7d85"/>` +
  `<circle cx="16" cy="-12" r="8" fill="#7d7d85"/><path d="M10 -18l1 -6l5 3ZM22 -18l-1 -6l-5 3Z" fill="#7d7d85"/>` +
  `<path d="M12 -12q3 2 6 0" stroke="#3d3d3d" stroke-width="1.5" fill="none"/><path d="M-12 -14q4 -3 8 0M0 -16q4 -3 8 0" stroke="#5f5f68" stroke-width="2" fill="none"/></g>`

/** Cat tail hanging from (x, y). Bounds: x ±6, y from 0 to +30. */
const tail = (x: number, y: number) => `<path d="M${x} ${y}q-6 12 0 20q4 6 -2 10" stroke="#7d7d85" stroke-width="5" fill="none" stroke-linecap="round"/>`

/** Milk can; (x, y) = bottom center; `band` = its stripe. Bounds: x ±14, y from −46 to 0. */
const milkCan = (x: number, y: number, band = '#3a86ff') =>
  `<path d="M${x - 14} ${y}v-28q0 -6 8 -10v-6h12v6q8 4 8 10v28Z" fill="#c9d1da"/>` +
  `<rect x="${x - 8}" y="${y - 46}" width="16" height="5" rx="2" fill="#8d99ae"/>` +
  `<rect x="${x - 14}" y="${y - 22}" width="28" height="6" fill="${band}"/>`

/** Grain sack; (x, y) = bottom center. Bounds: x ±22, y from −40 to 0. */
const sack = (x: number, y: number, color = '#e3cfa0') =>
  `<path d="M${x - 20} ${y}q-4 -22 6 -34l-2 -6h32l-2 6q10 12 6 34Z" fill="${color}"/>` +
  `<path d="M${x - 12} ${y - 34}h24" stroke="#a08a63" stroke-width="2"/><path d="M${x - 8} ${y - 16}h16M${x} ${y - 24}v16" stroke="#b9a57c" stroke-width="2"/>`

/** Mouse, faces right; (x, y) = feet. Bounds: x from −16 to +10, y from −9 to 0. */
const mouse = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 -3q-8 2 -10 -4" stroke="#9a8f86" stroke-width="1.5" fill="none"/>` +
  `<ellipse cy="-4" rx="7" ry="5" fill="#9a8f86"/><circle cx="6" cy="-6" r="3.5" fill="#9a8f86"/><circle cx="4" cy="-9" r="2.5" fill="#c7b9ae"/>` +
  `<circle cx="8" cy="-6" r="0.9" fill="#222"/></g>`

/** Barrel; (x, y) = bottom center. Bounds: x ±20, y from −48 to 0. */
const barrel = (x: number, y: number) =>
  `<path d="M${x - 16} ${y}q-6 -24 0 -48h32q6 24 0 48Z" fill="#a0703f"/>` +
  `<path d="M${x - 19} ${y - 12}h38M${x - 19} ${y - 36}h38" stroke="#5a3d2b" stroke-width="3"/>`

export default svgLevel({
  id: 103,
  chapter: 'farm',
  title: 'barnInside',
  parTimeSec: 100,
  redesign: level103Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let planks = ''
    for (let x = 12; x < 800; x += 26) planks += `<path d="M${x} 88V420" stroke="#9a6841" stroke-width="2"/>`
    let straw = ''
    for (let i = 0; i < 40; i++) {
      const x = rand() * 800
      const y = 428 + rand() * 70
      straw += `<path d="M${x} ${y}l${6 + rand() * 6} ${-2 + rand() * 4}" stroke="#e9c46a" stroke-width="2"/>`
    }
    const swinging = (angle: number, period: number) => anim({ type: 'sway', angle, pivot: [200, 88], period }, lantern(200, 88))
    const tailOf = (spec: boolean) =>
      spec ? anim({ type: 'sway', angle: 18, pivot: [448, 70], period: 1.2 }, tail(448, 70)) : tail(448, 70)
    const posts = (n: number) => {
      let s = ''
      for (let i = 0; i < n; i++) s += `<rect x="${402 + i * (36 / (n - 1))}" y="${318}" width="5" height="26" fill="#f6e7c4"/>`
      return s + `<path d="M400 324h46M400 336h46" stroke="#f6e7c4" stroke-width="3"/>`
    }

    return (
      // Walls and roof structure
      `<rect width="800" height="500" fill="#b07a4f"/>` + planks +
      `<path d="M0 0H800V70H0Z" fill="#5a3a24"/><path d="M0 70L400 0L800 70" stroke="#7a4f30" stroke-width="10" fill="none"/>` +
      `<path d="M200 36V70M400 0V70M600 36V70" stroke="#7a4f30" stroke-width="8"/>` +
      `<path d="M10 4l28 26M10 4l12 34M10 4l36 10" stroke="#e8e0d4" stroke-width="1" stroke-opacity="0.7" fill="none"/>` +
      `<rect y="70" width="800" height="18" fill="#7a4f30"/>` +
      // Barn door opening with the yard outside
      `<rect x="296" y="146" width="208" height="278" fill="#6b4226"/>` +
      `<rect x="304" y="154" width="192" height="270" fill="#bfe6f7"/>` +
      `<circle cx="460" cy="196" r="20" fill="#ffd23f"/>` +
      `<path d="M304 296q60 -26 120 -6q40 12 72 -2V330H304Z" fill="#a6d985"/><path d="M380 330q50 -34 116 -26V330Z" fill="#93c96f"/>` +
      `<rect x="304" y="330" width="192" height="94" fill="#8fca68"/>` +
      `<path d="M304 370h192M304 392h192M304 412h192" stroke="#7ab558" stroke-width="3"/>` +
      `<rect x="338" y="280" width="8" height="40" fill="#8a5a33"/><circle cx="342" cy="270" r="20" fill="#5bb04a"/>` +
      diff(424, 330, 24, posts(3), posts(4)) +
      // Beam things
      diff(200, 112, 30, swinging(6, 3), swinging(14, 1.9)) +
      anim({ type: 'sway', angle: 6, pivot: [600, 88], period: 3 }, lantern(600, 88)) +
      cat(470, 70) +
      diff(448, 86, 22, tailOf(false), tailOf(true)) +
      `<path d="M300 70q14 14 30 0Z" fill="#8a6a4a"/><circle cx="310" cy="66" r="4" fill="#2b2b3a"/><circle cx="322" cy="66" r="4" fill="#2b2b3a"/>` +
      `<rect y="420" width="800" height="80" fill="#c9a46b"/>` + straw +
      // Left stall with the cow
      `<rect x="30" y="240" width="230" height="180" fill="#8a5a33"/>` +
      `<path d="M30 300h230M30 360h230M30 240l230 180M260 240l-230 180" stroke="#6b4226" stroke-width="6"/>` +
      `<rect x="96" y="200" width="110" height="100" fill="#3d2818"/>` +
      cowHead(150, 300) +
      `<path d="M134 320q16 12 32 0" stroke="#8a3b2c" stroke-width="3" fill="none"/>` +
      diff(150, 334, 22, bell(150, 330, 7), bell(150, 330, 8.5)) +
      // Hay, sacks and a mouse on the left floor
      hayBale(70, 452) +
      `<path d="M120 480q30 -34 70 -24q20 10 14 30Z" fill="#f2c14e"/>` +
      sack(286, 484) + sack(250, 498, '#d9c08c') +
      diff(232, 476, 22, mouse(228, 482), mouse(242, 482)) +
      // Right wall: horseshoes, hat, tools, ladder and the hayloft
      horseshoe(540, 200) + diff(572, 200, 22, horseshoe(572, 200), '') + horseshoe(604, 200) +
      `<rect x="534" y="236" width="6" height="6" fill="#5a3d2b"/><path d="M522 252q15 -16 30 0Z" fill="#e9c46a"/><path d="M514 252h46" stroke="#e9c46a" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M560 420L586 236" stroke="#a0703f" stroke-width="4"/><path d="M576 240l4 -24M586 241l2 -24M596 243l0 -24M576 240l20 3" stroke="#8d99ae" stroke-width="3" fill="none"/>` +
      `<path d="M640 150h160v14h-160Z" fill="#7a4f30"/>` + hayBale(690, 118) + hayBale(760, 122) +
      `<path d="M716 164V420M756 164V420" stroke="#c68b4e" stroke-width="6"/>` +
      `<path d="M716 200h40M716 240h40M716 280h40M716 320h40M716 360h40M716 400h40" stroke="#c68b4e" stroke-width="5"/>` +
      // Floor
      milkCan(560, 476) + diff(598, 460, 22, milkCan(598, 476), milkCan(598, 476, '#5f7fc9')) + milkCan(636, 476) +
      barrel(700, 474) + bucket(760, 478) +
      anim({ type: 'sway', angle: 8, pivot: [400, 476], period: 1.6 }, hen(400, 450)) +
      hen(470, 470, true, '#c9823a') +
      `<path d="M30 420h4v-6h-4ZM770 420h4v-6h-4Z" fill="#5a3a24"/>` +
      bird(560, 88) +
      eggNest(340, 488) +
      pumpkin(520, 488) +
      wateringCan(650, 490) +
      chick(270, 425) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['eggNest', 322, 446],
        ['horseshoe', 509, 444],
        ['horseshoe', 735, 433],
        ['horseshoe', 139, 401],
        ['horseshoe', 233, 325],
      ])
    )
  },
})
