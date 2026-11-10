// Outdoor cinema: a film night on a meadow, by day and in the evening, among the ten hardest of "time" (hidden until
// released, levels/upcoming.ts). A big screen with its speaker, a projector booth with a flag, a popcorn kiosk,
// deckchairs, parked cars, a picnic on a blanket and a child with a balloon; the film plays on the screen at night.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, awning, bin, bird, birds, bulbs, bush, car, cityTree, cloud, cone, crate, dog, DUSK, flowerBox, glow, lampHead, lampPost, moon, person, pigeon, sky, small, stars, sun } from './shapes.ts'

/** Deckchair facing the screen, without its fabric; (x, y) = ground center. Bounds: x ±14, y from −26 to 0. */
const chair = (x: number, y: number) =>
  `<path d="M${x - 12} ${y}L${x + 8} ${y - 26}M${x + 12} ${y}L${x - 4} ${y - 14}" stroke="#a0703f" stroke-width="3"/>`
/** The deckchair's fabric for a chair at (x, y). Bounds: x from −10 to +10, y from −24 to −4. */
const fabric = (x: number, y: number, color: string) => `<path d="M${x - 10} ${y - 4}L${x + 6} ${y - 24}L${x + 10} ${y - 20}L${x - 4} ${y - 4}Z" fill="${color}"/>`

export default svgLevel({
  id: 233,
  chapter: 'time',
  title: 'outdoorCinema',
  pair: 'day-night',
  parTimeSec: 160,
  scene: ({ diff, time, trap, extra, anim }) => {
    const film =
      `<rect x="248" y="88" width="304" height="154" fill="#5fa8d3"/><path d="M248 242V200Q330 160 400 200T552 190V242Z" fill="#3f9a5a"/>` +
      `<circle cx="480" cy="130" r="18" fill="#ffd23f"/><path d="M330 200l14 -40l14 40Z" fill="#e63946"/>`
    const projectorBeam = `<path d="M676 290L560 90V240Z" fill="#fff3b0" fill-opacity="0.18"/>`
    return (
      sky(time(false, true), 300) +
      `<rect y="300" width="800" height="200" fill="#7fb24a"/>` +
      // The screen and its speaker
      `<path d="M250 300V80M550 300V80" stroke="#5c677d" stroke-width="8"/><rect x="240" y="80" width="320" height="170" fill="#f4f1e8" stroke="#3d4a55" stroke-width="4"/>` +
      `<path d="M236 220H250" stroke="#5c677d" stroke-width="3"/>` +
      diff(...around(216, 208, 236, 232), `<rect x="216" y="208" width="20" height="24" rx="3" fill="#3d4a55"/><circle cx="226" cy="220" r="5" fill="#8d99ae"/>`, `<rect x="216" y="208" width="20" height="24" rx="3" fill="#e63946"/><circle cx="226" cy="220" r="5" fill="#8d99ae"/>`) +
      // The projector booth: window, flag
      `<rect x="640" y="250" width="100" height="90" fill="#6b4f3a"/><rect x="634" y="240" width="112" height="12" fill="#4a3426"/><rect x="706" y="300" width="24" height="40" fill="#4a3426"/>` +
      diff(...around(676, 280, 704, 300), `<rect x="676" y="280" width="28" height="20" fill="#bde3f2"/>`, '') +
      `<path d="M720 240V206" stroke="#5c677d" stroke-width="2"/>` +
      diff(...around(720, 206, 744, 220), `<rect x="720" y="206" width="24" height="14" fill="#e63946"/>`, `<rect x="720" y="206" width="24" height="14" fill="#3a86ff"/>`) +
      // The popcorn kiosk: its sign, a cup on the counter
      `<rect x="40" y="300" width="120" height="80" fill="#f4f1e8"/><rect x="50" y="316" width="100" height="34" fill="#3d4a55"/><rect x="46" y="356" width="20" height="16" fill="#5c677d"/>` +
      awning(100, 286, 124, '#e63946') + `<rect x="70" y="262" width="60" height="22" rx="3" fill="#ffffff" stroke="#e63946" stroke-width="2"/>` +
      diff(...around(92, 264, 108, 284), `<path d="M92 268H108L105 284H95Z" fill="#e63946"/><path d="M97 268v16M103 268v16" stroke="#ffffff" stroke-width="2"/><circle cx="96" cy="266" r="3" fill="#fff3b0"/><circle cx="103" cy="265" r="3" fill="#fff3b0"/>`,
        `<path d="M92 268H108L105 284H95Z" fill="#3a86ff"/><path d="M97 268v16M103 268v16" stroke="#ffffff" stroke-width="2"/><circle cx="96" cy="266" r="3" fill="#fff3b0"/><circle cx="103" cy="265" r="3" fill="#fff3b0"/>`) +
      diff(...around(134, 330, 146, 346), `<path d="M134 330H146L144 346H136Z" fill="#ffd23f"/><path d="M142 330l3 -6" stroke="#e63946" stroke-width="1.5"/>`, '') +
      // Deckchairs, the cars, the picnic basket, the child's balloon, the bin
      chair(250, 404) + fabric(250, 404, '#2a9d8f') + chair(350, 404) + fabric(350, 404, '#2a9d8f') + chair(300, 404) +
      diff(...around(288, 378, 312, 402), fabric(300, 404, '#ffd23f'), fabric(300, 404, '#e63946')) +
      car(180, 474, '#3a86ff') +
      diff(...around(136, 444, 146, 456), `<rect x="138" y="446" width="6" height="8" fill="#e63946"/>`, `<rect x="138" y="446" width="6" height="8" fill="#ffd23f"/>`) +
      car(400, 474, '#8ac926', true) +
      diff(...around(388, 424, 412, 434), `<rect x="388" y="424" width="24" height="10" rx="2" fill="#ff9f43"/>`, '') +
      `<rect x="560" y="454" width="90" height="14" fill="#ff6b8b"/><path d="M572 454v14M590 454v14M608 454v14M626 454v14" stroke="#ffffff" stroke-width="3"/>` +
      person(580, 462, '#e76f51') + person(604, 462, '#3a86ff', true) +
      diff(...around(624, 436, 648, 454), `<path d="M624 442H648L644 454H628Z" fill="#c9a26b"/><path d="M628 442q8 -12 16 0" stroke="#8a6a44" stroke-width="2" fill="none"/>`, '') +
      small(730, 490, person(730, 490, '#ffd23f')) + `<path d="M738 456L744 412" stroke="#5c677d" stroke-width="1"/>` +
      diff(...around(734, 388, 754, 412), `<ellipse cx="744" cy="400" rx="10" ry="12" fill="#ff006e"/>`, `<ellipse cx="744" cy="400" rx="10" ry="12" fill="#8ac926"/>`) +
      diff(...around(550, 454, 570, 482), bin(560, 482, '#5c8d5a'), bin(560, 482, '#e63946')) +
      lampPost(500, 410) +
      // Decor: the same at both moments, darkened by the evening with the rest
      cloud(220, 50, 0.4) +
      cloud(150, 200, 0.4) +
      cityTree(20, 320, 1.1) +
      cityTree(780, 320, 1.1) +
      bush(610, 312, 0.6) +
      crate(620, 352, 22) +
      bird(770, 250) +
      dog(470, 486) +
      pigeon(240, 486) +
      cone(320, 488) +
      flowerBox(130, 400, '#ff6b8b') +
      // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 510, 62],
      ]) +
      time('', DUSK) +
      time('', film + projectorBeam) +
      trap(56, 364, 20, '', glow(46, 356, 20, 16), 'lights') +
      trap(600, 159, 46, bulbs(560, 150, 640, 150, 4, false), bulbs(560, 150, 640, 150, 4, true), 'lights') +
      trap(500, 310, 34, lampHead(500, 410, false), lampHead(500, 410, true), 'lights') +
      trap(380, 40, 35, birds(380, 40), '', 'birds') +
      trap(690, 80, 42, '', stars(690, 80), 'stars') +
      trap(90, 90, 54, sun(90, 90), moon(90, 90), 'moon')
    )
  },
})
