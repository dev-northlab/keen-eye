// Space hotel: an orbital hotel above a blue planet among the space world's ten hardest (hidden until released,
// levels/upcoming.ts). New in space: a hotel tower with guests at its windows, a revolving restaurant with a neon
// star and string lights, a glass pool sphere with a swimmer and a float, a docked space taxi, a maintenance
// robot, a room-service drone and a tourist taking a selfie. Motion differences: the string lights twinkle and the
// drone hovers only on picture B; the swimmer bobs only on A.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { astronaut, probe, robot, star, starField } from './shapes.ts'

export default svgLevel({
  id: 197,
  chapter: 'space',
  title: 'spaceHotel',
  parTimeSec: 106,
  scene: ({ diff, anim, rand, extra }) => {
    const lights = `<circle cx="456" cy="96" r="3.5" fill="#ffd23f"/><circle cx="472" cy="98" r="3.5" fill="#ff006e"/><circle cx="488" cy="96" r="3.5" fill="#3ae0ff"/>`
    const swimmer = `<circle cx="156" cy="224" r="8" fill="#8ac926"/><circle cx="153" cy="222" r="2.2" fill="#fff"/><circle cx="160" cy="222" r="2.2" fill="#fff"/><path d="M146 232l-8 -6M166 232l8 -6" stroke="#8ac926" stroke-width="4" stroke-linecap="round"/>`
    const drone = probe(680, 320, '#3ae0ff') + `<rect x="672" y="330" width="16" height="4" fill="#bfc7d5"/><circle cx="680" cy="327" r="3" fill="#ff9f43"/>`
    let windows = ''
    for (const cy of [140, 190, 240, 290, 340])
      for (const cx of [320, 360, 400, 440, 480]) {
        if ((cx === 320 && cy === 140) || (cx === 400 && cy === 240) || (cx === 480 && cy === 290)) continue
        windows += `<rect x="${cx - 12}" y="${cy - 13}" width="24" height="26" rx="3" fill="${(cx + cy) % 3 ? '#ffd166' : '#2b2d42'}"/>`
      }
    return (
      `<rect width="800" height="500" fill="#0b1026"/>` + starField(rand, 0, 380, 60) +
      // The planet below and its swirl of cloud
      `<path d="M0 420Q400 360 800 420V500H0Z" fill="#2a6f97"/><path d="M80 450q40 -20 90 -4q-20 24 -90 4ZM340 420q60 -14 120 6q-50 16 -120 -6Z" fill="#4caf6a"/>` +
      `<path d="M220 470q30 -10 60 0M480 470q40 -8 70 2" stroke="#ffffff" stroke-opacity="0.6" stroke-width="5" stroke-linecap="round" fill="none"/>` +
      diff(600, 450, 26, `<path d="M600 450m-4 0a4 4 0 1 1 8 0a8 8 0 1 1 -16 0a12 12 0 1 1 24 0" stroke="#ffffff" stroke-opacity="0.8" stroke-width="3" fill="none"/>`, '') +
      // The tower and its windows: a guest, curtains, a lamp
      `<rect x="290" y="104" width="220" height="280" rx="10" fill="#e6e6f0"/><rect x="290" y="370" width="220" height="14" fill="#8d99ae"/>` + windows +
      `<rect x="308" y="127" width="24" height="26" rx="3" fill="#ffd166"/>` +
      diff(320, 140, 22, `<circle cx="320" cy="136" r="5" fill="#2b2d42"/><path d="M311 153q9 -14 18 0Z" fill="#2b2d42"/>`, '') +
      `<rect x="388" y="227" width="24" height="26" rx="3" fill="#ffd166"/>` +
      diff(400, 240, 22, `<path d="M388 227h9l-9 26ZM412 227h-9l9 26Z" fill="#ff6bd6"/>`, `<path d="M388 227h9l-9 26ZM412 227h-9l9 26Z" fill="#3a86ff"/>`) +
      diff(480, 290, 22, `<rect x="468" y="277" width="24" height="26" rx="3" fill="#ffd166"/>`, `<rect x="468" y="277" width="24" height="26" rx="3" fill="#2b2d42"/>`) +
      // Revolving restaurant: the neon star, the string lights
      `<path d="M400 80V60" stroke="#bfc7d5" stroke-width="3"/><ellipse cx="400" cy="96" rx="130" ry="18" fill="#8d99ae"/><rect x="290" y="92" width="220" height="6" fill="#bde3f2"/>` +
      diff(400, 44, 22, star(400, 44, 16, '#ff6bd6'), star(400, 44, 16, '#ffd23f')) +
      diff(472, 97, 22, lights, anim({ type: 'blink', duty: 0.5, period: 1 }, lights)) +
      // The pool sphere: the swimmer, the float
      `<path d="M244 230H290" stroke="#bfc7d5" stroke-width="10"/><circle cx="180" cy="230" r="64" fill="#7bdff2" fill-opacity="0.3" stroke="#bde3f2" stroke-width="4"/>` +
      `<path d="M117 236A64 64 0 0 0 243 236Z" fill="#3ae0ff" fill-opacity="0.5"/>` +
      diff(156, 226, 24, anim({ type: 'bob', dx: 0, dy: 3, period: 1.8 }, swimmer), swimmer) +
      diff(210, 262, 22, `<ellipse cx="210" cy="262" rx="12" ry="5" fill="none" stroke="#ff006e" stroke-width="5"/>`, `<ellipse cx="210" cy="262" rx="12" ry="5" fill="none" stroke="#ffd23f" stroke-width="5"/>`) +
      // The space taxi and its chequered stripe
      `<path d="M510 200H572" stroke="#bfc7d5" stroke-width="8"/><path d="M570 222V190Q570 182 580 182H680Q700 190 702 222Z" fill="#ffd23f"/><path d="M588 188H622V202H588Z" fill="#8ecae6"/>` +
      `<rect x="592" y="168" width="20" height="10" rx="2" fill="#f1f1f1"/><path d="M602 178v4" stroke="#5c677d" stroke-width="2"/><circle cx="590" cy="226" r="5" fill="#ff7b54"/><circle cx="680" cy="226" r="5" fill="#ff7b54"/>` +
      diff(660, 211, 22, `<rect x="640" y="208" width="40" height="7" fill="#ffffff"/><path d="M640 208h5v7h-5ZM650 208h5v7h-5ZM660 208h5v7h-5ZM670 208h5v7h-5Z" fill="#2b2b2b"/>`, '') +
      // The maintenance robot, the room-service drone
      `<path d="M510 330Q530 360 552 340" stroke="#bfc7d5" stroke-width="2" fill="none"/>` + robot(560, 340, '#bfc7d5', '#3ae0ff') + `<rect x="570" y="304" width="8" height="18" rx="2" fill="#5c677d"/>` +
      diff(560, 297, 22, `<circle cx="556" cy="297" r="2.5" fill="#3ae0ff"/><circle cx="564" cy="297" r="2.5" fill="#3ae0ff"/>`, `<circle cx="556" cy="297" r="2.5" fill="#ff3b3b"/><circle cx="564" cy="297" r="2.5" fill="#ff3b3b"/>`) +
      diff(680, 322, 24, drone, anim({ type: 'bob', dx: 3, dy: 4, period: 2.2 }, drone)) +
      // The tourist's selfie phone
      astronaut(90, 380, '#f1f1f1', '#ffb703') + `<path d="M104 352L138 330" stroke="#8d99ae" stroke-width="2"/>` +
      diff(140, 324, 22, `<rect x="134" y="316" width="12" height="16" rx="2" fill="#ff006e"/>`, `<rect x="134" y="316" width="12" height="16" rx="2" fill="#3a86ff"/>`) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['spaceStar', 600, 60],
        ['sparkle', 240, 120],
        ['ringPlanet', 720, 120],
        ['asteroid', 760, 360],
        ['probe', 240, 360],
      ])
    )
  },
})
