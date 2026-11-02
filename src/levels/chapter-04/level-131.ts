// Motion differences: the turtle paddles faster on picture B; the seahorse bobs only on B.
import { svgLevel } from '../helpers.ts'
import { coral, fish, jellyfish, sandBits, seaweed, shell, starfish, turtle } from './shapes.ts'

/** Clownfish, faces right; (x, y) = center. Bounds: x ±13, y ±7. */
const clownfish = (x: number, y: number, body: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-9 0l-5 -6v12Z" fill="${body}"/><ellipse rx="11" ry="6" fill="${body}"/>` +
  `<path d="M-3 -6v12M5 -5v10" stroke="#fff" stroke-width="3"/><circle cx="8" cy="-1" r="1.3" fill="#222"/></g>`

/** Anemone; (x, y) = base, tentacle height h. */
const anemone = (x: number, y: number, h: number) => {
  let d = ''
  for (let i = -4; i <= 4; i++) d += `M${x + i * 4} ${y}q${i * 2} ${-h * 0.6} ${i * 3} ${-h}`
  return `<path d="${d}" stroke="#ff9ec7" stroke-width="4" stroke-linecap="round" fill="none"/><ellipse cx="${x}" cy="${y}" rx="18" ry="5" fill="#d9619a"/>`
}

/** Angelfish with `stripes` stripes, faces left; (x, y) = center. Bounds: x ±16, y ±16. */
const angelfish = (x: number, y: number, stripes: number) => {
  let s = `<path d="M${x - 14} ${y}L${x} ${y - 16}L${x + 10} ${y}L${x} ${y + 16}Z" fill="#ffd23f"/><path d="M${x + 8} ${y}l8 -6v12Z" fill="#ffd23f"/>`
  for (let i = 0; i < stripes; i++) s += `<path d="M${x - 6 + i * 6} ${y - 10 + Math.abs(i - 1)}v${20 - 2 * Math.abs(i - 1)}" stroke="#2b2b2b" stroke-width="2.5"/>`
  return s + `<circle cx="${x - 9}" cy="${y - 2}" r="1.4" fill="#222"/>`
}

/** Brain coral; (x, y) = base center. Bounds: x ±24, y from −26 to 0. */
const brainCoral = (x: number, y: number, color: string) =>
  `<path d="M${x - 24} ${y}a24 26 0 0 1 48 0Z" fill="${color}"/><path d="M${x - 16} ${y - 4}q4 -16 10 -2t10 -2t10 -2M${x - 12} ${y - 16}q6 -8 12 0t12 0" stroke="#000" stroke-opacity="0.18" stroke-width="2" fill="none"/>`

/** Sea fan; (x, y) = base. Bounds: x ±22, y from −44 to 0. */
const seaFan = (x: number, y: number) =>
  `<path d="M${x} ${y}q-30 -20 -20 -40q20 -10 20 4q0 -14 20 -4q10 20 -20 40Z" fill="#b388eb" fill-opacity="0.9"/>` +
  `<path d="M${x} ${y}l-12 -34M${x} ${y}v-36M${x} ${y}l12 -34M${x - 6} ${y - 18}h12" stroke="#7a4fc9" stroke-width="1.5"/>`

/** Seahorse, faces left; (x, y) = center. Bounds: x ±10, y ±16. */
const seahorse = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M2 -14q-10 -2 -10 6q0 6 6 8q-6 6 0 12q4 4 0 8q-6 2 -4 -2" stroke="#f2a93b" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  `<path d="M-6 -12l-6 2" stroke="#f2a93b" stroke-width="3"/><circle cx="-2" cy="-12" r="1.2" fill="#222"/></g>`

const urchin = (x: number, y: number) => {
  let d = ''
  for (let a = 180; a <= 360; a += 22.5) d += `M${x} ${y}l${(Math.cos((a * Math.PI) / 180) * 14).toFixed(1)} ${(Math.sin((a * Math.PI) / 180) * 14).toFixed(1)}`
  return `<path d="${d}" stroke="#3a2a5a" stroke-width="2"/><ellipse cx="${x}" cy="${y}" rx="8" ry="6" fill="#4a3a6a"/>`
}

export default svgLevel({
  id: 131,
  chapter: 'sea',
  title: 'coralReef',
  parTimeSec: 125,
  scene: ({ diff, anim, rand }) => {
    let bubbles = ''
    for (let i = 0; i < 10; i++)
      bubbles += anim({ type: 'bob', dx: 3, dy: -14, period: 2 + rand() * 2, phase: rand() }, `<circle cx="${(40 + rand() * 720).toFixed(1)}" cy="${(300 + rand() * 120).toFixed(1)}" r="${(2 + rand() * 3).toFixed(1)}" fill="#e3f6fd" fill-opacity="0.7"/>`)
    let school = ''
    const schoolAt: [number, number][] = [[580, 80], [640, 96], [680, 76], [660, 124], [620, 140], [760, 110], [700, 160], [740, 70]]
    for (const [x, y] of schoolAt) school += fish(x, y, '#5cc6e8', 0.8, true)
    let weeds = ''
    for (const [x, s, p] of [[20, 1.6, 2.4], [250, 1.3, 2.8], [540, 1.5, 2.2], [780, 1.7, 3]] as const)
      weeds += anim({ type: 'sway', angle: 8, pivot: [x, 470], period: p }, seaweed(x, 470, s, '#2a9d8f'))
    const paddle = (period: number) => anim({ type: 'bob', dx: 4, dy: -5, period }, turtle(300, 150, '#6fbf7a'))
    const bobbing = (moving: boolean) => (moving ? anim({ type: 'bob', dx: 0, dy: -6, period: 1.6 }, seahorse(530, 318)) : seahorse(530, 318))

    return (
      `<rect width="800" height="500" fill="#1f86b0"/><rect width="800" height="180" fill="#2a9dc4"/>` +
      `<path d="M120 0L80 420H180ZM420 0L380 420H460ZM660 0L640 420H720Z" fill="#ffffff" fill-opacity="0.06"/>` +
      `<path d="M0 360Q120 300 260 340T520 320T800 340V420H0Z" fill="#2a7f9f"/>` +
      school + diff(600, 100, 22, fish(600, 104, '#5cc6e8', 0.8, true), fish(600, 104, '#6ab8e0', 0.8, true)) +
      diff(724, 142, 26, fish(716, 140, '#5cc6e8', 0.8, true), fish(730, 146, '#5cc6e8', 0.8, true)) +
      diff(302, 140, 33, paddle(2.6), paddle(1.1)) +
      `<path d="M560 200q40 -30 80 0q-20 4 -40 20q-20 -16 -40 -20Z" fill="#3d6f8f"/><path d="M600 220q2 20 -6 34" stroke="#3d6f8f" stroke-width="2" fill="none"/>` +
      anim({ type: 'bob', dx: 0, dy: -10, period: 3.4 }, jellyfish(200, 290, '#ffb3d9')) +
      fish(160, 220, '#ff9f43', 1.2) + fish(220, 250, '#ff6b8b', 1) + fish(650, 250, '#8ac926', 1.1, true) +
      diff(430, 250, 24, angelfish(430, 250, 3), angelfish(430, 250, 2)) +
      `<rect y="420" width="800" height="80" fill="#e9d8a6"/>` + sandBits(rand, 430, 495, 14) +
      // Coral garden
      coral(40, 430, '#ff6b8b') + coral(230, 432, '#ffb703') + coral(360, 424, '#ff6b8b') + coral(470, 428, '#ff9f43') + coral(760, 430, '#ffb703') +
      `<path d="M560 430v-60M560 400l-20 -24M560 390l18 -22M540 376l-6 -14M578 368l6 -12" stroke="#ff8fab" stroke-width="9" stroke-linecap="round"/>` +
      diff(700, 334, 32, seaFan(700, 358), `<g transform="rotate(14 700 358)">${seaFan(700, 358)}</g>`) +
      `<path d="M650 428q20 -72 50 -72q30 0 50 72Z" fill="#6f8a8a"/><path d="M670 400q14 -8 26 0M704 390q12 -6 22 2" stroke="#5a7272" stroke-width="3" fill="none"/>` +
      diff(530, 322, 26, bobbing(false), bobbing(true)) +
      anemone(90, 426, 22) + anemone(160, 416, 26) +
      diff(162, 384, 22, clownfish(162, 386, '#ff7f11'), clownfish(162, 386, '#f05a1f')) +
      diff(300, 438, 26, brainCoral(300, 452, '#c9a0dc'), brainCoral(300, 452, '#b8a8e6')) +
      starfish(390, 476, '#ff6b8b') + starfish(720, 480) + shell(560, 488) + shell(660, 492, '#ffd1dc') +
      diff(612, 474, 22, shell(612, 482, '#f4f1e8'), '') +
      diff(480, 468, 22, '', urchin(480, 476)) +
      weeds + bubbles
    )
  },
})
