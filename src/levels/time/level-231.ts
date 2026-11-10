// Airfield: a small airfield by day and in the evening, among the ten hardest of "time" (hidden until released,
// levels/upcoming.ts). A control tower, a hangar with a plane inside, a biplane on the apron, a windsock, a fuel
// truck, a pilot and the runway with its lights.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bench, bin, bird, birds, bush, cloud, cone, crate, dog, door, DUSK, flowers, glow, lampHead, lampPost, moon, person, rock, signpost, sky, small, stars, sun } from './shapes.ts'

/** Biplane facing left without its top wing or tail fin; (x, y) = ground under the middle. Bounds: x from −50 to +70, y from −50 to 0. */
const biplane = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><circle cx="-16" r="6" fill="#2b2b2b"/><circle cx="12" r="6" fill="#2b2b2b"/><path d="M-16 -4L-10 -14M12 -4L6 -14" stroke="#5c677d" stroke-width="2"/>` +
  `<path d="M-40 -24Q-38 -12 -24 -10H50L66 -20L50 -26H-24Q-38 -30 -40 -24Z" fill="#e63946"/><rect x="-30" y="-14" width="60" height="6" fill="#c0392b"/>` +
  `<path d="M-24 -46V-14M24 -46V-14" stroke="#5c677d" stroke-width="2"/><path d="M-46 -34V-8" stroke="#2b2b2b" stroke-width="3"/><circle cx="-6" cy="-28" r="5" fill="#8d6e4b"/></g>`

/** Windsock, its stripes in `color`, on a pole top at (x, y). Bounds: x from +2 to +42, y from −4 to +14. */
const sock = (x: number, y: number, color: string) =>
  `<path d="M${x + 2} ${y - 4}L${x + 42} ${y + 4}V${y + 10}L${x + 2} ${y + 14}Z" fill="#ffffff"/>` +
  `<path d="M${x + 2} ${y - 4}L${x + 12} ${y - 2}V${y + 12}L${x + 2} ${y + 14}ZM${x + 22} ${y}L${x + 32} ${y + 2}V${y + 10}L${x + 22} ${y + 12}Z" fill="${color}"/>`

export default svgLevel({
  id: 231,
  chapter: 'time',
  title: 'airfield',
  pair: 'day-night',
  parTimeSec: 160,
  scene: ({ diff, time, trap, extra, anim }) => {
    let runwayLights = ''
    let runwayLit = ''
    for (let x = 60; x <= 780; x += 80) {
      if (x === 460) continue
      runwayLights += `<circle cx="${x}" cy="380" r="4" fill="#d8dee4"/>`
      runwayLit += `<circle cx="${x}" cy="380" r="10" fill="#ffe08a" fill-opacity="0.35"/><circle cx="${x}" cy="380" r="4" fill="#fff3b0"/>`
    }
    return (
      sky(time(false, true), 300) +
      `<path d="M0 300Q120 262 260 286T560 270T800 284V300Z" fill="#9cc5a1"/><rect y="300" width="800" height="200" fill="#8fc25a"/>` +
      `<rect y="384" width="800" height="40" fill="#6c757d"/><path d="M0 404H800" stroke="#f4f1e8" stroke-width="3" stroke-dasharray="24 18"/>` +
      runwayLights +
      // Control tower and its door
      `<rect x="56" y="170" width="48" height="130" fill="#e6e6f0"/><rect x="40" y="130" width="80" height="40" fill="#3d4a55"/><rect x="46" y="138" width="68" height="24" fill="#bde3f2"/><rect x="36" y="122" width="88" height="10" fill="#5c677d"/>` +
      diff(...around(64, 254, 96, 300), door(80, 300, '#3a86ff'), door(80, 300, '#e63946')) +
      // The hangar: number board, side window, the plane inside, a barrel
      `<path d="M300 300V230Q410 170 520 230V300Z" fill="#a8b3bf"/><path d="M300 230Q410 170 520 230" stroke="#8d99ae" stroke-width="5" fill="none"/><rect x="340" y="236" width="140" height="64" fill="#3d4a55"/>` +
      `<rect x="494" y="246" width="20" height="16" fill="#5c677d"/>` +
      diff(...around(390, 210, 430, 226), `<rect x="390" y="210" width="40" height="16" rx="2" fill="#ffd23f"/>`, `<rect x="390" y="210" width="40" height="16" rx="2" fill="#8ac926"/>`) +
      diff(...around(306, 246, 326, 262), `<rect x="306" y="246" width="20" height="16" fill="#5c677d"/>`, '') +
      diff(...around(396, 264, 424, 292), `<path d="M398 290Q398 268 424 266V290Z" fill="#e9c46a"/><path d="M398 264V292" stroke="#2b2b2b" stroke-width="3"/>`, '') +
      diff(...around(546, 266, 574, 300), `<rect x="546" y="268" width="28" height="32" rx="4" fill="#2a9d8f"/><path d="M546 278h28M546 290h28" stroke="#1d6b62" stroke-width="2"/>`, `<rect x="546" y="268" width="28" height="32" rx="4" fill="#e76f51"/><path d="M546 278h28M546 290h28" stroke="#b5523b" stroke-width="2"/>`) +
      // The biplane: top wing, tail fin
      biplane(620, 384) +
      diff(...around(586, 334, 654, 342), `<rect x="586" y="334" width="68" height="8" rx="3" fill="#ffd23f"/>`, `<rect x="586" y="334" width="68" height="8" rx="3" fill="#3a86ff"/>`) +
      diff(...around(668, 338, 688, 364), `<path d="M670 364L676 338H688L686 364Z" fill="#ffd23f"/>`, `<path d="M670 364L676 338H688L686 364Z" fill="#3a86ff"/>`) +
      // The windsock
      `<path d="M740 300V230" stroke="#5c677d" stroke-width="3"/>` +
      diff(...around(742, 226, 782, 244), sock(740, 230, '#ff7b00'), sock(740, 230, '#e63946')) +
      // Fuel truck and its logo, the pilot's cap, a cone
      `<rect x="140" y="436" width="100" height="30" rx="14" fill="#c9d1d9"/><path d="M240 474V444H272L290 460V474Z" fill="#e63946"/><path d="M250 448H270L282 460H250Z" fill="#bde3f2"/>` +
      `<rect x="136" y="466" width="156" height="6" fill="#3d4a55"/><circle cx="160" cy="476" r="8" fill="#2b2b2b"/><circle cx="210" cy="476" r="8" fill="#2b2b2b"/><circle cx="270" cy="476" r="8" fill="#2b2b2b"/>` +
      diff(...around(183, 444, 197, 458), `<circle cx="190" cy="451" r="7" fill="#e63946"/>`, `<circle cx="190" cy="451" r="7" fill="#2a9d8f"/>`) +
      person(330, 488, '#3a86ff', true) +
      diff(...around(321, 422, 345, 437), `<path d="M321 434q9 -12 18 0h6v3h-24Z" fill="#5a3d2b"/>`, `<path d="M321 434q9 -12 18 0h6v3h-24Z" fill="#f4f1e8"/>`) +
      diff(...around(450, 456, 470, 480), cone(460, 480), '') +
      lampPost(180, 380) +
      // Decor: the same at both moments, darkened by the evening with the rest
      cloud(220, 60, 0.5) +
      cloud(540, 50, 0.5) +
      cloud(780, 140, 0.4) +
      bush(20, 330, 0.7) +
      bush(280, 324, 0.6) +
      bench(560, 476) +
      bin(612, 486) +
      crate(120, 336, 24) +
      crate(700, 300, 26) +
      dog(380, 484) +
      small(650, 488, person(650, 488, '#ff9f43')) +
      bird(760, 300) +
      signpost(760, 490, -1) +
      flowers(40, 486, '#ffd23f') +
      rock(110, 490, 0.6) +
      // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 560, 160],
      ]) +
      time('', DUSK) +
      time('', runwayLit) +
      trap(80, 150, 42, '', glow(46, 138, 68, 24), 'lights') +
      trap(504, 254, 20, '', glow(494, 246, 20, 16), 'lights') +
      trap(460, 380, 20, `<circle cx="460" cy="380" r="4" fill="#d8dee4"/>`, `<circle cx="460" cy="380" r="10" fill="#ffe08a" fill-opacity="0.35"/><circle cx="460" cy="380" r="4" fill="#fff3b0"/>`, 'lights') +
      trap(180, 280, 34, lampHead(180, 380, false), lampHead(180, 380, true), 'lights') +
      trap(230, 150, 35, birds(230, 150), '', 'birds') +
      trap(420, 70, 42, '', stars(420, 70), 'stars') +
      trap(680, 80, 54, sun(680, 80), moon(680, 80), 'moon')
    )
  },
})
