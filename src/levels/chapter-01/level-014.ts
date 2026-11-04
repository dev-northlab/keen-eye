// Motion difference: the swing is out of sync between the pictures (different phase).
import { extras } from '../extras.ts'
import type { AnimSpec } from '../helpers.ts'
import { bird, butterfly } from '../chapter-03/shapes.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, flower, FLOWER_COLORS, flowerPot, grass, pick, stones, sun, wateringCan } from '../shapes.ts'

const PIVOT: [number, number] = [300, 228]

/** Ropes from the branch and the seat; hangs 100 below PIVOT. */
const swingSeat =
  `<path d="M286 228V326M314 228V326" stroke="#6b4f3a" stroke-width="3"/>` +
  `<rect x="276" y="324" width="48" height="9" rx="3" fill="#c1440e"/>`

const swingSpec = (phase: number): AnimSpec => ({ id: 'swing', type: 'sway', angle: 24, pivot: PIVOT, period: 2.6, phase })

/** Big oak; the swing branch passes through PIVOT. */
const oak =
  `<rect x="120" y="190" width="44" height="190" rx="10" fill="#8a5a33"/>` +
  `<path d="M150 236Q240 220 330 224" stroke="#8a5a33" stroke-width="16" fill="none" stroke-linecap="round"/>` +
  `<circle cx="90" cy="160" r="70" fill="#4c9a3f"/><circle cx="210" cy="150" r="80" fill="#4c9a3f"/>` +
  `<circle cx="150" cy="95" r="80" fill="#5bb04a"/><circle cx="290" cy="185" r="38" fill="#5bb04a"/>`

/** Kite with a tail; (x, y) = center. Bounds: x ±26, y from −32 to +40. */
const kite = (x: number, y: number) =>
  `<path d="M${x} ${y + 30}q-8 6 0 10" stroke="#555" stroke-width="2" fill="none"/>` +
  `<path d="M${x} ${y - 32}L${x + 24} ${y}L${x} ${y + 30}L${x - 24} ${y}Z" fill="#ff006e"/>` +
  `<path d="M${x} ${y - 32}V${y + 30}M${x - 24} ${y}H${x + 24}" stroke="#ffbe0b" stroke-width="2"/>`

/** Dog house; (x, y) = bottom center. Roof bounds: x ±52, y from −100 to −58. */
const dogHouse = (x: number, y: number, roof: string) =>
  `<rect x="${x - 42}" y="${y - 64}" width="84" height="64" fill="#e9c46a"/>` +
  `<path d="M${x - 16} ${y}V${y - 26}Q${x} ${y - 44} ${x + 16} ${y - 26}V${y}Z" fill="#3b2a20"/>` +
  `<path d="M${x - 52} ${y - 58}L${x} ${y - 100}L${x + 52} ${y - 58}Z" fill="${roof}"/>`

/** (x, y) = shoulders center. Bounds: x ±22, y from 0 to +40. */
const shirt = (x: number, y: number, color: string) =>
  `<path d="M${x - 14} ${y}L${x - 22} ${y + 10}L${x - 14} ${y + 16}V${y + 40}H${x + 14}V${y + 16}L${x + 22} ${y + 10}L${x + 14} ${y}Z" fill="${color}"/>`

export default svgLevel({
  id: 14,
  chapter: 'farm',
  title: 'swing',
  parTimeSec: 90,
  scene: ({ diff, anim, rand, extra }) => {
    let tufts = ''
    for (let i = 0; i < 12; i++) tufts += grass(10 + rand() * 780, 380 + rand() * 115)
    let flowers = ''
    for (let i = 0; i < 8; i++) {
      const x = 20 + rand() * 300
      const y = 470 + rand() * 25
      const period = 2.5 + rand()
      flowers += anim({ type: 'sway', angle: 6, pivot: [x, y], period, phase: rand() }, flower(x, y, pick(rand, FLOWER_COLORS)))
    }

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(440, 70) +
      anim({ type: 'path', points: [[0, 0], [-60, 0]], period: 22 }, cloud(520, 120, 0.7)) +
      diff(620, 112, 44, kite(620, 108), '') +
      `<ellipse cx="500" cy="365" rx="400" ry="60" fill="#a6d985"/>` +
      `<rect y="360" width="800" height="140" fill="#90cb69"/>` +
      oak +
      diff(300, 280, 62, anim(swingSpec(0), swingSeat), anim(swingSpec(0.3), swingSeat), 'swing') +
      // Laundry line
      `<rect x="640" y="230" width="6" height="150" fill="#8a5a33"/><rect x="774" y="230" width="6" height="150" fill="#8a5a33"/>` +
      `<path d="M643 240Q710 256 777 240" stroke="#555" stroke-width="2" fill="none"/>` +
      anim({ type: 'sway', angle: 5, pivot: [670, 246], period: 2.2 }, shirt(670, 246, '#4dabf7')) +
      diff(712, 268, 32, shirt(712, 250, '#ffd166'), shirt(712, 250, '#e63946')) +
      anim({ type: 'sway', angle: 5, pivot: [752, 246], period: 2.4, phase: 0.3 }, shirt(752, 246, '#8ac926')) +
      tufts +
      diff(560, 361, 58, dogHouse(560, 440, '#b5523b'), dogHouse(560, 440, '#3a86ff')) +
      diff(430, 455, 26, `<circle cx="430" cy="455" r="16" fill="#e63946"/><path d="M414 455H446" stroke="#fff" stroke-width="3"/>`, `<circle cx="430" cy="455" r="16" fill="#3a86ff"/><path d="M414 455H446" stroke="#fff" stroke-width="3"/>`) +
      flowers +
      bird(643, 230) +
      butterfly(450, 380) +
      stones(650, 470) +
      flowerPot(240, 420) +
      wateringCan(80, 385) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['ladybug', 90, 427],
        ['mushroom', 706, 406],
        ['chick', 326, 431],
        ['grass', 510, 471],
        ['horseshoe', 454, 333],
        ['eggNest', 183, 402],
        ['butterfly', 615, 460],
        ['butterfly', 729, 99],
        ['cloud', 304, 71],
        ['birds', 64, 277],
      ])
    )
  },
})
