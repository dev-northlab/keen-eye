// Fire tower: a fire lookout among the forest's ten hardest (hidden until released, levels/upcoming.ts). New in the
// forest: a lookout tower with a ranger, a radio mast, a weather station, a firefighting helicopter with its water
// bucket, a fire danger sign, a wolf on a rock, a lynx in a pine, a ranger pickup, a trail sign and a hiker.
// Motion differences: the anemometer spins and the mast's light flashes only on picture A; the helicopter flies
// only on B.
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, pine } from './shapes.ts'

/** Anemometer cups; (x, y) = hub. Bounds: radius 20. */
const anemometer = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  [0, 120, 240].map((a) => `<g transform="rotate(${a})"><path d="M0 0V-14" stroke="#3d4a55" stroke-width="2"/><path d="M-6 -14a6 6 0 0 0 12 0Z" fill="#e63946"/></g>`).join('') +
  `<circle r="3" fill="#3d4a55"/></g>`

/** Firefighting helicopter with its water bucket, faces right; (x, y) = cabin center. Bounds: x from −46 to +30, y from −22 to +54. */
const fireHelicopter = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-32 -20H32M0 -20v8" stroke="#3d4a55" stroke-width="3"/><path d="M-42 -2H-10" stroke="#c0392b" stroke-width="5"/><path d="M-46 -8v12" stroke="#c0392b" stroke-width="4"/>` +
  `<ellipse rx="22" ry="12" fill="#e63946"/><path d="M4 -8Q20 -8 20 2H4Z" fill="#bde3f2"/><path d="M-20 4H20" stroke="#ffffff" stroke-width="3"/>` +
  `<path d="M0 12V38" stroke="#3d4a55" stroke-width="1.5"/><path d="M-10 38h20l-3 16h-14Z" fill="#fb8500"/></g>`

/** Fire danger sign: a dial of four coloured bands under its arrow (`dangerArrow`); (x, y) = dial center. Bounds: x ±40, y from −40 to +40. */
const dangerSign = (x: number, y: number) =>
  `<path d="M${x - 30} ${y + 2}V${y + 40}M${x + 30} ${y + 2}V${y + 40}" stroke="#6b4a2b" stroke-width="5"/>` +
  `<rect x="${x - 40}" y="${y - 40}" width="80" height="44" rx="4" fill="#a0703f"/>` +
  ['#8ac926', '#ffd23f', '#fb8500', '#e63946'].map((c, i) => {
    const a0 = Math.PI + (i * Math.PI) / 4
    const a1 = a0 + Math.PI / 4
    const p = (a: number) => `${(x + Math.cos(a) * 32).toFixed(1)} ${(y + Math.sin(a) * 32).toFixed(1)}`
    return `<path d="M${x} ${y}L${p(a0)}A32 32 0 0 1 ${p(a1)}Z" fill="${c}"/>`
  }).join('')
const dangerArrow = (x: number, y: number, angle: number) =>
  `<g transform="rotate(${angle} ${x} ${y})"><path d="M${x - 2.5} ${y}V${y - 24}l2.5 -5l2.5 5V${y}Z" fill="#2b2b2b"/></g><circle cx="${x}" cy="${y}" r="4" fill="#2b2b2b"/>`

/** Wolf sitting on a rock, faces right, without its head (`wolfHead`); (x, y) = feet. Bounds: x from −30 to +16, y from −34 to 0. */
const wolf = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-14 -4q-16 4 -16 -10" stroke="#7d8790" stroke-width="7" fill="none" stroke-linecap="round"/>` +
  `<ellipse cx="0" cy="-14" rx="14" ry="14" fill="#8d99ae"/><path d="M4 0V-12M12 0V-14" stroke="#7d8790" stroke-width="5"/><ellipse cx="4" cy="-10" rx="6" ry="8" fill="#c9d1d9"/></g>`
/** Wolf head howling (raised) or looking ahead, on a wolf at (x, y). Bounds: x from +2 to +32, y from −52 to −18. */
const wolfHead = (x: number, y: number, howling: boolean) =>
  howling
    ? `<g transform="translate(${x} ${y})"><path d="M6 -26L16 -50L26 -40Z" fill="#8d99ae"/><path d="M10 -36l-4 -8l6 3Z" fill="#7d8790"/><circle cx="17" cy="-40" r="1.4" fill="#222"/></g>`
    : `<g transform="translate(${x} ${y})"><ellipse cx="14" cy="-28" rx="10" ry="8" fill="#8d99ae"/><path d="M20 -28h12l-12 6Z" fill="#8d99ae"/><path d="M8 -34l-2 -8l7 4Z" fill="#7d8790"/><circle cx="18" cy="-31" r="1.4" fill="#222"/></g>`

/** Lynx lying on a branch, faces left; (x, y) = branch under its middle. Bounds: x ±22, y from −24 to 0. */
const lynx = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-8" rx="20" ry="8" fill="#c9a27a"/><circle cx="-16" cy="-14" r="8" fill="#c9a27a"/>` +
  `<path d="M-21 -20l-1 -6l4 4M-12 -21l1 -6l3 5" stroke="#2b2b2b" stroke-width="2" fill="#c9a27a"/><circle cx="-19" cy="-15" r="1.2" fill="#222"/>` +
  `<path d="M-22 -10l-4 2M-22 -12l-5 -1" stroke="#f4f1e8" stroke-width="1"/><circle cx="-2" cy="-10" r="1.5" fill="#8a6a4a"/><circle cx="8" cy="-8" r="1.5" fill="#8a6a4a"/><rect x="18" y="-12" width="6" height="5" rx="2" fill="#2b2b2b"/></g>`

/** Ranger pickup facing left, without its door logo; (x, y) = ground under its front. Bounds: x from 0 to +200, y from −66 to 0. */
const rangerTruck = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M0 -16V-40L10 -44H40L58 -66H110V-44H200V-16Z" fill="#3f6f4a"/><path d="M64 -62H104V-46H52Z" fill="#bde3f2"/>` +
  `<rect x="0" y="-20" width="200" height="5" fill="#2b2b2b"/><rect x="2" y="-38" width="6" height="6" fill="#fff3b0"/><rect x="58" y="-74" width="40" height="6" rx="2" fill="#ffd23f"/>` +
  `<circle cx="36" cy="-8" r="13" fill="#2b2b2b"/><circle cx="36" cy="-8" r="5" fill="#ccc"/><circle cx="164" cy="-8" r="13" fill="#2b2b2b"/><circle cx="164" cy="-8" r="5" fill="#ccc"/></g>`

export default svgLevel({
  id: 172,
  chapter: 'forest',
  title: 'fireTower',
  parTimeSec: 96,
  scene: ({ diff, anim, extra }) => {
    const flying = anim({ id: 'heli', type: 'path', points: [[0, 0], [120, 10], [0, 20]], period: 9 }, fireHelicopter(556, 92))
    const light = `<circle cx="360" cy="116" r="5" fill="#e63946"/>`
    let forest = ''
    for (let x = -20; x < 820; x += 40) forest += pine(x, 330, 0.7 + ((x / 40) % 3) * 0.08, x % 3 ? '#2f7d55' : '#24684a')
    return (
      `<rect width="800" height="500" fill="#d6e9f3"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(420, 50, 0.5)) +
      `<path d="M0 270L120 150L240 250L380 130L540 260L680 160L800 240V330H0Z" fill="#9aa5b1"/>` +
      forest + `<rect y="330" width="800" height="170" fill="#7f9a52"/>` +
      diff(548, 108, 56, fireHelicopter(556, 92), flying, 'heli') +
      // Lookout tower: the ranger's hat, the flag; the radio mast with its light
      `<path d="M196 340L214 130M304 340L286 130M200 290H300M204 230H296M208 170H292M200 290L296 230L204 230L292 170" stroke="#8a5a33" stroke-width="5" fill="none"/>` +
      `<rect x="190" y="90" width="120" height="42" fill="#8a5a33"/><rect x="196" y="96" width="108" height="22" fill="#bde3f2"/>` +
      `<circle cx="232" cy="112" r="7" fill="#e0b48a"/><rect x="226" y="118" width="12" height="2" fill="#2b2b2b"/>` +
      diff(232, 102, 22, `<path d="M222 106h20l-3 -3v-5h-14v5Z" fill="#c9a26b"/>`, `<path d="M222 106h20l-3 -3v-5h-14v5Z" fill="#3f6f4a"/>`) +
      `<path d="M180 92L250 62L320 92Z" fill="#5e3b1a"/><path d="M262 62V38" stroke="#3d4a55" stroke-width="2"/>` +
      diff(272, 46, 22, `<rect x="262" y="38" width="20" height="13" fill="#e63946"/><path d="M266 44h12" stroke="#ffffff" stroke-width="2"/>`, '') +
      `<path d="M352 340L360 120L368 340M354 290h12M356 240h8M357 190h6" stroke="#5c677d" stroke-width="3" fill="none"/>` +
      diff(360, 116, 22, anim({ type: 'blink', duty: 0.5, period: 1 }, light), light) +
      // Weather station
      `<path d="M520 340V230" stroke="#5c677d" stroke-width="3"/><rect x="510" y="280" width="20" height="16" fill="#f4f1e8" stroke="#5c677d" stroke-width="2"/>` +
      diff(520, 226, 22, anim({ type: 'rotate', pivot: [520, 226], period: 1 }, anemometer(520, 226)), anemometer(520, 226)) +
      // Lynx in its pine, wolf on its rock
      pine(740, 330, 1.4, '#24684a') + `<path d="M690 214H748" stroke="#6b4a2b" stroke-width="6"/>` +
      diff(718, 200, 30, lynx(720, 212), '') +
      `<path d="M584 362Q596 324 630 322Q664 324 674 362Z" fill="#8d99ae"/>` +
      wolf(620, 328) + diff(640, 296, 24, wolfHead(620, 328, true), wolfHead(620, 328, false)) +
      // Fire danger sign, trail sign, hiker, ranger pickup
      dangerSign(90, 330) + diff(90, 314, 26, dangerArrow(90, 330, -55), dangerArrow(90, 330, 60)) +
      `<path d="M440 432V384" stroke="#6b4a2b" stroke-width="4"/>` +
      diff(440, 394, 24, `<path d="M422 386h30l8 8l-8 8h-30Z" fill="#f4d35e"/>`, `<path d="M458 386h-30l-8 8l8 8h30Z" fill="#f4d35e"/>`) +
      person(300, 488, '#ff006e', false, '#c68b5e', '#2b2b2b') +
      diff(288, 446, 22, `<rect x="279" y="430" width="14" height="30" rx="4" fill="#3a86ff"/>`, `<rect x="279" y="430" width="14" height="30" rx="4" fill="#fb8500"/>`) +
      rangerTruck(560, 486) +
      diff(694, 456, 22, `<circle cx="694" cy="456" r="10" fill="#ffd23f"/><path d="M694 448l-6 10h12Z" fill="#3f6f4a"/>`, `<circle cx="694" cy="456" r="10" fill="#f4f1e8"/><path d="M694 448l-6 10h12Z" fill="#3f6f4a"/>`) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['pineCone', 40, 480],
        ['mushroom', 160, 484],
        ['fern', 380, 486],
        ['leafPile', 230, 486],
        ['bird', 480, 340],
      ])
    )
  },
})
