// Morning street: the city's hardest scene, after its harder ten (hidden until released, levels/upcoming.ts).
// New in the city: a library with columns, a post office with a clock, an office tower with a window cleaner's
// gondola, a clinic with an ambulance, a garbage truck, a postal van, a hot dog cart, a stroller and a motorbike.
// Motion differences: the gondola slides along its ropes only on picture A; the ambulance's siren flashes only
// on A; the dog wags its tail only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cat } from '../shapes.ts'
import { cloud, lampHead, lampPost, mailbox, newspaperBox, person, pigeon, signBoard, skyline, street, window, bin, hydrant } from './shapes.ts'

/** Library with columns under a pediment, without the pediment's round window; (x, y) = bottom left, 190 wide. Bounds: y from −226 to 0. */
const library = (x: number, y: number) => {
  let columns = ''
  for (const cx of [30, 68, 108, 146]) columns += `<rect x="${x + cx}" y="${y - 158}" width="14" height="134" fill="#f7f2e8"/><rect x="${x + cx - 3}" y="${y - 162}" width="20" height="6" fill="#d9cfbd"/>`
  return (
    `<rect x="${x}" y="${y - 14}" width="190" height="14" fill="#d6d0c4"/><rect x="${x + 10}" y="${y - 24}" width="170" height="10" fill="#e0dacd"/>` +
    `<rect x="${x + 16}" y="${y - 170}" width="158" height="146" fill="#ece4d4"/>` +
    `<rect x="${x + 86}" y="${y - 68}" width="18" height="44" fill="#6b4a2b"/>` + columns +
    `<rect x="${x + 10}" y="${y - 180}" width="170" height="20" fill="#d9cfbd"/>` +
    `<path d="M${x + 4} ${y - 178}L${x + 95} ${y - 226}L${x + 186} ${y - 178}Z" fill="#e6dcc8"/>`
  )
}

/** Post office with a clock (no minute hand) and a sign; (x, y) = bottom left, 168 wide. Bounds: y from −198 to 0. */
const postOffice = (x: number, y: number) =>
  `<rect x="${x}" y="${y - 190}" width="168" height="190" fill="#f2cc8f"/><rect x="${x - 4}" y="${y - 198}" width="176" height="10" fill="#d9a95e"/>` +
  window(x + 38, y - 110) + window(x + 130, y - 110) + window(x + 38, y - 50) + window(x + 130, y - 50) +
  `<rect x="${x + 66}" y="${y - 48}" width="36" height="48" rx="3" fill="#c0392b"/><rect x="${x + 71}" y="${y - 42}" width="26" height="16" fill="#ffffff" fill-opacity="0.35"/>` +
  signBoard(x + 84, y - 124, 84, '#3a86ff') +
  `<circle cx="${x + 84}" cy="${y - 160}" r="16" fill="#ffffff" stroke="#3d4a55" stroke-width="3"/>` +
  `<path d="M${x + 84} ${y - 173}v3M${x + 97} ${y - 160}h-3M${x + 84} ${y - 147}v-3M${x + 71} ${y - 160}h3" stroke="#3d4a55" stroke-width="2"/>` +
  `<path d="M${x + 84} ${y - 160}l-6 -6" stroke="#3d4a55" stroke-width="3" stroke-linecap="round"/><circle cx="${x + 84}" cy="${y - 160}" r="2" fill="#3d4a55"/>`

/** Office tower with a grid of windows and the gondola's ropes; (x, y) = bottom left, 168 wide. Bounds: y from −298 to 0. */
const officeTower = (x: number, y: number) => {
  let windows = ''
  for (let wy = y - 274; wy < y - 50; wy += 32) for (let wx = x + 12; wx < x + 160; wx += 26) windows += `<rect x="${wx}" y="${wy}" width="16" height="20" fill="#bde3f2"/>`
  return (
    `<rect x="${x}" y="${y - 290}" width="168" height="290" fill="#5d84b8"/>` + windows +
    `<rect x="${x - 4}" y="${y - 298}" width="176" height="10" fill="#3d4a55"/>` +
    `<rect x="${x + 54}" y="${y - 44}" width="60" height="44" fill="#bde3f2"/><path d="M${x + 84} ${y - 44}V${y}" stroke="#3d4a55" stroke-width="2"/>` +
    `<path d="M${x + 56} ${y - 298}v-8h8M${x + 112} ${y - 298}v-8h-8" stroke="#3d4a55" stroke-width="3" fill="none"/>` +
    `<path d="M${x + 64} ${y - 306}V${y - 60}M${x + 104} ${y - 306}V${y - 60}" stroke="#6c757d" stroke-width="1.5"/>`
  )
}

/** Window cleaner on his gondola, at rest; (x, y) = platform center. Bounds: x ±24, y from −22 to +8. */
const gondola = (x: number, y: number) =>
  `<rect x="${x - 6}" y="${y - 18}" width="12" height="18" fill="#e63946"/><circle cx="${x}" cy="${y - 23}" r="6" fill="#f2d29b"/>` +
  `<path d="M${x - 6} ${y - 25}a6 6 0 0 1 12 0Z" fill="#ffd23f"/>` +
  `<path d="M${x + 5} ${y - 14}l10 -6M${x + 15} ${y - 24}v8" stroke="#3d4a55" stroke-width="2.5" stroke-linecap="round"/>` +
  `<rect x="${x - 23}" y="${y - 10}" width="46" height="3" fill="#3d4a55"/><path d="M${x - 21} ${y - 8}v8M${x + 21} ${y - 8}v8" stroke="#3d4a55" stroke-width="2"/>` +
  `<rect x="${x - 24}" y="${y}" width="48" height="8" rx="2" fill="#ffb703"/>`

/** Clinic with a sign board for its cross (`cross`); (x, y) = bottom left, 218 wide. Bounds: y from −218 to 0. */
const clinic = (x: number, y: number) =>
  `<rect x="${x}" y="${y - 210}" width="218" height="210" fill="#eef1f4"/><rect x="${x - 4}" y="${y - 218}" width="226" height="10" fill="#c9d1d9"/>` +
  window(x + 38, y - 150) + window(x + 88, y - 150) + window(x + 180, y - 150) + window(x + 38, y - 92) + window(x + 88, y - 92) + window(x + 180, y - 92) +
  `<rect x="${x + 98}" y="${y - 72}" width="72" height="12" fill="#e63946"/><rect x="${x + 108}" y="${y - 60}" width="52" height="60" fill="#bde3f2"/>` +
  `<path d="M${x + 134} ${y - 60}V${y}" stroke="#8d99ae" stroke-width="2"/>` +
  `<rect x="${x + 118}" y="${y - 178}" width="32" height="32" rx="3" fill="#ffffff" stroke="#c9d1d9" stroke-width="2"/>`

/** Cross of the clinic's sign; (x, y) = center. Bounds: ±12. */
const cross = (x: number, y: number, color: string) => `<path d="M${x - 4} ${y - 12}h8v8h8v8h-8v8h-8v-8h-8v-8h8Z" fill="${color}"/>`

/** Ambulance without its red siren lamp (`sirenLamp`), faces right; (x, y) = ground under its back. Bounds: x from −2 to +148, y from −82 to 0. */
const ambulance = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-2" y="-18" width="150" height="6" fill="#555"/>` +
  `<rect x="0" y="-70" width="104" height="56" rx="4" fill="#f4f6f8"/><rect x="0" y="-38" width="146" height="8" fill="#e63946"/>` +
  `<path d="M104 -14V-54H128L146 -34V-14Z" fill="#f4f6f8"/><path d="M110 -50H126L140 -34H110Z" fill="#bde3f2"/><rect x="104" y="-38" width="42" height="8" fill="#e63946"/>` +
  `<path d="M44 -66h12v8h8v12h-8v8h-12v-8h-8v-12h8Z" fill="#e63946"/><circle cx="143" cy="-24" r="3" fill="#fff3b0"/>` +
  `<rect x="80" y="-74" width="24" height="4" fill="#8d99ae"/><rect x="94" y="-81" width="8" height="7" rx="2" fill="#3a86ff"/>` +
  `<circle cx="28" cy="-9" r="11" fill="#2b2b2b"/><circle cx="28" cy="-9" r="4" fill="#ccc"/><circle cx="120" cy="-9" r="11" fill="#2b2b2b"/><circle cx="120" cy="-9" r="4" fill="#ccc"/></g>`

/** The ambulance's red siren lamp; (x, y) = its center. Bounds: x ±4, y ±4. */
const sirenLamp = (x: number, y: number) => `<rect x="${x - 4}" y="${y - 4}" width="8" height="7" rx="2" fill="#e63946"/>`

/** Garbage truck without its roof beacon, faces right; (x, y) = ground under its back. Bounds: x from −6 to +216, y from −80 to 0. */
const garbageTruck = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-6" y="-18" width="222" height="6" fill="#555"/>` +
  `<rect x="-6" y="-62" width="12" height="46" rx="2" fill="#2f6e2f"/>` +
  `<rect x="4" y="-80" width="152" height="66" rx="6" fill="#3f8f3a"/><path d="M34 -78V-16M64 -78V-16M94 -78V-16M124 -78V-16" stroke="#2f6e2f" stroke-width="3"/>` +
  `<rect x="4" y="-38" width="152" height="7" fill="#f4d35e"/>` +
  `<path d="M160 -14V-62H196L214 -40V-14Z" fill="#ffb703"/><path d="M168 -58H192L206 -40H168Z" fill="#bde3f2"/>` +
  `<rect x="182" y="-64" width="12" height="3" fill="#8d99ae"/>` +
  `<circle cx="36" cy="-10" r="12" fill="#2b2b2b"/><circle cx="36" cy="-10" r="4.5" fill="#ccc"/><circle cx="182" cy="-10" r="12" fill="#2b2b2b"/><circle cx="182" cy="-10" r="4.5" fill="#ccc"/></g>`

/** The garbage truck's orange beacon on its cab roof; (x, y) = center. Bounds: x ±6, y ±6. */
const beacon = (x: number, y: number) => `<rect x="${x - 5}" y="${y - 6}" width="10" height="10" rx="3" fill="#fb8500"/><rect x="${x - 2}" y="${y - 3}" width="4" height="4" fill="#ffd166"/>`

/** Postal van without its envelope logo, faces right; (x, y) = ground under its back. Bounds: x from −2 to +148, y from −62 to 0. */
const postalVan = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-2" y="-18" width="150" height="6" fill="#555"/>` +
  `<path d="M0 -14V-58Q0 -62 4 -62H112L138 -40H146V-14Z" fill="#ffd23f"/><path d="M114 -58L134 -40H114Z" fill="#bde3f2"/>` +
  `<rect x="0" y="-26" width="146" height="5" fill="#3a86ff"/><path d="M96 -58V-16" stroke="#e0b400" stroke-width="2"/>` +
  `<circle cx="28" cy="-8" r="10" fill="#2b2b2b"/><circle cx="28" cy="-8" r="4" fill="#ccc"/><circle cx="118" cy="-8" r="10" fill="#2b2b2b"/><circle cx="118" cy="-8" r="4" fill="#ccc"/></g>`

/** Envelope logo; (x, y) = center. Bounds: x ±14, y ±9. */
const envelope = (x: number, y: number, color: string) =>
  `<rect x="${x - 14}" y="${y - 9}" width="28" height="18" rx="2" fill="${color}" stroke="#3a86ff" stroke-width="1.5"/>` +
  `<path d="M${x - 13} ${y - 8}L${x} ${y + 2}L${x + 13} ${y - 8}" stroke="#3a86ff" stroke-width="1.5" fill="none"/>`

/** Hot dog cart under its umbrella, without the hot dog on its front; (x, y) = ground center. Bounds: x ±40, y from −112 to 0. */
const hotDogCart = (x: number, y: number) =>
  `<path d="M${x} ${y - 46}V${y - 96}" stroke="#8d99ae" stroke-width="3"/>` +
  `<path d="M${x - 40} ${y - 92}Q${x} ${y - 132} ${x + 40} ${y - 92}Z" fill="#ffd23f"/>` +
  `<path d="M${x - 40} ${y - 92}Q${x - 24} ${y - 118} ${x - 10} ${y - 110}L${x - 14} ${y - 92}ZM${x + 10} ${y - 110}Q${x + 24} ${y - 118} ${x + 40} ${y - 92}H${x + 14}Z" fill="#e63946"/>` +
  `<rect x="${x - 38}" y="${y - 46}" width="76" height="6" rx="2" fill="#c9d1d9"/><rect x="${x - 35}" y="${y - 40}" width="70" height="30" rx="3" fill="#e63946"/>` +
  `<path d="M${x + 35} ${y - 30}h12" stroke="#3d4a55" stroke-width="3" stroke-linecap="round"/>` +
  `<circle cx="${x - 22}" cy="${y - 8}" r="8" fill="#2b2b2b"/><circle cx="${x + 22}" cy="${y - 8}" r="8" fill="#2b2b2b"/>`

/** Hot dog sign; (x, y) = center. Bounds: x ±17, y ±7. */
const hotDog = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y + 1}" rx="15" ry="6" fill="#e9c46a"/><rect x="${x - 17}" y="${y - 4}" width="34" height="7" rx="3.5" fill="#c0392b"/>` +
  `<path d="M${x - 11} ${y - 1}l4 -2l4 2l4 -2l4 2l4 -2" stroke="#ffd23f" stroke-width="1.5" fill="none"/>`

/** Baby stroller, handle on the right; (x, y) = ground center. Bounds: x from −20 to +22, y from −38 to 0. */
const stroller = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M10 -18L20 -34h3" stroke="#3d4a55" stroke-width="2.5" fill="none" stroke-linecap="round"/>` +
  `<path d="M-18 -26H12Q12 -10 -2 -10H-6Q-18 -10 -18 -26Z" fill="#8338ec"/><path d="M-18 -26A14 14 0 0 1 0 -38V-26Z" fill="#b38cff"/>` +
  `<circle cx="-12" cy="-5" r="5" fill="#2b2b2b"/><circle cx="8" cy="-5" r="5" fill="#2b2b2b"/></g>`

/** Parked motorbike, faces right; (x, y) = ground center. Bounds: x ±30, y from −38 to 0. */
const motorbike = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><circle cx="-18" cy="-11" r="11" fill="#2b2b2b"/><circle cx="-18" cy="-11" r="4" fill="#ccc"/>` +
  `<circle cx="19" cy="-11" r="11" fill="#2b2b2b"/><circle cx="19" cy="-11" r="4" fill="#ccc"/>` +
  `<path d="M-18 -11L-4 -24H12L19 -11" stroke="#555" stroke-width="3" fill="none"/>` +
  `<path d="M-12 -24Q-6 -32 6 -30L12 -24Z" fill="${color}"/><rect x="-16" y="-30" width="14" height="5" rx="2" fill="#2b2b2b"/>` +
  `<path d="M12 -24L16 -36h6" stroke="#3d4a55" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="22" cy="-30" r="3" fill="#fff3b0"/></g>`

/** Dog without its tail (`dogTail`), faces left; (x, y) = feet. Bounds: x from −24 to +16, y from −27 to 0. */
const dogBody = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-10 -10v10M-3 -10v10M5 -10v10M12 -10v10" stroke="#c48a5a" stroke-width="4"/>` +
  `<rect x="-16" y="-20" width="32" height="12" rx="6" fill="#c48a5a"/><circle cx="-16" cy="-20" r="7" fill="#c48a5a"/>` +
  `<path d="M-12 -26l2 -5l-6 2Z" fill="#8a5a3b"/><circle cx="-22" cy="-19" r="1.8" fill="#222"/><circle cx="-23" cy="-16" r="1.5" fill="#222"/>` +
  `<rect x="-12" y="-20" width="3" height="10" fill="#e63946"/></g>`

/** The dog's tail, from (x + 16, y − 16) for a dog at (x, y). Bounds: x from +16 to +23, y from −25 to −16. */
const dogTail = (x: number, y: number) => `<path d="M${x + 16} ${y - 16}l6 -8" stroke="#c48a5a" stroke-width="4" stroke-linecap="round"/>`

/** The traffic light's lamps, the lit one full and the others faint; (x, y) = foot of the light (`trafficLight`). Bounds: x ±6, y from −80 to −56. */
const lamps = (x: number, y: number, on: 0 | 2) =>
  ['#e63946', '#ffb703', '#8ac926']
    .map((c, i) => `<circle cx="${x}" cy="${y - 74 + i * 9}" r="4" fill="${c}" fill-opacity="${i === on ? 1 : 0.3}"/>`)
    .join('')

export default svgLevel({
  id: 161,
  chapter: 'city',
  title: 'morningStreet',
  parTimeSec: 85,
  scene: ({ diff, anim, rand, extra }) => {
    const sliding = anim({ id: 'gondola', type: 'path', points: [[0, 0], [0, 36]], period: 9 }, gondola(476, 150))
    return (
      `<rect width="800" height="350" fill="#cfe8f7"/>` +
      `<circle cx="132" cy="48" r="44" fill="#fff3b0" fill-opacity="0.6"/><circle cx="132" cy="48" r="32" fill="#ffd23f"/>` +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 28 }, cloud(250, 60, 0.6)) +
      anim({ type: 'path', points: [[0, 0], [-50, 0]], period: 32 }, cloud(680, 52, 0.5)) +
      skyline(rand, 330) +
      // Library
      library(10, 330) + diff(105, 132, 22, `<circle cx="105" cy="132" r="9" fill="#7aa6d6" stroke="#c9bfa8" stroke-width="3"/>`, '') +
      pigeon(52, 316) + pigeon(160, 306, true) +
      // Post office: the clock's minute hand; a cat on a window sill
      postOffice(212, 330) +
      diff(296, 170, 22, `<path d="M296 170V156" stroke="#3d4a55" stroke-width="2.5" stroke-linecap="round"/>`, `<path d="M296 170H309" stroke="#3d4a55" stroke-width="2.5" stroke-linecap="round"/>`) +
      cat(350, 236, '#6c757d') +
      // Office tower: the window cleaner's gondola, a window with its blinds down on B
      officeTower(392, 330) +
      diff(516, 226, 22, '', `<rect x="508" y="216" width="16" height="20" fill="#e9edf2"/><path d="M508 221h16M508 226h16M508 231h16" stroke="#adb5bd" stroke-width="1.5"/>`) +
      diff(476, 138, 32, sliding, gondola(476, 150), 'gondola') +
      // Clinic
      clinic(572, 330) + diff(706, 168, 24, cross(706, 168, '#e63946'), cross(706, 168, '#2a9d8f')) +
      // Street furniture on the upper sidewalk, the traffic light between the tower and the clinic
      street(350, 100, 20) + `<rect y="450" width="800" height="50" fill="#cfd5da"/><path d="M0 450H800" stroke="#adb5bd" stroke-width="3"/>` +
      lampPost(206, 346) + lampHead(206, 346) + mailbox(374, 346, '#3a86ff') + hydrant(590, 346) +
      `<g transform="translate(566 346)"><rect x="-2" y="-40" width="4" height="40" fill="#3d4a55"/><rect x="-8" y="-84" width="16" height="32" rx="4" fill="#2b2b2b"/></g>` +
      diff(566, 280, 22, lamps(566, 346, 0), lamps(566, 346, 2)) +
      // Road: the postal van and the ambulance in the far lane, the garbage truck in the near one
      postalVan(280, 395) + diff(330, 353, 22, envelope(330, 353, '#ffffff'), envelope(330, 353, '#e63946')) +
      ambulance(622, 396) +
      diff(710, 319, 22, anim({ type: 'blink', duty: 0.5, period: 0.8 }, sirenLamp(710, 319)), sirenLamp(710, 319)) +
      garbageTruck(30, 442) + diff(218, 372, 22, beacon(218, 372), '') +
      person(14, 444, '#fb8500') +
      // Lower sidewalk
      person(40, 496, '#8ac926') + newspaperBox(108, 494) + pigeon(158, 494) + pigeon(182, 490, true) +
      stroller(250, 494) + person(286, 496, '#ff006e', true, '#c68b5e', '#2b2b2b') +
      motorbike(400, 494, '#3a86ff') + person(478, 496, '#ffffff', false, '#f2d29b', '#2b2b2b') +
      hotDogCart(535, 494) + diff(535, 469, 22, hotDog(535, 469), '') +
      person(606, 496, '#8338ec', true, '#f2d29b', '#c0392b') +
      diff(708, 474, 22, dogTail(690, 494), anim({ type: 'sway', angle: 25, pivot: [706, 478], period: 0.7 }, dogTail(690, 494))) +
      dogBody(690, 494) + bin(772, 494) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['bollard', 446, 448],
        ['cone', 262, 440],
        ['skateboard', 340, 486],
        ['shoppingBag', 642, 494, '#8ac926'],
        ['flowerBox', 250, 235, '#ff006e'],
      ])
    )
  },
})
