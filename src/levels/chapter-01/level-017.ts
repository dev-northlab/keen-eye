// Motion differences: the chimney smoke rises faster on picture B; the bird on the feeder hops only on B.
import { stump } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cat, fence, milkCan, stones, wheelbarrow } from '../shapes.ts'
import { level017Redesign } from './level-017-redesign.ts'

/** Snow-capped pine; (x, y) = bottom of the trunk. Bounds: x ±40, y from −124 to 0. */
const pine = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-6" y="-16" width="12" height="16" fill="#6b4f3a"/>` +
  `<path d="M0 -124L-40 -40h80Z" fill="#2f7d55"/><path d="M0 -124L-26 -70h52Z" fill="#3b9467"/>` +
  `<path d="M0 -124L-16 -90q8 4 16 0q8 4 16 0Z" fill="#ffffff"/>` +
  `<path d="M-40 -40q10 -8 20 0t20 0t20 0t20 0" stroke="#ffffff" stroke-width="6" fill="none"/></g>`

/** Snowman; (x, y) = ground center. Bounds: x ±30, y from −100 to 0. */
const snowman = (x: number, y: number, scarf: string) =>
  `<g transform="translate(${x} ${y})">` +
  `<circle cy="-28" r="30" fill="#ffffff"/><circle cy="-72" r="22" fill="#ffffff"/>` +
  `<path d="M-20 -54q20 10 40 0v8q-20 10 -40 0Z" fill="${scarf}"/><path d="M14 -50l6 20" stroke="${scarf}" stroke-width="7" stroke-linecap="round"/>` +
  `<circle cx="-7" cy="-76" r="2.5" fill="#333"/><circle cx="7" cy="-76" r="2.5" fill="#333"/>` +
  `<circle cy="-36" r="2.5" fill="#333"/><circle cy="-24" r="2.5" fill="#333"/><circle cy="-12" r="2.5" fill="#333"/>` +
  `<path d="M-30 -36l-20 -14M30 -36l20 -14" stroke="#6b4f3a" stroke-width="4" stroke-linecap="round"/>` +
  `<rect x="-14" y="-104" width="28" height="12" fill="#333"/><rect x="-20" y="-94" width="40" height="4" fill="#333"/></g>`

/** Carrot nose; (x, y) = base. Bounds: x from 0 to +16, y ±4. */
const carrot = (x: number, y: number) => `<path d="M${x} ${y - 4}L${x + 16} ${y}L${x} ${y + 4}Z" fill="#f77f00"/>`

/** Sled; (x, y) = ground center. Bounds: x ±40, y from −24 to 0. */
const sled = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-40 -4q0 6 6 6h68q6 0 6 -6v-4" stroke="#8d99ae" stroke-width="4" fill="none" stroke-linecap="round"/>` +
  `<rect x="-32" y="-24" width="64" height="12" rx="3" fill="${color}"/>` +
  `<path d="M-26 -12v8M-8 -12v8M10 -12v8M26 -12v8" stroke="${color}" stroke-width="4"/></g>`

/** Smoke puffs; (x, y) = chimney top. Bounds: x from −12 to +14, y from −44 to +4. */
const smoke = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y - 6}" r="7" fill="#d9d9e3"/><circle cx="${x + 5}" cy="${y - 20}" r="9" fill="#e3e3ec"/>` +
  `<circle cx="${x - 1}" cy="${y - 34}" r="10" fill="#ededf3"/>`

/** Small bird; (x, y) = feet. Bounds: x from −12 to +12, y from −16 to 0. */
const bird = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<ellipse cy="-7" rx="9" ry="6" fill="#e63946"/><circle cx="7" cy="-11" r="5" fill="#e63946"/>` +
  `<path d="M11 -11L15 -9L11 -8Z" fill="#f4a261"/><circle cx="8" cy="-12" r="1.2" fill="#fff"/>` +
  `<path d="M-9 -7L-13 -12L-6 -9Z" fill="#b5172a"/></g>`

export default svgLevel({
  id: 17,
  chapter: 'farm',
  title: 'winter',
  parTimeSec: 100,
  redesign: level017Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let flakes = ''
    for (let i = 0; i < 40; i++) {
      const x = rand() * 800
      const y = rand() * 500
      flakes += `<circle cx="${x}" cy="${y}" r="${2 + rand() * 2}" fill="#ffffff" fill-opacity="0.9"/>`
    }
    let drifts = ''
    for (let i = 0; i < 6; i++) drifts += `<ellipse cx="${rand() * 800}" cy="${430 + rand() * 60}" rx="${30 + rand() * 40}" ry="8" fill="#f4f8ff"/>`
    const rising = (period: number) =>
      anim({ id: 'smoke', type: 'path', points: [[0, 0], [0, -26]], period }, smoke(372, 150))
    const feederBird = bird(720, 300)

    return (
      `<rect width="800" height="500" fill="#c7d9ea"/>` +
      `<circle cx="120" cy="90" r="34" fill="#f4f1de"/>` +
      `<path d="M0 310Q200 250 400 300T800 290V500H0Z" fill="#eef4fb"/>` +
      `<rect y="380" width="800" height="120" fill="#ffffff"/>` +
      // Far pines
      pine(60, 300) +
      pine(770, 310) +
      // Barn with a snowy roof and smoking chimney
      `<rect x="360" y="110" width="22" height="50" fill="#8a5a33"/>` +
      diff(373, 138, 40, rising(5), rising(2.5), 'smoke') +
      `<rect x="300" y="200" width="220" height="150" fill="#c0392b"/>` +
      `<path d="M280 205L410 130L540 205Z" fill="#7a3f2c"/>` +
      `<path d="M280 205L410 130L540 205v10q-20 12 -40 0t-40 0t-40 0t-40 0t-40 0t-40 0t-40 0Z" fill="#ffffff"/>` +
      `<rect x="380" y="270" width="60" height="80" fill="#5a3d2b"/>` +
      `<rect x="320" y="230" width="40" height="40" fill="#5a3d2b"/>` +
      diff(340, 250, 22, `<rect x="324" y="234" width="32" height="32" fill="#ffd166"/>`, `<rect x="324" y="234" width="32" height="32" fill="#2d3a55"/>`) +
      `<rect x="460" y="230" width="40" height="40" fill="#5a3d2b"/><rect x="464" y="234" width="32" height="32" fill="#ffd166"/>` +
      `<path d="M300 215v20M330 215v24M360 215v18M390 215v26M450 215v20M480 215v24M510 215v18" stroke="#dbeaf7" stroke-width="5" stroke-linecap="round"/>` +
      // Near pine (missing on B)
      diff(600, 318, 64, pine(600, 380), '') +
      // Bird feeder
      `<rect x="716" y="300" width="8" height="90" fill="#8a5a33"/><rect x="690" y="294" width="60" height="8" fill="#a0703f"/>` +
      `<path d="M686 296L720 270L754 296Z" fill="#c0392b"/>` +
      diff(720, 290, 22, feederBird, anim({ id: 'bird', type: 'bob', dx: 0, dy: 5, period: 0.9 }, feederBird), 'bird') +
      fence(0, 240, 360, '#b98f5f') +
      snowman(150, 470, '#e63946') +
      diff(158, 400, 20, carrot(150, 400), '') +
      diff(300, 456, 42, sled(300, 468, '#e63946'), sled(300, 468, '#3a86ff')) +
      drifts +
      milkCan(30, 430) +
      cat(470, 350) +
      stump(700, 440) +
      stones(410, 480) +
      wheelbarrow(290, 370) +
      anim({ type: 'path', points: [[0, 0], [-10, 40]], period: 3.5 }, flakes) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['pine', 513, 471],
        ['bird', 210, 306],
        ['stones', 79, 446],
        ['pine', 742, 443],
        ['bird', 359, 385],
        ['stones', 85, 315],
        ['cloud', 199, 110],
        ['birds', 567, 162],
        ['cloud', 734, 56],
        ['birds', 510, 63],
      ])
    )
  },
})
