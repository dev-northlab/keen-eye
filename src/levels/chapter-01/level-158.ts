// Rabbit farm: a cottage garden among the farm's ten hardest (hidden until released, levels/upcoming.ts). New
// on the farm: a two-storey rabbit hutch with its water bottle, a rabbit run, carrot and cabbage beds, a garden
// gnome, a bird bath, a bee hotel, a rain barrel, a cottage with a wind chime and a tortoise. Motion differences:
// a rabbit hops in the run only on picture A; the wind chime swings and the tortoise walks only on B.
import { hedgehog } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { carrot, cloud, flower, FLOWER_COLORS, pick } from '../shapes.ts'

/** Rabbit sitting, without its ears (`ears`), faces right; (x, y) = feet. Bounds: x ±14, y from −22 to 0. */
const bunny = (x: number, y: number, fur: string) =>
  `<g transform="translate(${x} ${y})" fill="${fur}"><circle cx="-11" cy="-8" r="4" fill="#ffffff"/><ellipse cy="-9" rx="12" ry="9"/>` +
  `<circle cx="8" cy="-16" r="6"/><circle cx="11" cy="-17" r="1.2" fill="#222"/><circle cx="13.5" cy="-15" r="1" fill="#e48aa0"/></g>`

/** A rabbit's ears for a rabbit at (x, y): both up, or one flopped. Bounds: x from +2 to +16, y from −32 to −20. */
const ears = (x: number, y: number, fur: string, flopped = false) =>
  `<ellipse cx="${x + 5}" cy="${y - 26}" rx="2.5" ry="7" fill="${fur}"/>` +
  (flopped
    ? `<ellipse cx="${x + 12}" cy="${y - 22}" rx="2.5" ry="7" fill="${fur}" transform="rotate(70 ${x + 12} ${y - 22})"/>`
    : `<ellipse cx="${x + 10}" cy="${y - 26}" rx="2.5" ry="7" fill="${fur}" transform="rotate(15 ${x + 10} ${y - 26})"/>`)

/** Whole rabbit with its ears up; (x, y) = feet. Bounds: x ±14, y from −33 to 0. */
const rabbit = (x: number, y: number, fur: string) => bunny(x, y, fur) + ears(x, y, fur)

/** Garden gnome without its hat; (x, y) = feet. Bounds: x ±11, y from −30 to 0. */
const gnome = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-8" y="-12" width="16" height="12" rx="3" fill="#3a86ff"/><rect x="-9" y="-3" width="7" height="3" fill="#5e3b1a"/><rect x="2" y="-3" width="7" height="3" fill="#5e3b1a"/>` +
  `<circle cy="-18" r="7" fill="#f2d29b"/><path d="M-7 -16q7 14 14 0q-3 6 -7 6q-4 0 -7 -6Z" fill="#f4f1e8"/><circle cx="0" cy="-17" r="2" fill="#e48aa0"/></g>`

/** Pointed gnome hat on a gnome at (x, y). Bounds: x ±9, y from −44 to −22. */
const gnomeHat = (x: number, y: number, color: string) => `<path d="M${x - 9} ${y - 22}L${x + 2} ${y - 44}L${x + 9} ${y - 22}Z" fill="${color}"/>`

/** Wind chime hanging from (x, y). Bounds: x ±10, y from 0 to +34. */
const chime = (x: number, y: number) =>
  `<path d="M${x} ${y}v8" stroke="#8d99ae" stroke-width="1.2"/><rect x="${x - 10}" y="${y + 8}" width="20" height="3" rx="1.5" fill="#a0703f"/>` +
  [-7, -2, 3, 8].map((d, i) => `<rect x="${x + d - 1.5}" y="${y + 12}" width="3" height="${14 + (i % 2) * 6}" fill="#c9d1d9"/>`).join('') +
  `<circle cx="${x}" cy="${y + 30}" r="3" fill="#3a86ff"/>`

/** Tortoise, faces right; (x, y) = feet. Bounds: x from −22 to +24, y from −22 to 0. */
const tortoise = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-14 0v-6M10 0v-6" stroke="#7d8f4a" stroke-width="5"/><ellipse cx="18" cy="-8" rx="6" ry="5" fill="#7d8f4a"/>` +
  `<circle cx="20" cy="-9" r="1" fill="#222"/><path d="M-20 -4Q-20 -22 0 -22Q20 -22 20 -4Z" fill="#8a6a3a"/>` +
  `<path d="M-10 -6l4 -10h12l4 10M0 -22v6" stroke="#5e4630" stroke-width="2" fill="none"/></g>`

/** Cabbage; (x, y) = center. Bounds: radius 15. */
const cabbage = (x: number, y: number, color: string) =>
  `<circle cx="${x}" cy="${y}" r="14" fill="${color}"/><path d="M${x - 9} ${y - 4}q9 -8 18 0M${x - 6} ${y + 4}q6 -6 12 0" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2" fill="none"/>`

export default svgLevel({
  id: 158,
  chapter: 'farm',
  title: 'rabbitFarm',
  parTimeSec: 88,
  scene: ({ diff, anim, rand, extra }) => {
    const hopping = anim({ id: 'hop', type: 'path', points: [[0, 0], [25, -12], [50, 0]], period: 1.6 }, rabbit(120, 404, '#c9a27a'))
    const walking = anim({ id: 'tortoise', type: 'path', points: [[0, 0], [60, 0]], period: 14 }, tortoise(650, 476))
    let flowers = ''
    for (const x of [586, 612, 750, 772]) flowers += flower(x, 352, pick(rand, FLOWER_COLORS))
    let mesh = ''
    for (let x = 24; x <= 300; x += 12) mesh += `<path d="M${x} 340V430" stroke="#c9d1d9" stroke-width="1"/>`
    return (
      `<rect width="800" height="500" fill="#d3ecf7"/>` +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 26 }, cloud(300, 70, 0.6)) +
      `<path d="M0 230Q200 196 420 226T800 210V340H0Z" fill="#a8d488"/><rect y="320" width="800" height="180" fill="#8fcf6a"/>` +
      // Hutch: the rabbit upstairs, the water bottle
      `<path d="M38 300V334M192 300V334" stroke="#6b4a2b" stroke-width="6"/>` +
      `<rect x="30" y="198" width="170" height="104" fill="#a0703f"/><rect x="40" y="206" width="104" height="44" fill="#4a3f36"/>` +
      bunny(90, 248, '#f4f1e8') + diff(96, 226, 22, ears(90, 248, '#f4f1e8'), ears(90, 248, '#f4f1e8', true)) +
      `<path d="M52 206V250M64 206V250M76 206V250M88 206V250M100 206V250M112 206V250M124 206V250M136 206V250M40 220H144M40 236H144" stroke="#c9d1d9" stroke-width="1"/>` +
      `<rect x="150" y="206" width="42" height="44" fill="#8a5a33"/><rect x="40" y="256" width="152" height="40" fill="#8a5a33"/><circle cx="184" cy="276" r="3" fill="#ffd23f"/>` +
      `<path d="M22 200L115 178L208 200Z" fill="#6b3a2a"/>` +
      diff(208, 234, 22, `<rect x="202" y="220" width="10" height="24" rx="3" fill="#bde3f2" stroke="#3a86ff" stroke-width="1.5"/><path d="M204 244l-6 6" stroke="#8d99ae" stroke-width="2"/>`, '') +
      // The run with its rabbits
      rabbit(180, 424, '#7d5230') +
      diff(120, 386, 26, hopping, rabbit(120, 404, '#c9a27a'), 'hop') +
      diff(240, 394, 22, rabbit(240, 410, '#2b2b2b'), '') +
      `<rect x="20" y="340" width="284" height="90" fill="none" stroke="#a0703f" stroke-width="4"/>` + mesh +
      // Garden: gnome, bee hotel, bird bath, beds, the fork
      `<rect x="318" y="392" width="200" height="34" rx="6" fill="#7a5230"/><rect x="318" y="440" width="200" height="40" rx="6" fill="#7a5230"/>` +
      [338, 360, 404, 426, 448, 470, 492].map((x) => carrot(x, 412)).join('') + diff(382, 404, 22, carrot(382, 412), '') +
      cabbage(340, 460, '#7cc45a') + cabbage(374, 460, '#7cc45a') + cabbage(408, 460, '#7cc45a') + cabbage(442, 460, '#7cc45a') +
      diff(476, 460, 22, cabbage(476, 460, '#7cc45a'), cabbage(476, 460, '#8e5ca8')) +
      gnome(330, 360) + diff(331, 328, 22, gnomeHat(330, 360, '#e63946'), gnomeHat(330, 360, '#3f8f3a')) +
      `<path d="M400 340V292" stroke="#6b4a2b" stroke-width="4"/><rect x="386" y="262" width="28" height="30" fill="#c68b4e"/><path d="M384 264L400 252L416 264Z" fill="#8e2c27"/>` +
      `<g fill="#5e3b1a"><circle cx="393" cy="270" r="2.2"/><circle cx="401" cy="270" r="2.2"/><circle cx="409" cy="270" r="2.2"/><circle cx="393" cy="279" r="2.2"/><circle cx="401" cy="279" r="2.2"/><circle cx="409" cy="279" r="2.2"/><circle cx="397" cy="287" r="2.2"/><circle cx="405" cy="287" r="2.2"/></g>` +
      `<path d="M444 350h12l-2 -20h-8Z" fill="#b4bec5"/><ellipse cx="450" cy="328" rx="22" ry="6" fill="#b4bec5"/><ellipse cx="450" cy="327" rx="16" ry="3.5" fill="#6cc3e8"/>` +
      diff(462, 314, 22, `<g transform="translate(464 326)"><ellipse cy="-6" rx="7" ry="5" fill="#3a86ff"/><circle cx="5" cy="-11" r="4" fill="#3a86ff"/><path d="M8 -11l3 1l-3 1Z" fill="#ffb703"/><path d="M-6 -6l-5 -3" stroke="#3a86ff" stroke-width="3"/></g>`, '') +
      diff(524, 398, 26, `<path d="M520 420L527 378" stroke="#a0703f" stroke-width="4"/><path d="M519 380h16" stroke="#a0703f" stroke-width="4" stroke-linecap="round"/><path d="M514 420h12" stroke="#6c757d" stroke-width="4"/>`, '') +
      // Cottage with the rain barrel, the porch and its wind chime
      `<rect x="570" y="200" width="220" height="140" fill="#f4f1e8"/><path d="M556 206L680 140L804 206Z" fill="#a8452e"/>` +
      `<path d="M580 206L680 152M620 206L680 172M740 206L680 172M780 206L680 152" stroke="#8e3a26" stroke-width="2"/>` +
      `<rect x="696" y="236" width="40" height="40" fill="#bde3f2" stroke="#7a5230" stroke-width="4"/><path d="M716 236v40M696 256h40" stroke="#7a5230" stroke-width="3"/>` +
      `<rect x="626" y="270" width="34" height="70" rx="3" fill="#3f8f3a"/><path d="M590 246H680L672 236H598Z" fill="#7a5230"/><path d="M596 246V340M674 246V340" stroke="#7a5230" stroke-width="4"/>` +
      diff(612, 264, 26, chime(612, 246), anim({ type: 'sway', angle: 14, pivot: [612, 246], period: 1.6 }, chime(612, 246))) +
      `<path d="M566 206V300" stroke="#8d99ae" stroke-width="5"/><rect x="532" y="300" width="34" height="40" rx="4" fill="#3f6f4a"/><path d="M532 312H566M532 328H566" stroke="#2f5a3a" stroke-width="2"/>` +
      diff(549, 296, 22, `<ellipse cx="549" cy="300" rx="19" ry="5" fill="#2f5a3a"/><rect x="545" y="292" width="8" height="5" rx="2" fill="#2f5a3a"/>`, '') +
      flowers + hedgehog(744, 470) +
      `<g transform="translate(704 340)"><ellipse cy="-6" rx="14" ry="6" fill="#6c757d"/><circle cx="-12" cy="-9" r="5" fill="#6c757d"/><path d="M-15 -14l1 -4l3 3ZM-9 -14l1 -4l2 4Z" fill="#6c757d"/><path d="M12 -6q8 2 4 -6" stroke="#6c757d" stroke-width="3" fill="none"/></g>` +
      diff(650, 462, 28, tortoise(650, 476), walking, 'tortoise') +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['snail', 300, 474],
        ['ladybug', 560, 474],
        ['mushroom', 40, 480],
        ['butterfly', 470, 250, '#ff9f43'],
        ['stones', 230, 486],
      ])
    )
  },
})
