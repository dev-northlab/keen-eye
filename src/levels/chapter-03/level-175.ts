// Mossy ruins: old stones in a deep wood among the forest's ten hardest (hidden until released,
// levels/upcoming.ts). New in the forest: a ruined arch with ivy and a carved keystone, a broken column, a stone
// fox statue, mossy steps, a badger at its sett, a fire salamander, hikers with a map, a spider web with a dew
// drop. Motion differences: the dew drop glints only on picture A; the badger peeks and a butterfly flutters only
// on B.
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { butterfly, fern, flower, mushroom } from './shapes.ts'

/** Stone fox statue on its pedestal, without its left ear; (x, y) = pedestal foot. Bounds: x ±30, y from −110 to 0. */
const foxStatue = (x: number, y: number) =>
  `<rect x="${x - 30}" y="${y - 40}" width="60" height="40" fill="#9aa5ad"/><rect x="${x - 34}" y="${y - 46}" width="68" height="8" fill="#b4bec5"/>` +
  `<path d="M${x - 16} ${y - 46}Q${x - 22} ${y - 76} ${x - 4} ${y - 84}Q${x + 14} ${y - 76} ${x + 12} ${y - 46}Z" fill="#b4bec5"/>` +
  `<path d="M${x + 10} ${y - 50}q18 -2 14 -20" stroke="#b4bec5" stroke-width="8" fill="none" stroke-linecap="round"/>` +
  `<path d="M${x - 14} ${y - 88}L${x - 2} ${y - 104}L${x + 14} ${y - 88}L${x} ${y - 78}Z" fill="#b4bec5"/><path d="M${x + 8} ${y - 96}l4 -10l4 10Z" fill="#b4bec5"/>` +
  `<path d="M${x - 12} ${y - 60}q6 4 10 0" stroke="#7d8790" stroke-width="2" fill="none"/><ellipse cx="${x - 14}" cy="${y - 30}" rx="10" ry="5" fill="#6f9a45"/>`

/** Badger peeking out of its sett; (x, y) = chin. Bounds: x ±14, y from −22 to 0. */
const badger = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-10" rx="13" ry="11" fill="#f4f1e8"/><path d="M-6 -20Q-4 -6 -4 0M6 -20Q4 -6 4 0" stroke="#2b2b2b" stroke-width="4" fill="none"/>` +
  `<circle cx="-11" cy="-18" r="3" fill="#2b2b2b"/><circle cx="11" cy="-18" r="3" fill="#2b2b2b"/><circle cy="-2" r="2.5" fill="#2b2b2b"/></g>`

/** Fire salamander, faces right, without its spots; (x, y) = belly center. Bounds: x ±24, y from −8 to +6. */
const salamander = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-22 0Q-12 -6 0 -2Q12 -6 20 -2" stroke="#2b2b2b" stroke-width="7" fill="none" stroke-linecap="round"/>` +
  `<path d="M-8 0l-4 6M8 0l4 6M-14 -2l-6 -4M14 -2l4 -6" stroke="#2b2b2b" stroke-width="2.5"/><circle cx="21" cy="-2" r="1" fill="#ffffff"/></g>`
const spots = (x: number, y: number, color: string) =>
  [[-16, -2], [-8, -3], [0, -2], [8, -4], [15, -3]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="2" fill="${color}"/>`).join('')

/** Spider web between branches, centered at (x, y). Bounds: radius 30. */
const web = (x: number, y: number) =>
  `<g stroke="#e9edf2" stroke-width="1" fill="none" stroke-opacity="0.9">` +
  Array.from({ length: 8 }, (_, i) => `<path d="M${x} ${y}l${(Math.cos((i * Math.PI) / 4) * 28).toFixed(1)} ${(Math.sin((i * Math.PI) / 4) * 28).toFixed(1)}"/>`).join('') +
  [8, 15, 22].map((r) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('') + `</g><circle cx="${x}" cy="${y}" r="2" fill="#2b2b2b"/>`

export default svgLevel({
  id: 175,
  chapter: 'forest',
  title: 'mossyRuins',
  parTimeSec: 100,
  scene: ({ diff, anim, extra }) => {
    const dew = `<circle cx="728" cy="156" r="3.5" fill="#bde3f2"/><circle cx="727" cy="155" r="1.2" fill="#ffffff"/>`
    return (
      `<rect width="800" height="500" fill="#3f6b45"/><rect width="800" height="120" fill="#2f5a3a"/>` +
      `<path d="M300 0L380 0L560 360L470 360Z" fill="#fff3b0" fill-opacity="0.12"/><path d="M560 0L600 0L700 300L650 300Z" fill="#fff3b0" fill-opacity="0.1"/>` +
      `<rect x="20" y="0" width="50" height="360" fill="#5e4630"/><rect x="740" y="0" width="44" height="360" fill="#5e4630"/>` +
      `<path d="M700 110L784 120M700 196L784 186" stroke="#5e4630" stroke-width="7"/>` +
      `<path d="M0 60Q200 110 400 70T800 80V0H0Z" fill="#24502f"/>` +
      // Web with its dew drop
      web(720, 150) + diff(726, 156, 22, anim({ type: 'blink', duty: 0.4, period: 1.2 }, dew), dew) +
      `<rect y="340" width="800" height="160" fill="#5d8a4a"/><path d="M0 340Q200 326 400 338T800 332" stroke="#4c7a3c" stroke-width="6" fill="none"/>` +
      // Arch with its keystone and ivy flowers, mossy steps
      `<rect x="306" y="190" width="40" height="160" fill="#9aa5ad"/><rect x="454" y="190" width="40" height="160" fill="#9aa5ad"/>` +
      `<path d="M300 200Q400 100 500 200H462Q400 146 338 200Z" fill="#b4bec5"/><path d="M386 132h28l-4 28h-20Z" fill="#c9d1d9"/>` +
      diff(400, 146, 22, `<path d="M400 146m-6 0a6 6 0 1 1 6 6a3 3 0 1 1 -3 -3" stroke="#7d8790" stroke-width="2" fill="none"/>`, '') +
      `<path d="M306 200Q300 250 316 300Q304 330 318 350" stroke="#3f8f3a" stroke-width="6" fill="none"/><path d="M304 220q-10 -2 -8 8M314 260q10 0 8 10M310 300q-10 0 -8 10" stroke="#5fae4b" stroke-width="5" fill="none"/>` +
      diff(326, 186, 22, `<g fill="#f4f1e8"><circle cx="318" cy="180" r="4"/><circle cx="330" cy="188" r="4"/><circle cx="326" cy="176" r="3.5"/></g>`, `<g fill="#b38cff"><circle cx="318" cy="180" r="4"/><circle cx="330" cy="188" r="4"/><circle cx="326" cy="176" r="3.5"/></g>`) +
      `<rect x="350" y="350" width="100" height="16" fill="#9aa5ad"/><rect x="340" y="366" width="120" height="16" fill="#8d99ae"/><rect x="330" y="382" width="140" height="16" fill="#9aa5ad"/>` +
      diff(440, 384, 22, `<ellipse cx="440" cy="384" rx="16" ry="6" fill="#6f9a45"/>`, '') +
      // Broken column with its fallen top
      `<rect x="160" y="210" width="40" height="150" fill="#9aa5ad"/><path d="M166 210V360M182 210V360M194 210V360" stroke="#8d99ae" stroke-width="2"/><rect x="152" y="350" width="56" height="12" fill="#8d99ae"/>` +
      `<path d="M160 210L170 202L180 212L190 200L200 210Z" fill="#9aa5ad"/>` +
      diff(180, 196, 24, `<path d="M162 200l10 -10l26 4l2 12l-36 0Z" fill="#b4bec5"/>`, '') +
      // Fox statue
      foxStatue(620, 344) + diff(606, 244, 22, `<path d="M598 252l2 -16l10 10Z" fill="#9aa5ad"/>`, '') +
      // Butterfly by its flower
      flower(230, 340, '#ff6b8b') + diff(230, 300, 22, butterfly(230, 300, '#ffd23f'), anim({ type: 'bob', dx: 4, dy: 5, period: 1 }, butterfly(230, 300, '#ffd23f'))) +
      // Badger's sett, the log with the salamander, mushrooms, ferns
      `<ellipse cx="100" cy="446" rx="34" ry="16" fill="#3d2a1a"/><path d="M60 446Q100 410 140 446" stroke="#7a5230" stroke-width="8" fill="none"/>` +
      diff(100, 433, 24, badger(100, 444), anim({ type: 'bob', dx: 0, dy: -5, period: 1.6 }, badger(100, 444))) +
      `<rect x="230" y="418" width="110" height="24" rx="12" fill="#7a5230"/><circle cx="232" cy="430" r="12" fill="#c9a26b" stroke="#7a5230" stroke-width="2"/><path d="M250 418q30 -4 60 0" stroke="#6f9a45" stroke-width="4" fill="none"/>` +
      salamander(284, 414) + diff(284, 412, 24, spots(284, 414, '#ffd23f'), spots(284, 414, '#fb8500')) +
      mushroom(500, 470, '#e63946', 0.8) + mushroom(520, 474, '#e63946', 0.7) + diff(540, 464, 22, mushroom(540, 474, '#e63946', 0.6), '') +
      fern(40, 498) + fern(600, 494) + fern(770, 492) +
      // Hikers with their map
      person(660, 486, '#3a86ff', false, '#e0b48a', '#5a3d2b') + person(708, 486, '#e63946', true, '#c68b5e', '#2b2b2b') +
      diff(684, 446, 22, `<rect x="670" y="438" width="28" height="18" fill="#f4d35e"/><path d="M684 438v18M676 444l6 6l8 -8" stroke="#8a5a33" stroke-width="1.5" fill="none"/>`, `<rect x="670" y="438" width="28" height="18" fill="#9ad3f0"/><path d="M684 438v18M676 444l6 6l8 -8" stroke="#8a5a33" stroke-width="1.5" fill="none"/>`) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['snail', 420, 470],
        ['pineCone', 160, 480],
        ['acorn', 590, 400],
        ['leafPile', 330, 488],
        ['frog', 760, 400],
      ])
    )
  },
})
