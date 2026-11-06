// Space zoo: alien enclosures under two moons among the space world's ten hardest (hidden until released,
// levels/upcoming.ts). New in space: a water tank with a floating jelly creature and its plant, a paddock with a
// six-legged grazer and a hopping blob, an aviary with a crested bird and its bowl, a robot keeper with a bucket,
// a hovering snack cart with a balloon and an alien family. Motion differences: the jelly creature floats only on
// picture B; the blob hops and the balloon sways only on A.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { alien, planet, robot, starField } from './shapes.ts'

/** Floating jelly creature; (x, y) = bell center. Bounds: x ±16, y from −14 to +22. */
const jelly = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-10 4q-4 8 0 18M-3 4q3 8 0 16M4 4q-3 8 1 18M10 4q4 8 0 16" stroke="#ff6bd6" stroke-width="2.5" fill="none"/>` +
  `<path d="M-16 4a16 18 0 0 1 32 0Z" fill="#ff6bd6"/><circle cx="-5" cy="-3" r="2.5" fill="#fff"/><circle cx="5" cy="-3" r="2.5" fill="#fff"/><circle cx="-5" cy="-3" r="1.2" fill="#222"/><circle cx="5" cy="-3" r="1.2" fill="#222"/></g>`

/** Six-legged grazer facing left, without its horn; (x, y) = feet under its middle. Bounds: x from −68 to +52, y from −50 to 0. */
const grazer = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-34 -24V0M-18 -24V0M-2 -24V0M14 -24V0M30 -24V0M42 -24V0" stroke="#c9a03f" stroke-width="5"/>` +
  `<ellipse cy="-36" rx="50" ry="20" fill="#e9c46a"/><path d="M50 -40q10 4 2 14" stroke="#e9c46a" stroke-width="5" fill="none"/>` +
  `<circle cx="-54" cy="-46" r="14" fill="#e9c46a"/><circle cx="-60" cy="-50" r="2" fill="#222"/><path d="M-66 -40q4 3 8 0" stroke="#222" stroke-width="1.5" fill="none"/>` +
  `<circle cx="-20" cy="-42" r="6" fill="#c97b3a"/><circle cx="2" cy="-46" r="5" fill="#c97b3a"/></g>`

/** Hopping blob with an eye stalk; (x, y) = bottom center. Bounds: x ±20, y from −40 to 0. */
const blob = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M0 -28V-36" stroke="#8ac926" stroke-width="3"/><circle cy="-37" r="5" fill="#ffffff"/><circle cx="1" cy="-37" r="2.2" fill="#222"/>` +
  `<path d="M-20 0Q-20 -30 0 -30Q20 -30 20 0Z" fill="#8ac926"/><path d="M-8 -10q8 6 16 0" stroke="#3d6b1a" stroke-width="2" fill="none"/></g>`

/** Crested aviary bird on a perch, faces right, without its crest; (x, y) = feet. Bounds: x from −20 to +22, y from −52 to +24. */
const bird = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 -6L-16 24M-2 -6L-8 24" stroke="#ff9f43" stroke-width="4" stroke-linecap="round"/>` +
  `<ellipse cy="-18" rx="14" ry="16" fill="#2a9d8f"/><path d="M-12 -24q-8 10 2 18" fill="#1d6b62"/><circle cx="10" cy="-40" r="9" fill="#2a9d8f"/>` +
  `<path d="M18 -42l8 3l-8 3Z" fill="#ffd23f"/><circle cx="12" cy="-42" r="1.6" fill="#222"/><path d="M-3 0v4M3 0v4" stroke="#ffd23f" stroke-width="2"/></g>`

export default svgLevel({
  id: 192,
  chapter: 'space',
  title: 'spaceZoo',
  parTimeSec: 100,
  scene: ({ diff, anim, rand, extra }) => {
    const floater = jelly(110, 266)
    const hopper = blob(470, 396)
    const balloon = `<path d="M262 420V386" stroke="#f1f1f1" stroke-width="1"/><circle cx="262" cy="376" r="10" fill="#ff006e"/><path d="M258 372q2 -4 6 -4" stroke="#fff" stroke-opacity="0.6" stroke-width="2" fill="none"/>`
    let bars = ''
    for (let x = 596; x <= 756; x += 16) bars += `<path d="M${x} 176V380" stroke="#bfc7d5" stroke-width="2.5"/>`
    let fence = ''
    for (let x = 230; x <= 530; x += 30) fence += `<rect x="${x - 3}" y="370" width="6" height="32" fill="#a0703f"/>`
    return (
      `<rect width="800" height="500" fill="#2a1b4d"/>` + starField(rand, 0, 240, 40) + planet(150, 80, 26, '#ff9f43') + planet(620, 70, 14, '#7bdff2') +
      `<path d="M0 330Q200 316 400 330T800 326V500H0Z" fill="#3f6e5a"/><path d="M0 430Q400 418 800 430V500H0Z" fill="#6a8f7a"/>` +
      // The water tank: floating jelly, its plant, the sign
      `<rect x="30" y="210" width="160" height="132" fill="#7bdff2" fill-opacity="0.3" stroke="#bde3f2" stroke-width="3"/><path d="M32 224H188" stroke="#bde3f2" stroke-width="2"/>` +
      `<path d="M60 340Q54 328 60 318M60 340Q70 332 66 324" stroke="#2a9d8f" stroke-width="3" fill="none"/>` +
      diff(60, 320, 22, `<circle cx="60" cy="316" r="4" fill="#ffd23f"/><circle cx="67" cy="322" r="4" fill="#ffd23f"/>`, `<circle cx="60" cy="316" r="4" fill="#ff6bd6"/><circle cx="67" cy="322" r="4" fill="#ff6bd6"/>`) +
      diff(110, 269, 26, floater, anim({ type: 'bob', dx: 0, dy: 3, period: 2.4 }, floater)) +
      `<rect x="26" y="340" width="168" height="10" fill="#5c677d"/><rect x="92" y="352" width="36" height="16" rx="2" fill="#f1f1f1"/>` +
      diff(110, 360, 22, `<circle cx="110" cy="360" r="5" fill="#ff6bd6"/>`, `<circle cx="110" cy="360" r="5" fill="#3a86ff"/>`) +
      // The paddock: grazer's horn and spot, the hopping blob, the fence
      grazer(350, 396) +
      diff(296, 328, 22, `<path d="M290 338L298 314L304 336Z" fill="#f1f1f1"/>`, '') +
      diff(376, 362, 22, `<circle cx="376" cy="362" r="6" fill="#c97b3a"/>`, `<circle cx="376" cy="362" r="6" fill="#e76f51"/>`) +
      diff(470, 376, 32, anim({ type: 'bob', dx: 0, dy: -8, period: 0.9 }, hopper), hopper) +
      fence + `<path d="M226 378H534M226 392H534" stroke="#a0703f" stroke-width="4"/>` +
      // The aviary: the bird's crest, its bowl
      `<path d="M592 178Q676 120 760 178Z" fill="#5c677d"/><path d="M612 284H744" stroke="#a0703f" stroke-width="5"/>` + bird(680, 282) +
      diff(688, 226, 22, `<path d="M684 233L680 216L688 228L690 212L694 230L700 220L696 234Z" fill="#ff006e"/>`, `<path d="M684 233L680 216L688 228L690 212L694 230L700 220L696 234Z" fill="#ffd23f"/>`) +
      diff(730, 366, 22, `<path d="M716 362H744L738 374H722Z" fill="#e63946"/><circle cx="726" cy="361" r="3" fill="#8ac926"/><circle cx="734" cy="361" r="3" fill="#8ac926"/>`, '') +
      bars + `<rect x="590" y="378" width="172" height="8" fill="#5c677d"/>` +
      // Snack cart and its balloon, the alien family, the robot keeper's bucket
      `<ellipse cx="230" cy="470" rx="40" ry="5" fill="#7bdff2" fill-opacity="0.5"/><rect x="190" y="424" width="80" height="34" rx="4" fill="#ff9fcf"/><path d="M186 424h88l-6 -10h-76Z" fill="#ffd23f"/>` +
      `<circle cx="214" cy="440" r="7" fill="#ffd23f"/><circle cx="242" cy="440" r="7" fill="#7bdff2"/>` +
      diff(262, 393, 30, anim({ type: 'sway', angle: 10, pivot: [262, 420], period: 2 }, balloon), balloon) +
      alien(420, 480, '#8ac926', 2) + alien(380, 480, '#ffb703', 1) +
      diff(380, 449, 22, '', `<circle cx="380" cy="449" r="5" fill="#ffb703"/><circle cx="376" cy="449" r="3" fill="#fff"/><circle cx="384" cy="449" r="3" fill="#fff"/><circle cx="376" cy="449" r="1.4" fill="#222"/><circle cx="384" cy="449" r="1.4" fill="#222"/>`) +
      robot(560, 480) +
      diff(578, 452, 22, `<path d="M570 444H586L584 462H572Z" fill="#3a86ff"/><path d="M570 444q8 -10 16 0" stroke="#5c677d" stroke-width="1.5" fill="none"/>`, `<path d="M570 444H586L584 462H572Z" fill="#ff9f43"/><path d="M570 444q8 -10 16 0" stroke="#5c677d" stroke-width="1.5" fill="none"/>`) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['spaceStar', 400, 60],
        ['sparkle', 520, 150],
        ['ufo', 330, 160],
        ['alienPlant', 30, 470],
        ['moonPebbles', 700, 470],
      ])
    )
  },
})
