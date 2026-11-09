// Motion differences: the right pink jellyfish drifts faster on picture B; the lanternfish's light blinks only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level137Redesign } from './level-137-redesign.ts'
import { anchor, bottleMessage, clam, rock, seahorse, seaUrchin, starfish } from './shapes.ts'

/** Jellyfish with `tentacles` tentacles; (x, y) = bell center, bell radius r. */
const jelly = (x: number, y: number, r: number, color: string, tentacles = 4) => {
  let t = ''
  for (let i = 0; i < tentacles; i++) {
    const tx = x - r * 0.65 + (r * 1.3 * i) / Math.max(1, tentacles - 1)
    t += `M${tx.toFixed(1)} ${y + 2}q${i % 2 ? 3 : -3} ${r * 0.8} 0 ${r * 1.8}`
  }
  return (
    `<circle cx="${x}" cy="${y}" r="${r * 1.6}" fill="${color}" fill-opacity="0.12"/>` +
    `<path d="${t}" stroke="${color}" stroke-width="2" fill="none" stroke-opacity="0.9"/><path d="M${x - r} ${y + 2}a${r} ${r * 0.9} 0 0 1 ${2 * r} 0Z" fill="${color}" fill-opacity="0.9"/>`
  )
}

/** Anglerfish, faces right; (x, y) = body center. Lure separate. Bounds: x ±40, y ±28. */
const angler = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-30 0l-12 -14v28Z" fill="#3a3550"/><ellipse rx="32" ry="24" fill="#4a4366"/>` +
  `<path d="M14 6q14 6 22 -4q-6 14 -22 12Z" fill="#2b2640"/><path d="M18 8l2 4M24 8l2 4M30 6l2 4" stroke="#f4f4f4" stroke-width="1.5"/>` +
  `<circle cx="12" cy="-8" r="4" fill="#d9ff6a"/><circle cx="13" cy="-8" r="1.8" fill="#111"/><path d="M8 -22q14 -26 42 -24" stroke="#4a4366" stroke-width="2.5" fill="none"/></g>`
const lure = (x: number, y: number, color: string) => `<circle cx="${x}" cy="${y}" r="9" fill="${color}" fill-opacity="0.3"/><circle cx="${x}" cy="${y}" r="4.5" fill="${color}"/>`

/** Squid, head up; (x, y) = mantle center. Bounds: x ±14, y from −20 to +30. */
const squid = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-8 10q-4 12 -2 20M-3 10q-1 12 0 22M3 10q1 12 0 22M8 10q4 12 2 20" stroke="#c96a8a" stroke-width="2.5" fill="none"/>` +
  `<path d="M0 -20q12 8 10 30h-20q-2 -22 10 -30Z" fill="#e07a9a"/><path d="M-12 -6l-4 6l4 2ZM12 -6l4 6l-4 2Z" fill="#e07a9a"/><circle cx="-4" cy="4" r="2" fill="#111"/><circle cx="4" cy="4" r="2" fill="#111"/></g>`

/** Hatchet fish, faces right; (x, y) = center. Bounds: x ±16, y ±12. */
const hatchet = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-14 -4l8 -8h14l8 8l-8 16h-14Z" fill="#9aa5b1"/><path d="M-14 -4l-4 -6v12Z" fill="#9aa5b1"/>` +
  `<path d="M-6 10h14" stroke="#4df0ff" stroke-width="2" stroke-dasharray="2 2"/><circle cx="8" cy="-4" r="3" fill="#fff"/><circle cx="8" cy="-4" r="1.5" fill="#111"/></g>`

const smallFish = (x: number, y: number, color: string) => `<g transform="translate(${x} ${y})"><ellipse rx="9" ry="4" fill="${color}"/><path d="M-7 0l-6 -5v10Z" fill="${color}"/><circle cx="5" cy="-1" r="1" fill="#111"/></g>`

/** Lanternfish body, faces left; (x, y) = center. Light spot separate. Bounds: x ±16, y ±7. */
const lanternfish = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse rx="13" ry="6" fill="#5c6a8a"/><path d="M11 0l6 -5v10Z" fill="#5c6a8a"/><circle cx="-7" cy="-1" r="2" fill="#fff"/></g>`
const spot = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="7" fill="#7dff6a" fill-opacity="0.35"/><circle cx="${x}" cy="${y}" r="3" fill="#c9ff9a"/>`

export default svgLevel({
  id: 137,
  chapter: 'sea',
  title: 'jellyDeep',
  parTimeSec: 100,
  redesign: level137Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let plankton = ''
    for (let i = 0; i < 60; i++) plankton += `<circle cx="${(rand() * 800).toFixed(1)}" cy="${(rand() * 470).toFixed(1)}" r="${(0.8 + rand() * 1.4).toFixed(1)}" fill="${rand() < 0.5 ? '#4df0ff' : '#b38cff'}" fill-opacity="0.6"/>`
    let drifters = ''
    for (const [x, y, r, c, p] of [[60, 260, 12, '#4df0ff', 3.2], [420, 60, 10, '#ffb3d9', 2.8], [780, 300, 14, '#b38cff', 3.6], [250, 240, 9, '#ffd166', 2.4]] as const)
      drifters += anim({ type: 'bob', dx: 4, dy: -12, period: p }, jelly(x, y, r, c))
    const drift = (period: number) => anim({ type: 'bob', dx: 0, dy: -10, period }, jelly(690, 176, 14, '#ff8fc8'))

    return (
      `<rect width="800" height="500" fill="#0b1630"/><rect width="800" height="140" fill="#11234a"/><rect width="800" height="60" fill="#163060"/>` +
      plankton + drifters +
      diff(150, 124, 26, jelly(150, 118, 14, '#4df0ff'), jelly(150, 118, 14, '#4dd0ff')) +
      diff(330, 178, 28, jelly(330, 176, 15, '#b38cff'), jelly(330, 176, 12, '#b38cff')) +
      diff(520, 116, 26, jelly(520, 106, 13, '#ffd166', 4), jelly(520, 106, 13, '#ffd166', 3)) +
      diff(690, 178, 36, drift(2.8), drift(1.1)) +
      // Anglerfish and its lure
      angler(230, 372) + `<path d="M280 324v-6" stroke="#4a4366" stroke-width="2"/>` +
      diff(282, 320, 22, lure(282, 322, '#ffe14d'), lure(282, 322, '#ffc04d')) +
      diff(452, 305, 32, squid(446, 300), squid(458, 300)) +
      lanternfish(600, 336) + diff(594, 334, 22, spot(594, 334), anim({ type: 'blink', duty: 0.5, period: 1.2 }, spot(594, 334))) +
      diff(700, 420, 28, hatchet(700, 420), `<g transform="rotate(-24 700 420)">${hatchet(700, 420)}</g>`) +
      smallFish(340, 440, '#5c6a8a') + diff(386, 420, 22, smallFish(386, 420, '#5c6a8a'), '') + smallFish(520, 452, '#5c6a8a') +
      // Sea floor
      `<path d="M0 470Q200 450 400 466T800 460V500H0Z" fill="#1b2440"/>` +
      rock(80, 490, 1.6, '#2b3556') + rock(560, 492, 1.3, '#2b3556') + rock(760, 494, 1.5, '#2b3556') +
      diff(120, 464, 22, '', starfish(120, 468, '#c96a5a')) +
      `<path d="M300 490q-4 -30 6 -50M312 490q8 -26 0 -46" stroke="#3a5a6a" stroke-width="4" fill="none"/>` +
      seaUrchin(430, 478) +
      clam(222, 484) +
      seahorse(170, 360) +
      bottleMessage(660, 480) +
      anchor(370, 470) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['jellyfish', 161, 242],
        ['fish', 121, 52, '#ff6b8b'],
        ['seahorse', 705, 304],
        ['fish', 332, 368, '#4dabf7'],
        ['fish', 739, 71, '#4dabf7'],
      ])
    )
  },
})
