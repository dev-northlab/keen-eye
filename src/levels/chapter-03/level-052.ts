// Motion differences: the crow hops only on picture B; the hawk circles faster on B; the dandelion sways faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level052Redesign } from './level-052-redesign.ts'
import { acorn, anthill, bluebells, bush, feather, floor, fox, log, mushroom, pine, pineCone, rock } from './shapes.ts'

/** Fox cub, faces right; (x, y) = feet. Bounds: x ±16, y from −20 to 0. */
const cub = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -0.6 : 0.6} 0.6)">` + fox(0, 0).replace('translate(0 0) scale(1 1)', '') + `</g>`

/** Crow, faces right; (x, y) = feet. Bounds: x ±12, y from −16 to 0. */
const crow = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-7" rx="9" ry="5.5" fill="#2b2b3a"/><circle cx="7" cy="-12" r="4.5" fill="#2b2b3a"/><path d="M11 -12l5 1l-5 2Z" fill="#f4a261"/>` +
  `<path d="M-9 -7l-4 -5" stroke="#2b2b3a" stroke-width="2.5"/><path d="M-3 0v-2M3 0v-2" stroke="#f4a261" stroke-width="1.5"/></g>`

/** Hawk gliding; (x, y) = body center. Bounds: x ±22, y from −6 to +8. */
const hawk = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-22 0q11 -8 22 0q11 -8 22 0l-4 4q-18 -2 -18 4q0 -6 -18 -4Z" fill="#6b4f3a"/><circle cx="0" cy="-1" r="3" fill="#6b4f3a"/></g>`

/** Den entrance on the hill; (x, y) = bottom center, scale s. Bounds: x ±22·s, y from −26·s to 0. */
const den = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-22 0q0 -26 22 -26q22 0 22 26Z" fill="#2b2b2b"/><path d="M-22 0q0 -26 22 -26q22 0 22 26" fill="none" stroke="#8a5a3b" stroke-width="4"/></g>`

/** Bone; (x, y) = center. Bounds: x ±12, y ±5. */
const bone = (x: number, y: number) =>
  `<rect x="${x - 9}" y="${y - 2}" width="18" height="4" fill="#fff3d6"/><circle cx="${x - 9}" cy="${y - 2}" r="3" fill="#fff3d6"/><circle cx="${x - 9}" cy="${y + 2}" r="3" fill="#fff3d6"/><circle cx="${x + 9}" cy="${y - 2}" r="3" fill="#fff3d6"/><circle cx="${x + 9}" cy="${y + 2}" r="3" fill="#fff3d6"/>`

/** Dandelion; (x, y) = base. Bounds: x ±9, y from −34 to 0. */
const dandelion = (x: number, y: number) =>
  `<path d="M${x} ${y}v-26" stroke="#4c8a3c" stroke-width="2.5"/><circle cx="${x}" cy="${y - 26}" r="8" fill="#fff" fill-opacity="0.85"/><circle cx="${x}" cy="${y - 26}" r="3" fill="#e9d8b6"/>`

export default svgLevel({
  id: 52,
  chapter: 'forest',
  title: 'foxDen',
  parTimeSec: 120,
  redesign: level052Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const perched = crow(560, 468)
    const circling = (period: number) => anim({ id: 'hawk', type: 'path', points: [[0, 0], [60, -30], [120, 0], [60, 30]], period }, hawk(560, 110))
    const swaying = (period: number) => anim({ type: 'sway', angle: 10, pivot: [720, 480], period }, dandelion(720, 480))

    return (
      `<rect width="800" height="500" fill="#ffb98a"/>` +
      `<rect width="800" height="160" fill="#ff9e6e"/><circle cx="140" cy="130" r="40" fill="#ffe08a"/>` +
      diff(560, 110, 26, circling(10), circling(5), 'hawk') +
      `<path d="M0 300Q200 260 400 290T800 270V500H0Z" fill="#8fca68"/>` +
      pine(60, 300, 1.2, '#2f7d55') +
      pine(720, 280, 1.3, '#2f7d55') +
      pine(640, 300, 0.9, '#3b9467') +
      // Hill with the den
      `<path d="M160 400q140 -120 320 -10v10H160Z" fill="#a9d3a0"/><path d="M200 400q100 -80 240 -10" stroke="#8fca68" stroke-width="6" fill="none"/>` +
      diff(320, 383, 36, den(320, 400), den(320, 400, 1.3)) +
      `<rect y="400" width="800" height="100" fill="#8fca68"/>` +
      // Fox family
      diff(240, 448, 34, fox(240, 464), fox(240, 464, true)) +
      diff(420, 454, 24, cub(420, 464), '') +
      cub(450, 476, true) +
      cub(140, 480) +
      diff(500, 442, 18, bone(500, 442), '') +
      log(560, 480) +
      diff(560, 460, 18, perched, anim({ id: 'crow', type: 'bob', dx: 0, dy: 4, period: 0.8 }, perched), 'crow') +
      diff(80, 444, 22, mushroom(80, 460, '#e63946'), mushroom(80, 460, '#ffb703')) +
      mushroom(110, 470, '#a0703f', 0.8) +
      bush(660, 440, 1.1, '#5fae4b') +
      rock(760, 496, 1) +
      diff(720, 462, 20, swaying(2.6), swaying(1.1)) +
      floor(rand, 320, 440, 8) +
      bluebells(205, 342) +
      pineCone(82, 312) +
      anthill(585, 432) +
      acorn(365, 482) +
      feather(185, 490) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['butterfly', 592, 376],
        ['squirrel', 272, 328],
        ['feather', 135, 423],
        ['rabbit', 742, 352],
        ['frog', 432, 348],
        ['anthill', 339, 478],
        ['mushroom', 144, 315],
        ['cloud', 383, 71],
        ['birds', 500, 208],
        ['cloud', 241, 119],
      ])
    )
  },
})
