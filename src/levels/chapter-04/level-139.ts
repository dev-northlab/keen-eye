// Motion differences: the diver's bubbles rise faster on picture B; the octopus waves an arm only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level139Redesign } from './level-139-redesign.ts'
import { anchor, bottleMessage, crab, fish, seahorse, seaUrchin } from './shapes.ts'

/** Diver swimming right; (x, y) = chest. Fins and flashlight separate. Bounds: x from −60 to +30, y ±20. */
const diver = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-48" y="-14" width="56" height="20" rx="10" fill="#2b2b2b"/><rect x="-40" y="-26" width="34" height="12" rx="6" fill="#ffb703"/>` +
  `<circle cx="16" cy="-6" r="11" fill="#2b2b2b"/><rect x="12" y="-12" width="12" height="8" rx="3" fill="#bde3f2"/><path d="M-20 6l-30 8M-20 2l-32 -2" stroke="#2b2b2b" stroke-width="7" stroke-linecap="round"/></g>`
const fins = (x: number, y: number, color: string) => `<path d="M${x - 52} ${y + 10}l-16 10l4 -14ZM${x - 54} ${y - 6}l-16 -6l6 12Z" fill="${color}"/>`

/** Flashlight held at (x, y), pointing right. Bounds: x from 0 to +22, y ±5. */
const flashlight = (x: number, y: number) => `<rect x="${x}" y="${y - 4}" width="16" height="8" rx="2" fill="#5c677d"/><rect x="${x + 16}" y="${y - 5}" width="6" height="10" fill="#ffe08a"/>`

const bubbles = (x: number, y: number) => `<g fill="#e3f6fd" fill-opacity="0.8"><circle cx="${x}" cy="${y}" r="4"/><circle cx="${x + 5}" cy="${y - 12}" r="3"/><circle cx="${x - 2}" cy="${y - 22}" r="5"/></g>`

/** Lobster, faces left; (x, y) = bottom center. Bounds: x ±30, y from −20 to 0. */
const lobster = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 -8h30l6 6h-8l-4 -2" fill="${color}"/><ellipse cx="-4" cy="-9" rx="12" ry="7" fill="${color}"/>` +
  `<path d="M-14 -12l-10 -6M-14 -6l-10 2" stroke="${color}" stroke-width="3"/><ellipse cx="-26" cy="-20" rx="5" ry="3" fill="${color}"/><ellipse cx="-26" cy="2" rx="5" ry="3" fill="${color}"/>` +
  `<path d="M6 -8v8M12 -8v8M18 -8v8" stroke="#000" stroke-opacity="0.2" stroke-width="1.5"/><path d="M-14 -14l-14 -10M-14 -13l-12 -14" stroke="${color}" stroke-width="1" fill="none"/><circle cx="-12" cy="-12" r="1.4" fill="#222"/></g>`

/** Clam with a pearl; (x, y) = hinge. Bounds: x ±18, y from −18 to +4. */
const clam = (x: number, y: number) =>
  `<path d="M${x - 18} ${y}q18 8 36 0Z" fill="#c9b8d8"/><path d="M${x - 18} ${y}q2 -20 18 -18q16 -2 18 18" fill="#b8a4cc"/><circle cx="${x}" cy="${y - 2}" r="5" fill="#fff6f0"/>`

/** Starfish with `dots` light dots; (x, y) = center. Bounds: radius 14. */
const dotted = (x: number, y: number, dots: number) => {
  const at: [number, number][] = [[0, -7], [6, -1], [3, 6], [-4, 6], [-6, -1]]
  let s = `<path d="M${x} ${y - 14}l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1Z" fill="#ff9f43"/>`
  for (let i = 0; i < dots; i++) s += `<circle cx="${x + at[i][0]}" cy="${y + at[i][1]}" r="2.4" fill="#fff3d6"/>`
  return s
}

const glow = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#7dffd0" fill-opacity="0.18"/><circle cx="${x - r * 0.3}" cy="${y}" r="${r * 0.2}" fill="#7dffd0"/><circle cx="${x + r * 0.3}" cy="${y - r * 0.2}" r="${r * 0.18}" fill="#7dffd0"/><circle cx="${x}" cy="${y + r * 0.35}" r="${r * 0.15}" fill="#7dffd0"/>`

const stalactite = (x: number, h: number) => `<path d="M${x - 10} 0h20l-10 ${h}Z" fill="#3d5468"/>`

/** Octopus head and arms in a crevice; (x, y) = head center. Waving arm separate. */
const octopus = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-10 10q-10 16 -4 30M0 12q0 16 6 28M10 10q12 14 8 28" stroke="#c0573f" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  `<ellipse rx="18" ry="16" fill="#c0573f"/><circle cx="-6" cy="0" r="3" fill="#fff"/><circle cx="6" cy="0" r="3" fill="#fff"/><circle cx="-5" cy="0" r="1.5" fill="#222"/><circle cx="7" cy="0" r="1.5" fill="#222"/></g>`
const arm = (x: number, y: number) => `<path d="M${x + 14} ${y + 6}q16 4 18 18q0 6 -6 6" stroke="#c0573f" stroke-width="6" fill="none" stroke-linecap="round"/>`

export default svgLevel({
  id: 139,
  chapter: 'sea',
  title: 'underwaterCave',
  parTimeSec: 100,
  redesign: level139Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let stalactites = ''
    for (const [x, h] of [[90, 60], [150, 40], [220, 70], [300, 36], [380, 52], [460, 44], [540, 66], [680, 50], [740, 72]]) stalactites += stalactite(x, h)
    let specks = ''
    for (let i = 0; i < 40; i++) specks += `<circle cx="${(rand() * 800).toFixed(1)}" cy="${(rand() * 500).toFixed(1)}" r="1.5" fill="#7dffd0" fill-opacity="0.5"/>`
    const rising = (period: number) => anim({ type: 'bob', dx: 2, dy: -8, period }, bubbles(420, 190))
    const waving = (moving: boolean) => (moving ? anim({ type: 'sway', angle: 22, pivot: [124, 306], period: 1.3 }, arm(110, 300)) : arm(110, 300))

    return (
      `<rect width="800" height="500" fill="#1f2f3f"/>` +
      `<ellipse cx="400" cy="220" rx="230" ry="170" fill="#1d6f96"/><ellipse cx="400" cy="210" rx="180" ry="130" fill="#2a8fbf"/><ellipse cx="400" cy="200" rx="120" ry="86" fill="#46b2dc"/>` +
      `<path d="M360 60L300 380H420ZM440 60L440 380H520Z" fill="#ffffff" fill-opacity="0.08"/>` +
      fish(330, 140, '#ffd23f', 0.8) + fish(360, 120, '#ffd23f', 0.8) + fish(350, 160, '#ffd23f', 0.8) + anim({ type: 'path', points: [[0, 0], [-80, 30]], period: 10 }, fish(540, 300, '#ff9f43', 1, true)) +
      // Cave walls
      `<path d="M0 0H800V500H0ZM170 220Q170 40 400 40T630 220T400 400T170 220Z" fill="#26384a" fill-rule="evenodd"/>` +
      `<path d="M0 120Q60 140 100 200T120 330M800 140Q740 180 720 260T700 380" stroke="#33485c" stroke-width="10" fill="none"/>` +
      stalactites + diff(610, 24, 24, `<path d="M603 0h14l-7 42Z" fill="#3d5468"/>`, '') + specks +
      glow(60, 160, 18) + glow(760, 330, 20) + diff(720, 240, 26, glow(720, 240, 16), glow(720, 240, 21)) +
      // Diver
      diver(440, 236) + diff(380, 236, 22, fins(440, 236, '#3a86ff'), fins(440, 236, '#3a6fd6')) +
      diff(470, 230, 24, flashlight(460, 230), `<g transform="rotate(-24 460 230)">${flashlight(460, 230)}</g>`) +
      diff(422, 176, 26, rising(1.8), rising(0.7)) +
      // Octopus in its crevice
      `<ellipse cx="110" cy="300" rx="44" ry="34" fill="#141f2b"/>` + octopus(110, 300) +
      diff(136, 318, 26, waving(false), waving(true)) +
      // Floor
      `<path d="M0 430Q200 410 400 430T800 424V500H0Z" fill="#3a4a4f"/>` +
      dotted(200, 470, 5) + diff(260, 466, 22, dotted(260, 466, 5), dotted(260, 466, 2)) +
      diff(350, 462, 26, clam(344, 470), clam(356, 470)) +
      diff(500, 466, 22, '', crab(500, 476, '#e05a47')) +
      diff(650, 446, 32, lobster(650, 456, '#c0392b'), lobster(650, 456, '#d0503a')) +
      `<path d="M740 490q-6 -30 6 -50M754 490q8 -26 -2 -46M590 490q-4 -20 4 -34" stroke="#2a8f6a" stroke-width="4" fill="none"/>` +
      seaUrchin(548, 476) +
      bottleMessage(422, 484) +
      seahorse(700, 400) +
      anchor(112, 462) +
      fish(260, 320, '#ff6b8b') +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['fish', 598, 222, '#4dabf7'],
        ['jellyfish', 404, 88],
        ['fish', 365, 302, '#ff6b8b'],
        ['starfish', 62, 459],
        ['shell', 439, 470],
      ])
    )
  },
})
