// Motion differences: the fish school swims faster on picture B; the jellyfish bobs faster on B; the seaweed sways only on B.
import { svgLevel } from '../helpers.ts'
import { bottleMessage, coral, fish, jellyfish, octopus, rock, seahorse, seaUrchin, seaweed, shell, snorkelMask, starfish, turtle } from './shapes.ts'

/** Treasure chest, open or closed; (x, y) = bottom center. Bounds: x ±20, y from −34 to 0. */
const chest = (x: number, y: number, open: boolean) =>
  `<g transform="translate(${x} ${y})"><rect x="-20" y="-20" width="40" height="20" fill="#8a5a3b"/><path d="M-20 -12h40M-4 -16h8" stroke="#ffd166" stroke-width="2"/>` +
  (open
    ? `<path d="M-20 -22q0 -14 20 -14q20 0 20 14l-4 -12q-16 -8 -32 0Z" fill="#a0703f"/><circle cx="-8" cy="-24" r="4" fill="#ffd166"/><circle cx="4" cy="-26" r="4" fill="#ffd166"/><circle cx="12" cy="-22" r="4" fill="#ffd166"/>`
    : `<path d="M-20 -20q0 -14 20 -14q20 0 20 14Z" fill="#a0703f"/><path d="M-20 -26h40" stroke="#ffd166" stroke-width="2"/>`) +
  `</g>`

/** Clam; (x, y) = bottom center. The pearl is separate. Bounds: x ±16, y from −20 to 0. */
const clam = (x: number, y: number) =>
  `<path d="M${x - 16} ${y}q0 -12 16 -12q16 0 16 12Z" fill="#ff8f6b"/><path d="M${x - 16} ${y - 6}q0 -16 16 -16q16 0 16 16" fill="none" stroke="#ff8f6b" stroke-width="5"/>`
const pearl = (x: number, y: number) => `<circle cx="${x}" cy="${y - 10}" r="5" fill="#fff"/>`

export default svgLevel({
  id: 63,
  chapter: 'sea',
  title: 'reef',
  parTimeSec: 130,
  scene: ({ diff, anim, rand }) => {
    let bubbles = ''
    for (let i = 0; i < 12; i++) bubbles += `<circle cx="${rand() * 800}" cy="${rand() * 500}" r="${2 + rand() * 3}" fill="#fff" fill-opacity="0.5"/>`
    let rays = ''
    for (let i = 0; i < 5; i++) rays += `<path d="M${100 + i * 150} 0l40 220h-30Z" fill="#fff" fill-opacity="0.08"/>`
    const school = (period: number) =>
      anim({ id: 'school', type: 'path', points: [[0, 0], [120, -16], [240, 0]], period }, fish(200, 160, '#ffb703', 0.9) + fish(224, 172, '#ffb703', 0.8) + fish(206, 186, '#ffb703', 0.7))
    const floating = (period: number) => anim({ id: 'jelly', type: 'bob', dx: 0, dy: 8, period }, jellyfish(600, 200))
    const weed = seaweed(120, 470, 1.3)

    return (
      `<rect width="800" height="500" fill="#1f8fbf"/>` +
      `<rect width="800" height="250" fill="#3ba7cc"/><rect y="250" width="800" height="250" fill="#2a90b8"/>` +
      rays +
      diff(210, 173, 30, school(10), school(5), 'school') +
      fish(500, 120, '#ff6b8b', 1.2, true) +
      fish(680, 300, '#8ac926', 1) +
      diff(600, 206, 30, floating(2.6), floating(1.2), 'jelly') +
      jellyfish(700, 150, '#ff6b8b') +
      // Sea floor
      `<path d="M0 430Q200 400 400 430T800 420V500H0Z" fill="#e9c46a"/>` +
      rock(300, 450, 1.3, '#5c677d') +
      rock(700, 470, 1.1, '#5c677d') +
      diff(120, 444, 30, weed, anim({ type: 'sway', angle: 8, pivot: [120, 470], period: 1.8 }, weed)) +
      seaweed(180, 480, 1) +
      seaweed(760, 460, 1.2, '#4caf6a') +
      diff(240, 462, 32, coral(240, 480, '#ff6b8b'), coral(240, 480, '#ffb703')) +
      coral(560, 470, '#ff8f6b') +
      coral(640, 490, '#b38cff') +
      diff(400, 469, 30, turtle(400, 480), turtle(400, 480, '#4caf6a', true)) +
      diff(490, 466, 24, chest(490, 480, false), chest(490, 480, true)) +
      diff(360, 420, 18, starfish(360, 420, '#ff9f43'), starfish(360, 420, '#b38cff')) +
      starfish(200, 420, '#ff6b8b') +
      clam(580, 420) +
      diff(580, 410, 18, pearl(580, 420), '') +
      diff(680, 408, 32, octopus(680, 430), octopus(680, 430, '#e63946')) +
      seahorse(450, 330) +
      seaUrchin(320, 466) +
      bottleMessage(55, 490) +
      shell(440, 428) +
      snorkelMask(705, 488) +
      anim({ type: 'path', points: [[0, 0], [4, -40]], period: 4 }, bubbles)
    )
  },
})
