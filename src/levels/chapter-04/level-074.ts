// Motion differences: the shrimp darts faster on picture B; the anemone sways only on B; the gull hops faster on B.
import { svgLevel } from '../helpers.ts'
import { crab, gullStanding, person, rock, seaweed, shell, starfish, sun, waves } from './shapes.ts'

/** Tide pool; (x, y) = center. Bounds: x ±(rx + 4), y ±(ry + 4). */
const pool = (x: number, y: number, rx: number, ry: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx + 4}" ry="${ry + 4}" fill="#5c677d"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#63b8e3"/>`

/** Anemone; (x, y) = base. Bounds: x ±12, y from −20 to 0. */
const anemone = (x: number, y: number, color = '#ff6b8b') =>
  `<g transform="translate(${x} ${y})" stroke="${color}" stroke-width="3" stroke-linecap="round" fill="none"><path d="M-10 0q-4 -10 0 -18M-5 0q-2 -12 2 -20M0 0q0 -12 0 -20M5 0q2 -12 -2 -20M10 0q4 -10 0 -18"/></g>`

/** Shrimp, faces right; (x, y) = center. Bounds: x ±12, y ±6. */
const shrimp = (x: number, y: number) => `<g transform="translate(${x} ${y})"><path d="M-10 4q0 -10 10 -10q8 0 10 6" stroke="#ff8f6b" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M8 0l4 -6M9 2l6 -3" stroke="#ff8f6b" stroke-width="1.5"/></g>`

/** Sea urchin; (x, y) = center. Bounds: radius 11. */
const urchin = (x: number, y: number, color = '#2b2b3a') =>
  `<g transform="translate(${x} ${y})"><circle r="6" fill="${color}"/><path d="M0 -10v20M-10 0h20M-7 -7l14 14M-7 7l14 -14" stroke="${color}" stroke-width="2"/></g>`

/** Small fish in a pool; (x, y) = center. Bounds: x ±9, y ±5. */
const minnow = (x: number, y: number, color: string) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3.5" fill="${color}"/><path d="M${x - 5} ${y}l-4 -3v6Z" fill="${color}"/>`

export default svgLevel({
  id: 74,
  chapter: 'sea',
  title: 'tidePools',
  parTimeSec: 130,
  scene: ({ diff, anim }) => {
    const darting = (period: number) => anim({ id: 'shrimp', type: 'path', points: [[0, 0], [40, 10], [0, 20], [-30, 8]], period }, shrimp(560, 400))
    const tentacles = anemone(230, 440)
    const hopping = (period: number) => anim({ id: 'gull', type: 'bob', dx: 0, dy: 5, period }, gullStanding(680, 300))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(680, 70) +
      `<rect y="200" width="800" height="100" fill="#3ba7cc"/>` +
      anim({ type: 'bob', dx: 8, dy: 0, period: 4 }, waves(206, 10, 100, '#5cc0de', 300)) +
      // Rocky shore
      `<path d="M0 280q200 -40 400 0t400 -10v230H0Z" fill="#6f7f93"/><path d="M0 330q200 -30 400 0t400 -10v180H0Z" fill="#8d99ae"/>` +
      rock(100, 300, 1.3, '#5c677d') +
      diff(740, 290, 24, rock(740, 300, 1.2, '#5c677d'), rock(740, 300, 1.2, '#6f8f6a')) +
      diff(680, 290, 20, hopping(1.6), hopping(0.7), 'gull') +
      gullStanding(140, 290, true) +
      // Pools
      pool(230, 420, 110, 40) +
      diff(230, 428, 24, tentacles, anim({ type: 'sway', angle: 8, pivot: [230, 440], period: 1.6 }, tentacles)) +
      diff(170, 420, 20, starfish(170, 420, '#ff9f43'), starfish(170, 420, '#b38cff')) +
      diff(300, 418, 20, minnow(300, 410, '#ffb703'), minnow(300, 410, '#ffb703') + minnow(300, 426, '#ffb703')) +
      pool(560, 420, 120, 44) +
      diff(560, 410, 22, darting(5), darting(2.5), 'shrimp') +
      urchin(500, 440) +
      urchin(620, 450) +
      diff(640, 400, 18, '', minnow(640, 400, '#8ac926')) +
      seaweed(470, 460, 0.8) +
      // People exploring
      person(400, 330, '#ffb703') +
      `<path d="M408 300l20 -20" stroke="#3d4a55" stroke-width="2"/>` +
      diff(440, 310, 20, person(440, 345, '#e63946', true), person(440, 345, '#3a86ff', true)) +
      diff(60, 470, 22, crab(60, 480), crab(60, 480, '#ffb703')) +
      crab(760, 470, '#ff9f43') +
      shell(360, 486) +
      shell(720, 490, '#ff8f6b')
    )
  },
})
