// Motion differences: the rope ladder sways only on picture B; the flag waves faster on B; the bucket goes up and down faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level053Redesign } from './level-053-redesign.ts'
import { acorn, backpack, bush, cloud, floor, lantern, mushroom, pine, pineCone, squirrel, sun, trailSign } from './shapes.ts'

/** Rope ladder from the pivot (x, y) down. Bounds: x ±12, y from 0 to +70. */
const ladder = (x: number, y: number) =>
  `<path d="M${x - 9} ${y}v70M${x + 9} ${y}v70" stroke="#8a5a3b" stroke-width="2"/>` + [12, 26, 40, 54, 66].map((dy) => `<path d="M${x - 11} ${y + dy}h22" stroke="#a0703f" stroke-width="4"/>`).join('')

/** Flag cloth to the right of the pole top at (x, y). Bounds: x from 0 to +26, y from −2 to +18. */
const flag = (x: number, y: number, color: string) => `<path d="M${x + 2} ${y}h24l-5 8l5 8h-24Z" fill="${color}"/>`

/** Bucket on a rope; (x, y) = rope top. Bounds: x ±8, y from 0 to +40. */
const bucket = (x: number, y: number) =>
  `<path d="M${x} ${y}v26" stroke="#555" stroke-width="1.5"/><path d="M${x - 7} ${y + 26}h14l-2 14h-10Z" fill="#8d99ae"/>`

/** Nest with `n` eggs; (x, y) = bottom center. Bounds: x ±16, y from −18 to 0. */
const nest = (x: number, y: number, n: number) =>
  [[-6, -11], [2, -12], [8, -10]].slice(0, n).map(([dx, dy]) => `<ellipse cx="${x + dx}" cy="${y + dy}" rx="4" ry="5" fill="#bde3f2"/>`).join('') +
  `<path d="M${x - 16} ${y - 8}q16 10 32 0l-4 8h-24Z" fill="#8a5a3b"/><path d="M${x - 12} ${y - 6}h24" stroke="#c9a06c" stroke-width="2"/>`

/** Window shutter pair on the treehouse; (x, y) = window center. Bounds: x ±20, y ±12. */
const shutters = (x: number, y: number, color: string) =>
  `<rect x="${x - 20}" y="${y - 12}" width="8" height="24" fill="${color}"/><rect x="${x + 12}" y="${y - 12}" width="8" height="24" fill="${color}"/>`

/** Kite stuck in the crown; (x, y) = center. Bounds: x ±14, y ±18. */
const kite = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y - 18}L${x + 14} ${y}L${x} ${y + 18}L${x - 14} ${y}Z" fill="${color}"/><path d="M${x} ${y - 18}v36M${x - 14} ${y}h28" stroke="#fff" stroke-opacity="0.5" stroke-width="2"/>`

export default svgLevel({
  id: 53,
  chapter: 'forest',
  title: 'treehouse',
  parTimeSec: 120,
  redesign: level053Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const rope = ladder(330, 300)
    const waving = (period: number) => anim({ type: 'sway', angle: 10, pivot: [482, 120], period }, flag(482, 122, '#e63946'))
    const hauling = (period: number) => anim({ id: 'bucket', type: 'path', points: [[0, 0], [0, 60]], period }, bucket(560, 300))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(100, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(640, 60, 0.8)) +
      `<path d="M0 290Q200 260 400 280T800 270V500H0Z" fill="#a9d3a0"/>` +
      pine(60, 300, 1.2, '#3b9467') +
      pine(720, 290, 1.1, '#3b9467') +
      pine(780, 310, 0.8, '#2f7d55') +
      // Big tree
      `<rect x="380" y="200" width="40" height="300" fill="#6b4f3a"/>` +
      `<path d="M400 300l-80 -30M400 280l90 -20M400 320l-60 10" stroke="#6b4f3a" stroke-width="10" stroke-linecap="round"/>` +
      `<circle cx="400" cy="130" r="80" fill="#3f9a5a"/><circle cx="320" cy="170" r="50" fill="#4caf6a"/><circle cx="490" cy="160" r="56" fill="#3f9a5a"/><circle cx="400" cy="200" r="40" fill="#4caf6a"/>` +
      diff(330, 110, 24, kite(330, 110, '#ff006e'), kite(330, 110, '#ffb703')) +
      diff(250, 210, 20, nest(250, 220, 3), nest(250, 220, 2)) +
      // Treehouse
      `<rect x="340" y="200" width="120" height="90" fill="#a0703f"/><path d="M330 204h140l-70 -40Z" fill="#8a3b2b"/>` +
      `<rect x="340" y="212" width="120" height="4" fill="#8a5a3b"/><rect x="340" y="232" width="120" height="4" fill="#8a5a3b"/><rect x="340" y="252" width="120" height="4" fill="#8a5a3b"/>` +
      `<rect x="380" y="226" width="40" height="36" fill="#bde3f2"/><circle cx="400" cy="250" r="7" fill="#f2d29b"/><rect x="390" y="256" width="20" height="8" fill="#3a86ff"/>` +
      diff(400, 244, 22, shutters(400, 244, '#2a9d8f'), shutters(400, 244, '#e63946')) +
      `<rect x="330" y="290" width="140" height="10" fill="#8a5a3b"/>` +
      `<rect x="480" y="120" width="4" height="46" fill="#3d4a55"/>` +
      diff(496, 130, 22, waving(2.2), waving(1)) +
      diff(330, 335, 38, rope, anim({ type: 'sway', angle: 5, pivot: [330, 300], period: 2 }, rope)) +
      `<path d="M560 300v-10h-100" stroke="#3d4a55" stroke-width="2" fill="none"/>` +
      diff(560, 320, 22, hauling(6), hauling(3), 'bucket') +
      `<rect y="400" width="800" height="100" fill="#8fca68"/>` +
      diff(330, 426, 20, squirrel(330, 440), squirrel(330, 440, true)) +
      diff(470, 470, 20, mushroom(470, 484, '#e63946'), '') +
      mushroom(500, 490, '#a0703f', 0.8) +
      bush(140, 440, 1.2) +
      bush(680, 450, 1, '#4caf6a') +
      floor(rand, 410, 490, 8) +
      backpack(445, 420) +
      lantern(255, 410) +
      pineCone(620, 480) +
      acorn(200, 480) +
      trailSign(720, 412) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['squirrel', 150, 381],
        ['feather', 261, 468],
        ['rabbit', 471, 368],
        ['frog', 677, 352],
        ['anthill', 718, 474],
        ['mushroom', 555, 475],
        ['fern', 396, 476],
        ['cloud', 212, 123],
        ['birds', 651, 193],
        ['butterfly', 545, 54],
      ])
    )
  },
})
