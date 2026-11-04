// Motion differences: the middle pier lamp flickers only on picture B; the fishing float bobs faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bottleMessage, fish, gullStanding, lifeRing, person, sunglasses, sunHat } from './shapes.ts'

/** Pier lamp; (x, y) = post foot on the deck. Head separate. Bounds: x ±4, y from −72 to 0. */
const lampPost = (x: number, y: number) => `<rect x="${x - 2}" y="${y - 72}" width="4" height="72" fill="#3a2a3a"/><path d="M${x - 8} ${y - 72}h16" stroke="#3a2a3a" stroke-width="3"/>`
const lampHead = (x: number, y: number, light: string) =>
  `<circle cx="${x}" cy="${y - 82}" r="14" fill="${light}" fill-opacity="0.25"/><rect x="${x - 6}" y="${y - 90}" width="12" height="16" rx="3" fill="${light}" stroke="#3a2a3a" stroke-width="2"/>`

/** Railing section 40 wide with `posts` balusters; (x, y) = deck level at its left end. */
const railing = (x: number, y: number, posts: number) => {
  let s = ''
  for (let i = 0; i < posts; i++) s += `<rect x="${(x + 2 + (34 * i) / (posts - 1)).toFixed(1)}" y="${y - 24}" width="3" height="24" fill="#6b4a3a"/>`
  return s
}

/** Fishing rod from the hand at (x, y) up-left. Bounds: x from −40 to 0, y from −31 to 0. */
const rod = (x: number, y: number) => `<path d="M${x} ${y}L${x - 40} ${y - 31}" stroke="#3a2a2a" stroke-width="2.5"/>`

const float = (x: number, y: number) => `<path d="M${x - 5} ${y}a5 5 0 0 1 10 0Z" fill="#e63946"/><path d="M${x - 5} ${y}a5 5 0 0 0 10 0Z" fill="#f4f4f4"/>`

/** Far sailboat silhouette; (x, y) = waterline, sail height h. */
const farSail = (x: number, y: number, h: number) => `<path d="M${x - 18} ${y - 4}h36l-6 6h-24Z" fill="#5a3a4a"/><path d="M${x} ${y - 4}V${y - h}L${x + 16} ${y - 6}Z" fill="#7a4a5a"/>`

const bucket = (x: number, y: number) => `<path d="M${x - 8} ${y - 14}h16l-3 14h-10Z" fill="#3a86ff"/><path d="M${x - 7} ${y - 14}q7 -8 14 0" stroke="#3a86ff" stroke-width="1.5" fill="none"/>`

export default svgLevel({
  id: 140,
  chapter: 'sea',
  title: 'pierSunset',
  parTimeSec: 90,
  scene: ({ diff, anim, rand, extra }) => {
    let streaks = ''
    for (let i = 0; i < 30; i++) {
      const y = 262 + rand() * 230
      const w = 10 + rand() * 40
      streaks += `<rect x="${(rand() * 780).toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="2" fill="#ffd9a0" fill-opacity="0.45"/>`
    }
    let sunPath = ''
    for (let i = 0; i < 7; i++) sunPath += `<rect x="${(490 + i * 4).toFixed(1)}" y="${264 + i * 16}" width="${60 - i * 8}" height="5" rx="2" fill="#ffe08a" fill-opacity="0.7"/>`
    let rails = ''
    for (let x = 120; x < 800; x += 40) if (x !== 480) rails += railing(x, 360, 4)
    let posts = ''
    for (let x = 130; x < 800; x += 70) posts += `<rect x="${x - 6}" y="388" width="12" height="70" fill="#5a3a3a"/>`
    const flicker = (moving: boolean) => (moving ? anim({ type: 'blink', duty: 0.6, period: 0.9 }, lampHead(520, 360, '#ffe08a')) : lampHead(520, 360, '#ffe08a'))
    const bobbing = (period: number) => anim({ type: 'bob', dx: 0, dy: 4, period }, float(352, 424))

    return (
      `<rect width="800" height="500" fill="#8a5a7a"/><rect width="800" height="90" fill="#ff8f7a"/><rect y="90" width="800" height="90" fill="#ffae80"/><rect y="180" width="800" height="76" fill="#ffcb90"/>` +
      `<path d="M80 70q60 -16 130 0q-60 10 -130 0ZM560 110q70 -18 150 0q-70 12 -150 0Z" fill="#ffd2c2" fill-opacity="0.8"/>` +
      `<path d="M300 60q5 -6 10 0q5 -6 10 0M330 74q4 -5 8 0q4 -5 8 0" stroke="#6b3a4a" stroke-width="2" fill="none"/>` +
      anim({ type: 'path', points: [[0, 0], [-200, 30]], period: 18 }, `<path d="M640 150q5 -6 10 0q5 -6 10 0" stroke="#6b3a4a" stroke-width="2" fill="none"/>`) +
      // Sun on the horizon and the sea
      `<circle cx="520" cy="256" r="46" fill="#ffd166"/>` +
      `<rect y="256" width="800" height="244" fill="#c97a7a"/><rect y="340" width="800" height="160" fill="#a8667a"/>` + sunPath + streaks +
      // Far lighthouse and sailboat
      `<path d="M30 256q40 -14 90 0Z" fill="#5a3a4a"/><path d="M70 250l6 -54h10l6 54Z" fill="#f4ecd8"/><rect x="74" y="188" width="14" height="10" fill="#ffe08a"/><path d="M72 188l9 -8l9 8Z" fill="#5a3a4a"/>` +
      diff(680, 232, 28, farSail(680, 256, 34), farSail(680, 256, 42)) +
      // Pier
      posts + diff(200, 404, 22, `<circle cx="200" cy="404" r="7" fill="none" stroke="#c9a227" stroke-width="3"/>`, '') +
      `<rect x="100" y="360" width="700" height="30" fill="#7a4a3a"/><path d="M100 366H800M100 378H800" stroke="#6b3a30" stroke-width="2"/>` +
      `<path d="M100 336H800" stroke="#6b4a3a" stroke-width="4"/>` + rails +
      diff(498, 348, 26, railing(480, 360, 4), railing(480, 360, 5)) +
      lampPost(300, 360) + diff(300, 282, 22, lampHead(300, 360, '#ffe08a'), lampHead(300, 360, '#ffc88a')) +
      lampPost(520, 360) + diff(520, 282, 22, flicker(false), flicker(true)) +
      lampPost(740, 360) + lampHead(740, 360, '#ffe08a') +
      diff(740, 260, 22, '', gullStanding(740, 270, true)) +
      // People on the pier
      person(250, 360, '#ffb703') + diff(272, 350, 24, bucket(266, 360), bucket(278, 360)) +
      person(420, 360, '#2a9d8f', true) +
      diff(394, 312, 28, rod(414, 330), `<g transform="rotate(8 414 330)">${rod(414, 330)}</g>`) +
      `<path d="M374 299q-20 60 -22 125" stroke="#f4ecd8" stroke-width="0.8" stroke-opacity="0.8" fill="none"/>` +
      diff(352, 424, 22, bobbing(2.4), bobbing(0.8)) +
      diff(620, 330, 22, person(620, 360, '#e63946'), person(620, 360, '#d9504a')) + person(646, 360, '#3a86ff', true, '#c68b5e', '#2b2b2b') +
      `<rect x="680" y="338" width="40" height="5" fill="#5a3a3a"/><rect x="680" y="328" width="40" height="5" fill="#5a3a3a"/><path d="M684 343v17M716 343v17" stroke="#3a2a2a" stroke-width="3"/>` +
      gullStanding(130, 336) + gullStanding(590, 336, true) +
      sunHat(450, 362) +
      lifeRing(772, 374) +
      bottleMessage(560, 452) +
      fish(460, 442, '#ffb703') +
      sunglasses(180, 360) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['buoy', 60, 472],
        ['fish', 141, 293, '#ffb703'],
        ['lifeRing', 513, 453],
        ['cloud', 466, 54],
        ['gull', 589, 151],
      ])
    )
  },
})
