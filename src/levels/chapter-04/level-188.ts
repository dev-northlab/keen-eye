// Research ship: above and below the waterline among the sea's ten hardest (hidden until released,
// levels/upcoming.ts). New in the sea: a research vessel with a radar dome, an A-frame lowering a yellow
// submersible with its strobe and sampling arm, a scientist in a hard hat, a sonar buoy, a whale shark and a sea
// cucumber. Motion differences: the mast flag flies and a fish of the school darts only on picture B; the
// submersible's strobe flashes only on A.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { buoy, cloud, coral, fish, gullStanding, person, rock, seaweed } from './shapes.ts'

/** Submersible facing right, without its strobe or sampling arm; (x, y) = center. Bounds: x from −44 to +42, y from −30 to +24. */
const submersible = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-46" y="-8" width="8" height="14" rx="2" fill="#5c677d"/><ellipse rx="40" ry="22" fill="#ffd23f"/>` +
  `<rect x="-10" y="-30" width="20" height="10" rx="3" fill="#ffd23f"/><path d="M-36 8H36" stroke="#e9a800" stroke-width="3"/>` +
  `<circle cx="26" r="9" fill="#8ecae6" stroke="#5c677d" stroke-width="3"/><path d="M-20 20v4M20 20v4M-24 24H24" stroke="#5c677d" stroke-width="3"/></g>`

/** Whale shark facing left; (x, y) = mouth. Bounds: x from 0 to +254, y from −34 to +30. */
const whaleShark = (x: number, y: number) => {
  let spots = ''
  for (const [sx, sy] of [[30, -16], [52, -20], [74, -18], [96, -22], [64, -6], [100, -8], [146, -14], [168, -18], [190, -8], [118, 2], [150, 0]])
    spots += `<circle cx="${sx}" cy="${sy}" r="3.5" fill="#ffffff" fill-opacity="0.8"/>`
  return `<g transform="translate(${x} ${y})"><path d="M0 0Q10 -30 90 -28Q170 -24 210 -8L250 -34L240 0L254 30L210 8Q170 24 90 26Q10 28 0 0Z" fill="#3d5a80"/>` +
    `<path d="M100 -26L120 -46L136 -24Z" fill="#3d5a80"/><path d="M4 4H26" stroke="#1d3557" stroke-width="2"/><circle cx="20" cy="-8" r="2.2" fill="#1d3557"/>${spots}</g>`
}

export default svgLevel({
  id: 188,
  chapter: 'sea',
  title: 'researchShip',
  parTimeSec: 108,
  scene: ({ diff, anim, extra }) => {
    const flag = `<path d="M320 30H342V44H320Z" fill="#2a9d8f"/><circle cx="331" cy="37" r="3.5" fill="#ffffff"/>`
    const strobe = `<circle cx="96" cy="300" r="5" fill="#ffffff"/><path d="M84 300h-6M108 300h6M96 288v-6" stroke="#ffffff" stroke-width="2"/>`
    const dart = fish(720, 262, '#ffd23f')
    return (
      `<rect width="800" height="172" fill="#d6ecf5"/>` +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(620, 70, 0.6)) +
      `<rect y="170" width="800" height="330" fill="#2a7ca8"/><rect y="330" width="800" height="170" fill="#1f6690"/><path d="M0 171H800" stroke="#c9eef7" stroke-width="3"/>` +
      `<path d="M200 230L260 230L340 450L240 450ZM600 230L650 230L720 450L630 450Z" fill="#ffffff" fill-opacity="0.06"/>` +
      // Seabed
      `<path d="M0 456Q200 444 400 458T800 452V500H0Z" fill="#c9b48e"/>` + coral(60, 478) + coral(420, 480, '#ff9f43') + seaweed(640, 482, 1.2) + rock(760, 482, 1.4, '#6c757d') +
      // The ship: hull, A-frame, deck house with lifeboat, dome, mast flag, bridge
      `<path d="M110 140H580L560 196H136Q116 186 110 140Z" fill="#1d3557"/><rect x="112" y="140" width="466" height="18" fill="#f4f1e8"/>` +
      `<path d="M140 140L112 96M152 140L124 96M110 96H128" stroke="#ff9f43" stroke-width="6" stroke-linecap="round"/><path d="M116 98V306" stroke="#3d4a55" stroke-width="1.5"/>` +
      `<rect x="300" y="110" width="220" height="30" fill="#ffffff"/><rect x="420" y="86" width="100" height="24" fill="#ffffff"/><rect x="416" y="82" width="108" height="5" fill="#3d4a55"/>` +
      `<rect x="430" y="94" width="12" height="10" fill="#1d3557"/><rect x="448" y="94" width="10" height="10" fill="#1d3557"/><rect x="484" y="94" width="12" height="10" fill="#1d3557"/><rect x="502" y="94" width="12" height="10" fill="#1d3557"/>` +
      diff(466, 99, 22, `<rect x="464" y="94" width="12" height="10" fill="#1d3557"/>`, '') +
      `<path d="M390 110V82" stroke="#5c677d" stroke-width="3"/>` +
      diff(390, 72, 22, `<circle cx="390" cy="72" r="13" fill="#ffffff" stroke="#c9d1d9" stroke-width="2"/>`, `<circle cx="390" cy="72" r="13" fill="#ffd23f" stroke="#c9d1d9" stroke-width="2"/>`) +
      `<path d="M320 110V30" stroke="#5c677d" stroke-width="2"/><path d="M308 62H332" stroke="#5c677d" stroke-width="2"/>` +
      diff(331, 37, 22, flag, anim({ type: 'sway', angle: 12, pivot: [320, 37], period: 1.3 }, flag)) +
      `<path d="M342 120V114M378 120V114" stroke="#5c677d" stroke-width="2"/>` +
      diff(360, 127, 26, `<ellipse cx="360" cy="127" rx="22" ry="7" fill="#ff9f43"/>`, `<ellipse cx="360" cy="127" rx="22" ry="7" fill="#e63946"/>`) +
      // Scientist on the stern, the gull on the bow
      person(230, 140, '#3a86ff', false, '#e0b48a', '#2b2b2b') +
      diff(230, 80, 22, `<path d="M220 86q10 -16 20 0h4v3h-28Z" fill="#ffd23f"/>`, `<path d="M220 86q10 -16 20 0h4v3h-28Z" fill="#f4f1e8"/>`) +
      diff(556, 130, 22, gullStanding(556, 140, true), '') +
      // Sonar buoy
      diff(680, 163, 22, buoy(680, 170, '#ffd23f'), buoy(680, 170, '#8338ec')) +
      // The submersible: strobe, sampling arm
      submersible(120, 330) +
      diff(96, 302, 22, anim({ type: 'blink', duty: 0.25, period: 1.4 }, strobe), strobe) +
      diff(168, 360, 22, `<path d="M150 346L164 360H174" stroke="#5c677d" stroke-width="3" fill="none"/><rect x="170" y="358" width="14" height="12" rx="2" fill="#adb5bd"/><path d="M170 362h14M177 358v12" stroke="#5c677d" stroke-width="1"/>`, '') +
      // Whale shark with one spot that changes, the darting fish, the sea cucumber
      whaleShark(430, 380) +
      diff(560, 372, 22, `<circle cx="560" cy="372" r="4" fill="#ffffff"/>`, '') +
      fish(690, 282, '#ffd23f') + fish(752, 290, '#ffd23f') +
      diff(720, 262, 22, dart, anim({ type: 'bob', dx: 5, dy: 2, period: 1.2 }, dart)) +
      diff(300, 472, 22, `<ellipse cx="300" cy="472" rx="16" ry="6" fill="#e76f51"/><path d="M290 467l-1 -3M298 466v-3M306 467l1 -3" stroke="#e76f51" stroke-width="2" stroke-linecap="round"/>`, '') +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['gull', 640, 60],
        ['fish', 300, 260],
        ['jellyfish', 260, 360],
        ['seaUrchin', 520, 478],
        ['starfish', 760, 400],
      ])
    )
  },
})
