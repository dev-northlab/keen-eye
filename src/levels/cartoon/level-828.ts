// Cartoon "The last carriage" (docs/cartoon-mode.md), made like 812: a 20 s story at a country station told by a
// camera. The conductor — a dog in a cap — blows his whistle and raises his paddle; the little steam train puffs off.
// Out of the waiting room bursts a pig with a suitcase, too late: it runs after the train along the platform, the
// suitcase bursts open and socks fly everywhere — one lands on the conductor's cap. The goose on the last carriage's
// balcony grabs the pig by its collar and hauls it aboard; the socks come down on the sheep at the windows. Twelve
// differences: two hard (the station clock's minute hand, the last carriage's emblem), three events of B (a mouse in
// the mailbag, a lamb waving from a window, a pigeon on the signal).
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { birchTree, farBird, grassTuft, groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow, puffCloud, roundTree, swingKeys } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900
const r1 = (v: number) => Math.round(v * 10) / 10
const r2 = (v: number) => Math.round(v * 100) / 100

/** The rails' top (the wheels stand on it) and the platform's walking line (feet). */
const RAIL = 606
const PLAT = 640

/**
 * How far the train has gone at t: standing until 4.5 s, then pulling away faster and faster, braking from 13 s to a
 * stop past the platform at 15 s (the engine off on the right, the carriages still in the world).
 */
function trainX(t: number): number {
  if (t <= 4.5) return 0
  if (t >= 13) {
    const s = Math.min(t, 15) - 13
    return 594.75 + 105 * s - 26.25 * s * s
  }
  const s = t - 4.5
  return s < 3 ? 12 * s * s : 108 + 72 * (s - 3) + 3 * (s - 3) ** 2
}
type Pose = Omit<Keyframe, 't' | 'ease'>
/** Keyframes that follow the train: `f` of its distance, sampled every `dt` seconds. */
function along(dt: number, f: (x: number) => Pose): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, ...f(0) }, { t: 4.5, ...f(0), ease: 'linear' }]
  for (let t = 4.5 + dt; t < 19.9; t += dt) k.push({ t: r2(t), ...f(trainX(t)), ease: 'linear' })
  k.push({ t: 19.95, ...f(trainX(19.95)), ease: 'step' })
  return k
}
const trainKeys = along(0.1, (x) => ({ x: r1(x) }))
const wheelKeys = (r: number) => along(0.1, (x) => ({ rot: r1((x * 180) / (Math.PI * r)) }))
/** The engine's coupling rod rides on the crank pins (9 units off the drivers' centres, radius 22). */
const rodKeys = along(0.05, (x) => ({ x: r1(9 * Math.sin(x / 22)), y: r1(9 - 9 * Math.cos(x / 22)) }))

/** The pig runs along the platform from the waiting room's door. */
const PIG: [number, number] = [300, PLAT]
const pigRunX = (t: number) => 300 + ((t - 6.6) / 4.4) * 500
/** Where it stands on the last carriage's balcony once hauled aboard (train coordinates at rest). */
const ABOARD: [number, number] = [426, 566]
const HAUL = 11.7
function pigKeys(): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' }, { t: 6.2, o: 1, ease: 'out' }, { t: 6.6, x: 0, y: 0, ease: 'linear' }]
  for (let i = 1; i <= 22; i++) {
    const t = r2(6.6 + i * 0.2)
    k.push({ t, x: r1(pigRunX(t) - 300), y: i % 2 ? -7 : 0, ease: 'linear' })
  }
  const [ax, ay] = [ABOARD[0] + trainX(HAUL) - PIG[0], ABOARD[1] - PIG[1]]
  k.push({ t: 11.35, x: r1((500 + ax) / 2), y: -44, rot: -10, ease: 'inOut' }, { t: HAUL, x: r1(ax), y: ay, rot: 0, o: 1, ease: 'step' }, { t: HAUL + 0.02, o: 0, ease: 'step' })
  return k
}

/** The balcony at the rear of the last carriage, followed while the goose hauls the pig aboard. */
const follow = (t: number, w: number, y: number, ease: CameraKey['ease']): CameraKey => ({ t, x: Math.round(Math.min(W - w, 440 + trainX(t) - w / 2)), y, w, ease })
const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The conductor on the platform, the passengers at the windows: whistle, paddle up.
  { t: 1.6, x: 590, y: 412, w: 420, ease: 'linear' },
  { t: 4.35, x: 600, y: 412, w: 420, ease: 'step' },
  // Steam up: the engine pulls away, wheels and rods turning.
  { t: 4.4, x: 900, y: 390, w: 420, ease: 'linear' },
  { t: 6.1, x: 960, y: 390, w: 420, ease: 'step' },
  // The waiting room's door bursts open: the pig with its suitcase.
  { t: 6.15, x: 100, y: 340, w: 480, ease: 'linear' },
  { t: 7.6, x: 120, y: 340, w: 480, ease: 'step' },
  // The chase along the platform; the suitcase bursts, socks everywhere.
  { t: 7.65, x: 180, y: 380, w: 520, ease: 'linear' },
  { t: 11, x: 560, y: 380, w: 520, ease: 'step' },
  // The goose hauls the pig aboard.
  follow(11.05, 380, 400, 'linear'),
  follow(11.7, 380, 400, 'linear'),
  follow(12.4, 380, 400, 'linear'),
  follow(13, 380, 400, 'step'),
  // The socks come down on the sheep at the windows as the carriages roll by.
  { t: 13.05, x: 920, y: 380, w: 520, ease: 'step' },
  // Back on the platform: the conductor with a sock on his cap, waving; a pigeon on the signal.
  { t: 15.25, x: 580, y: 360, w: 480, ease: 'linear' },
  { t: 19.95, x: 590, y: 362, w: 470, ease: 'step' },
]

/** Shown in these intervals, hidden the rest of the loop (cuts between drawings). */
function showIn(...spans: [number, number][]): Keyframe[] {
  const keys: Keyframe[] = [{ t: 0, o: spans[0][0] === 0 ? 1 : 0, ease: 'step' }]
  for (const [from, to] of spans) {
    if (from > 0) keys.push({ t: from, o: 1, ease: 'step' })
    if (to < LOOP) keys.push({ t: to, o: 0, ease: 'step' })
  }
  return keys
}

/** The conductor's feet, on the platform by the second carriage. */
const DOG: [number, number] = [760, PLAT + 8]
const SUITCASE_BURST = 9.5

export default svgLevel({
  id: 828,
  chapter: 'cartoon',
  title: 'cartoonLastCarriage',
  parTimeSec: 120,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const beat = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sy: 1 }, { t: every / 2, sy: 0.3, ease: 'inOut' }], pivot }, m)
    const crown = (period: number, angle = 2) => (pivot: [number, number], m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 11) / 11 }, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)
    const starburst = (x: number, y: number, s: number, fill: string) =>
      `<path transform="translate(${x} ${y}) scale(${s})" d="M0-30l7 15l16-7l-7 15l17 6l-17 6l7 15l-16-7l-7 15l-7-15l-16 7l7-15l-17-6l17-6l-7-15l16 7z" fill="${fill}" ${Ow(1.8 / s)}/>`

    // --- Sky, hills, the viaduct in the distance, the water tower, trees. ---
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c28-sky)"/>` +
      `<circle cx="1160" cy="130" r="180" fill="url(#c28-glow)"/>` +
      `<circle cx="1160" cy="130" r="42" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1147" cy="122" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="1173" cy="122" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.3, phase: 0.3 }, `<rect x="1138" y="114" width="44" height="18" fill="#ffd56a"/><path d="M1140 123h12M1168 123h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M1144 144q16 12 32 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [140, 0]], period: 36 }, puffCloud(240, 120, 1)) +
      anim({ type: 'path', points: [[0, 0], [-110, 0]], period: 30 }, puffCloud(760, 170, 0.8)) +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 19.9, x: -1500, y: 30 }], [1460, 250],
        ([[1460, 250], [1484, 238], [1488, 262]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.5, i * 0.2))).join('')) +
      `<path d="M0 470q200-90 420-50t420-30t600 10V600H0z" fill="url(#c28-far)"/>` +
      `<path d="M0 520q260-60 520-30t520-20t400 0V610H0z" fill="url(#c28-hill)"/>`
    // The viaduct far off on the right, the tunnel in the left hill.
    let arches = ''
    for (let i = 0; i < 6; i++) arches += `<path d="M${1130 + i * 52} 520v-28a22 22 0 0 1 44 0v28" fill="#a8b6c4"/>`
    const viaduct =
      `<rect x="1120" y="452" width="320" height="16" fill="#c9d2dc" ${Ow(1.4)}/><rect x="1120" y="468" width="320" height="52" fill="#c9d2dc" ${Ow(1.4)}/>` +
      arches + `<path d="M1120 452h320" stroke="#8a96a4" stroke-width="2"/>`
    const tunnel = `<path d="M40 520v-40a40 40 0 0 1 80 0v40z" fill="#3a3a44" ${Ow(1.6)}/><path d="M36 480a44 44 0 0 1 88 0" fill="none" stroke="#b8a888" stroke-width="7"/>`
    const tower =
      groundShadow(1300, 604, 60, 6) +
      `<path d="M1272 604l8-130M1328 604l-8-130M1278 560l44-40M1322 560l-44-40" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M1272 604l8-130M1328 604l-8-130" stroke="#7a4a22" stroke-width="3" stroke-linecap="round"/>` +
      `<rect x="1262" y="420" width="76" height="58" rx="6" fill="url(#c28-wood)" ${O}/><path d="M1262 438h76M1262 458h76" stroke="#5e3a17" stroke-width="2"/>` +
      `<path d="M1256 420l44-26l44 26z" fill="#5e6a76" ${O}/>` +
      diff(1350, 454, 18, `<path d="M1338 450h20v10" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M1338 450h20v10" fill="none" stroke="#5e6a76" stroke-width="2.6" stroke-linecap="round"/>`, '')
    const trees =
      roundTree(560, 560, 0.7, 'url(#ke-leaf)', crown(4.6)) + birchTree(640, 574, 0.75, crown(3.8, 3)) + roundTree(1380, 590, 0.8, 'url(#ke-leaf)', crown(5)) +
      birchTree(1210, 586, 0.7, crown(4.2, 3))

    // --- The track: ballast, sleepers, rails across the whole world. ---
    let sleepers = ''
    for (let x = 0; x < W; x += 26) sleepers += `<rect x="${x}" y="604" width="16" height="7" fill="#7a5a3a"/>`
    const track =
      `<rect y="598" width="${W}" height="20" fill="#a89a88"/>` + sleepers +
      `<path d="M0 603h${W}" stroke="#5a5f68" stroke-width="5"/><path d="M0 602h${W}" stroke="#c9ced6" stroke-width="1.6"/>`

    // --- The train: the engine, two carriages; their wheels turn as it goes. ---
    const wheel = (x: number, y: number, r: number, spokes: number) => {
      let m = `<circle cx="${x}" cy="${y}" r="${r}" fill="#3a3f48" ${Ow(2)}/><circle cx="${x}" cy="${y}" r="${r - 4}" fill="#c0392b"/>`
      for (let i = 0; i < spokes; i++) m += `<path transform="rotate(${(i * 360) / spokes} ${x} ${y})" d="M${x} ${y}v${-(r - 4)}" stroke="#7a1f16" stroke-width="2.4"/>`
      return keys(undefined, wheelKeys(r), [x, y], m + `<circle cx="${x}" cy="${y}" r="${r * 0.28}" fill="#ffd23f" ${Ow(1.2)}/>`)
    }
    const windowAt = (x: number) => `<rect x="${x - 17}" y="490" width="34" height="38" rx="5" fill="url(#c28-glass)" ${Ow(1.8)}/>`
    const sheep = (x: number, extra = '') =>
      `<circle cx="${x - 8}" cy="508" r="7" fill="#f4f1e8"/><circle cx="${x + 8}" cy="508" r="7" fill="#f4f1e8"/><circle cx="${x}" cy="502" r="8" fill="#f4f1e8"/>` +
      `<ellipse cx="${x - 11}" cy="514" rx="5" ry="3" fill="#3a3a44"/><ellipse cx="${x + 11}" cy="514" rx="5" ry="3" fill="#3a3a44"/>` +
      `<ellipse cx="${x}" cy="517" rx="8" ry="10" fill="#3a3a44" ${Ow(1.2)}/><circle cx="${x - 3}" cy="514" r="2.2" fill="#fff"/><circle cx="${x + 3}" cy="514" r="2.2" fill="#fff"/>` +
      `<circle cx="${x - 3}" cy="514.5" r="1" fill="${INK}"/><circle cx="${x + 3}" cy="514.5" r="1" fill="${INK}"/>` + extra
    // A sock dropping onto a sheep's head as the socks come down.
    const sockHat = (x: number, c: string) =>
      once([{ t: 0, y: -40, o: 0, ease: 'step' }, { t: 12.6, o: 1, ease: 'in' }, { t: 12.95, y: 0, o: 1, ease: 'step' }], [x, 496],
        `<path d="M${x - 8} 499q0-10 8-10h6v8q0 6 6 8l-2 5q-10-1-12-7h-6z" fill="${c}" ${Ow(1.3)}/><path d="M${x - 7} 494h14" stroke="#fff" stroke-width="2.4"/>`)
    const carriage = (x0: number, x1: number, windows: string) =>
      `<rect x="${x0}" y="470" width="${x1 - x0}" height="96" rx="6" fill="url(#c28-coach)" ${O}/>` +
      `<rect x="${x0}" y="470" width="${x1 - x0}" height="14" rx="6" fill="#f4e6c8" ${Ow(1.6)}/>` +
      `<path d="M${x0 - 6} 470q${(x1 - x0) / 2 + 6}-24 ${x1 - x0 + 12} 0z" fill="#5e3a42" ${O}/>` +
      `<path d="M${x0 + 4} 546h${x1 - x0 - 8}" stroke="#f4e6c8" stroke-width="3"/>` +
      windows +
      `<rect x="${x0 + 4}" y="566" width="${x1 - x0 - 8}" height="9" fill="#2e2f36" ${Ow(1.4)}/>` +
      wheel(x0 + 34, 590, 16, 5) + wheel(x0 + 66, 590, 16, 5) + wheel(x1 - 66, 590, 16, 5) + wheel(x1 - 34, 590, 16, 5)
    // The last carriage (410–650): its open balcony at the rear with the goose; the lamp on the roof corner (A only).
    const LANTERN: [number, number] = [416, 450]
    const lantern = diff(LANTERN[0], LANTERN[1], 18,
      `<path d="M${LANTERN[0]} 466v-6" stroke="${INK}" stroke-width="2"/><rect x="${LANTERN[0] - 6}" y="444" width="12" height="16" rx="2" fill="#ffd56a" ${Ow(1.5)}/><path d="M${LANTERN[0] - 8} 444h16l-8-7z" fill="#c0392b" ${Ow(1.3)}/>`,
      '', 'train')
    // The lamb at the window waves in B while the goose hauls the pig aboard.
    const lamb = diff(537, 510, 24, '',
      once(showIn([12, 14.8]), [535, 508],
        `<circle cx="527" cy="506" r="6" fill="#fffaf0"/><circle cx="543" cy="506" r="6" fill="#fffaf0"/><circle cx="535" cy="500" r="7" fill="#fffaf0"/>` +
          `<ellipse cx="535" cy="514" rx="7" ry="9" fill="#f4e6d8" ${Ow(1.2)}/><circle cx="532" cy="512" r="1.4" fill="${INK}"/><circle cx="538" cy="512" r="1.4" fill="${INK}"/><path d="M532 518q3 3 6 0" fill="none" stroke="${INK}" stroke-width="1.2"/>` +
          anim({ type: 'keys', period: 0.5, keys: [{ t: 0, rot: -25 }, { t: 0.25, rot: 25, ease: 'inOut' }], pivot: [546, 524] },
            `<path d="M546 524l6-14" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M546 524l6-14" stroke="#fffaf0" stroke-width="4" stroke-linecap="round"/>`)),
      'train', during(12, 14.8))
    // The goose on the balcony: its scarf red in A, green in B (the one recolour); it grabs the pig by the collar.
    const [gx, gy] = [452, 566]
    const scarf = (c: string) => `<path d="M${gx - 6} ${gy - 34}q8 4 14 0v6q-6 4-14 0z" fill="${c}" ${Ow(1.3)}/><path d="M${gx + 4} ${gy - 30}l4 12l-6-2z" fill="${c}" ${Ow(1.2)}/>`
    const goose =
      `<path d="M${gx - 4} ${gy}v-10M${gx + 4} ${gy}v-10" stroke="#f08a3a" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M${gx + 14} ${gy - 20}l10-6l-2 10z" fill="#e9e6de" ${Ow(1.4)}/>` +
      `<ellipse cx="${gx + 2}" cy="${gy - 20}" rx="15" ry="11" fill="#fff" ${Ow(1.8)}/><path d="M${gx} ${gy - 24}q8-2 12 4" fill="none" stroke="#c9c3b4" stroke-width="2"/>` +
      keys(undefined, [{ t: 0, rot: 0 }, { t: 10.75, ease: 'inOut' }, { t: 11.05, rot: -72 }, { t: 11.3, ease: 'inOut' }, { t: 11.65, rot: 0 }, { t: 19.95, ease: 'step' }], [gx - 4, gy - 30],
        `<path d="M${gx - 4} ${gy - 30}q-6-14 0-30" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${gx - 4} ${gy - 30}q-6-14 0-30" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>` +
          `<circle cx="${gx - 4}" cy="${gy - 62}" r="7" fill="#fff" ${Ow(1.6)}/><circle cx="${gx - 6}" cy="${gy - 64}" r="1.5" fill="${INK}"/><path d="M${gx - 10} ${gy - 63}l-11 2l11 3z" fill="#f08a3a" ${Ow(1.2)}/>`) +
      diff(gx + 2, gy - 32, 18, scarf('#e63946'), scarf('#52b788'), 'train')
    // The pig aboard, squeezed onto the balcony beside the goose with its empty suitcase.
    const [ax, ay] = ABOARD
    const pigAboard = once(showIn([HAUL, LOOP]), ABOARD,
      pigBody(ax, ay, false, true, '', '') +
        // Panting, relieved, eyes shut.
        `<path d="M${ax + 5} ${ay - 77}q4-4 8 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>` +
        anim({ type: 'keys', period: 0.5, keys: [{ t: 0, sy: 1 }, { t: 0.25, sy: 0.5, ease: 'inOut' }], pivot: [ax + 12, ay - 60] }, `<ellipse cx="${ax + 12}" cy="${ay - 60}" rx="3.4" ry="3" fill="#9a4a5a"/>`))
    const balcony =
      `<rect x="410" y="566" width="50" height="9" fill="#2e2f36" ${Ow(1.4)}/>` +
      `<path d="M404 470h56" stroke="#5e3a42" stroke-width="8" stroke-linecap="round"/>` +
      goose + pigAboard +
      `<path d="M412 566v-40M436 566v-40M412 530h48" stroke="${INK}" stroke-width="4"/><path d="M412 566v-40M436 566v-40M412 530h48" stroke="#c49462" stroke-width="2"/>` +
      `<path d="M412 470v96" stroke="${INK}" stroke-width="4"/>`
    const lastCarriage =
      carriage(460, 650,
        windowAt(490) + sheep(490) + windowAt(535) + lamb + windowAt(580) + sheep(580, sockHat(580, '#4dabf7')) + windowAt(625) + sheep(625)) +
      balcony + lantern +
      diff(600, 477, 18, `<circle cx="600" cy="477" r="6" fill="#f2c94c" ${Ow(1.2)}/><path d="M600 472l1.4 3.4l3.6 0.4l-2.7 2.4l0.8 3.6l-3.1-1.9l-3.1 1.9l0.8-3.6l-2.7-2.4l3.6-0.4z" fill="#b8862b"/>`, '', 'train')
    // The second carriage: the sheep with glasses (A only).
    const glasses = diff(702, 512, 18, `<circle cx="697" cy="514" r="4.4" fill="none" stroke="${INK}" stroke-width="1.6"/><circle cx="707" cy="514" r="4.4" fill="none" stroke="${INK}" stroke-width="1.6"/><path d="M701.4 514h1.2" stroke="${INK}" stroke-width="1.6"/>`, '', 'train')
    const secondCarriage =
      carriage(670, 890, windowAt(702) + sheep(702) + glasses + windowAt(746) + sheep(746, sockHat(746, '#ff6b9a')) + windowAt(790) + windowAt(835) + sheep(835)) +
      `<rect x="650" y="568" width="20" height="6" fill="#2e2f36"/><rect x="890" y="568" width="20" height="6" fill="#2e2f36"/>`
    // The engine: cab, boiler, dome, the bell (A only), chimney, smokebox with its rivets (one fewer in B: a hard one).
    let rivets = ''
    for (const ry of [512, 528, 544, 560]) rivets += `<circle cx="1155" cy="${ry}" r="2.2" fill="#8a929c" ${Ow(0.8)}/>`
    const engine =
      `<rect x="910" y="452" width="76" height="114" rx="4" fill="url(#c28-cab)" ${O}/><path d="M902 452h92" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M902 452h92" stroke="#3a3f48" stroke-width="6" stroke-linecap="round"/>` +
      `<rect x="924" y="470" width="40" height="36" rx="5" fill="url(#c28-glass)" ${Ow(1.8)}/><path d="M944 470v36" stroke="${INK}" stroke-width="1.6"/>` +
      `<rect x="986" y="498" width="160" height="68" rx="20" fill="url(#c28-boiler)" ${O}/>` +
      `<path d="M1024 498v68M1092 498v68" stroke="#e6b84a" stroke-width="5"/>` +
      `<rect x="1144" y="500" width="22" height="66" rx="6" fill="#2e2f36" ${O}/>` + rivets +
      `<path d="M1060 498q0-22 16-22q16 0 16 22z" fill="#e6b84a" ${Ow(1.8)}/>` +
      `<path d="M1022 498v-6" stroke="${INK}" stroke-width="2"/><path d="M1014 492q0-14 8-14q8 0 8 14z" fill="#f2c94c" ${Ow(1.5)}/><circle cx="1022" cy="493" r="2" fill="#b8862b"/>` +
      `<path d="M1122 498v-50h20v50z" fill="#2e2f36" ${O}/><path d="M1114 448h36l-4-14h-28z" fill="#2e2f36" ${O}/>` +
      `<circle cx="1160" cy="492" r="9" fill="#fff4b0" ${Ow(1.6)}/><path d="M1169 488l14-6v18l-14-6" fill="#fff4b0" fill-opacity="0.5"/>` +
      `<path d="M1166 566h26l-30 38h-6z" fill="#c0392b" ${Ow(1.6)}/><path d="M1172 572l-12 26M1182 572l-18 26" stroke="#7a1f16" stroke-width="2"/>` +
      `<rect x="986" y="566" width="170" height="9" fill="#2e2f36" ${Ow(1.4)}/>` +
      wheel(1010, 584, 22, 6) + wheel(1060, 584, 22, 6) + wheel(1110, 584, 22, 6) + wheel(1146, 594, 12, 4) +
      keys(undefined, rodKeys, [1060, 575], `<rect x="1004" y="572" width="112" height="6" rx="3" fill="#c9ced6" ${Ow(1.4)}/><circle cx="1010" cy="575" r="3" fill="#5a5f68"/><circle cx="1060" cy="575" r="3" fill="#5a5f68"/><circle cx="1110" cy="575" r="3" fill="#5a5f68"/>`) +
      // Steam from the chimney, more as it pulls away.
      [0, 0.4, 0.8].map((phase) => anim({ type: 'keys', period: 1.2, phase, keys: [{ t: 0, x: 0, y: 0, sx: 0.5, sy: 0.5, o: 0.9 }, { t: 1.2, x: -50, y: -70, sx: 1.6, sy: 1.6, o: 0 }], pivot: [1132, 430] },
        `<circle cx="1132" cy="430" r="14" fill="#fff" fill-opacity="0.85"/><circle cx="1122" cy="424" r="9" fill="#fff" fill-opacity="0.8"/>`)).join('') +
      once(showIn([4.4, 7.5]), [1132, 430], [0.2, 0.6, 1].map((phase) => anim({ type: 'keys', period: 0.8, phase, keys: [{ t: 0, x: 0, y: 0, sx: 0.6, sy: 0.6, o: 1 }, { t: 0.8, x: -40, y: -90, sx: 2.2, sy: 2.2, o: 0 }], pivot: [1132, 430] },
        `<circle cx="1132" cy="430" r="16" fill="#f4f1e8"/>`)).join(''))
    const train = keys('train', trainKeys, [410, RAIL], groundShadow(800, 606, 400, 6) + lastCarriage + secondCarriage + engine)

    // --- The platform: slabs with a yellow line, a brick face; the station building with its clock and the owl. ---
    let bricks = ''
    for (let row = 0; row < 3; row++) {
      for (let x = (row % 2) * 18; x < 1110; x += 36) bricks += `<rect x="${x}" y="${654 + row * 15}" width="34" height="13" fill="#b0563a" fill-opacity="${row % 2 ? 0.55 : 0.4}"/>`
    }
    let slabs = ''
    for (let x = 0; x < 1110; x += 60) slabs += `<path d="M${x} 618v34" stroke="#9a9488" stroke-width="1.4"/>`
    const platform =
      `<rect y="616" width="1110" height="38" fill="url(#c28-slab)" ${Ow(1.6)}/>` + slabs +
      `<path d="M0 622h1110" stroke="#ffd23f" stroke-width="4"/>` +
      `<rect y="652" width="1110" height="48" fill="#c46a48" ${Ow(1.6)}/>` + bricks +
      `<path d="M1110 616l50 84h-50z" fill="#b8b0a2" ${Ow(1.6)}/>`
    // The clock's minute hand: on twelve in A, on two in B (a hard one).
    const CLOCK: [number, number] = [200, 450]
    const [cx, cy] = CLOCK
    const clock =
      `<circle cx="${cx}" cy="${cy}" r="24" fill="#3a3f48" ${Ow(2)}/><circle cx="${cx}" cy="${cy}" r="19" fill="#fffaf0"/>` +
      [0, 90, 180, 270].map((a) => `<path transform="rotate(${a} ${cx} ${cy})" d="M${cx} ${cy - 17}v4" stroke="${INK}" stroke-width="2"/>`).join('') +
      `<path d="M${cx} ${cy}l-9 4" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
      diff(cx + 4, cy - 8, 18, `<path d="M${cx} ${cy}v-15" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`, `<path d="M${cx} ${cy}l13-7.5" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`) +
      `<circle cx="${cx}" cy="${cy}" r="2.4" fill="#c0392b"/>`
    // The waiting room's door (it swings open for the pig), a horseshoe over it (A only).
    const door = once([{ t: 0, sx: 1 }, { t: 6.05, ease: 'out' }, { t: 6.25, sx: 0.15 }, { t: 7.2, ease: 'inOut' }, { t: 7.6, sx: 1 }, { t: 19.95, ease: 'step' }], [280, 600],
      `<path d="M280 640v-66q20-14 40 0v66z" fill="url(#c28-wood)" ${O}/><path d="M290 584v48M310 584v48" stroke="#5e3a17" stroke-width="2"/><circle cx="314" cy="612" r="2.4" fill="#ffd23f"/>`)
    const station =
      groundShadow(200, 642, 190, 8) +
      `<rect x="20" y="420" width="360" height="222" fill="url(#c28-brick)" ${O}/>` +
      Array.from({ length: 10 }, (_, i) => `<path d="M20 ${434 + i * 20}h360" stroke="#8a3e28" stroke-opacity="0.35" stroke-width="1.6"/>`).join('') +
      `<path d="M6 424l20-50h348l20 50z" fill="url(#c28-roof)" ${O}/><path d="M30 390h340" stroke="#4a2a22" stroke-opacity="0.4" stroke-width="2"/>` +
      `<rect x="56" y="490" width="56" height="58" rx="4" fill="url(#c28-glass)" ${Ow(2)}/><path d="M84 490v58M56 518h56" stroke="${INK}" stroke-width="1.8"/>` +
      `<rect x="150" y="490" width="56" height="58" rx="4" fill="url(#c28-glass)" ${Ow(2)}/><path d="M178 490v58M150 518h56" stroke="${INK}" stroke-width="1.8"/>` +
      `<path d="M276 640v-70q24-18 48 0v70z" fill="#3a2414" ${Ow(1.6)}/>` + door +
      `<rect x="240" y="470" width="120" height="30" rx="4" fill="#2e5a8a" ${Ow(1.6)}/>` +
      // A little engine on the sign instead of words.
      `<path d="M272 492v-10h12v-6h6v6h20v10z" fill="#fff"/><circle cx="278" cy="494" r="3" fill="#fff"/><circle cx="302" cy="494" r="3" fill="#fff"/><path d="M314 486h30M314 490h24" stroke="#fff" stroke-width="2"/>` +
      diff(300, 530, 18, `<path d="M292 523q0 14 8 14q8 0 8-14" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M292 523q0 14 8 14q8 0 8-14" fill="none" stroke="#a8acb4" stroke-width="3" stroke-linecap="round"/>`, '') +
      clock + `<path d="M${cx - 30} ${cy - 26}h60" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>` +
      anim({ type: 'sway', angle: 6, pivot: [cx, cy - 26], period: 3.6 }, keenOwl(cx, cy - 27, 0.85, blink(3.1, 0.3)))
    // The bench with the station cat asleep on it.
    const bench =
      groundShadow(110, 642, 50, 5) +
      `<rect x="66" y="612" width="90" height="8" fill="url(#c28-wood)" ${Ow(1.6)}/><rect x="66" y="594" width="90" height="7" fill="url(#c28-wood)" ${Ow(1.4)}/><path d="M74 620v20M148 620v20M74 601v11M148 601v11" stroke="${INK}" stroke-width="4"/>` +
      anim({ type: 'keys', period: 2.4, keys: [{ t: 0, sy: 1 }, { t: 1.2, sy: 1.06, ease: 'inOut' }], pivot: [108, 612] },
        `<path d="M86 612q-14-2-12-12" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M86 612q-14-2-12-12" fill="none" stroke="#6e6e7a" stroke-width="3.6" stroke-linecap="round"/>` +
          `<ellipse cx="106" cy="604" rx="22" ry="9" fill="#6e6e7a" ${Ow(1.6)}/><circle cx="126" cy="602" r="8" fill="#6e6e7a" ${Ow(1.6)}/><path d="M121 596l2-6l4 5zM129 595l3-6l2 6z" fill="#6e6e7a" ${Ow(1.2)}/>` +
          `<path d="M123 603q2 2 4 0M128 603q2 2 4 0" fill="none" stroke="${INK}" stroke-width="1.2"/>`)
    // The luggage trolley with the mailbag (a mouse peeks out of it in B as the pig bursts out).
    const MAIL: [number, number] = [388, 600]
    const mouse = diff(MAIL[0], MAIL[1] - 4, 22, '',
      once([{ t: 0, y: 12, o: 0, ease: 'step' }, { t: 5.9, o: 1, ease: 'out' }, { t: 6.2, y: 0 }, { t: 7.9, ease: 'in' }, { t: 8.15, y: 12, o: 1, ease: 'step' }, { t: 8.2, o: 0, ease: 'step' }], MAIL,
        `<circle cx="${MAIL[0] - 6}" cy="${MAIL[1] - 12}" r="4" fill="#a7a9b4" ${Ow(1)}/><circle cx="${MAIL[0] + 6}" cy="${MAIL[1] - 12}" r="4" fill="#a7a9b4" ${Ow(1)}/>` +
          `<ellipse cx="${MAIL[0]}" cy="${MAIL[1] - 4}" rx="8" ry="7" fill="#a7a9b4" ${Ow(1.3)}/><circle cx="${MAIL[0] - 3}" cy="${MAIL[1] - 6}" r="1.3" fill="${INK}"/><circle cx="${MAIL[0] + 3}" cy="${MAIL[1] - 6}" r="1.3" fill="${INK}"/><circle cx="${MAIL[0]}" cy="${MAIL[1] - 2}" r="1.6" fill="#f58aa0"/>`),
      undefined, during(5.9, 8.2))
    const trolley =
      groundShadow(388, 642, 34, 4) +
      `<rect x="356" y="622" width="64" height="8" fill="#5e6a76" ${Ow(1.4)}/><circle cx="364" cy="634" r="6" fill="#3a3f48" ${Ow(1.2)}/><circle cx="412" cy="634" r="6" fill="#3a3f48" ${Ow(1.2)}/><path d="M420 622l14-22" stroke="${INK}" stroke-width="3"/>` +
      mouse +
      `<path d="M370 622q-4-26 10-30q8-2 16 0q14 4 10 30z" fill="#c9b48a" ${Ow(1.8)}/><path d="M378 594q10 6 20 0" fill="none" stroke="#8a6a3e" stroke-width="2.4"/><path d="M376 606h24" stroke="#c0392b" stroke-width="3"/>`
    // Lamp posts on the platform; the one by the conductor has a timetable on its post in A only.
    const lampPost = (x: number, finial: string) =>
      groundShadow(x, 641, 12, 3) +
      `<path d="M${x} 640v-200" stroke="${INK}" stroke-width="7"/><path d="M${x} 640v-200" stroke="#2e5a4a" stroke-width="4"/>` +
      `<path d="M${x - 10} 440h20l-4 22h-12z" fill="#fff4b0" ${Ow(1.6)}/><path d="M${x - 13} 440l13-10l13 10z" fill="#2e5a4a" ${Ow(1.5)}/>` + finial
    const lamps =
      lampPost(540, `<path d="M537 430l3-14l3 14z" fill="#2e5a4a" ${Ow(1.2)}/>`) +
      lampPost(860, `<path d="M857 430l3-14l3 14z" fill="#2e5a4a" ${Ow(1.2)}/>`) +
      diff(860, 588, 18, `<rect x="849" y="576" width="22" height="26" rx="2" fill="#fffaf0" ${Ow(1.6)}/><path d="M853 583h14M853 589h10M853 595h12" stroke="#5e6a76" stroke-width="1.6"/>`, '')
    // The signal at the platform's end; a pigeon lands on its arm in B at the end.
    const SIGNAL = 1012
    const pigeonBird = (x: number, y: number) =>
      `<path d="M${x - 2} ${y}v-5M${x + 2} ${y}v-5" stroke="#e8798f" stroke-width="1.6"/><ellipse cx="${x}" cy="${y - 10}" rx="10" ry="7" fill="#9aa3ad" ${Ow(1.4)}/>` +
      `<path d="M${x - 2} ${y - 12}q8-6 14 2q-8 4-14-2z" fill="#7a8490" ${Ow(1.1)}/><circle cx="${x - 9}" cy="${y - 17}" r="5.5" fill="#7a8490" ${Ow(1.3)}/>` +
      `<path d="M${x - 14} ${y - 17}l-5 1l5 2z" fill="#3a3a44"/><circle cx="${x - 10}" cy="${y - 18}" r="1.2" fill="#ff9f1c"/><path d="M${x - 6} ${y - 13}q3 2 6 0" fill="none" stroke="#5fb08a" stroke-width="2"/>`
    const PIGEON: [number, number] = [SIGNAL + 30, 412]
    const signalPigeon = diff(PIGEON[0] + 4, PIGEON[1] - 14, 28, '',
      keys('pigeon', [{ t: 0, x: 140, y: -120, o: 0, ease: 'step' }, { t: 16, o: 1, ease: 'out' }, { t: 16.8, x: 0, y: 0, ease: 'step' }, { t: 19.2, ease: 'in' }, { t: 19.55, x: -120, y: -110, o: 1, ease: 'step' }, { t: 19.6, o: 0, ease: 'step' }], PIGEON,
        pigeonBird(PIGEON[0], PIGEON[1]) +
          once(showIn([16, 16.8], [19.2, LOOP]), PIGEON, anim({ type: 'keys', period: 0.16, keys: [{ t: 0, sy: 1 }, { t: 0.08, sy: -0.6 }], pivot: [PIGEON[0], PIGEON[1] - 14] },
            `<path d="M${PIGEON[0]} ${PIGEON[1] - 14}q10-18 22-16q-8 14-22 16z" fill="#7a8490" ${Ow(1.2)}/>`))),
      'pigeon', during(16, 19.6))
    const signal =
      groundShadow(SIGNAL, 641, 14, 3) +
      `<path d="M${SIGNAL} 640v-262" stroke="${INK}" stroke-width="8"/><path d="M${SIGNAL} 640v-262" stroke="#e9e6de" stroke-width="5"/>` +
      `<path d="M${SIGNAL - 8} 640v-14h16v14z" fill="#3a3f48"/>` +
      keys(undefined, [{ t: 0, rot: 0 }, { t: 4, ease: 'inOut' }, { t: 4.3, rot: -30 }, { t: 17, ease: 'inOut' }, { t: 17.4, rot: 0 }, { t: 19.95, ease: 'step' }], [SIGNAL, 414],
        `<rect x="${SIGNAL}" y="408" width="60" height="12" rx="2" fill="#c0392b" ${Ow(1.6)}/><path d="M${SIGNAL + 44} 408v12" stroke="#fff" stroke-width="5"/>`) +
      `<circle cx="${SIGNAL}" cy="414" r="5" fill="#3a3f48" ${Ow(1.2)}/><circle cx="${SIGNAL}" cy="378" r="7" fill="#ffd23f" ${Ow(1.4)}/>` +
      signalPigeon
    // Pigeons pecking on the platform fly up as the pig runs at them.
    const platformPigeons = [[470, 640], [500, 642]]
      .map(([x, y], i) =>
        once([{ t: 0, x: 0, y: 0, o: 1 }, { t: 7.9 + i * 0.1, ease: 'in' }, { t: 8.6 + i * 0.1, x: -60 - i * 30, y: -200, o: 1, ease: 'step' }, { t: 8.65 + i * 0.1, o: 0, ease: 'step' }], [x, y],
          anim({ type: 'keys', period: 1.1, phase: i * 0.4, keys: [{ t: 0, rot: 0 }, { t: 0.3, rot: 20, ease: 'inOut' }, { t: 0.55, rot: 0 }], pivot: [x, y - 8] }, pigeonBird(x, y))))
      .join('')
    // Milk churns at the platform's far end.
    const churn = (x: number) =>
      `<path d="M${x - 11} 640v-30q0-6 5-8v-6h12v6q5 2 5 8v30z" fill="url(#c28-tin)" ${Ow(1.6)}/><rect x="${x - 8}" y="590" width="16" height="6" rx="2" fill="#8a929c" ${Ow(1.2)}/>`
    const churns = groundShadow(1076, 642, 26, 4) + churn(1064) + churn(1088)

    // --- The conductor: whistle, paddle up; a sock lands on his cap; at the end he waves. His bow tie: A only. ---
    const [dx, dy] = DOG
    const DOG_NECK: [number, number] = [dx, dy - 60]
    const armR = keys(undefined, [{ t: 0, rot: 0 }, { t: 1.7, ease: 'inOut' }, { t: 1.95, rot: -150 }, { t: 3.2, ease: 'inOut' }, { t: 3.45, rot: 0 }, { t: 16, ease: 'inOut' }, { t: 16.3, rot: -140 },
      ...Array.from({ length: 10 }, (_, i) => ({ t: r2(16.6 + i * 0.3), rot: i % 2 ? -140 : -110, ease: 'inOut' as const })), { t: 19.6, rot: 0 }, { t: 19.95, ease: 'step' }], [dx + 16, dy - 58],
      `<path d="M${dx + 16} ${dy - 58}v22" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M${dx + 16} ${dy - 58}v22" stroke="#2e3a5a" stroke-width="7" stroke-linecap="round"/><circle cx="${dx + 16}" cy="${dy - 34}" r="4.6" fill="#d9a066" ${Ow(1.2)}/>` +
        once(showIn([1.9, 3.3]), [dx + 16, dy - 34], `<path d="M${dx + 12} ${dy - 30}h10v-5h-10z" fill="#c9ced6" ${Ow(1.2)}/>`))
    const armL = keys(undefined, [{ t: 0, rot: 0 }, { t: 2.5, ease: 'inOut' }, { t: 2.8, rot: 150 }, { t: 4.3, ease: 'inOut' }, { t: 4.6, rot: 0 }, { t: 19.95, ease: 'step' }], [dx - 16, dy - 58],
      `<path d="M${dx - 16} ${dy - 58}v22" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M${dx - 16} ${dy - 58}v22" stroke="#2e3a5a" stroke-width="7" stroke-linecap="round"/><circle cx="${dx - 16}" cy="${dy - 34}" r="4.6" fill="#d9a066" ${Ow(1.2)}/>` +
        `<path d="M${dx - 16} ${dy - 34}v18" stroke="${INK}" stroke-width="3"/><circle cx="${dx - 16}" cy="${dy - 10}" r="9" fill="#2fa84f" ${Ow(1.6)}/><circle cx="${dx - 16}" cy="${dy - 10}" r="4" fill="#fff"/>`)
    const bowTie = diff(DOG_NECK[0], DOG_NECK[1] + 2, 18, `<path d="M${dx} ${dy - 58}l-10-6v12zM${dx} ${dy - 58}l10-6v12z" fill="#e63946" ${Ow(1.3)}/><circle cx="${dx}" cy="${dy - 58}" r="3" fill="#b8232f" ${Ow(1)}/>`, '', 'dog')
    const dogHead =
      `<path d="M${dx - 14} ${dy - 92}q-14 6-10 26q8-2 12-18z" fill="#8a5a32" ${Ow(1.4)}/>` +
      `<circle cx="${dx}" cy="${dy - 80}" r="18" fill="url(#c28-dog)" ${Ow(1.8)}/><ellipse cx="${dx + 11}" cy="${dy - 74}" rx="10" ry="7" fill="#f4e6cc" ${Ow(1.3)}/><ellipse cx="${dx + 20}" cy="${dy - 77}" rx="3.6" ry="3" fill="${INK}"/>` +
      `<circle cx="${dx + 4}" cy="${dy - 86}" r="3" fill="#fff" ${Ow(0.8)}/><circle cx="${dx + 5}" cy="${dy - 86}" r="1.6" fill="${INK}"/>` +
      once(showIn([0, 1.9], [3.3, LOOP]), DOG, `<path d="M${dx + 8} ${dy - 68}q5 3 9-1" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`) +
      // The cap.
      `<path d="M${dx - 16} ${dy - 94}q16-16 32 0z" fill="#2e3a5a" ${Ow(1.6)}/><path d="M${dx - 17} ${dy - 94}h34" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M${dx + 14} ${dy - 94}l12 4" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
      `<circle cx="${dx}" cy="${dy - 99}" r="3" fill="#ffd23f" ${Ow(1)}/>` +
      // A sock landed on it.
      once(showIn([10.3, LOOP]), DOG, `<path d="M${dx - 8} ${dy - 100}q0-12 10-12h6v10q0 6 8 8l-2 6q-12-1-14-8h-8z" fill="#ffd23f" ${Ow(1.3)}/><path d="M${dx - 7} ${dy - 106}h16" stroke="#e63946" stroke-width="2.4"/>`)
    const whistleLines = once(showIn([2, 3.2]), [dx + 34, dy - 80],
      anim({ type: 'keys', period: 0.4, keys: [{ t: 0, sx: 0.6, sy: 0.6, o: 1 }, { t: 0.4, sx: 1.4, sy: 1.4, o: 0 }], pivot: [dx + 30, dy - 76] },
        `<path d="M${dx + 34} ${dy - 86}q6 10 0 20M${dx + 42} ${dy - 92}q10 16 0 32" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`))
    const dog = keys('dog', [{ t: 0, y: 0, sy: 1 }, { t: 1.95, ease: 'inOut' }, { t: 2.2, sy: 1.04 }, { t: 3.1, ease: 'inOut' }, { t: 3.3, sy: 1 }, { t: 10.3, y: 0, ease: 'out' }, { t: 10.45, y: -10, ease: 'in' }, { t: 10.6, y: 0 }, { t: 19.95, ease: 'step' }], DOG,
      groundShadow(dx, dy, 26, 4) +
        `<path d="M${dx - 7} ${dy}v-22M${dx + 7} ${dy}v-22" stroke="${INK}" stroke-width="11" stroke-linecap="round"/><path d="M${dx - 7} ${dy}v-22M${dx + 7} ${dy}v-22" stroke="#2e3a5a" stroke-width="8" stroke-linecap="round"/>` +
        `<ellipse cx="${dx - 8}" cy="${dy - 1}" rx="7" ry="3.4" fill="#3a2414"/><ellipse cx="${dx + 9}" cy="${dy - 1}" rx="7" ry="3.4" fill="#3a2414"/>` +
        armL +
        `<ellipse cx="${dx}" cy="${dy - 40}" rx="19" ry="24" fill="#2e3a5a" ${Ow(1.8)}/><path d="M${dx} ${dy - 60}v40" stroke="#1f2840" stroke-width="2"/><circle cx="${dx + 4}" cy="${dy - 46}" r="2" fill="#ffd23f"/><circle cx="${dx + 4}" cy="${dy - 34}" r="2" fill="#ffd23f"/>` +
        bowTie + dogHead + armR + whistleLines)

    // --- The pig: out of the door, running with its suitcase, which bursts open; hauled aboard by the collar. ---
    function pigBody(x: number, y: number, running: boolean, open: boolean, legsA: string, legsB: string) {
      const leg = (lx: number, k: string) => (running ? k : `<path d="M${lx} ${y - 16}v16" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M${lx} ${y - 16}v16" stroke="#f5a3b8" stroke-width="7" stroke-linecap="round"/>`)
      const lid = open
        ? `<path d="M${x + 20} ${y - 42}l24-14l3 5l-24 14z" fill="#8a5a32" ${Ow(1.4)}/>`
        : `<rect x="${x + 18}" y="${y - 44}" width="28" height="6" rx="2" fill="#8a5a32" ${Ow(1.4)}/>`
      return (
        groundShadow(x, y, 26, 4) +
        leg(x - 8, legsA) + leg(x + 8, legsB) +
        `<path d="M${x - 22} ${y - 36}q-12-2-8-10q4-4 6 2" fill="none" stroke="#e88aa0" stroke-width="3" stroke-linecap="round"/>` +
        `<ellipse cx="${x}" cy="${y - 34}" rx="22" ry="22" fill="url(#c28-pig)" ${Ow(1.8)}/><ellipse cx="${x + 4}" cy="${y - 28}" rx="11" ry="12" fill="#fde0e6"/>` +
        `<path d="M${x - 12} ${y - 54}q12 8 24 0" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M${x - 12} ${y - 54}q12 8 24 0" fill="none" stroke="${INK}" stroke-width="1.2"/>` +
        `<circle cx="${x + 4}" cy="${y - 72}" r="17" fill="url(#c28-pig)" ${Ow(1.8)}/><path d="M${x - 8} ${y - 84}l-4-10l10 4zM${x + 12} ${y - 86}l4-10l4 10z" fill="#f5a3b8" ${Ow(1.3)}/>` +
        `<ellipse cx="${x + 19}" cy="${y - 70}" rx="7" ry="6" fill="#f5a3b8" ${Ow(1.3)}/><circle cx="${x + 17}" cy="${y - 70}" r="1.4" fill="#9a4a5a"/><circle cx="${x + 21}" cy="${y - 70}" r="1.4" fill="#9a4a5a"/>` +
        `<path d="M${x - 8} ${y - 88}q12-12 24 0h4v4h-32z" fill="#6e4224" ${Ow(1.4)}/>` +
        // The suitcase in its hand: closed, then burst open and empty.
        `<path d="M${x + 12} ${y - 46}l10 8" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M${x + 12} ${y - 46}l10 8" stroke="#f5a3b8" stroke-width="5" stroke-linecap="round"/>` +
        `<rect x="${x + 18}" y="${y - 40}" width="28" height="20" rx="3" fill="#b07a44" ${Ow(1.6)}/><path d="M${x + 26} ${y - 40}v20M${x + 38} ${y - 40}v20" stroke="#6e4224" stroke-width="2"/>` +
        lid
      )
    }
    const [qx, qy] = PIG
    const pigLegs = (lx: number, flip: boolean) =>
      keys(undefined, swingKeys([[6.4, 11]], 0.16, 32, flip), [lx, qy - 16],
        `<path d="M${lx} ${qy - 16}v16" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M${lx} ${qy - 16}v16" stroke="#f5a3b8" stroke-width="7" stroke-linecap="round"/>`)
    const pigFace =
      once(showIn([0, 6.9]), PIG, `<circle cx="${qx + 9}" cy="${qy - 77}" r="5" fill="#fff" ${Ow(1)}/><circle cx="${qx + 10}" cy="${qy - 77}" r="1.8" fill="${INK}"/><ellipse cx="${qx + 12}" cy="${qy - 60}" rx="3.4" ry="4" fill="#9a4a5a"/>` +
        `<path d="M${qx - 22} ${qy - 104}h6l-1 12h-4z" fill="#e63946" ${Ow(1.2)}/><circle cx="${qx - 19}" cy="${qy - 87}" r="2.4" fill="#e63946"/>`) +
      once(showIn([6.9, HAUL]), PIG, `<circle cx="${qx + 9}" cy="${qy - 77}" r="3.6" fill="#fff" ${Ow(1)}/><circle cx="${qx + 10.5}" cy="${qy - 77}" r="1.6" fill="${INK}"/><path d="M${qx + 5} ${qy - 84}l8-2" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="${qx + 12}" cy="${qy - 60}" rx="3" ry="3.4" fill="#9a4a5a"/>`) +
      // Sweat flying off as it runs.
      once(showIn([7, 11]), PIG, anim({ type: 'keys', period: 0.5, keys: [{ t: 0, x: 0, y: 0, o: 1 }, { t: 0.5, x: -16, y: -14, o: 0 }], pivot: [qx - 8, qy - 86] },
        `<path d="M${qx - 8} ${qy - 90}q3 4 0 7q-3-3 0-7z" fill="#9fd0f0" ${Ow(0.8)}/>`))
    const runningPig = keys(undefined, pigKeys(), PIG,
      once(showIn([0, SUITCASE_BURST]), PIG, pigBody(qx, qy, true, false, pigLegs(qx - 8, false), pigLegs(qx + 8, true))) +
        once(showIn([SUITCASE_BURST, LOOP]), PIG, pigBody(qx, qy, true, true, pigLegs(qx - 8, false), pigLegs(qx + 8, true))) +
        pigFace)
    // The socks bursting out of the suitcase: some land on the platform, one on the conductor's cap, two fly over the train.
    const BURST: [number, number] = [r1(pigRunX(SUITCASE_BURST) + 32), 600]
    const SOCK_COLOURS = ['#ffd23f', '#4dabf7', '#ff6b9a', '#52b788', '#f08a3a']
    const sock = (x: number, y: number, c: string) => `<path d="M${x - 5} ${y - 10}h10v12q0 4 6 6l-2 5q-12-1-14-9z" fill="${c}" ${Ow(1.3)}/><path d="M${x - 5} ${y - 7}h10" stroke="#fff" stroke-width="2.4"/>`
    const socks = ([[-96, 40, 'stay'], [44, 42, 'stay'], [DOG[0] - BURST[0] + 2, DOG[1] - 104 - BURST[1], 'cap'], [190, -250, 'away'], [250, -230, 'away']] as [number, number, string][])
      .map(([ox, oy, fate], i) => {
        const land = 10.3
        const end: Keyframe[] = fate === 'stay' ? [{ t: land, x: ox, y: oy, rot: 160 + i * 30, o: 1, ease: 'step' }] : fate === 'cap' ? [{ t: land, x: ox, y: oy, rot: 0, o: 1, ease: 'step' }, { t: land + 0.02, o: 0, ease: 'step' }] : [{ t: 10.2, x: ox, y: oy, rot: 400, o: 1, ease: 'step' }, { t: 10.25, o: 0, ease: 'step' }]
        return once([{ t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' }, { t: SUITCASE_BURST, o: 1, ease: 'out' }, { t: SUITCASE_BURST + 0.35, x: ox / 2, y: Math.min(oy, 0) - 90, rot: 200, ease: 'in' }, ...end], BURST,
          sock(BURST[0], BURST[1], SOCK_COLOURS[i]))
      })
      .join('') +
      once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: SUITCASE_BURST, o: 1, ease: 'out' }, { t: SUITCASE_BURST + 0.15, sx: 1.1, sy: 1.1, ease: 'inOut' }, { t: SUITCASE_BURST + 0.3, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: SUITCASE_BURST + 0.35, o: 0, ease: 'step' }], BURST,
        starburst(BURST[0], BURST[1] - 4, 1, '#ffe066'))

    // --- The foreground: grass, flowers, a little fence. ---
    let fore = `<rect y="700" width="${W}" height="${H - 700}" fill="url(#c28-ground)"/>`
    for (let i = 0; i < 26; i++) {
      const tx = Math.round(rand() * W)
      const ty = Math.round(716 + rand() * 175)
      fore += anim({ type: 'sway', angle: 7, pivot: [tx, ty], period: 2.3, phase: (tx % 13) / 13 }, grassTuft(tx, ty))
    }
    const FLOWERS = ['#e63946', '#ffd23f', '#b38cff', '#ff9fc0', '#fff']
    for (let i = 0; i < 22; i++) {
      const fx = Math.round(rand() * W)
      const fy = Math.round(730 + rand() * 160)
      fore += `<path d="M${fx} ${fy}v-10" stroke="#3f8f3a" stroke-width="2"/><circle cx="${fx}" cy="${fy - 12}" r="4" fill="${FLOWERS[i % FLOWERS.length]}" ${Ow(1)}/><circle cx="${fx}" cy="${fy - 12}" r="1.4" fill="#ffd23f"/>`
    }
    let fence = ''
    for (let x = 1180; x < W; x += 26) fence += `<path d="M${x} 700v-36l5-6l5 6v36z" fill="#f4f1e8" ${Ow(1.4)}/>`
    fore += `<path d="M1170 676h270M1170 690h270" stroke="${INK}" stroke-width="4"/><path d="M1170 676h270M1170 690h270" stroke="#f4f1e8" stroke-width="2"/>` + fence

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c28-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fc0ea"/><stop offset="0.65" stop-color="#c8e6f4"/><stop offset="1" stop-color="#f2f0dc"/></linearGradient>` +
      `<radialGradient id="c28-glow"><stop offset="0" stop-color="#fff4cc" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe9a8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c28-far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9cfb0"/><stop offset="1" stop-color="#c4dfc0"/></linearGradient>` +
      `<linearGradient id="c28-hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd06a"/><stop offset="1" stop-color="#7fb64e"/></linearGradient>` +
      `<linearGradient id="c28-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fca5a"/><stop offset="1" stop-color="#5a9636"/></linearGradient>` +
      `<linearGradient id="c28-slab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9d4c8"/><stop offset="1" stop-color="#b8b0a2"/></linearGradient>` +
      `<linearGradient id="c28-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5a32"/><stop offset="1" stop-color="#c49462"/></linearGradient>` +
      `<linearGradient id="c28-brick" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9805a"/><stop offset="1" stop-color="#a84e34"/></linearGradient>` +
      `<linearGradient id="c28-roof" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6e7a86"/><stop offset="1" stop-color="#4a5560"/></linearGradient>` +
      `<linearGradient id="c28-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6f6ff"/><stop offset="1" stop-color="#9fd0e8"/></linearGradient>` +
      `<linearGradient id="c28-coach" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a3a4a"/><stop offset="1" stop-color="#6e2432"/></linearGradient>` +
      `<linearGradient id="c28-cab" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b03328"/><stop offset="1" stop-color="#e05a44"/></linearGradient>` +
      `<linearGradient id="c28-boiler" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fb87a"/><stop offset="0.5" stop-color="#2f8a52"/><stop offset="1" stop-color="#1f5a36"/></linearGradient>` +
      `<linearGradient id="c28-tin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a93a0"/><stop offset="0.6" stop-color="#d0d6de"/><stop offset="1" stop-color="#9aa3ad"/></linearGradient>` +
      `<radialGradient id="c28-dog" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#e8aa6a"/><stop offset="1" stop-color="#b07a44"/></radialGradient>` +
      `<radialGradient id="c28-pig" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffd0dc"/><stop offset="1" stop-color="#f08aa6"/></radialGradient>` +
      `<radialGradient id="c28-sunlight" cx="0.8" cy="0.12" r="1"><stop offset="0" stop-color="#fff2c4" stop-opacity="0.3"/><stop offset="0.5" stop-color="#fff2c4" stop-opacity="0.06"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient></defs>` +
      sky +
      tunnel +
      viaduct +
      trees +
      tower +
      track +
      train +
      platform +
      station +
      bench +
      trolley +
      lamps +
      signal +
      churns +
      platformPigeons +
      dog +
      runningPig +
      socks +
      fore +
      `<rect width="${W}" height="${H}" fill="url(#c28-sunlight)"/>`
    )
  },
})
