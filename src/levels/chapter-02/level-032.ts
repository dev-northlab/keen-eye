// Motion differences: the boat sails faster on picture B; the gull flies the other way round on B.
import { bird, butterfly } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { ball, car, cityTree, cloud, coffeeCup, lampHead, lampPost, person, skateboard, skyline, sun } from './shapes.ts'
import { duck } from '../shapes.ts'

/** Small boat, faces right; (x, y) = waterline center. Bounds: x ±30, y from −44 to +8. */
const boat = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-30 -8h60l-8 16h-44Z" fill="${color}"/><rect x="-10" y="-26" width="22" height="18" rx="3" fill="#f4f1de"/>` +
  `<rect x="-6" y="-22" width="8" height="8" fill="#bde3f2"/><rect x="14" y="-44" width="4" height="36" fill="#3d4a55"/></g>`

/** Seagull, faces right; (x, y) = body center. Bounds: x ±16, y from −8 to +6. */
const gull = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-16 -2q8 -8 16 0q8 -8 16 0" stroke="#fff" stroke-width="3" fill="none"/>` +
  `<ellipse rx="7" ry="4" fill="#fff"/><circle cx="7" cy="-3" r="3" fill="#fff"/><path d="M9 -3l5 1l-5 2Z" fill="#f4a261"/></g>`

/** Buoy; (x, y) = waterline center. Bounds: x ±10, y from −20 to +8. */
const buoy = (x: number, y: number, color: string) =>
  `<path d="M${x - 8} ${y + 8}l4 -24h8l4 24Z" fill="${color}"/><circle cx="${x}" cy="${y - 16}" r="4" fill="#ffd166"/>`

/** Fisherman sitting on the bank, faces right; (x, y) = seat. The hat is separate. Bounds: x from −12 to +40, y from −48 to +16. */
const fisher = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-10" y="-30" width="20" height="30" rx="4" fill="#2a9d8f"/><rect x="0" y="-8" width="18" height="8" rx="3" fill="#3d4a55"/>` +
  `<rect x="14" y="-2" width="6" height="18" fill="#3d4a55"/><circle cy="-38" r="8" fill="#f2d29b"/>` +
  `<path d="M8 -20l32 -28" stroke="#6b4f3a" stroke-width="2"/><path d="M40 -48v52" stroke="#999" stroke-width="1"/></g>`
/** Hat of the fisherman at (x, y). Bounds: x ±12, y from −52 to −42. */
const hat = (x: number, y: number) => `<path d="M${x - 12} ${y - 43}h24l-6 -4v-5h-12v5Z" fill="#ffb703"/>`

export default svgLevel({
  id: 32,
  chapter: 'city',
  title: 'bridge',
  parTimeSec: 110,
  scene: ({ diff, anim, rand, extra }) => {
    let ripples = ''
    for (let i = 0; i < 12; i++) ripples += `<path d="M${rand() * 760} ${420 + rand() * 70}h${20 + rand() * 30}" stroke="#a5dcf3" stroke-width="3" stroke-linecap="round"/>`
    const sailing = (period: number) => anim({ id: 'boat', type: 'path', points: [[0, 0], [260, 0]], period }, boat(120, 460, '#e63946'))
    const gliding = (reverse: boolean) =>
      anim({ id: 'gull', type: 'path', points: [[0, 0], [200, -16]], flipX: 300, period: 8, reverse }, gull(300, 120))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(700, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(150, 70, 0.8)) +
      skyline(rand, 260, '#c5cfdd') +
      diff(300, 120, 22, gliding(false), gliding(true), 'gull') +
      // Banks
      `<path d="M0 300Q120 280 200 300V420H0Z" fill="#8fca68"/><path d="M600 300Q700 280 800 300V420H600Z" fill="#8fca68"/>` +
      cityTree(60, 300, 1.2) +
      cityTree(740, 300, 1.1) +
      // River
      `<rect y="400" width="800" height="100" fill="#4fa9d8"/><rect y="410" width="800" height="90" fill="#63b8e3"/>` +
      `<path d="M0 400Q100 380 200 400T400 400T600 400T800 400V410H0Z" fill="#63b8e3"/>` +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, ripples) +
      // Bridge
      `<path d="M180 340Q400 200 620 340V360Q400 240 180 360Z" fill="#8d99ae"/>` +
      `<path d="M180 336Q400 196 620 336" stroke="#5c677d" stroke-width="4" fill="none"/>` +
      `<rect x="140" y="290" width="520" height="12" fill="#5c677d"/>` +
      `<path d="M160 290v-20M240 290v-20M320 290v-20M400 290v-20M480 290v-20M560 290v-20M640 290v-20M140 272h520" stroke="#5c677d" stroke-width="4"/>` +
      lampPost(260, 290) +
      diff(260, 190, 18, lampHead(260, 290), lampHead(260, 290, '#8ac926')) +
      lampPost(540, 290) +
      lampHead(540, 290) +
      diff(400, 271, 47, car(400, 290, '#ffb703'), car(400, 290, '#8338ec')) +
      person(660, 290, '#e63946', true) +
      // Bank with the fisherman
      fisher(60, 404) +
      diff(60, 357, 18, hat(60, 404), '') +
      diff(120, 442, 42, sailing(16), sailing(8), 'boat') +
      diff(700, 436, 18, buoy(700, 440, '#e63946'), buoy(700, 440, '#3a86ff')) +
      duck(560, 470) +
      diff(630, 464, 36, '', duck(626, 470)) +
      bird(190, 271) +
      ball(150, 330) +
      butterfly(720, 340) +
      skateboard(705, 300) +
      coffeeCup(125, 390) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['fish', 560, 423, '#ff6b8b'],
        ['fish', 483, 469, '#4dabf7'],
        ['birds', 587, 91],
        ['cloud', 60, 79],
        ['balloon', 474, 339, '#e63946'],
        ['horseshoe', 166, 344],
        ['eggNest', 686, 333],
        ['bee', 634, 380],
        ['ladybug', 739, 375],
        ['grass', 100, 317],
      ])
    )
  },
})
