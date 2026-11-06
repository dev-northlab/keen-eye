// Ostrich farm: a savanna farm among the farm's ten hardest (hidden until released, levels/upcoming.ts). New on
// the farm: ostriches with a chick and a nest of eggs, a round thatched hut, an acacia with weaver birds' nests,
// meerkats, a guinea fowl, an open safari jeep and a farmer in a bush hat. Motion differences: the ostrich chick
// runs only on picture A; the weaver bird flutters only on B; a weaver nest swings only on A.
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'

/** Ostrich standing, faces right; (x, y) = feet. Bounds: x from −40 to +36, y from −148 to 0. */
const ostrich = (x: number, y: number, body: string, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-6 0V-46M8 0V-46" stroke="#e8b4a0" stroke-width="4"/><path d="M-12 0h8M2 0h10" stroke="#e8b4a0" stroke-width="3"/>` +
  `<ellipse cy="-58" rx="34" ry="22" fill="${body}"/><path d="M-30 -64q-12 -6 -10 -18q8 6 16 4Z" fill="#f4f1e8"/>` +
  `<path d="M22 -66Q30 -100 26 -138" stroke="#e8b4a0" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  `<ellipse cx="29" cy="-140" rx="9" ry="7" fill="#d8a490"/><path d="M36 -140l8 2l-8 3Z" fill="#e9c46a"/><circle cx="30" cy="-142" r="1.6" fill="#222"/></g>`

/** Ostrich chick, faces right; (x, y) = feet. Bounds: x from −14 to +16, y from −32 to 0. */
const ostrichChick = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-3 0V-10M4 0V-10" stroke="#c9a27a" stroke-width="2.5"/>` +
  `<ellipse cy="-15" rx="13" ry="9" fill="#b39573"/><path d="M-6 -20l4 4M0 -22l2 5M5 -20l1 5" stroke="#8a6a4a" stroke-width="1.5"/>` +
  `<path d="M8 -18Q12 -26 10 -30" stroke="#c9a27a" stroke-width="3" fill="none"/><circle cx="11" cy="-30" r="4" fill="#b39573"/>` +
  `<path d="M14 -30l3 1l-3 1Z" fill="#e9c46a"/></g>`

/** Weaver bird's hanging nest under a branch at (x, y). Bounds: x ±8, y from 0 to +30. */
const weaverNest = (x: number, y: number) =>
  `<path d="M${x} ${y}v6" stroke="#8a7a52" stroke-width="2"/><ellipse cx="${x}" cy="${y + 17}" rx="8" ry="11" fill="#b8a46a"/>` +
  `<path d="M${x - 6} ${y + 12}l12 4M${x - 6} ${y + 19}l12 -3" stroke="#8a7a52" stroke-width="1.2"/><circle cx="${x}" cy="${y + 25}" r="3" fill="#5e4630"/>`

/** Weaver bird flying; (x, y) = body center. Bounds: x ±12, y ±7. */
const weaver = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-2 -1L-12 -7L-6 1ZM2 -1L10 -7L6 1Z" fill="#c9a227"/><ellipse rx="6" ry="4" fill="#ffd23f"/>` +
  `<circle cx="5" cy="-2" r="3" fill="#2b2b2b"/><path d="M8 -2l3 1l-3 1Z" fill="#3d3d3d"/></g>`

/** Round thatched hut without its finial; the door separate. (x, y) = ground center. Bounds: x ±72, y from −150 to 0. */
const rondavel = (x: number, y: number) =>
  `<rect x="${x - 60}" y="${y - 80}" width="120" height="80" fill="#e9d3a7"/><rect x="${x - 60}" y="${y - 12}" width="120" height="12" fill="#a0632b"/>` +
  `<rect x="${x - 44}" y="${y - 60}" width="16" height="16" fill="#5e4630"/><rect x="${x + 28}" y="${y - 60}" width="16" height="16" fill="#5e4630"/>` +
  `<path d="M${x - 72} ${y - 76}L${x} ${y - 150}L${x + 72} ${y - 76}Q${x} ${y - 66} ${x - 72} ${y - 76}Z" fill="#c9a24e"/>` +
  `<path d="M${x - 40} ${y - 108}q40 8 80 0M${x - 58} ${y - 88}q58 10 116 0" stroke="#a8822e" stroke-width="2" fill="none"/>`

/** Open safari jeep without its spare wheel and jerrycan; (x, y) = ground under its back. Bounds: x from 0 to +190, y from −80 to 0. */
const jeep = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M30 -50V-78H110V-50" stroke="#3d4a55" stroke-width="4" fill="none"/>` +
  `<rect x="6" y="-52" width="176" height="36" rx="5" fill="#c2a878"/><rect x="140" y="-56" width="48" height="40" rx="5" fill="#b0966a"/>` +
  `<path d="M128 -52L134 -80" stroke="#3d4a55" stroke-width="4"/><rect x="40" y="-62" width="22" height="12" rx="3" fill="#6b4a2b"/><rect x="80" y="-62" width="22" height="12" rx="3" fill="#6b4a2b"/>` +
  `<circle cx="184" cy="-38" r="4" fill="#fff3b0"/><rect x="2" y="-22" width="186" height="6" fill="#555"/>` +
  `<circle cx="42" cy="-14" r="16" fill="#2b2b2b"/><circle cx="42" cy="-14" r="6" fill="#8d99ae"/><circle cx="152" cy="-14" r="16" fill="#2b2b2b"/><circle cx="152" cy="-14" r="6" fill="#8d99ae"/></g>`

/** Meerkat standing guard; (x, y) = feet. Bounds: x ±9, y from −36 to 0. */
const meerkat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M4 -2q8 0 8 -8" stroke="#b08a5e" stroke-width="3" fill="none"/>` +
  `<ellipse cy="-14" rx="7" ry="14" fill="#c9a27a"/><ellipse cy="-12" rx="4" ry="9" fill="#e6cfa8"/>` +
  `<ellipse cy="-30" rx="5" ry="6" fill="#c9a27a"/><ellipse cx="-2" cy="-31" rx="1.8" ry="1.4" fill="#3d3d3d"/><ellipse cx="2.5" cy="-31" rx="1.8" ry="1.4" fill="#3d3d3d"/>` +
  `<path d="M-5 -20l4 3M5 -20l-4 3" stroke="#b08a5e" stroke-width="2.5" stroke-linecap="round"/></g>`

/** Guinea fowl's spotted body; (x, y) = center. Bounds: x ±16, y ±12. */
const fowlBody = (x: number, y: number, color: string) => {
  let dots = ''
  for (const [dx, dy] of [[-8, -4], [-2, -6], [5, -3], [-5, 3], [2, 2], [9, 3], [-10, 2]]) dots += `<circle cx="${x + dx}" cy="${y + dy}" r="1.4" fill="#ffffff"/>`
  return `<ellipse cx="${x}" cy="${y}" rx="16" ry="12" fill="${color}"/>${dots}`
}

/** Bush hat on the head of a person facing left at (x, y). Bounds: x ±14, y from −68 to −58. */
const bushHat = (x: number, y: number) =>
  `<path d="M${x - 14} ${y - 58}h28l-3 -3h-4v-7h-14v7h-4Z" fill="#a0703f"/><rect x="${x - 7}" y="${y - 63}" width="14" height="2" fill="#5e3b1a"/>`

export default svgLevel({
  id: 156,
  chapter: 'farm',
  title: 'ostrichFarm',
  parTimeSec: 86,
  scene: ({ diff, anim, rand, extra }) => {
    const running = anim({ id: 'chick', type: 'path', points: [[0, 0], [40, 0]], period: 2.4, flipX: 640 }, ostrichChick(640, 404))
    let tufts = ''
    for (let i = 0; i < 30; i++) {
      const x = rand() * 790 + 5
      const y = 330 + rand() * 165
      tufts += `<path d="M${x.toFixed(1)} ${y.toFixed(1)}l2 -10l3 10l2 -12l3 12" fill="#b98f3e"/>`
    }
    return (
      `<rect width="800" height="500" fill="#f7dfb0"/><rect width="800" height="120" fill="#cfe1ea"/><rect y="110" width="800" height="40" fill="#e8e0c4"/>` +
      `<circle cx="650" cy="96" r="46" fill="#fb8500" fill-opacity="0.25"/><circle cx="650" cy="96" r="34" fill="#fb8500"/>` +
      `<path d="M430 250Q470 200 520 214T600 250Z" fill="#b8936a"/><path d="M0 240Q200 210 400 240T800 230V500H0Z" fill="#e3c27a"/>` +
      tufts +
      // Acacia with the weaver birds' nests
      `<path d="M126 330Q130 250 144 172M138 220Q110 190 90 168M140 210Q170 186 196 168" stroke="#6b4a2b" stroke-width="10" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="140" cy="150" rx="124" ry="22" fill="#6f8f3a"/><ellipse cx="120" cy="134" rx="80" ry="16" fill="#7fa046"/><ellipse cx="170" cy="138" rx="60" ry="12" fill="#86a84c"/>` +
      weaverNest(56, 164) + weaverNest(136, 168) + weaverNest(244, 162) +
      diff(90, 186, 22, weaverNest(90, 168), '') +
      diff(200, 186, 24, anim({ type: 'sway', angle: 14, pivot: [200, 166], period: 2.4 }, weaverNest(200, 166)), weaverNest(200, 166)) +
      diff(146, 232, 22, weaver(146, 232), anim({ type: 'bob', dx: 4, dy: 5, period: 0.7 }, weaver(146, 232))) +
      // Round hut with its finial and door
      rondavel(340, 330) + diff(340, 174, 22, `<path d="M340 182V168" stroke="#6b4a2b" stroke-width="3"/><circle cx="340" cy="166" r="4" fill="#6b4a2b"/>`, '') +
      diff(340, 306, 30, `<path d="M326 330V296a14 14 0 0 1 28 0V330Z" fill="#7a4a24"/>`, `<path d="M326 330V296a14 14 0 0 1 28 0V330Z" fill="#3a86ff"/>`) +
      // Ostrich pen: the birds, the nest of eggs, the chick
      `<path d="M420 332H800M420 352H800" stroke="#8d99ae" stroke-width="2"/>` +
      [430, 500, 570, 640, 710, 780].map((x) => `<rect x="${x - 3}" y="316" width="6" height="44" fill="#8a5a33"/>`).join('') +
      ostrich(480, 344, '#2b2b2b') + ostrich(600, 330, '#8a6a4a', true) +
      `<ellipse cx="740" cy="352" rx="44" ry="10" fill="#d4ad62"/>` +
      `<g fill="#f4f1e8"><ellipse cx="714" cy="344" rx="8" ry="10"/><ellipse cx="730" cy="346" rx="8" ry="10"/><ellipse cx="748" cy="345" rx="8" ry="10"/><ellipse cx="764" cy="344" rx="8" ry="10"/></g>` +
      diff(738, 330, 22, `<ellipse cx="738" cy="330" rx="8" ry="10" fill="#f4f1e8"/>`, '') +
      diff(646, 390, 26, running, ostrichChick(640, 404), 'chick') +
      // Meerkats, the guinea fowl
      `<path d="M10 440Q30 360 50 440Z" fill="#c9965e"/>` + meerkat(56, 442) + meerkat(80, 442) + diff(104, 424, 22, meerkat(104, 442), '') +
      `<path d="M222 462l-2 10M236 462l2 10" stroke="#e9c46a" stroke-width="2"/><path d="M244 444Q252 436 252 428" stroke="#3a86ff" stroke-width="4" fill="none"/>` +
      `<circle cx="253" cy="426" r="4" fill="#3a86ff"/><path d="M252 430l1 6" stroke="#e63946" stroke-width="3"/><path d="M256 426l4 1l-4 1Z" fill="#e9c46a"/>` +
      diff(230, 456, 22, fowlBody(230, 456, '#4a4f57'), fowlBody(230, 456, '#6c4a8a')) +
      // Safari jeep and the farmer
      jeep(296, 474) +
      diff(296, 434, 22, `<circle cx="296" cy="434" r="15" fill="#2b2b2b"/><circle cx="296" cy="434" r="6" fill="#8d99ae"/>`, '') +
      diff(452, 414, 22, `<rect x="446" y="404" width="12" height="18" rx="2" fill="#3f8f3a"/><path d="M448 404v-4h6" stroke="#3f8f3a" stroke-width="2" fill="none"/>`, `<rect x="446" y="404" width="12" height="18" rx="2" fill="#e63946"/><path d="M448 404v-4h6" stroke="#e63946" stroke-width="2" fill="none"/>`) +
      person(560, 476, '#c2a878', true, '#c68b5e', '#2b2b2b') + diff(560, 410, 22, bushHat(560, 476), '') +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['feather', 160, 480],
        ['stones', 640, 484],
        ['grass', 740, 470],
        ['birds', 430, 70],
        ['ladybug', 360, 486],
      ])
    )
  },
})
