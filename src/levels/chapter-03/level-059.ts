// Motion differences: the lantern swings only on picture B; the sun brightens faster on B; the fog puff drifts faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level059Redesign } from './level-059-redesign.ts'
import { anthill, backpack, deer, feather, floor, mushroom, pine, pineCone, stump, trailSign } from './shapes.ts'
import { person } from '../chapter-02/shapes.ts'

/** Lantern held out from (x, y) = hook. Bounds: x ±8, y from 0 to +28. */
const lantern = (x: number, y: number) =>
  `<path d="M${x} ${y}v6" stroke="#333" stroke-width="2"/><rect x="${x - 7}" y="${y + 6}" width="14" height="18" rx="3" fill="#ffd166" stroke="#333" stroke-width="2"/><rect x="${x - 4}" y="${y + 24}" width="8" height="4" fill="#333"/>`

/** Sun disc without its own fill (recolored by the animation); (x, y) = center. Bounds: radius 36. */
const sunDisc = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="34"/>`

/** Fog puff; (x, y) = center. Bounds: x ±36, y ±12. */
const puff = (x: number, y: number) =>
  `<g fill="#fff" fill-opacity="0.75"><ellipse cx="${x}" cy="${y}" rx="36" ry="10"/><circle cx="${x - 14}" cy="${y - 4}" r="9"/><circle cx="${x + 12}" cy="${y - 5}" r="10"/></g>`

/** Cobweb between branches; (x, y) = center. Bounds: radius 24. */
const cobweb = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="none" stroke="#fff" stroke-opacity="0.8" stroke-width="1.2"><path d="M-22 0h44M0 -22v44M-16 -16l32 32M-16 16l32 -32"/>` +
  `<circle r="6"/><circle r="12"/><circle r="18"/></g><circle cx="${x + 8}" cy="${y - 4}" r="2" fill="#bde3f2"/><circle cx="${x - 10}" cy="${y + 6}" r="2" fill="#bde3f2"/>`

/** Crow, faces right; (x, y) = feet. Bounds: x ±12, y from −16 to 0. */
const crow = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><ellipse cy="-7" rx="9" ry="5.5" fill="#2b2b3a"/><circle cx="7" cy="-12" r="4.5" fill="#2b2b3a"/><path d="M11 -12l5 1l-5 2Z" fill="#f4a261"/>` +
  `<path d="M-9 -7l-4 -5" stroke="#2b2b3a" stroke-width="2.5"/></g>`

/** Hat on the hiker at (x, y) = feet. Bounds: x ±13, y from −68 to −56. */
const hat = (x: number, y: number, color: string) =>
  `<path d="M${x - 8} ${y - 58}h16v-8h-16Z" fill="${color}"/><rect x="${x - 13}" y="${y - 60}" width="26" height="4" rx="2" fill="${color}"/>`

export default svgLevel({
  id: 59,
  chapter: 'forest',
  title: 'foggyMorning',
  parTimeSec: 120,
  redesign: level059Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let haze = ''
    for (let i = 0; i < 5; i++) haze += `<rect y="${300 + i * 40}" width="800" height="18" fill="#fff" fill-opacity="${0.25 + i * 0.08}"/>`
    const lamp = lantern(364, 420)
    const rising = (period: number) => anim({ type: 'color', colors: ['#ffe08a', '#ffb703', '#ffe08a'], period }, sunDisc(640, 110))
    const drifting = (period: number) => anim({ id: 'fog', type: 'path', points: [[0, 0], [80, 0]], period }, puff(480, 380))

    return (
      `<rect width="800" height="500" fill="#d6e4ec"/>` +
      diff(640, 110, 36, rising(6), rising(2)) +
      // Far silhouettes
      pine(60, 320, 1.4, '#a9bcc7') +
      pine(170, 300, 1.1, '#a9bcc7') +
      pine(300, 310, 0.9, '#a9bcc7') +
      pine(520, 300, 1.2, '#a9bcc7') +
      pine(760, 320, 1.3, '#a9bcc7') +
      `<path d="M0 320Q400 290 800 320V500H0Z" fill="#8fa98c"/>` +
      pine(420, 400, 1.3, '#5f8f6a') +
      pine(700, 420, 1.1, '#5f8f6a') +
      `<path d="M420 300h-70M420 310h60" stroke="#5f8f6a" stroke-width="6" stroke-linecap="round"/>` +
      diff(380, 290, 26, cobweb(380, 290), '') +
      diff(140, 395, 52, deer(140, 430, true, '#8d6e53'), '') +
      haze +
      diff(480, 380, 40, drifting(12), drifting(6), 'fog') +
      puff(640, 450) +
      // Hiker
      person(320, 480, '#2a9d8f') +
      diff(320, 418, 18, hat(320, 480, '#6b4f3a'), hat(320, 480, '#e63946')) +
      `<path d="M332 450l32 -30" stroke="#3d4a55" stroke-width="2"/>` +
      diff(364, 434, 20, lamp, anim({ type: 'sway', angle: 12, pivot: [364, 420], period: 1.4 }, lamp)) +
      stump(560, 480) +
      diff(560, 454, 18, crow(560, 462), crow(560, 462, true)) +
      diff(220, 476, 20, '', mushroom(220, 490, '#e63946')) +
      mushroom(250, 494, '#a0703f', 0.8) +
      floor(rand, 420, 490, 6) +
      backpack(270, 470) +
      pineCone(470, 480) +
      trailSign(620, 425) +
      feather(740, 480) +
      anthill(70, 480) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['birds', 84, 138],
        ['birds', 584, 211],
        ['birds', 260, 149],
        ['birds', 432, 129],
      ])
    )
  },
})
