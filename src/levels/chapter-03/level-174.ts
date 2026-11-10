// Moonlit wolves: a winter night among the forest's ten hardest (hidden until released, levels/upcoming.ts). New
// in the forest: northern lights, a shooting star, a wolf pack on the ridge, a snowy cabin with antlers over the
// door, a lantern post, a husky team pulling a sled with its musher, a snowmobile and a snowshoe hare. Motion
// differences: the shooting star falls only on picture A; the chimney smokes only on B; the lead husky wags its
// tail only on A.
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { pine } from './shapes.ts'

/** Shooting star heading down-right; (x, y) = head. Bounds: x from −30 to +4, y from −12 to +4. */
const shootingStar = (x: number, y: number) =>
  `<path d="M${x - 30} ${y - 12}L${x} ${y}" stroke="#fff3c4" stroke-width="2" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="3.5" fill="#fffbe6"/>`

/** Wolf standing on the ridge, faces right, a dark silhouette; (x, y) = feet. Bounds: x from −26 to +24, y from −34 to 0. */
const wolf = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#56627a"><path d="M-14 0V-14M-6 0V-14M8 0V-14M14 0V-14" stroke="#56627a" stroke-width="4"/>` +
  `<ellipse cy="-18" rx="18" ry="8"/><path d="M-16 -18q-10 2 -10 12" stroke="#56627a" stroke-width="4" fill="none"/>` +
  `<path d="M12 -22L22 -30L24 -18L14 -16Z"/><path d="M14 -26l1 -8l4 6Z"/><circle cx="19" cy="-24" r="1.2" fill="#ffd23f"/></g>`

/** Snowy log cabin with a chimney, its window light separate; (x, y) = bottom left, 180 wide. Bounds: y from −160 to 0. */
const cabin = (x: number, y: number) => {
  let logs = ''
  for (let ly = y - 100; ly < y; ly += 14) logs += `<rect x="${x}" y="${ly}" width="180" height="13" rx="6" fill="#7a4a24"/>`
  return `<rect x="${x + 132}" y="${y - 156}" width="18" height="44" fill="#6c757d"/>` + logs +
    `<path d="M${x - 14} ${y - 98}L${x + 90} ${y - 150}L${x + 194} ${y - 98}Z" fill="#5e3b1a"/><path d="M${x - 16} ${y - 96}L${x + 90} ${y - 152}L${x + 196} ${y - 96}" stroke="#ffffff" stroke-width="8" fill="none"/>` +
    `<rect x="${x + 96}" y="${y - 60}" width="28" height="60" fill="#4a2f17"/><rect x="${x + 36}" y="${y - 64}" width="28" height="26" fill="#3d2a1a"/>`
}

/** Husky pulling to the right, without its tail; (x, y) = feet. Bounds: x from −18 to +24, y from −30 to 0. */
const husky = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-12 0V-12M-5 0V-12M8 0V-12M14 0V-12" stroke="#6c757d" stroke-width="4"/>` +
  `<rect x="-16" y="-22" width="32" height="12" rx="6" fill="#8d99ae"/><rect x="-12" y="-14" width="24" height="5" rx="2" fill="#f4f1e8"/>` +
  `<circle cx="16" cy="-22" r="7" fill="#8d99ae"/><ellipse cx="20" cy="-19" rx="5" ry="3" fill="#f4f1e8"/><path d="M12 -28l1 -6l4 4ZM17 -28l2 -6l2 5Z" fill="#8d99ae"/>` +
  `<circle cx="18" cy="-24" r="1.2" fill="#3a86ff"/><rect x="-4" y="-24" width="10" height="4" fill="#e63946"/></g>`
/** The husky's curled tail for a husky at (x, y). Bounds: x from −26 to −14, y from −34 to −18. */
const huskyTail = (x: number, y: number) => `<path d="M${x - 15} ${y - 20}q-12 -4 -8 -14q4 6 -2 8" stroke="#8d99ae" stroke-width="5" fill="none" stroke-linecap="round"/>`

/** Snowmobile facing right; (x, y) = ground under its middle. Bounds: x ±50, y from −46 to 0. */
const snowmobile = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-46 -4H-10M10 -2H48q4 0 4 -4" stroke="#3d4a55" stroke-width="4" fill="none"/>` +
  `<rect x="-44" y="-18" width="50" height="12" rx="6" fill="#2b2b2b"/><path d="M-40 -18V-30H0L22 -22L40 -22Q46 -22 46 -14H-40Z" fill="#c0392b"/>` +
  `<path d="M8 -30L18 -46H24L20 -28Z" fill="#bde3f2"/><rect x="-36" y="-36" width="30" height="8" rx="4" fill="#2b2b2b"/><circle cx="44" cy="-18" r="3" fill="#fff3b0"/></g>`

/** Snowshoe hare, white with brown ear tips, faces left; (x, y) = feet. Bounds: x ±14, y from −32 to 0. */
const hare = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#f4f6f8"><ellipse cy="-9" rx="12" ry="9" stroke="#c9d6e3" stroke-width="1.5"/><circle cx="-9" cy="-16" r="6" stroke="#c9d6e3" stroke-width="1.5"/>` +
  `<ellipse cx="-11" cy="-26" rx="2.5" ry="7"/><ellipse cx="-6" cy="-26" rx="2.5" ry="7"/><circle cx="-11" cy="-32" r="2" fill="#8a6a4a"/><circle cx="-6" cy="-32" r="2" fill="#8a6a4a"/>` +
  `<circle cx="-11" cy="-17" r="1.2" fill="#222"/></g>`

export default svgLevel({
  id: 174,
  chapter: 'forest',
  title: 'moonlitWolves',
  parTimeSec: 98,
  scene: ({ diff, anim, rand, extra }) => {
    const falling = anim({ id: 'shooting', type: 'path', points: [[0, 0], [80, 30]], period: 3 }, shootingStar(330, 70))
    const smoke = `<circle cx="200" cy="166" r="8" fill="#c9d6e3" fill-opacity="0.6"/><circle cx="208" cy="152" r="10" fill="#c9d6e3" fill-opacity="0.5"/>`
    const zones = [[320, 64], [204, 166], [610, 50], [566, 224], [110, 290]]
    let stars = ''
    for (let i = 0; i < 50; i++) {
      const x = rand() * 800
      const y = rand() * 190
      if (zones.every(([zx, zy]) => Math.hypot(x - zx, y - zy) > 36) && Math.hypot(x - 664, y - 82) > 44)
        stars += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.8 + rand() * 1.2).toFixed(1)}" fill="#fff8d6"/>`
    }
    let forest = ''
    for (let x = -10; x < 820; x += 36) forest += pine(x, 272, 0.55 + ((x / 36) % 3) * 0.08, '#1e3a3a')
    return (
      `<rect width="800" height="500" fill="#1a2547"/>` + stars +
      `<path d="M0 120Q120 60 240 110T480 90" stroke="#3fd39a" stroke-opacity="0.35" stroke-width="22" fill="none"/><path d="M40 150Q160 100 280 140T520 120" stroke="#5cc3e0" stroke-opacity="0.25" stroke-width="14" fill="none"/>` +
      `<circle cx="664" cy="82" r="30" fill="#fff3c4"/><circle cx="654" cy="74" r="5" fill="#ece0a8"/><circle cx="674" cy="92" r="6" fill="#ece0a8"/>` +
      diff(610, 50, 22, `<path d="M610 42l2 6l6 0l-5 4l2 6l-5 -4l-5 4l2 -6l-5 -4l6 0Z" fill="#fff8d6"/>`, '') +
      diff(320, 64, 26, falling, shootingStar(330, 70), 'shooting') +
      // Ridge with the wolf pack
      forest + `<path d="M380 250Q500 210 640 236T800 240V280H380Z" fill="#dfe8f1"/>` +
      wolf(480, 236) + wolf(522, 232) + diff(565, 220, 30, wolf(566, 236), '') +
      `<rect y="272" width="800" height="228" fill="#eef3f8"/>` +
      // Cabin: smoke, window light, antlers
      cabin(40, 340) +
      diff(204, 160, 28, smoke, anim({ type: 'bob', dx: 3, dy: -6, period: 2 }, smoke)) +
      diff(90, 290, 22, `<rect x="76" y="276" width="28" height="26" fill="#ffd166"/><path d="M90 276v26M76 289h28" stroke="#3d2a1a" stroke-width="2"/>`, `<rect x="76" y="276" width="28" height="26" fill="#9ad3f0"/><path d="M90 276v26M76 289h28" stroke="#3d2a1a" stroke-width="2"/>`) +
      diff(150, 262, 22, `<path d="M150 272q-14 -2 -16 -16l4 4l2 -6l4 8M150 272q14 -2 16 -16l-4 4l-2 -6l-4 8" stroke="#e9dcc4" stroke-width="3" fill="none"/>`, '') +
      // Lantern post
      `<path d="M300 348V310" stroke="#3d4a55" stroke-width="4"/>` +
      diff(300, 300, 22, `<rect x="293" y="292" width="14" height="18" rx="3" fill="#ffd166" stroke="#3d4a55" stroke-width="2"/><circle cx="300" cy="300" r="16" fill="#ffd166" fill-opacity="0.2"/>`, `<rect x="293" y="292" width="14" height="18" rx="3" fill="#3d4a55" stroke="#3d4a55" stroke-width="2"/>`) +
      // Snowshoe hare, sled team, snowmobile
      diff(244, 444, 22, hare(244, 458), '') +
      `<path d="M320 470H404Q412 470 412 462" stroke="#6b4a2b" stroke-width="3" fill="none"/><path d="M326 470V446M396 470V446" stroke="#6b4a2b" stroke-width="3"/>` +
      `<rect x="330" y="436" width="66" height="18" rx="3" fill="#a0703f"/>` +
      diff(362, 434, 24, `<rect x="342" y="428" width="40" height="12" rx="4" fill="#e63946"/>`, `<rect x="342" y="428" width="40" height="12" rx="4" fill="#3a86ff"/>`) +
      person(314, 470, '#3f6f4a', false, '#e0b48a', '#5a3d2b') +
      `<path d="M412 456H446M446 456H486" stroke="#3d4a55" stroke-width="1.5"/>` +
      husky(446, 470) + husky(500, 470) + huskyTail(446, 470) +
      diff(480, 444, 22, anim({ type: 'sway', angle: 18, pivot: [485, 450], period: 0.6 }, huskyTail(500, 470)), huskyTail(500, 470)) +
      snowmobile(650, 470) +
      diff(720, 452, 26, `<path d="M697 452L740 438V466Z" fill="#fff3b0" fill-opacity="0.45"/>`, '') +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['pine', 560, 330],
        ['pineCone', 40, 480],
        ['star', 740, 160],
        ['feather', 600, 370],
        ['owl', 380, 300],
      ])
    )
  },
})
