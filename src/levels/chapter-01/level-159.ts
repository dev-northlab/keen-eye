// Maple sugar time: a winter sugar shack among the farm's ten hardest (hidden until released,
// levels/upcoming.ts). New on the farm: maple trees tapped with buckets, a sugar shack with a steaming roof vent
// and icicles, a woodpile, a cardinal, a snowman, a child on a sledge and a horse-drawn sleigh with a sap barrel.
// Motion differences: the steam rises only on picture A; sap drips only on A; the sledge slides only on B.
import { pine } from '../chapter-03/shapes.ts'
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'

/** Bare maple tree; (x, y) = trunk foot. Bounds: x ±60, y from −220 to 0. */
const maple = (x: number, y: number) =>
  `<path d="M${x} ${y}V${y - 150}M${x} ${y - 90}L${x - 44} ${y - 160}M${x} ${y - 120}L${x + 46} ${y - 190}M${x} ${y - 150}L${x - 20} ${y - 216}M${x} ${y - 150}L${x + 14} ${y - 220}M${x - 30} ${y - 138}L${x - 58} ${y - 150}M${x + 30} ${y - 166}L${x + 56} ${y - 162}" stroke="#5e4a3a" stroke-width="7" stroke-linecap="round"/>` +
  `<path d="M${x - 44} ${y - 160}l-6 -2M${x + 46} ${y - 190}l8 -2" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>`

/** Sap bucket hung on a tree trunk at (x, y) (its top), with a spout above. Bounds: x ±10, y from −8 to +18. */
const sapBucket = (x: number, y: number) =>
  `<path d="M${x - 2} ${y - 8}h6v4" stroke="#8d99ae" stroke-width="2" fill="none"/><path d="M${x - 9} ${y}h18l-2 18h-14Z" fill="#adb5bd"/><path d="M${x - 9} ${y}h18" stroke="#6c757d" stroke-width="2"/>`

/** Cardinal on a branch, faces right; (x, y) = feet. Bounds: x ±11, y from −16 to 0. */
const cardinal = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 -6l-6 4l2 -8Z" fill="#a4161a"/><ellipse cy="-7" rx="8" ry="6" fill="#d00000"/>` +
  `<path d="M2 -12l4 -6l2 6Z" fill="#d00000"/><circle cx="5" cy="-11" r="4" fill="#d00000"/><path d="M8 -11l4 1l-4 2Z" fill="#ffb703"/><path d="M5 -10l3 1" stroke="#222" stroke-width="2"/></g>`

/** Snowman without its scarf; (x, y) = bottom center. Bounds: x ±26, y from −98 to 0. */
const snowman = (x: number, y: number) =>
  `<g fill="#ffffff" stroke="#b9cbdc" stroke-width="2"><circle cx="${x}" cy="${y - 22}" r="24"/><circle cx="${x}" cy="${y - 58}" r="17"/><circle cx="${x}" cy="${y - 84}" r="12"/></g>` +
  `<path d="M${x - 12} ${y - 94}h24M${x - 8} ${y - 94}v-4h16v4" stroke="#2b2b2b" stroke-width="5" fill="none"/><path d="M${x} ${y - 82}l10 3l-10 2Z" fill="#fb8500"/>` +
  `<circle cx="${x - 4}" cy="${y - 88}" r="1.6" fill="#2b2b2b"/><circle cx="${x + 4}" cy="${y - 88}" r="1.6" fill="#2b2b2b"/>` +
  `<circle cx="${x}" cy="${y - 58}" r="2" fill="#2b2b2b"/><circle cx="${x}" cy="${y - 50}" r="2" fill="#2b2b2b"/>` +
  `<path d="M${x - 16} ${y - 62}l-18 -10M${x + 16} ${y - 62}l18 -12" stroke="#6b4a2b" stroke-width="3"/>`

/** Scarf around a snowman's neck at (x, y) (the snowman's foot). Bounds: x from −14 to +14, y from −76 to −56. */
const scarf = (x: number, y: number, color: string) =>
  `<rect x="${x - 13}" y="${y - 74}" width="26" height="7" rx="3" fill="${color}"/><path d="M${x + 6} ${y - 70}l4 14h-6l-3 -12Z" fill="${color}"/>`

/** Child on a sledge, faces right; (x, y) = ground under the sledge. Bounds: x from −20 to +22, y from −42 to 0. */
const sledder = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-20 -4H14Q22 -4 22 -12" stroke="#8e2c27" stroke-width="3" fill="none"/><rect x="-16" y="-10" width="30" height="5" fill="#a0703f"/>` +
  `<path d="M-10 -10h16l-2 -18h-12Z" fill="#3a86ff"/><path d="M4 -12l10 0" stroke="#3a86ff" stroke-width="5" stroke-linecap="round"/>` +
  `<circle cx="0" cy="-34" r="7" fill="#f2d29b"/><path d="M-7 -36a7 7 0 0 1 14 0Z" fill="#e63946"/><circle cx="0" cy="-43" r="3" fill="#ffffff"/></g>`

/** Horse pulling to the right, without its blanket; (x, y) = feet. Bounds: x from −44 to +56, y from −88 to 0. */
const horse = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-30 -30V0M-18 -30V0M18 -30V0M30 -30V0" stroke="#5e3b1a" stroke-width="7"/>` +
  `<path d="M-36 -48Q-46 -36 -42 -20" stroke="#2b1a10" stroke-width="7" fill="none" stroke-linecap="round"/>` +
  `<ellipse cy="-46" rx="40" ry="18" fill="#7a4a24"/><path d="M26 -56L42 -84L56 -74L50 -66L38 -44Z" fill="#7a4a24"/>` +
  `<path d="M28 -60L42 -88" stroke="#2b1a10" stroke-width="6" stroke-linecap="round"/><circle cx="46" cy="-76" r="1.8" fill="#222"/>` +
  `<path d="M38 -88l2 -6l3 6Z" fill="#7a4a24"/></g>`

/** Horse blanket on the back of a horse at (x, y). Bounds: x from −24 to +24, y from −64 to −34. */
const blanket = (x: number, y: number, color: string) =>
  `<path d="M${x - 24} ${y - 60}Q${x} ${y - 66} ${x + 24} ${y - 60}V${y - 36}H${x - 24}Z" fill="${color}"/><path d="M${x - 24} ${y - 40}H${x + 24}" stroke="#ffd23f" stroke-width="2"/>`

/** Sap barrel on its side; (x, y) = center. Bounds: x ±24, y ±16. */
const sapBarrel = (x: number, y: number) =>
  `<rect x="${x - 24}" y="${y - 16}" width="48" height="32" rx="8" fill="#a0703f"/><path d="M${x - 14} ${y - 16}V${y + 16}M${x + 14} ${y - 16}V${y + 16}" stroke="#5e3b1a" stroke-width="3"/>`

export default svgLevel({
  id: 159,
  chapter: 'farm',
  title: 'mapleSugar',
  parTimeSec: 90,
  scene: ({ diff, anim, extra }) => {
    const steam = `<circle cx="408" cy="140" r="9" fill="#ffffff" fill-opacity="0.8"/><circle cx="418" cy="128" r="11" fill="#ffffff" fill-opacity="0.7"/>`
    const drop = `<ellipse cx="186" cy="321" rx="4.5" ry="6" fill="#b5651d"/>`
    const sliding = anim({ id: 'sled', type: 'path', points: [[0, 0], [70, 34]], period: 3.2 }, sledder(254, 448))
    return (
      `<rect width="800" height="500" fill="#dfeaf3"/><path d="M0 240Q200 190 420 220T800 200V340H0Z" fill="#eef3f7"/>` +
      pine(470, 244, 0.6) + pine(520, 236, 0.5) + pine(760, 230, 0.6) + pine(730, 240, 0.45) +
      `<path d="M440 196l30 -20l30 20ZM498 188l22 -14l22 14ZM732 180l28 -18l28 18Z" fill="#ffffff"/>` +
      `<rect y="330" width="800" height="170" fill="#f7fafc"/>` +
      // Maples with their buckets, the cardinal
      maple(66, 340) + maple(186, 336) +
      diff(66, 296, 22, sapBucket(66, 290), '') + sapBucket(186, 290) +
      diff(186, 320, 22, anim({ type: 'blink', duty: 0.3, period: 1.2 }, drop), drop) +
      diff(222, 180, 22, cardinal(222, 186), '') +
      // Sugar shack: the roof vent's steam, icicles, the sign, the woodpile
      `<rect x="300" y="222" width="220" height="118" fill="#8a5a33"/><path d="M300 246H520M300 270H520M300 294H520M300 318H520" stroke="#6b4a2b" stroke-width="2"/>` +
      `<path d="M286 226L410 172L534 226Z" fill="#5e3b1a"/><path d="M292 222L410 170L528 222" stroke="#ffffff" stroke-width="8" fill="none"/>` +
      `<rect x="392" y="150" width="36" height="24" fill="#6b4a2b"/><path d="M386 152L410 140L434 152Z" fill="#ffffff"/>` +
      diff(414, 133, 24, anim({ type: 'bob', dx: 2, dy: -5, period: 1.8 }, steam), steam) +
      `<path d="M304 226l3 12l3 -12M318 226l3 16l3 -16M346 226l3 10l3 -10M362 226l3 14l3 -14M470 226l3 12l3 -12M494 226l3 16l3 -16" fill="#cfe8f7"/>` +
      diff(332, 234, 22, `<path d="M330 226l3 18l3 -18Z" fill="#cfe8f7"/>`, '') +
      `<rect x="390" y="282" width="40" height="58" fill="#5e3b1a"/><rect x="384" y="246" width="52" height="24" rx="3" fill="#f4f1e8"/>` +
      diff(410, 258, 22, `<path d="M410 249l3 6l5 -2l-2 6l5 2l-7 3v3h-8v-3l-7 -3l5 -2l-2 -6l5 2Z" fill="#d00000"/>`, `<path d="M410 249l3 6l5 -2l-2 6l5 2l-7 3v3h-8v-3l-7 -3l5 -2l-2 -6l5 2Z" fill="#fb8500"/>`) +
      `<rect x="330" y="282" width="34" height="28" fill="#ffd166" stroke="#5e3b1a" stroke-width="3"/><rect x="456" y="282" width="34" height="28" fill="#ffd166" stroke="#5e3b1a" stroke-width="3"/>` +
      `<rect x="530" y="300" width="74" height="40" fill="#7a5230"/>` +
      [[541, 334], [559, 334], [577, 334], [595, 334], [550, 318], [568, 318], [586, 318]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#c68b4e" stroke="#7a5230" stroke-width="2"/>`).join('') +
      diff(568, 300, 22, `<circle cx="568" cy="302" r="8" fill="#c68b4e" stroke="#7a5230" stroke-width="2"/>`, '') +
      `<path d="M528 300h78" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>` +
      // Snowman, the sledge, the sleigh with its horse
      snowman(120, 470) + diff(120, 406, 22, scarf(120, 470, '#e63946'), scarf(120, 470, '#3a86ff')) +
      diff(255, 427, 31, sledder(254, 448), sliding, 'sled') +
      `<path d="M470 452H630Q646 452 646 438" stroke="#3d4a55" stroke-width="4" fill="none"/><path d="M486 452V432M614 452V432" stroke="#3d4a55" stroke-width="3"/>` +
      `<rect x="476" y="410" width="150" height="24" rx="4" fill="#8e2c27"/>` + sapBarrel(540, 396) +
      diff(540, 396, 22, `<rect x="534" y="380" width="12" height="32" fill="#3a86ff"/>`, `<rect x="534" y="380" width="12" height="32" fill="#ffd23f"/>`) +
      person(590, 410, '#3f8f3a', false, '#e0b48a', '#5a3d2b') +
      `<path d="M626 422V384" stroke="#3d4a55" stroke-width="3"/>` +
      diff(626, 380, 22, `<rect x="620" y="372" width="12" height="16" rx="2" fill="#ffd166" stroke="#3d4a55" stroke-width="2"/><path d="M622 372l4 -4l4 4" stroke="#3d4a55" stroke-width="2" fill="none"/>`, '') +
      `<path d="M626 420L668 430" stroke="#5e3b1a" stroke-width="3"/>` +
      horse(704, 476) + diff(704, 424, 31, blanket(704, 476, '#3a86ff'), blanket(704, 476, '#8338ec')) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['pine', 440, 486],
        ['pineCone', 650, 490],
        ['feather', 40, 478],
        ['bird', 760, 330],
        ['acorn', 210, 486],
      ])
    )
  },
})
