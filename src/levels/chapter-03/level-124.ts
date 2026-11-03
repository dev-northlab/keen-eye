// Motion differences: the owl in the hollow blinks only on picture B; the fern by the fox sways faster on B.
import { svgLevel } from '../helpers.ts'
import { acorn, anthill, bird, bush, deer, feather, fern, fox, mushroom, pine, pineCone, rock, trailSign } from './shapes.ts'

/** Spider web with `spokes` radial threads; (x, y) = center, radius r. */
const web = (x: number, y: number, r: number, spokes: number) => {
  let d = ''
  for (let i = 0; i < spokes; i++) {
    const a = (i * 2 * Math.PI) / spokes
    d += `M${x} ${y}L${(x + Math.cos(a) * r).toFixed(1)} ${(y + Math.sin(a) * r).toFixed(1)}`
  }
  let rings = ''
  for (const k of [0.35, 0.65, 0.95]) rings += `<circle cx="${x}" cy="${y}" r="${(r * k).toFixed(1)}" fill="none" stroke="#f4f4f4" stroke-width="1" stroke-opacity="0.8"/>`
  return `<path d="${d}" stroke="#f4f4f4" stroke-width="1.2" stroke-opacity="0.9"/>` + rings
}

/** Owl eyes in a dark hollow; (x, y) = between the eyes. Bounds: x ±10, y ±5. */
const eyes = (x: number, y: number) =>
  `<circle cx="${x - 6}" cy="${y}" r="4.5" fill="#ffd23f"/><circle cx="${x + 6}" cy="${y}" r="4.5" fill="#ffd23f"/><circle cx="${x - 6}" cy="${y}" r="2" fill="#222"/><circle cx="${x + 6}" cy="${y}" r="2" fill="#222"/>`

/** Broken twig hanging from (x, y). Bounds: x from −4 to +30, y from 0 to +24. */
const twig = (x: number, y: number) => `<path d="M${x} ${y}l26 20M${x + 14} ${y + 11}l4 -10M${x + 22} ${y + 17}l8 0" stroke="#4a3a2e" stroke-width="3" stroke-linecap="round"/>`

const berries = (x: number, y: number, color: string) =>
  `<circle cx="${x - 5}" cy="${y}" r="4" fill="${color}"/><circle cx="${x + 4}" cy="${y - 2}" r="4" fill="${color}"/><circle cx="${x}" cy="${y + 5}" r="4" fill="${color}"/>`

const fog = (y: number, opacity: number) => `<path d="M-40 ${y}q100 -24 200 0t200 0t200 0t280 0V${y + 40}H-40Z" fill="#f4f6f2" fill-opacity="${opacity}"/>`

export default svgLevel({
  id: 124,
  chapter: 'forest',
  title: 'mistyThicket',
  parTimeSec: 105,
  scene: ({ diff, anim, rand }) => {
    let far = ''
    for (let x = -10; x < 820; x += 34) far += pine(x + rand() * 10, 230 + rand() * 10, 0.9 + rand() * 0.5, '#a9bfae')
    let mid = ''
    for (let x = 10; x < 820; x += 60) mid += pine(x + rand() * 20, 320 + rand() * 10, 1.2 + rand() * 0.4, '#7f9e88')
    const sway = (period: number) => anim({ type: 'sway', angle: 12, pivot: [180, 486], period }, fern(180, 486, '#3f7a4a'))

    return (
      `<rect width="800" height="500" fill="#d5e0d4"/>` + far + fog(200, 0.7) + mid +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 20 }, fog(280, 0.55)) +
      deer(430, 330, true, '#b9a08a') +
      `<path d="M0 340Q400 310 800 340V500H0Z" fill="#6f8f6a"/>` +
      `<path d="M330 500q30 -80 70 -150q20 -10 40 0q30 70 80 150Z" fill="#a9b89a"/>` +
      // Near trunks with branches
      `<rect x="60" y="0" width="60" height="420" fill="#3a2a1e"/><rect x="720" y="0" width="50" height="410" fill="#3a2a1e"/>` +
      `<rect x="250" y="0" width="22" height="350" fill="#4a3a2e"/><rect x="560" y="0" width="22" height="360" fill="#4a3a2e"/>` +
      `<path d="M120 160Q220 140 330 160M272 140Q400 130 470 190M582 110Q650 130 720 120M582 250Q650 220 720 240" stroke="#4a3a2e" stroke-width="7" fill="none"/>` +
      `<ellipse cx="90" cy="200" rx="18" ry="24" fill="#1d140e"/>` +
      diff(90, 198, 22, eyes(90, 198), anim({ type: 'blink', duty: 0.7, period: 2.4 }, eyes(90, 198))) +
      bird(300, 154, '#7a6a5a') + diff(330, 146, 22, bird(330, 156, '#7a6a5a', true), '') +
      diff(482, 200, 26, twig(466, 190), `<g transform="rotate(22 466 190)">${twig(466, 190)}</g>`) +
      `<path d="M626 156L674 130M626 206L680 230" stroke="#f4f4f4" stroke-width="1" stroke-opacity="0.8"/>` +
      diff(650, 180, 30, web(650, 180, 26, 6), web(650, 180, 26, 8)) +
      // Undergrowth
      bush(130, 450, 1.4, '#3f6e46') + berries(110, 420, '#c1121f') + berries(150, 426, '#c1121f') +
      bush(560, 470, 1.6, '#3f6e46') + berries(530, 440, '#c1121f') + diff(566, 434, 22, berries(566, 434, '#c1121f'), berries(566, 434, '#a3204a')) +
      fox(250, 444, false, '#d9732c') + bush(280, 460, 1, '#4f7d4f') +
      diff(180, 464, 26, sway(2.2), sway(0.8)) + fern(60, 488, '#3f7a4a') +
      mushroom(410, 486, '#c9622c', 0.8) + diff(382, 474, 22, '', mushroom(382, 486, '#c9622c', 0.65)) +
      rock(640, 492, 1.1, '#9aa39a') + diff(704, 474, 24, rock(698, 488, 0.8, '#8a948a'), rock(710, 488, 0.8, '#8a948a')) +
      fern(770, 492, '#3f7a4a') +
      pineCone(470, 445) +
      acorn(320, 425) +
      anthill(660, 440) +
      feather(200, 385) +
      trailSign(785, 415) +
      fog(430, 0.25)
    )
  },
})
