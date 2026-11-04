// Motion differences: one firefly over the clearing blinks only on picture B; the frog puffs its throat only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { snail } from '../shapes.ts'
import { acorn, bluebells, hedgehog, lantern, pineCone } from './shapes.ts'

/** Glowing mushroom; (x, y) = stem foot; `spots` light spots on the cap. Bounds: x ±16, y from −30 to 0. */
const glowShroom = (x: number, y: number, cap: string, spots = 3) => {
  const at: [number, number][] = [[-6, -21], [3, -24], [8, -18]]
  let s = `<circle cx="${x}" cy="${y - 18}" r="18" fill="${cap}" fill-opacity="0.15"/><rect x="${x - 3}" y="${y - 14}" width="6" height="14" rx="2" fill="#d8f2f0"/>` + `<path d="M${x - 13} ${y - 13}q13 -24 26 0Z" fill="${cap}"/>`
  for (let i = 0; i < spots; i++) s += `<circle cx="${x + at[i][0]}" cy="${y + at[i][1]}" r="3" fill="#f4fffe"/>`
  return s
}

/** Owl body on a branch; (x, y) = feet. Head separate. Bounds: x ±15, y from −24 to 0. */
const owlBody = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-12" rx="14" ry="13" fill="#5a4636"/><ellipse cy="-9" rx="8" ry="8" fill="#8a7055"/></g>`
const owlHead = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-30" rx="14" ry="11" fill="#5a4636"/><path d="M-12 -37l-3 -6l8 3ZM12 -37l3 -6l-8 3Z" fill="#5a4636"/>` +
  `<circle cx="-5" cy="-31" r="4.5" fill="#ffd23f"/><circle cx="5" cy="-31" r="4.5" fill="#ffd23f"/><circle cx="-5" cy="-31" r="2" fill="#111"/><circle cx="5" cy="-31" r="2" fill="#111"/>` +
  `<path d="M-2 -26l2 4l2 -4Z" fill="#e9a23b"/></g>`

const firefly = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="6" fill="#eaff7a" fill-opacity="0.3"/><circle cx="${x}" cy="${y}" r="2.4" fill="#f6ffb0"/>`

/** Bat, faces right; (x, y) = body. Bounds: x ±20, y from −10 to +8. */
const bat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#3a4870"><path d="M-4 0q-8 -12 -20 -4q6 2 6 8q6 -4 14 0Z"/><path d="M4 0q8 -12 20 -4q-6 2 -6 8q-6 -4 -14 0Z"/><ellipse rx="5" ry="7"/></g>`

/** Frog on the bank, faces left; (x, y) = bottom center. Throat separate. Bounds: x ±14, y from −18 to 0. */
const frog = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-6" rx="14" ry="7" fill="#3f7a3a"/><circle cx="-6" cy="-14" r="4" fill="#3f7a3a"/><circle cx="6" cy="-14" r="4" fill="#3f7a3a"/>` +
  `<circle cx="-6" cy="-15" r="1.8" fill="#111"/><circle cx="6" cy="-15" r="1.8" fill="#111"/></g>`
const throat = (x: number, y: number) => `<ellipse cx="${x}" cy="${y - 4}" rx="6" ry="4" fill="#c9e09a"/>`

export default svgLevel({
  id: 128,
  chapter: 'forest',
  title: 'fireflyNight',
  parTimeSec: 90,
  scene: ({ diff, anim, rand, extra }) => {
    let stars = ''
    for (let i = 0; i < 36; i++) {
      const x = 180 + rand() * 440
      const y = rand() * 170
      if (Math.hypot(x - 640, y - 90) > 50 && Math.hypot(x - 400, y - 90) > 28) stars += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.8 + rand()).toFixed(1)}" fill="#fff8d6"/>`
    }
    let flies = ''
    for (let i = 0; i < 18; i++) {
      const x = 40 + rand() * 720
      const y = 200 + rand() * 260
      if (Math.hypot(x - 300, y - 250) > 30) flies += anim({ type: 'blink', duty: 0.6, period: 1.4 + rand() * 1.6, phase: rand() }, firefly(x, y))
    }
    let silhouettes = ''
    for (let x = 0; x < 820; x += 40) silhouettes += `<path d="M${x} 330L${x + 20} ${220 + rand() * 50}L${x + 40} 330Z" fill="#16263a"/>`
    let reeds = ''
    for (let i = 0; i < 8; i++) reeds += `<path d="M${680 + i * 9} 420V${360 + (i % 3) * 12}" stroke="#1f3a2a" stroke-width="3"/>`
    const puff = (moving: boolean) => (moving ? anim({ type: 'bob', dx: 0, dy: 3, period: 0.8 }, throat(620, 424)) : throat(620, 424))

    return (
      `<rect width="800" height="500" fill="#0f1a2e"/>` + stars +
      `<circle cx="640" cy="90" r="50" fill="#fff8d6" fill-opacity="0.1"/><circle cx="640" cy="90" r="34" fill="#fff3c4"/><circle cx="628" cy="80" r="6" fill="#ece0a8"/><circle cx="650" cy="102" r="8" fill="#ece0a8"/>` +
      diff(250, 50, 22, `<path d="M250 43l2 5l5 0.5l-4 3.5l1.5 5l-4.5 -3l-4.5 3l1.5 -5l-4 -3.5l5 -0.5Z" fill="#fff3a3"/>`, '') +
      diff(400, 90, 24, '', bat(400, 90)) +
      anim({ type: 'path', points: [[0, 0], [-80, 20], [-40, 50]], period: 12 }, bat(520, 150)) +
      silhouettes +
      `<rect y="320" width="800" height="180" fill="#132a22"/>` +
      // Framing trunks and the owl
      `<rect x="40" y="0" width="56" height="440" fill="#0a1220"/><path d="M96 180q60 -10 120 6" stroke="#0a1220" stroke-width="10" fill="none"/>` +
      `<rect x="730" y="0" width="50" height="440" fill="#0a1220"/><path d="M730 220q-50 -10 -100 10" stroke="#0a1220" stroke-width="9" fill="none"/>` +
      owlBody(150, 180) + diff(150, 150, 24, owlHead(150, 180), `<g transform="rotate(22 150 160)">${owlHead(150, 180)}</g>`) +
      // Pond with lilies and the frog
      `<ellipse cx="520" cy="402" rx="150" ry="36" fill="#1d3550"/><ellipse cx="560" cy="396" rx="20" ry="6" fill="#fff3c4" fill-opacity="0.6"/>` +
      `<ellipse cx="450" cy="410" rx="14" ry="4" fill="#2f6b3a"/><ellipse cx="590" cy="414" rx="12" ry="4" fill="#2f6b3a"/>` +
      diff(500, 396, 22, `<ellipse cx="500" cy="396" rx="13" ry="4" fill="#2f6b3a"/>`, `<ellipse cx="500" cy="396" rx="17" ry="5.5" fill="#2f6b3a"/>`) +
      frog(620, 430) + diff(620, 420, 22, puff(false), puff(true)) + reeds +
      // Bush with fox eyes
      `<circle cx="310" cy="390" r="34" fill="#1a3a2a"/><circle cx="350" cy="396" r="28" fill="#1f4230"/><circle cx="330" cy="370" r="26" fill="#1f4230"/>` +
      `<circle cx="322" cy="386" r="3" fill="#ffdc5a"/><circle cx="334" cy="386" r="3" fill="#ffdc5a"/>` +
      `<path d="M0 480q100 -14 200 0t200 0t200 0t200 0V500H0Z" fill="#0f2219"/>` +
      // Glowing mushrooms and a hedgehog
      glowShroom(110, 476, '#4df0d0') + diff(152, 456, 22, glowShroom(152, 470, '#4df0d0'), glowShroom(152, 470, '#4dc4f0')) +
      glowShroom(190, 486, '#b38cff') + diff(234, 458, 24, glowShroom(234, 476, '#b38cff'), glowShroom(234, 476, '#b38cff', 1)) +
      diff(419, 470, 28, hedgehog(412, 482), hedgehog(426, 482)) +
      diff(300, 250, 22, firefly(300, 250), anim({ type: 'blink', duty: 0.5, period: 1.1 }, firefly(300, 250))) +
      flies +
      lantern(300, 470) +
      pineCone(520, 480) +
      acorn(690, 470) +
      snail(580, 460) +
      bluebells(150, 352) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['hedgehog', 247, 395],
        ['frog', 416, 359],
        ['mushroom', 660, 359],
        ['star', 201, 108],
        ['star', 688, 188],
      ])
    )
  },
})
