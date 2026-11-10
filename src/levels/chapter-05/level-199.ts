// Cloud city: platforms floating in a gas giant's sky among the space world's ten hardest (hidden until released,
// levels/upcoming.ts). New in space: a floating city with a dome, a tower with its banner and spire light and a
// thruster below, a docked airship, a cable car between platforms, a greenhouse platform with a gas collector
// balloon, a sky manta, a hover car and a lantern balloon. Motion differences: the spire light flashes and the
// hover car bobs only on picture A; the sky manta glides only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { dome } from './shapes.ts'

/** Sky manta, a gas creature; (x, y) = center. Bounds: x ±32, y from −14 to +22. */
const skyManta = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M0 6Q4 14 -2 22" stroke="#9d4edd" stroke-width="2" fill="none"/><path d="M-32 0Q-16 -14 0 -8Q16 -14 32 0Q16 6 0 8Q-16 6 -32 0Z" fill="#9d4edd"/>` +
  `<circle cx="-4" cy="-4" r="1.6" fill="#fff"/><circle cx="4" cy="-4" r="1.6" fill="#fff"/><path d="M-20 -2q8 -4 14 0M20 -2q-8 -4 -14 0" stroke="#e0aaff" stroke-width="2" fill="none"/></g>`

/** Hover car facing right; (x, y) = center. Bounds: x ±22, y from −12 to +12. */
const hoverCar = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="10" rx="16" ry="2.5" fill="#3ae0ff" fill-opacity="0.6"/><path d="M-22 6V0Q-20 -4 -12 -4L-6 -12H8L16 -4Q22 -2 22 6Z" fill="#e63946"/>` +
  `<path d="M-4 -10H6L12 -4H-8Z" fill="#8ecae6"/><circle cx="20" cy="2" r="2" fill="#fff3b0"/></g>`

export default svgLevel({
  id: 199,
  chapter: 'space',
  title: 'cloudCity',
  parTimeSec: 108,
  scene: ({ diff, anim, extra }) => {
    const spireLight = `<circle cx="450" cy="84" r="5" fill="#ff3b3b"/><circle cx="450" cy="84" r="10" fill="#ff3b3b" fill-opacity="0.35"/>`
    const manta = skyManta(560, 120)
    const car = hoverCar(300, 372)
    return (
      `<rect width="800" height="500" fill="#f8c58d"/><rect width="800" height="130" fill="#f4a261" fill-opacity="0.5"/>` +
      `<circle cx="100" cy="70" r="34" fill="#fff3b0" fill-opacity="0.5"/><circle cx="100" cy="70" r="22" fill="#fff3b0"/>` +
      diff(560, 122, 36, manta, anim({ type: 'bob', dx: 4, dy: 5, period: 3 }, manta)) +
      // The lower cloud layers
      anim({ type: 'path', points: [[0, 0], [40, 0]], period: 20 }, `<path d="M-40 400Q0 380 40 396T120 392T200 396T280 390T360 398T440 390T520 396T600 390T680 396T760 392T840 398V500H-40Z" fill="#fde8c8"/>`) +
      anim({ type: 'path', points: [[0, 0], [-40, 0]], period: 24 }, `<path d="M-40 446Q0 430 40 444T120 440T200 446T280 438T360 446T440 440T520 446T600 438T680 444T760 440T840 446V500H-40Z" fill="#f9d9a8"/>`) +
      // The left platform: the airship's window and fin
      `<ellipse cx="130" cy="290" rx="80" ry="14" fill="#8d99ae"/><path d="M50 290Q130 320 210 290Z" fill="#5c677d"/><path d="M110 276L120 230M150 276L140 230" stroke="#5c677d" stroke-width="1.5"/>` +
      `<ellipse cx="130" cy="210" rx="60" ry="22" fill="#d4a373"/><path d="M80 210H180" stroke="#a98058" stroke-width="2"/><path d="M182 214L198 228L178 222Z" fill="#e76f51"/>` +
      diff(186, 190, 22, `<path d="M180 200L196 182L192 202Z" fill="#e76f51"/>`, `<path d="M180 200L196 182L192 202Z" fill="#3a86ff"/>`) +
      `<rect x="106" y="230" width="48" height="16" rx="4" fill="#f1f1f1"/><circle cx="116" cy="238" r="3.5" fill="#8ecae6"/><circle cx="130" cy="238" r="3.5" fill="#8ecae6"/>` +
      diff(144, 238, 22, `<circle cx="144" cy="238" r="3.5" fill="#8ecae6"/>`, '') +
      // The cable car between the platforms
      `<path d="M190 280V262M270 250V232" stroke="#5c677d" stroke-width="3"/><path d="M190 262L270 232" stroke="#3d4a55" stroke-width="1.5"/><path d="M230 247V262" stroke="#3d4a55" stroke-width="1.5"/>` +
      diff(230, 270, 22, `<rect x="220" y="262" width="20" height="16" rx="3" fill="#ff006e"/><rect x="223" y="265" width="14" height="6" fill="#bde3f2"/>`, `<rect x="220" y="262" width="20" height="16" rx="3" fill="#2a9d8f"/><rect x="223" y="265" width="14" height="6" fill="#bde3f2"/>`) +
      // The city platform: dome window, tower banner, spire light, thruster
      `<path d="M250 262Q400 336 550 262Z" fill="#5c677d"/><ellipse cx="400" cy="262" rx="150" ry="22" fill="#8d99ae"/>` +
      `<rect x="300" y="230" width="30" height="24" fill="#e6e6f0"/><rect x="490" y="220" width="40" height="34" fill="#e6e6f0"/><rect x="498" y="228" width="8" height="8" fill="#ffd166"/><rect x="514" y="228" width="8" height="8" fill="#ffd166"/>` +
      dome(360, 252, 46) +
      diff(360, 222, 22, `<circle cx="360" cy="222" r="6" fill="#ffd166"/>`, `<circle cx="360" cy="222" r="6" fill="#ff6bd6"/>`) +
      `<rect x="430" y="120" width="40" height="134" fill="#e6e6f0"/><path d="M430 120L450 100L470 120Z" fill="#bfc7d5"/><path d="M450 100V90" stroke="#8d99ae" stroke-width="2"/>` +
      `<rect x="438" y="186" width="10" height="10" fill="#8ecae6"/><rect x="452" y="186" width="10" height="10" fill="#8ecae6"/><rect x="438" y="210" width="10" height="10" fill="#8ecae6"/><rect x="452" y="210" width="10" height="10" fill="#8ecae6"/>` +
      diff(450, 160, 22, `<rect x="434" y="150" width="32" height="20" fill="#e63946"/><circle cx="450" cy="160" r="5" fill="#ffd23f"/>`, `<rect x="434" y="150" width="32" height="20" fill="#3a86ff"/><circle cx="450" cy="160" r="5" fill="#ffd23f"/>`) +
      diff(450, 84, 22, anim({ type: 'blink', duty: 0.5, period: 1.2 }, spireLight), spireLight) +
      diff(400, 302, 22, `<circle cx="400" cy="302" r="9" fill="#3ae0ff" fill-opacity="0.8"/><circle cx="400" cy="302" r="4" fill="#ffffff"/>`, `<circle cx="400" cy="302" r="9" fill="#ff7b00" fill-opacity="0.8"/><circle cx="400" cy="302" r="4" fill="#ffffff"/>`) +
      // The greenhouse platform and its collector balloon
      `<ellipse cx="650" cy="290" rx="90" ry="14" fill="#8d99ae"/><path d="M560 290Q650 320 740 290Z" fill="#5c677d"/><path d="M720 280V180" stroke="#5c677d" stroke-width="1.5"/>` +
      dome(640, 284, 36, '#d8f3dc') +
      `<path d="M640 282V256M640 270q-10 -4 -12 -12M640 266q10 -4 12 -10" stroke="#40916c" stroke-width="3" fill="none"/>` +
      diff(640, 254, 22, `<circle cx="640" cy="252" r="6" fill="#ff006e"/>`, `<circle cx="640" cy="252" r="6" fill="#ffd23f"/>`) +
      `<circle cx="720" cy="150" r="30" fill="#f1f1f1"/><path d="M700 128q20 -10 40 0" stroke="#ffffff" stroke-width="4" fill="none"/>` +
      diff(720, 151, 28, `<path d="M694 146H746V156H694Z" fill="#2a9d8f"/>`, `<path d="M694 146H746V156H694Z" fill="#e63946"/>`) +
      // The hover car, the lantern balloon
      diff(300, 372, 28, anim({ type: 'bob', dx: 3, dy: 4, period: 2 }, car), car) +
      `<circle cx="60" cy="346" r="11" fill="#ffafcc"/><path d="M60 357V364" stroke="#5c677d" stroke-width="1.5"/>` +
      diff(60, 368, 22, `<rect x="55" y="364" width="10" height="10" rx="2" fill="#ffd166"/>`, `<rect x="55" y="364" width="10" height="10" rx="2" fill="#3ae0ff"/>`) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['ufo', 300, 110],
        ['sparkle', 220, 60],
        ['probe', 520, 380],
        ['planet', 760, 40, '#ffd23f'],
        ['spaceStar', 640, 384],
      ])
    )
  },
})
