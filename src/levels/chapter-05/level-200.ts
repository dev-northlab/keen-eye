// Wormhole gate: a ring gate to the far side of the galaxy, the space world's hardest scene (hidden until released,
// levels/upcoming.ts). New in space: a gate ring with its lights around a swirling wormhole and a ship coming out
// of it, a cargo hauler with containers, a courier ship, a family saucer, a customs booth with a robot officer and
// its stop light, traffic buoys, an alien in a bubble pod and a space whale. Motion differences: a gate light
// flashes and the bubble pod drifts only on picture A; the hauler's engine fires only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { starField, ufo } from './shapes.ts'

/** Space whale facing left, without one of its spots; (x, y) = center. Bounds: x from −92 to +96, y from −34 to +32. */
const spaceWhale = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M70 -4L96 -26L90 0L96 24Z" fill="#3d5a80"/><path d="M-92 4Q-86 -34 -20 -32Q50 -28 76 -2Q40 26 -20 28Q-80 30 -92 4Z" fill="#3d5a80"/>` +
  `<path d="M-86 10Q-40 26 40 12" stroke="#98c1d9" stroke-width="6" fill="none"/><circle cx="-64" cy="-6" r="3" fill="#e0fbfc"/>` +
  `<circle cx="-30" cy="-18" r="4" fill="#e0fbfc" fill-opacity="0.8"/><circle cx="-6" cy="-22" r="3.5" fill="#e0fbfc" fill-opacity="0.8"/><circle cx="36" cy="-14" r="4" fill="#e0fbfc" fill-opacity="0.8"/></g>`

/** Traffic buoy; (x, y) = bottom center, light separate. Bounds: x ±6, y from −16 to 0. */
const buoy = (x: number, y: number) =>
  `<rect x="${x - 6}" y="${y - 12}" width="12" height="12" rx="3" fill="#bfc7d5"/><path d="M${x} ${y - 12}V${y - 16}" stroke="#8d99ae" stroke-width="2"/>`

export default svgLevel({
  id: 200,
  chapter: 'space',
  title: 'wormholeGate',
  parTimeSec: 112,
  scene: ({ diff, anim, rand, extra }) => {
    const gateLight = `<circle cx="550" cy="220" r="6" fill="#3ae0ff"/><circle cx="550" cy="220" r="11" fill="#3ae0ff" fill-opacity="0.35"/>`
    const flame = `<path d="M54 144L30 150L54 156Z" fill="#ff7b54"/><path d="M54 147L40 150L54 153Z" fill="#ffd23f"/>`
    const pod = `<circle cx="520" cy="450" r="22" fill="#bde3f2" fill-opacity="0.35" stroke="#e0fbfc" stroke-width="2"/><circle cx="520" cy="454" r="8" fill="#8ac926"/>` +
      `<circle cx="520" cy="452" r="3" fill="#fff"/><circle cx="520" cy="452" r="1.4" fill="#222"/><path d="M512 440q4 -4 8 -2" stroke="#ffffff" stroke-width="2" fill="none"/>`
    let lights = ''
    for (let a = 0; a < 360; a += 30) {
      if (a === 0 || a === 270) continue
      const r = (a * Math.PI) / 180
      lights += `<circle cx="${(400 + 150 * Math.cos(r)).toFixed(1)}" cy="${(220 + 150 * Math.sin(r)).toFixed(1)}" r="5" fill="#ffd23f"/>`
    }
    let swirl = ''
    for (let i = 0; i < 4; i++) swirl += `<path d="M400 220Q${400 + 60} ${220 - 20} ${400 + 110} ${220 + 30}" stroke="#c77dff" stroke-opacity="0.5" stroke-width="6" fill="none" transform="rotate(${i * 90} 400 220)"/>`
    return (
      `<rect width="800" height="500" fill="#120a2e"/><ellipse cx="600" cy="140" rx="200" ry="90" fill="#7b2cbf" fill-opacity="0.25"/>` + starField(rand, 0, 500, 70) +
      // The space whale and its spot
      spaceWhale(690, 100) + diff(708, 90, 22, `<circle cx="708" cy="90" r="4" fill="#e0fbfc" fill-opacity="0.8"/>`, '') +
      // The gate: ring lights, the swirling wormhole, the ship coming out
      `<circle cx="400" cy="220" r="128" fill="#3c096c"/>` + anim({ type: 'rotate', pivot: [400, 220], period: 12 }, swirl) +
      `<circle cx="400" cy="220" r="150" fill="none" stroke="#8d99ae" stroke-width="22"/><circle cx="400" cy="220" r="150" fill="none" stroke="#5c677d" stroke-width="4" stroke-dasharray="10 16"/>` + lights +
      diff(400, 70, 22, `<circle cx="400" cy="70" r="5" fill="#ffd23f"/>`, `<circle cx="400" cy="70" r="5" fill="#ff006e"/>`) +
      diff(550, 220, 22, anim({ type: 'blink', duty: 0.5, period: 1 }, gateLight), gateLight) +
      diff(400, 220, 24, `<path d="M384 228L412 220L384 212L390 220Z" fill="#f1f1f1"/><circle cx="404" cy="220" r="2" fill="#3ae0ff"/>`, '') +
      // The cargo hauler: a container, the engine
      `<rect x="60" y="140" width="190" height="20" rx="4" fill="#8d99ae"/><path d="M250 140L272 150L250 160Z" fill="#bfc7d5"/><rect x="54" y="144" width="8" height="12" fill="#5c677d"/>` +
      `<rect x="90" y="126" width="20" height="14" fill="#e63946"/><rect x="114" y="126" width="20" height="14" fill="#ffd23f"/><rect x="164" y="126" width="20" height="14" fill="#2a9d8f"/><rect x="188" y="126" width="20" height="14" fill="#3a86ff"/>` +
      diff(150, 133, 22, `<rect x="140" y="126" width="20" height="14" fill="#ff9f43"/>`, `<rect x="140" y="126" width="20" height="14" fill="#8338ec"/>`) +
      diff(46, 150, 22, flame, anim({ type: 'blink', duty: 0.6, period: 0.6 }, flame)) +
      // The courier and its wing stripe
      `<path d="M150 304L220 296L230 304L220 312Z" fill="#f1f1f1"/><path d="M170 304L196 284H206L196 304Z" fill="#bfc7d5"/><path d="M170 306L196 324H206L196 306Z" fill="#bfc7d5"/><circle cx="214" cy="304" r="3" fill="#3ae0ff"/>` +
      diff(188, 306, 22, `<path d="M180 314L194 318" stroke="#e63946" stroke-width="3"/>`, `<path d="M180 314L194 318" stroke="#ffd23f" stroke-width="3"/>`) +
      // The family saucer's lights
      ufo(620, 400, '#2a9d8f', '#ffd23f') +
      diff(620, 404, 24, `<circle cx="600" cy="403" r="3" fill="#ffd23f"/><circle cx="620" cy="404" r="3" fill="#ffd23f"/><circle cx="640" cy="403" r="3" fill="#ffd23f"/>`, `<circle cx="600" cy="403" r="3" fill="#ff006e"/><circle cx="620" cy="404" r="3" fill="#ff006e"/><circle cx="640" cy="403" r="3" fill="#ff006e"/>`) +
      // The customs booth: the officer's eyes, the stop light
      `<rect x="20" y="440" width="180" height="26" rx="6" fill="#5c677d"/><rect x="50" y="380" width="70" height="60" rx="4" fill="#e6e6f0"/><rect x="60" y="392" width="50" height="28" fill="#1d3557"/>` +
      `<rect x="70" y="400" width="20" height="16" rx="3" fill="#8d99ae"/><path d="M150 440V388" stroke="#8d99ae" stroke-width="3"/><rect x="142" y="372" width="16" height="16" rx="3" fill="#2b2d42"/>` +
      diff(80, 408, 22, `<circle cx="76" cy="407" r="2.5" fill="#3ae0ff"/><circle cx="84" cy="407" r="2.5" fill="#3ae0ff"/>`, `<circle cx="76" cy="407" r="2.5" fill="#ffd23f"/><circle cx="84" cy="407" r="2.5" fill="#ffd23f"/>`) +
      diff(150, 380, 22, `<circle cx="150" cy="380" r="6" fill="#ff3b3b"/>`, `<circle cx="150" cy="380" r="6" fill="#8ac926"/>`) +
      // Traffic buoys and their lights
      buoy(250, 452) + `<circle cx="250" cy="434" r="4" fill="#ff9f43"/>` + buoy(350, 420) + `<circle cx="350" cy="402" r="4" fill="#ff9f43"/>` + buoy(300, 438) +
      diff(300, 424, 22, `<circle cx="300" cy="420" r="4" fill="#ff9f43"/>`, `<circle cx="300" cy="420" r="4" fill="#3ae0ff"/>`) +
      // The bubble pod
      diff(520, 450, 32, anim({ type: 'bob', dx: 4, dy: 4, period: 3 }, pod), pod) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['spaceStar', 300, 40],
        ['sparkle', 740, 300],
        ['asteroid', 700, 470],
        ['planet', 60, 40, '#ff9f43'],
        ['probe', 250, 360],
      ])
    )
  },
})
