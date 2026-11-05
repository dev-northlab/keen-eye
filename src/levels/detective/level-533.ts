// "The missing chickens", scene 3 — the vegetable garden, the girl in dungarees: a cabbage is nibbled, small cloven hoof prints
// cross the bed, the scarecrow lost its hat, a fence picket is knocked aslant, the watering can is
// tipped over and the sunflower is bent.
import { carrot, wateringCan } from '../shapes.ts'
import { detectiveLevel } from '../helpers.ts'
import { cloud, fence, grass, picket, sky, sun, tree } from './shapes.ts'
import { cabbage, hoof, rabbit, villageGirl } from './village.ts'

/** Sunflower by the fence: upright (A) or bent over (B); the stem below y 250 is drawn by the scene. Bounds: x 678–756, y 168–272. */
const sunflowerTop = (bent: boolean) => {
  const [hx, hy, stem] = bent ? [734, 252, 'M700 250Q706 226 730 238'] : [700, 190, 'M700 250V200']
  const petals = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6
    return `<ellipse cx="${(hx + Math.cos(a) * 15).toFixed(1)}" cy="${(hy + Math.sin(a) * 15).toFixed(1)}" rx="7" ry="4" transform="rotate(${i * 30} ${(hx + Math.cos(a) * 15).toFixed(1)} ${(hy + Math.sin(a) * 15).toFixed(1)})" fill="#ffc83d"/>`
  }).join('')
  return `<path d="${stem}" stroke="#4c9a3f" stroke-width="6" fill="none" stroke-linecap="round"/>${petals}<circle cx="${hx}" cy="${hy}" r="11" fill="#6b3f1d"/>`
}

/** Watering can, 1.6 times the farm one: standing (A) or tipped over in a puddle (B). Bounds: x 454–530, y 415–478. */
const can = (tipped: boolean) =>
  tipped
    ? `<ellipse cx="512" cy="470" rx="18" ry="5" fill="#9fd3f5"/><g transform="translate(486 446) rotate(80) scale(1.6)">${wateringCan(0, 0)}</g>`
    : `<g transform="translate(480 450) scale(1.6)">${wateringCan(0, 0)}</g>`

export default detectiveLevel({
  id: 533,
  case: 'chickens',
  title: 'chickensGarden',
  parTimeSec: 74,
  scene: ({ clue }) =>
    sky('#bfe6ff') +
    sun(110, 70) +
    cloud(330, 80) +
    cloud(560, 60, 0.8) +
    grass(260, '#7cc25a') +
    tree(200, 260) +
    tree(640, 260) +
    fence(0, 800, 260, '#f5ecd8', [394]) +
    clue('fenceBent', 413, 221, 47, picket(394, 260), `<g transform="rotate(18 402 260)">${picket(394, 260)}</g>`) +
    // The sunflower's stem below the bend
    `<path d="M700 330V250" stroke="#4c9a3f" stroke-width="6"/><path d="M700 300q-16 -6 -20 -18q14 0 20 12M700 284q16 -6 20 -18q-14 0 -20 12" fill="#5fae4b"/>` +
    clue('sunflowerBent', 717, 220, 66, sunflowerTop(false), sunflowerTop(true)) +
    // Beds: cabbages and carrots
    `<rect x="40" y="300" width="500" height="38" rx="8" fill="#8a5a33"/><rect x="40" y="374" width="380" height="46" rx="8" fill="#8a5a33"/>` +
    [80, 150, 220, 360, 430, 500].map((x) => cabbage(x, 332)).join('') +
    clue('cabbageNibbled', 290, 316, 26, cabbage(290, 332), cabbage(290, 332, true)) +
    Array.from({ length: 13 }, (_, i) => carrot(70 + i * 26, 400)).join('') +
    clue('hoofPrints', 158, 357, 38, '', hoof(130, 360) + hoof(158, 352) + hoof(186, 362)) +
    villageGirl(300, 496, 'overalls') +
    // The scarecrow
    `<path d="M600 300V470" stroke="#8a5a2b" stroke-width="8"/><path d="M556 336H644" stroke="#8a5a2b" stroke-width="7"/>` +
    `<path d="M580 322H620L630 392H570Z" fill="#5a8de0"/><path d="M580 322L556 344M620 322L644 344" stroke="#5a8de0" stroke-width="12" stroke-linecap="round"/>` +
    `<path d="M586 340h8v8h-8ZM604 360h8v8h-8Z" fill="#e86a5a"/>` +
    `<circle cx="600" cy="302" r="17" fill="#f2d39b"/><path d="M584 292q-6 6 -2 12M616 292q6 6 2 12M590 290l-2 -8M600 288v-8M610 290l2 -8" stroke="#e0b040" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="594" cy="300" r="2" fill="#2b2b38"/><circle cx="606" cy="300" r="2" fill="#2b2b38"/><path d="M594 309q6 4 12 0" stroke="#8a5a2b" stroke-width="2" fill="none"/>` +
    clue('scarecrowHat', 600, 276, 31, `<ellipse cx="600" cy="287" rx="26" ry="5" fill="#c9953f"/><path d="M586 287V266Q600 260 614 266V287Z" fill="#c9953f"/><path d="M586 280H614" stroke="#e5484d" stroke-width="4"/>`, '') +
    clue('wateringCanTipped', 490, 446, 50, can(false), can(true)) +
    rabbit(40, 482) +
    rabbit(720, 470),
})
