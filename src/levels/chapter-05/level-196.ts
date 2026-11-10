// Alien jungle: an exoplanet rainforest among the space world's ten hardest (hidden until released,
// levels/upcoming.ts). New in space: giant mushroom trees with glowing spots and a hanging pod, a long-necked
// grazer with a frill, drifting spores, an explorer with a scanner and a sample jar, a snapping plant, a frog on a
// lily pad, a six-winged dragonfly and a crashed probe. Motion differences: the pod glows on and off and the
// snapping plant snaps only on picture A; the spores drift only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { astronaut, planet, starField } from './shapes.ts'

/** Long-necked grazer facing right, without its frill; (x, y) = feet under its body. Bounds: x from −60 to +80, y from −200 to 0. */
const longNeck = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-40 -30V0M-20 -30V0M20 -30V0M40 -30V0" stroke="#6a994e" stroke-width="10"/><path d="M-56 -46q-20 8 -24 24" stroke="#8ac926" stroke-width="8" fill="none"/>` +
  `<ellipse cy="-50" rx="60" ry="30" fill="#8ac926"/><path d="M30 -66Q60 -110 64 -190" stroke="#8ac926" stroke-width="16" fill="none" stroke-linecap="round"/>` +
  `<ellipse cx="70" cy="-190" rx="14" ry="9" fill="#8ac926"/><circle cx="74" cy="-193" r="2" fill="#222"/><circle cx="-36" cy="-58" r="7" fill="#6a994e"/><circle cx="6" cy="-66" r="6" fill="#6a994e"/></g>`

/** Snapping plant's open jaws on a stem at (x, y) = stem top. Bounds: x from −8 to +32, y from −30 to +4. */
const jaws = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 0Q4 -32 32 -22Q12 -18 -6 0Z" fill="#e63946"/><path d="M-6 0Q16 6 32 -6Q10 -8 -6 0Z" fill="#e63946"/>` +
  `<path d="M6 -16l3 4l3 -5l3 4l3 -5M8 -2l3 -4l3 4l3 -4" stroke="#f1f1f1" stroke-width="1.5" fill="none"/></g>`

/** Dragonfly's six wings for one at (x, y) = body center. Bounds: x from −18 to +14, y from −14 to +2. */
const wings = (x: number, y: number, color: string) =>
  `<g fill="${color}" fill-opacity="0.8"><ellipse cx="${x - 10}" cy="${y - 7}" rx="8" ry="3" transform="rotate(-20 ${x - 10} ${y - 7})"/>` +
  `<ellipse cx="${x}" cy="${y - 8}" rx="8" ry="3" transform="rotate(-30 ${x} ${y - 8})"/><ellipse cx="${x + 8}" cy="${y - 6}" rx="6" ry="2.5" transform="rotate(-40 ${x + 8} ${y - 6})"/></g>`

export default svgLevel({
  id: 196,
  chapter: 'space',
  title: 'alienJungle',
  parTimeSec: 106,
  scene: ({ diff, anim, rand, extra }) => {
    const pod = `<ellipse cx="330" cy="196" rx="8" ry="11" fill="#ccff33"/><ellipse cx="330" cy="196" rx="4" ry="6" fill="#f4ffb0"/>`
    const spores = `<circle cx="414" cy="118" r="5" fill="#e0aaff"/><circle cx="426" cy="110" r="4" fill="#e0aaff"/><circle cx="425" cy="126" r="3" fill="#e0aaff"/>`
    const snap = jaws(360, 436)
    return (
      `<rect width="800" height="500" fill="#1d3b3a"/>` + starField(rand, 0, 200, 30) + planet(680, 90, 34, '#e9c46a', '#f4a261') +
      diff(752, 46, 22, `<circle cx="752" cy="46" r="9" fill="#bfc7d5"/>`, `<circle cx="752" cy="46" r="9" fill="#ff9f43"/>`) +
      diff(420, 118, 24, spores, anim({ type: 'bob', dx: 2, dy: -6, period: 3 }, spores)) +
      `<path d="M0 300Q120 236 260 270T560 250T800 270V330H0Z" fill="#3b2d5c"/>` +
      // The long-necked grazer: frill, a spot
      longNeck(500, 340) +
      diff(556, 144, 22, `<path d="M562 150L544 132L556 138L552 124L564 136L568 126L572 144Z" fill="#ff006e"/>`, `<path d="M562 150L544 132L556 138L552 124L564 136L568 126L572 144Z" fill="#3ae0ff"/>`) +
      diff(476, 282, 22, `<circle cx="476" cy="282" r="7" fill="#6a994e"/>`, '') +
      `<path d="M0 330Q400 310 800 330V500H0Z" fill="#2d5a3d"/><path d="M0 440Q400 428 800 440V500H0Z" fill="#244a32"/>` +
      // Mushroom trees: a glowing spot, the hanging pod
      `<rect x="100" y="180" width="20" height="152" fill="#e9d8fd"/><path d="M40 190Q110 110 180 190Z" fill="#b388eb"/><circle cx="80" cy="170" r="6" fill="#e0aaff"/><circle cx="142" cy="168" r="6" fill="#e0aaff"/>` +
      diff(110, 152, 22, `<circle cx="110" cy="150" r="7" fill="#e0aaff"/>`, '') +
      `<rect x="292" y="160" width="16" height="172" fill="#e9d8fd"/><path d="M240 170Q300 100 360 170Z" fill="#ff6bd6"/><circle cx="276" cy="150" r="5" fill="#ffc6e9"/><path d="M330 170V185" stroke="#6a994e" stroke-width="2"/>` +
      diff(330, 196, 22, anim({ type: 'blink', duty: 0.6, period: 1.6 }, pod), pod) +
      // Big leaves at the edges
      `<path d="M0 500Q10 400 70 380Q40 440 60 500Z" fill="#40916c"/><path d="M800 500Q790 410 730 390Q770 450 750 500Z" fill="#40916c"/>` +
      // The explorer's scanner, the sample jar
      astronaut(200, 452, '#f1f1f1', '#3ae0ff') + `<rect x="212" y="406" width="20" height="16" rx="3" fill="#3d4a55"/>` +
      diff(222, 414, 22, `<rect x="216" y="409" width="12" height="10" fill="#ccff33"/>`, `<rect x="216" y="409" width="12" height="10" fill="#ff006e"/>`) +
      diff(150, 465, 22, `<rect x="143" y="456" width="14" height="18" rx="2" fill="#bde3f2" fill-opacity="0.7"/><rect x="142" y="452" width="16" height="5" fill="#8d99ae"/><circle cx="150" cy="467" r="4" fill="#ccff33"/>`, '') +
      // The snapping plant
      `<path d="M360 476V436" stroke="#40916c" stroke-width="5"/><path d="M360 476q-24 -6 -26 -20q16 2 26 20ZM360 476q22 -8 24 -22q-16 4 -24 22Z" fill="#40916c"/>` +
      diff(372, 422, 32, anim({ type: 'sway', angle: 8, pivot: [360, 436], period: 1.2 }, snap), snap) +
      // The pond and its frog, the dragonfly
      `<ellipse cx="620" cy="462" rx="70" ry="16" fill="#3ae0ff" fill-opacity="0.7"/><ellipse cx="600" cy="458" rx="20" ry="5" fill="#40916c"/>` +
      diff(600, 447, 22, `<ellipse cx="600" cy="448" rx="11" ry="8" fill="#ff9f43"/>`, `<ellipse cx="600" cy="448" rx="11" ry="8" fill="#8338ec"/>`) +
      `<circle cx="595" cy="440" r="4" fill="#fff"/><circle cx="605" cy="440" r="4" fill="#fff"/><circle cx="595" cy="440" r="1.8" fill="#222"/><circle cx="605" cy="440" r="1.8" fill="#222"/>` +
      `<path d="M664 320H698" stroke="#2a9d8f" stroke-width="4" stroke-linecap="round"/><circle cx="701" cy="320" r="4" fill="#2a9d8f"/>` +
      diff(684, 316, 22, wings(684, 320, '#7bdff2'), wings(684, 320, '#ffd23f')) +
      // The crashed probe and its light
      `<g transform="rotate(-18 740 470)"><rect x="716" y="448" width="48" height="26" rx="4" fill="#bfc7d5"/><rect x="764" y="454" width="22" height="12" fill="#3a86ff"/><path d="M740 448V436" stroke="#8d99ae" stroke-width="2"/></g>` +
      diff(729, 434, 22, `<circle cx="729" cy="434" r="5" fill="#ff3b3b"/>`, `<circle cx="729" cy="434" r="5" fill="#8ac926"/>`) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['alienPlant', 40, 470],
        ['crystal', 470, 486],
        ['sparkle', 260, 60],
        ['planet', 120, 60, '#7bdff2'],
        ['probe', 540, 380],
      ])
    )
  },
})
