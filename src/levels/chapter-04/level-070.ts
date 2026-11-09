// Motion differences: the propeller spins faster on picture B; the periscope light blinks only on B; the squid jets faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level070Redesign } from './level-070-redesign.ts'
import { anchor, bottleMessage, clam, fish, rock, seahorse, seaUrchin, seaweed, turtle } from './shapes.ts'

/** Submarine, faces right; (x, y) = center. The propeller, lamp and a porthole are separate. Bounds: x ±90, y from −50 to +30. */
const sub = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><rect x="-80" y="-24" width="160" height="48" rx="24" fill="${color}"/><rect x="-20" y="-44" width="40" height="22" rx="6" fill="${color}"/>` +
  `<rect x="6" y="-56" width="4" height="14" fill="#3d4a55"/><rect x="6" y="-58" width="12" height="5" fill="#3d4a55"/>` +
  `<path d="M70 -14l16 -10v48l-16 -10Z" fill="${color}"/><path d="M-80 0h-6" stroke="#3d4a55" stroke-width="6"/>` +
  `<circle cx="-40" cy="0" r="8" fill="#bde3f2" stroke="#3d4a55" stroke-width="3"/><circle cx="20" cy="0" r="8" fill="#bde3f2" stroke="#3d4a55" stroke-width="3"/></g>`
/** Extra porthole on the submarine at (x, y). Bounds: radius 11 around (x − 10, y). */
const porthole = (x: number, y: number) => `<circle cx="${x - 10}" cy="${y}" r="8" fill="#bde3f2" stroke="#3d4a55" stroke-width="3"/>`
/** Propeller pivoting on (x − 92, y). Bounds: radius 14. */
const propeller = (x: number, y: number) => `<g transform="translate(${x - 92} ${y})"><path d="M0 -12q6 6 0 12q-6 -6 0 -12ZM0 0q6 6 0 12q-6 -6 0 -12Z" fill="#8d99ae"/><circle r="3" fill="#3d4a55"/></g>`
/** Periscope lamp at (x + 16, y − 56). Bounds: radius 6. */
const lamp = (x: number, y: number) => `<circle cx="${x + 16}" cy="${y - 62}" r="4" fill="#e63946"/>`

/** Squid, faces up; (x, y) = center. Bounds: x ±12, y from −20 to +22. */
const squid = (x: number, y: number, color = '#ff6b8b') =>
  `<g transform="translate(${x} ${y})"><path d="M-10 0q0 -20 10 -20q10 0 10 20Z" fill="${color}"/><path d="M-8 0q-4 10 -2 20M-3 0q0 10 -1 22M3 0q0 10 1 22M8 0q4 10 2 20" stroke="${color}" stroke-width="2.5" fill="none"/>` +
  `<circle cx="-4" cy="-6" r="2" fill="#222"/><circle cx="4" cy="-6" r="2" fill="#222"/></g>`

/** Sea mine; (x, y) = center. Bounds: radius 16. */
const mine = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><circle r="11" fill="#2b2b2b"/><path d="M0 -15v8M0 7v8M-15 0h8M7 0h8M-11 -11l6 6M5 5l6 6M11 -11l-6 6M-5 5l-6 6" stroke="#2b2b2b" stroke-width="3"/></g>`

export default svgLevel({
  id: 70,
  chapter: 'sea',
  title: 'submarine',
  parTimeSec: 130,
  redesign: level070Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let bubbles = ''
    for (let i = 0; i < 14; i++) bubbles += `<circle cx="${rand() * 800}" cy="${rand() * 500}" r="${2 + rand() * 3}" fill="#fff" fill-opacity="0.4"/>`
    const spinning = (period: number) => anim({ type: 'rotate', pivot: [308, 250], period }, propeller(400, 250))
    const light = lamp(400, 250)
    const jetting = (period: number) => anim({ id: 'squid', type: 'path', points: [[0, 0], [0, -50]], period }, squid(620, 400))

    return (
      `<rect width="800" height="500" fill="#14506f"/>` +
      `<rect width="800" height="220" fill="#1a6f9a"/>` +
      `<path d="M200 0l40 200h-30ZM500 0l40 200h-30Z" fill="#fff" fill-opacity="0.07"/>` +
      diff(120, 120, 24, fish(120, 120, '#ffb703', 1.4), fish(120, 120, '#ffb703', 1.4, true)) +
      fish(680, 100, '#ff6b8b', 1.1, true) +
      diff(720, 160, 18, '', fish(720, 160, '#8ac926', 0.9)) +
      // Submarine
      diff(308, 250, 18, spinning(1.5), spinning(0.6)) +
      sub(400, 250, '#ffb703') +
      diff(416, 188, 18, light, anim({ type: 'blink', period: 1, duty: 0.5 }, light)) +
      diff(390, 250, 18, porthole(400, 250), '') +
      `<rect x="448" y="232" width="24" height="16" rx="3" fill="#e63946"/>` +
      `<path d="M500 250h40" stroke="#fff" stroke-opacity="0.3" stroke-width="3" stroke-dasharray="6 6"/>` +
      diff(640, 300, 18, mine(640, 300), '') +
      `<path d="M640 316v60" stroke="#5c677d" stroke-width="2"/>` +
      diff(620, 401, 26, jetting(5), jetting(2.5), 'squid') +
      // Floor
      `<path d="M0 450Q200 430 400 450T800 440V500H0Z" fill="#c9b79c"/>` +
      diff(140, 470, 30, turtle(140, 480), turtle(140, 480, '#4caf6a', true)) +
      rock(300, 470, 1.4, '#5c677d') +
      rock(460, 480, 1.1, '#5c677d') +
      seaweed(740, 480, 1.4, '#2a9d8f') +
      diff(560, 466, 26, seaweed(560, 490, 1.2), seaweed(560, 490, 1.2, '#4caf6a')) +
      seaweed(60, 492, 1) +
      clam(215, 470) +
      seaUrchin(355, 470) +
      bottleMessage(510, 472) +
      seahorse(700, 300) +
      anchor(680, 470) +
      anim({ type: 'path', points: [[0, 0], [4, -40]], period: 4 }, bubbles) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['fish', 243, 368, '#ffb703'],
        ['fish', 640, 73, '#ffb703'],
        ['jellyfish', 284, 122],
        ['fish', 459, 343, '#ff9f43'],
        ['seahorse', 87, 246],
        ['fish', 717, 324, '#ffb703'],
        ['fish', 131, 47, '#9ef01a'],
        ['jellyfish', 596, 227],
        ['clam', 412, 475],
        ['rock', 242, 467],
      ])
    )
  },
})
