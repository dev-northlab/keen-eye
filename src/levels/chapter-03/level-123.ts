// Motion differences: the campfire flame flickers faster on picture B; the heron dips its head only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { backpack, bluebells, feather, fireLogs, flame, lantern, pine, pineCone, rock } from './shapes.ts'

/** Duck, faces left; (x, y) = waterline. Bounds: x ±14·s, y from −18·s to +2. */
const duck = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${-s} ${s})"><ellipse cy="-5" rx="12" ry="6" fill="#8a6a4a"/><circle cx="7" cy="-13" r="5" fill="#3f8f5a"/>` +
  `<path d="M11 -13l5 1.5l-5 1.5Z" fill="#ff922b"/><circle cx="8" cy="-14" r="1" fill="#222"/></g>`

/** Heron body standing in the shallows; (x, y) = feet. Head separate. Bounds: x ±16, y from −56 to 0. */
const heron = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-3 0v-22M3 0v-22" stroke="#6b6b70" stroke-width="2"/>` +
  `<ellipse cy="-30" rx="14" ry="9" fill="#b8c4cc"/><path d="M-14 -30l-6 4h10Z" fill="#8d99ae"/><path d="M6 -36q4 -10 2 -20" stroke="#c9d1da" stroke-width="5" fill="none" stroke-linecap="round"/></g>`
/** Heron head at the top of its neck; (x, y) = heron feet. Pivot (x + 8, y − 56). Bounds: x from +2 to +26, y from −62 to −52. */
const heronHead = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><circle cx="8" cy="-57" r="5" fill="#c9d1da"/><path d="M12 -58l14 2l-14 2Z" fill="#f2c14e"/><path d="M5 -60l-6 -2" stroke="#2b2b2b" stroke-width="2"/><circle cx="9" cy="-58" r="1" fill="#222"/></g>`

/** Life ring; (x, y) = center. Bounds: radius 10. */
const lifeRing = (x: number, y: number, color: string) =>
  `<circle cx="${x}" cy="${y}" r="8" fill="none" stroke="${color}" stroke-width="5"/><path d="M${x - 10} ${y}h4M${x + 6} ${y}h4M${x} ${y - 10}v4M${x} ${y + 6}v4" stroke="#fff" stroke-width="4"/>`

/** Oar; (x, y) = handle end, pointing right-down. Bounds: x from 0 to +44, y from −4 to +12. */
const oar = (x: number, y: number) => `<path d="M${x} ${y}L${x + 32} ${y + 6}" stroke="#a0703f" stroke-width="3"/><path d="M${x + 30} ${y + 2}l14 3l-2 7l-14 -3Z" fill="#c68b4e"/>`

/** Water lily; (x, y) = pad center, flower petals of size p. */
const lily = (x: number, y: number, p: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="16" ry="5" fill="#3f9a5a"/>` +
  `<path d="M${x - p} ${y - 1}l${p * 0.5} ${-p}l${p * 0.5} ${p * 0.6}l${p * 0.5} ${-p * 0.6}l${p * 0.5} ${p}Z" fill="#ff8fab"/><circle cx="${x}" cy="${y - p * 0.3}" r="${p * 0.25}" fill="#ffd166"/>`

/** Leaping fish arched over the water; (x, y) = center. Bounds: x ±14, y ±8. */
const leaper = (x: number, y: number) =>
  `<g transform="translate(${x} ${y}) rotate(-24)"><ellipse rx="11" ry="5" fill="#8d99ae"/><path d="M-9 0l-6 -5v10Z" fill="#8d99ae"/><circle cx="6" cy="-1" r="1.2" fill="#222"/></g>` +
  `<path d="M${x - 14} ${y + 14}q6 -4 12 0M${x + 4} ${y + 14}q6 -4 12 0" stroke="#fff4e0" stroke-width="1.5" fill="none"/>`

export default svgLevel({
  id: 123,
  chapter: 'forest',
  title: 'woodlandLake',
  parTimeSec: 115,
  scene: ({ diff, anim, rand, extra }) => {
    let farPines = ''
    for (let x = -10; x < 820; x += 22) farPines += pine(x + rand() * 8, 252, 0.45 + rand() * 0.25, rand() < 0.5 ? '#3a4f4a' : '#2f4540')
    let shimmer = ''
    for (let i = 0; i < 26; i++) shimmer += `<path d="M${(rand() * 780).toFixed(1)} ${(262 + rand() * 140).toFixed(1)}h${(10 + rand() * 26).toFixed(1)}" stroke="#ffe3c4" stroke-width="2" stroke-opacity="0.7"/>`
    let reeds = ''
    for (let i = 0; i < 9; i++) reeds += `<path d="M${730 + i * 7} 430V${360 + (i % 3) * 10}" stroke="#4c7a2f" stroke-width="3"/>` + (i % 2 ? `<rect x="${727 + i * 7}" y="${352 + (i % 3) * 10}" width="6" height="16" rx="3" fill="#7a4a2a"/>` : '')
    const flicker = (period: number) => anim({ type: 'sway', angle: 10, pivot: [600, 452], period }, flame(600, 458))
    const dip = (moving: boolean) => (moving ? anim({ type: 'sway', angle: 26, pivot: [668, 330], period: 2 }, heronHead(660, 386)) : heronHead(660, 386))

    return (
      `<rect width="800" height="500" fill="#ffc79a"/><rect width="800" height="90" fill="#ffb38a"/>` +
      `<circle cx="520" cy="214" r="44" fill="#ffe08a"/>` +
      `<path d="M120 70q40 -20 90 0q-40 14 -90 0ZM600 50q50 -18 110 0q-50 14 -110 0Z" fill="#ffd9c2"/>` +
      `<path d="M0 220L120 150L230 210L360 140L500 220L640 160L800 210V260H0Z" fill="#9a7fb0"/>` +
      farPines +
      `<path d="M680 252q30 -34 64 0Z" fill="#6b4a3a"/><path d="M690 252l10 -14M710 248l8 -18M730 250l4 -14" stroke="#4a3426" stroke-width="3"/>` +
      // Lake
      `<rect y="252" width="800" height="170" fill="#e8a87c"/>` + [0, 1, 2, 3, 4, 5].map((i) => `<rect x="${490 + i * 5}" y="${262 + i * 18}" width="${60 - i * 10}" height="5" rx="2" fill="#ffe08a" fill-opacity="0.6"/>`).join('') + shimmer +
      duck(400, 330) + duck(436, 338, 0.6) + diff(470, 336, 22, duck(470, 342, 0.6), '') +
      diff(560, 296, 24, '', leaper(560, 296)) +
      lily(470, 396, 0) + diff(420, 398, 22, lily(420, 404, 7), lily(420, 404, 9.5)) + lily(380, 412, 0) +
      pine(60, 380, 2.6, '#2a4f3c') + pine(150, 384, 1.6, '#2f5a44') +
      `<path d="M300 110q5 -6 10 0q5 -6 10 0M330 96q5 -6 10 0q5 -6 10 0M360 116q4 -5 8 0q4 -5 8 0" stroke="#7a4a5a" stroke-width="2" fill="none"/>` +
      // Jetty with a rowboat
      `<rect x="0" y="372" width="250" height="12" fill="#8a5a33"/><path d="M20 384v40M90 384v40M160 384v40M230 384v40" stroke="#6b4226" stroke-width="7"/>` +
      `<path d="M0 372h250" stroke="#a0703f" stroke-width="3"/><rect x="176" y="350" width="6" height="24" fill="#6b4226"/>` +
      diff(179, 370, 22, lifeRing(179, 368, '#e63946'), lifeRing(179, 368, '#e0603a')) +
      `<path d="M250 404q50 24 110 0l-10 -12h-90Z" fill="#c0573f"/><path d="M256 398h96" stroke="#f4f1e8" stroke-width="3"/>` +
      `<path d="M230 378q20 10 26 22" stroke="#c9b79c" stroke-width="1.5" fill="none"/>` +
      diff(334, 400, 26, oar(312, 394), `<g transform="rotate(16 312 394)">${oar(312, 394)}</g>`) +
      // Near shore
      `<path d="M0 430Q200 410 400 428T800 420V500H0Z" fill="#6f9e52"/>` +
      rock(40, 470, 1.1) + diff(118, 466, 26, rock(112, 480, 0.8, '#a3a39a'), rock(124, 480, 0.8, '#a3a39a')) + rock(220, 488, 0.7) +
      `<path d="M300 500l20 -60l20 60Z" fill="#e07a5f"/><path d="M320 440v60" stroke="#c0573f" stroke-width="2"/><path d="M286 500l34 -64l34 64" stroke="#b5523b" stroke-width="3" fill="none"/>` +
      fireLogs(600, 470) + diff(600, 440, 24, flicker(1.2), flicker(0.45)) +
      `<circle cx="600" cy="440" r="30" fill="#ffd166" fill-opacity="0.15"/>` +
      `<path d="M520 470h40M640 476h40" stroke="#8a5a33" stroke-width="7" stroke-linecap="round"/>` +
      heron(660, 386) + diff(670, 330, 22, dip(false), dip(true)) +
      reeds +
      pine(470, 500, 0.8, '#2f6b4a') + pine(780, 500, 1, '#2a5f44') +
      backpack(240, 480) +
      lantern(500, 472) +
      pineCone(395, 486) +
      feather(80, 366) +
      bluebells(690, 456) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['birds', 263, 49],
        ['cloud', 562, 143],
        ['fish', 359, 281, '#4dabf7'],
        ['frog', 531, 385],
        ['anthill', 275, 450],
      ])
    )
  },
})
