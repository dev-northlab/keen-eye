// Motion differences: the splash at the foot of the falls bubbles faster on picture B; the salmon leaps only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { acorn, backpack, bluebells, butterfly, feather, fern, pine, pineCone } from './shapes.ts'

/** Kingfisher, faces left; (x, y) = feet. Bounds: x ±14, y from −16 to 0. */
const kingfisher = (x: number, y: number, back: string) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-7" rx="9" ry="6" fill="${back}"/><ellipse cx="1" cy="-4" rx="6" ry="4" fill="#f28c28"/>` +
  `<circle cx="-6" cy="-12" r="5" fill="${back}"/><path d="M-10 -13l-6 1l6 2Z" fill="#2b2b2b"/><circle cx="-7" cy="-13" r="1" fill="#fff"/><path d="M8 -8l6 4" stroke="${back}" stroke-width="3"/></g>`

/** Broken branch sticking out of the cliff at (x, y). Bounds: x from 0 to +36, y ±10. */
const branch = (x: number, y: number) => `<path d="M${x} ${y}l34 -6M${x + 18} ${y - 3}l8 -8M${x + 26} ${y - 5}l6 6" stroke="#6b4a2a" stroke-width="3.5" stroke-linecap="round"/>`

/** Flower on a ledge; (x, y) = stem foot, petal size p. */
const ledgeFlower = (x: number, y: number, p: number) =>
  `<path d="M${x} ${y}v-10" stroke="#3f8f3a" stroke-width="2"/>` +
  [0, 72, 144, 216, 288].map((a) => `<ellipse cx="${x}" cy="${y - 10 - p * 0.55}" rx="${p * 0.3}" ry="${p * 0.5}" fill="#ff6b8b" transform="rotate(${a} ${x} ${y - 10})"/>`).join('') +
  `<circle cx="${x}" cy="${y - 10}" r="${p * 0.3}" fill="#ffd166"/>`

/** Trout with `stripes` dark stripes, faces right; (x, y) = center. Bounds: x ±16, y ±7. */
const trout = (x: number, y: number, stripes: number) => {
  let s = `<ellipse cx="${x}" cy="${y}" rx="13" ry="6" fill="#c9b07a"/><path d="M${x - 11} ${y}l-6 -6v12Z" fill="#c9b07a"/><circle cx="${x + 8}" cy="${y - 1}" r="1.3" fill="#222"/>`
  for (let i = 0; i < stripes; i++) s += `<path d="M${x - 6 + i * 6} ${y - 5}v10" stroke="#7a6a3a" stroke-width="3"/>`
  return s
}

/** Salmon over the water; (x, y) = center. Bounds: x ±16, y ±9. */
const salmon = (x: number, y: number) =>
  `<g transform="translate(${x} ${y}) rotate(-28)"><ellipse rx="13" ry="6" fill="#e07a5f"/><path d="M-11 0l-6 -6v12Z" fill="#e07a5f"/><circle cx="7" cy="-1" r="1.3" fill="#222"/></g>`

const splash = (x: number, y: number) =>
  `<circle cx="${x - 15}" cy="${y}" r="7" fill="#ffffff" fill-opacity="0.9"/><circle cx="${x - 4}" cy="${y - 6}" r="8" fill="#ffffff" fill-opacity="0.9"/>` +
  `<circle cx="${x + 8}" cy="${y - 3}" r="7" fill="#ffffff" fill-opacity="0.9"/><circle cx="${x + 17}" cy="${y + 1}" r="6" fill="#ffffff" fill-opacity="0.9"/>`

const stone = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="18" ry="8" fill="#8d8a80"/><ellipse cx="${x - 4}" cy="${y - 3}" rx="8" ry="3" fill="#a9a69c"/>`

/** Fallen log; (x, y) = bottom center. Bounds: x from −22 to +26, y from −16 to 0. */
const log = (x: number, y: number) => `<rect x="${x - 22}" y="${y - 16}" width="44" height="16" rx="8" fill="#7a5038"/><circle cx="${x + 18}" cy="${y - 8}" r="7" fill="#c9a06c"/><circle cx="${x + 18}" cy="${y - 8}" r="3" fill="none" stroke="#a0703f"/>`

export default svgLevel({
  id: 129,
  chapter: 'forest',
  title: 'forestFalls',
  parTimeSec: 90,
  scene: ({ diff, anim, rand, extra }) => {
    let topTrees = ''
    for (let x = -10; x < 820; x += 34) if (x < 300 || x > 500) topTrees += pine(x + rand() * 10, 112, 0.7 + rand() * 0.4, rand() < 0.5 ? '#2f7d55' : '#3a8a5e')
    let strata = ''
    for (let y = 130; y < 360; y += 26) strata += `<path d="M0 ${y}q80 -8 160 0t160 0M480 ${y + 6}q80 -8 160 0t160 0" stroke="#77746b" stroke-width="2" fill="none"/>`
    let moss = ''
    for (let i = 0; i < 18; i++) {
      const left = rand() < 0.5
      moss += `<ellipse cx="${(left ? rand() * 300 : 500 + rand() * 300).toFixed(1)}" cy="${(140 + rand() * 210).toFixed(1)}" rx="${(10 + rand() * 14).toFixed(1)}" ry="5" fill="#5f8f4a"/>`
    }
    let falls = ''
    for (let x = 326; x < 476; x += 14) falls += anim({ type: 'bob', dx: 0, dy: 10, period: 0.6 + ((x / 14) % 3) * 0.15 }, `<path d="M${x} 104V350" stroke="#e8f6fd" stroke-width="6" stroke-opacity="0.8"/>`)
    const bubbling = (period: number) => anim({ type: 'bob', dx: 0, dy: -5, period }, splash(400, 352))
    const leap = salmon(520, 378)

    return (
      `<rect width="800" height="500" fill="#cbe9fb"/>` + topTrees +
      // Cliffs and the falls
      `<path d="M0 100H320V370H0Z" fill="#8d8a80"/><path d="M480 100H800V370H480Z" fill="#8d8a80"/>` + strata + moss +
      `<rect x="320" y="100" width="160" height="260" fill="#7cc4e4"/>` + falls +
      `<path d="M330 330q70 -60 140 0" stroke="#ff6b8b" stroke-width="3" stroke-opacity="0.35" fill="none"/><path d="M336 336q64 -54 128 0" stroke="#ffd166" stroke-width="3" stroke-opacity="0.35" fill="none"/>` +
      `<path d="M342 342q58 -48 116 0" stroke="#8ac926" stroke-width="3" stroke-opacity="0.35" fill="none"/>` +
      diff(218, 196, 26, branch(200, 200), `<g transform="rotate(-24 200 200)">${branch(200, 200)}</g>`) +
      `<rect x="80" y="282" width="80" height="8" rx="4" fill="#6f6c64"/>` + ledgeFlower(104, 284, 10) +
      diff(132, 270, 22, ledgeFlower(132, 284, 10), ledgeFlower(132, 284, 13)) +
      `<path d="M560 186q40 -6 70 6" stroke="#6b4a2a" stroke-width="5" fill="none"/>` +
      diff(600, 176, 22, kingfisher(600, 188, '#2a86c9'), kingfisher(600, 188, '#2aa3a9')) +
      // Pool
      `<path d="M0 370H800V450H0Z" fill="#5aa9cc"/><path d="M0 372H800" stroke="#7cc4e4" stroke-width="4"/>` +
      `<ellipse cx="400" cy="362" rx="70" ry="10" fill="#e8f6fd" fill-opacity="0.7"/>` + diff(400, 350, 28, bubbling(1.2), bubbling(0.45)) +
      `<path d="M220 400q20 -4 40 0M600 420q20 -4 40 0M100 430q20 -4 40 0" stroke="#bde3f2" stroke-width="2" fill="none"/>` +
      trout(250, 420, 3) + diff(300, 410, 22, trout(300, 410, 1), trout(300, 410, 3)) +
      diff(520, 380, 28, leap, anim({ type: 'bob', dx: 4, dy: -8, period: 1.6 }, leap)) +
      stone(560, 430) + diff(612, 438, 22, stone(612, 438), '') + stone(664, 432) +
      // Banks
      `<path d="M0 450Q200 440 400 452T800 446V500H0Z" fill="#6f9e52"/>` +
      diff(152, 466, 30, log(146, 476), log(156, 476)) +
      fern(40, 496, '#3f8f50') + fern(260, 494) + fern(470, 496, '#3f8f50') + fern(720, 490) + fern(770, 494, '#3f8f50') +
      diff(742, 432, 22, '', butterfly(742, 432, '#ffb703')) +
      pineCone(330, 490) +
      acorn(560, 488) +
      backpack(645, 484) +
      bluebells(398, 484) +
      feather(88, 281) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['bird', 90, 358],
        ['bird', 503, 125],
        ['frog', 681, 404],
        ['fish', 376, 425, '#ff6b8b'],
        ['butterfly', 349, 35],
      ])
    )
  },
})
