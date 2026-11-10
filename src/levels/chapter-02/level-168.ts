// Snowy avenue: a winter street among the city's ten hardest (hidden until released, levels/upcoming.ts). New in
// the city: a snowplough with its blade and beacon, a car under snow, a bus shelter with a poster, a lamp post
// with a wreath, a shop with a garland and a mitten sign, a roasted chestnut cart, a man shovelling, a child with
// a snowball and a dog in a jumper. Motion differences: the plough's beacon flashes and the chestnut cart smokes
// only on picture A; part of the garland twinkles only on B.
import { building, car, FACADES, person } from './shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'

/** Snowplough facing right without its blade and beacon; (x, y) = ground under its back. Bounds: x from 0 to +146, y from −76 to 0. */
const plough = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="0" y="-60" width="100" height="46" rx="4" fill="#fb8500"/><path d="M6 -60L20 -74H80L94 -60Z" fill="#c96a1f"/>` +
  `<path d="M100 -14V-76H128L142 -50V-14Z" fill="#fb8500"/><path d="M106 -70H126L136 -50H106Z" fill="#bde3f2"/><rect x="0" y="-20" width="146" height="6" fill="#3d4a55"/>` +
  `<path d="M10 -40H90" stroke="#ffffff" stroke-width="4" stroke-dasharray="10 8"/>` +
  `<circle cx="30" cy="-8" r="12" fill="#2b2b2b"/><circle cx="120" cy="-8" r="12" fill="#2b2b2b"/></g>`

/** Plough blade in front of a plough at (x, y). Bounds: x from +146 to +178, y from −42 to −2. */
const blade = (x: number, y: number, color: string) =>
  `<path d="M${x + 142} ${y - 30}H${x + 152}" stroke="#3d4a55" stroke-width="5"/><path d="M${x + 152} ${y - 42}L${x + 176} ${y - 34}L${x + 178} ${y - 2}L${x + 150} ${y - 10}Z" fill="${color}"/>`

/** Chestnut cart with its stove pipe; (x, y) = ground center. Bounds: x ±36, y from −86 to 0. */
const chestnutCart = (x: number, y: number) =>
  `<rect x="${x + 10}" y="${y - 86}" width="8" height="34" fill="#3d4a55"/><rect x="${x - 34}" y="${y - 54}" width="68" height="36" rx="4" fill="#8e2c27"/>` +
  `<ellipse cx="${x - 6}" cy="${y - 56}" rx="22" ry="5" fill="#2b2b2b"/><g fill="#7a4a24"><circle cx="${x - 14}" cy="${y - 58}" r="3"/><circle cx="${x - 6}" cy="${y - 59}" r="3"/><circle cx="${x + 2}" cy="${y - 58}" r="3"/></g>` +
  `<circle cx="${x - 22}" cy="${y - 10}" r="9" fill="#2b2b2b"/><circle cx="${x + 22}" cy="${y - 10}" r="9" fill="#2b2b2b"/>`

/** Beanie on a person at (x, y), with or without its pompom. Bounds: x ±10, y from −72 to −56. */
const beanie = (x: number, y: number, pompom: boolean) =>
  `<path d="M${x - 9} ${y - 57}a9 9 0 0 1 18 0Z" fill="#e63946"/>` + (pompom ? `<circle cx="${x}" cy="${y - 68}" r="4" fill="#ffffff"/>` : '')

/** Dog in a jumper (jumper separate), faces right; (x, y) = feet. Bounds: x ±22, y from −26 to 0. */
const dog = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-12 -10v10M-4 -10v10M4 -10v10M12 -10v10" stroke="#c48a5a" stroke-width="4"/>` +
  `<rect x="-16" y="-20" width="32" height="12" rx="6" fill="#c48a5a"/><path d="M-16 -16l-6 -8" stroke="#c48a5a" stroke-width="4" stroke-linecap="round"/>` +
  `<circle cx="16" cy="-20" r="7" fill="#c48a5a"/><path d="M12 -26l-2 -5l6 2Z" fill="#8a5a3b"/><circle cx="19" cy="-21" r="1.5" fill="#222"/></g>`
const jumper = (x: number, y: number, color: string) => `<rect x="${x - 10}" y="${y - 21}" width="20" height="13" rx="4" fill="${color}"/>`

/** Garland bulbs along a wire from x0 to x1 at height y; every third bulb a different colour. */
const garland = (x0: number, x1: number, y: number) => {
  let s = `<path d="M${x0} ${y}Q${(x0 + x1) / 2} ${y + 10} ${x1} ${y}" stroke="#2f5a3a" stroke-width="2" fill="none"/>`
  for (let x = x0 + 8, i = 0; x < x1; x += 16, i++) s += `<circle cx="${x}" cy="${y + 4}" r="3.5" fill="${['#ffd23f', '#e63946', '#3a86ff'][i % 3]}"/>`
  return s
}

export default svgLevel({
  id: 168,
  chapter: 'city',
  title: 'snowyAvenue',
  parTimeSec: 96,
  scene: ({ diff, anim, rand, extra }) => {
    const smoke = `<circle cx="728" cy="240" r="8" fill="#e9edf2"/><circle cx="738" cy="228" r="10" fill="#e9edf2" fill-opacity="0.8"/>`
    const twinkle = `<g fill="#ffd23f"><circle cx="504" cy="303" r="3.5"/><circle cx="520" cy="304" r="3.5"/><circle cx="536" cy="303" r="3.5"/></g>`
    let houses = ''
    let x = 0
    for (const [w, h] of [[170, 220], [150, 250], [120, 230], [200, 240], [160, 260]]) {
      houses += building(x, 320, w, h, FACADES[Math.floor(rand() * FACADES.length)], '#ffe8a3') + `<rect x="${x - 4}" y="${320 - h - 12}" width="${w + 8}" height="8" fill="#ffffff"/>`
      x += w
    }
    let flakes = ''
    for (let i = 0; i < 60; i++) flakes += `<circle cx="${(rand() * 800).toFixed(1)}" cy="${(rand() * 300).toFixed(1)}" r="${(1 + rand() * 1.5).toFixed(1)}" fill="#ffffff"/>`
    return (
      `<rect width="800" height="500" fill="#c9d6e3"/>` + houses +
      // Shop with its garland and mitten sign
      `<rect x="420" y="250" width="200" height="70" fill="#5e3b1a"/><rect x="434" y="262" width="80" height="50" fill="#ffe8a3"/><rect x="528" y="262" width="40" height="58" fill="#8a5a33"/>` +
      `<rect x="414" y="290" width="212" height="8" fill="#2a9d8f"/>` + garland(420, 500, 296) + garland(540, 620, 296) +
      `<path d="M500 296Q520 306 540 296" stroke="#2f5a3a" stroke-width="2" fill="none"/>` +
      diff(520, 304, 24, twinkle, anim({ type: 'blink', duty: 0.5, period: 0.8 }, twinkle)) +
      `<path d="M630 240h22" stroke="#3d4a55" stroke-width="3"/>` +
      diff(652, 253, 22, `<rect x="640" y="240" width="24" height="26" rx="3" fill="#ffffff"/><path d="M646 262V250a6 6 0 0 1 12 0V262ZM644 252a3 3 0 0 1 4 -4" fill="#e63946" stroke="#e63946" stroke-width="1"/>`, `<rect x="640" y="240" width="24" height="26" rx="3" fill="#ffffff"/><path d="M646 262V250a6 6 0 0 1 12 0V262ZM644 252a3 3 0 0 1 4 -4" fill="#3a86ff" stroke="#3a86ff" stroke-width="1"/>`) +
      // Upper sidewalk: bus shelter with its poster and icicle, the lamp with its wreath, the chestnut cart
      `<rect y="320" width="800" height="30" fill="#f4f6f8"/>` +
      `<rect x="20" y="252" width="124" height="8" fill="#5c677d"/><rect x="24" y="260" width="4" height="70" fill="#5c677d"/><rect x="136" y="260" width="4" height="70" fill="#5c677d"/>` +
      `<rect x="30" y="262" width="104" height="58" fill="#bde3f2" fill-opacity="0.5"/><rect x="20" y="246" width="124" height="6" fill="#ffffff"/>` +
      diff(60, 290, 24, `<rect x="44" y="270" width="32" height="40" fill="#8338ec"/><circle cx="60" cy="284" r="7" fill="#ffd23f"/>`, `<rect x="44" y="270" width="32" height="40" fill="#2a9d8f"/><circle cx="60" cy="284" r="7" fill="#ffd23f"/>`) +
      `<path d="M30 260l2 8l2 -8M60 260l2 10l2 -10M100 260l2 7l2 -7" fill="#cfe8f7"/>` +
      diff(138, 266, 22, `<path d="M134 260l3 14l3 -14Z" fill="#cfe8f7"/>`, '') +
      person(104, 342, '#3f8f3a') +
      `<rect x="357" y="240" width="6" height="104" fill="#3d4a55"/><path d="M350 240h20l-4 -16h-12Z" fill="#3d4a55"/><circle cx="360" cy="230" r="5" fill="#ffd166"/>` +
      `<circle cx="360" cy="272" r="12" fill="none" stroke="#2f7d55" stroke-width="7"/>` +
      diff(360, 284, 22, `<path d="M360 284l-8 -4v8ZM360 284l8 -4v8Z" fill="#e63946"/>`, `<path d="M360 284l-8 -4v8ZM360 284l8 -4v8Z" fill="#ffd23f"/>`) +
      chestnutCart(720, 344) + diff(733, 236, 26, anim({ type: 'bob', dx: 3, dy: -5, period: 1.6 }, smoke), smoke) +
      person(676, 344, '#c0392b', false, '#e0b48a', '#5a3d2b') +
      // Road: the plough, the car under snow
      `<rect y="350" width="800" height="100" fill="#8d959e"/><path d="M0 350h800M0 450h800" stroke="#ffffff" stroke-width="8"/><path d="M0 400H800" stroke="#ffffff" stroke-width="3" stroke-dasharray="26 20"/>` +
      plough(110, 420) + diff(242, 338, 22, anim({ type: 'blink', duty: 0.5, period: 0.7 }, `<rect x="236" y="334" width="12" height="10" rx="3" fill="#ffb703"/>`), `<rect x="236" y="334" width="12" height="10" rx="3" fill="#ffb703"/>`) +
      diff(270, 398, 28, blade(110, 420, '#ffd23f'), blade(110, 420, '#e63946')) +
      car(560, 446, '#3a86ff') + `<path d="M520 434q10 -6 20 -2M584 432q10 -4 18 2" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>` +
      diff(560, 402, 26, `<ellipse cx="562" cy="406" rx="22" ry="8" fill="#ffffff"/>`, '') +
      // Lower sidewalk: the man shovelling, the child with a snowball, the dog in its jumper
      `<rect y="450" width="800" height="50" fill="#f4f6f8"/>` +
      person(120, 490, '#1d5fbf', false, '#e0b48a', '#5a3d2b') + `<path d="M132 452L160 486M154 482h14l-2 8h-12Z" stroke="#6b4a2b" stroke-width="3" fill="#8d99ae"/>` +
      diff(120, 426, 22, beanie(120, 490, true), beanie(120, 490, false)) +
      person(360, 492, '#ffb703', false, '#c68b5e', '#2b2b2b') + `<path d="M370 448l12 -10" stroke="#ffb703" stroke-width="5" stroke-linecap="round"/>` +
      diff(386, 434, 22, `<circle cx="386" cy="434" r="6" fill="#ffffff" stroke="#c9d6e3" stroke-width="1.5"/>`, '') +
      dog(462, 490) + diff(462, 476, 22, jumper(462, 490, '#e63946'), jumper(462, 490, '#8ac926')) +
      flakes +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['bin', 180, 344],
        ['hydrant', 600, 346],
        ['coffeeCup', 300, 344],
        ['pigeon', 760, 480],
        ['shoppingBag', 640, 492, '#e63946'],
      ])
    )
  },
})
