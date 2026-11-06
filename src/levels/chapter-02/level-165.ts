// Police station: a city street among the city's ten hardest (hidden until released, levels/upcoming.ts). New in
// the city: a police station with its blue lamp, a patrol car with a light bar, a police helicopter, a mounted
// officer's horse, a police motorbike, a dog handler with a police dog, a zebra crossing with its pedestrian
// light and a parking sign. Motion differences: the light bar flashes only on picture A; the helicopter flies and
// the horse swishes its tail only on B.
import { cityTree, person, skyline } from './shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud } from '../shapes.ts'

/** Police helicopter facing right; (x, y) = cabin center. Bounds: x from −46 to +24, y from −20 to +16. */
const helicopter = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-30 -18H30" stroke="#3d4a55" stroke-width="3"/><path d="M0 -18v6" stroke="#3d4a55" stroke-width="3"/>` +
  `<path d="M-40 -2H-10" stroke="#1d3557" stroke-width="5"/><path d="M-46 -8v12" stroke="#1d3557" stroke-width="4"/>` +
  `<ellipse rx="22" ry="12" fill="#1d3557"/><path d="M4 -8Q20 -8 20 2H4Z" fill="#bde3f2"/><path d="M-20 2H20" stroke="#ffd23f" stroke-width="3"/>` +
  `<path d="M-14 12v4M10 12v4M-20 16H18" stroke="#3d4a55" stroke-width="2.5"/></g>`

/** Patrol car facing right without its light bar's lamps or rear band; (x, y) = ground under its back. Bounds: x from 0 to +160, y from −64 to 0. */
const patrolCar = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M0 -8V-34Q0 -46 14 -46H40L56 -64H114L132 -46H150Q160 -46 160 -34V-8Z" fill="#f4f1e8"/>` +
  `<path d="M60 -48L66 -60H86V-48ZM92 -60H110L122 -48H92Z" fill="#bde3f2"/><rect x="0" y="-30" width="160" height="10" fill="#1d3557"/>` +
  `<rect x="66" y="-70" width="30" height="6" rx="2" fill="#3d4a55"/>` +
  `<circle cx="34" cy="-6" r="12" fill="#2b2b2b"/><circle cx="34" cy="-6" r="5" fill="#ccc"/><circle cx="128" cy="-6" r="12" fill="#2b2b2b"/><circle cx="128" cy="-6" r="5" fill="#ccc"/></g>`

/** Light bar lamps on the patrol car's roof, centered at (x, y). Bounds: x ±14, y ±4. */
const lightBar = (x: number, y: number) =>
  `<rect x="${x - 14}" y="${y - 4}" width="13" height="7" rx="2" fill="#e63946"/><rect x="${x + 1}" y="${y - 4}" width="13" height="7" rx="2" fill="#3a86ff"/>`

/** Police horse with its rider, without the tail; faces right; (x, y) = feet. Bounds: x from −40 to +62, y from −120 to 0. */
const policeHorse = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-28 -32V0M-16 -32V0M18 -32V0M30 -32V0" stroke="#5e3b1a" stroke-width="7"/>` +
  `<ellipse cy="-46" rx="40" ry="18" fill="#7a4a24"/><path d="M26 -56L44 -86L60 -76L52 -66L38 -44Z" fill="#7a4a24"/>` +
  `<path d="M28 -60L44 -90" stroke="#2b1a10" stroke-width="6" stroke-linecap="round"/><circle cx="48" cy="-78" r="1.8" fill="#222"/>` +
  `<rect x="-20" y="-60" width="34" height="10" rx="3" fill="#ffd23f"/>` +
  `<path d="M-8 -60V-92H8V-60Z" fill="#1d3557"/><path d="M-4 -60L-6 -40" stroke="#1d3557" stroke-width="6"/>` +
  `<circle cy="-100" r="8" fill="#e0b48a"/><path d="M-9 -104h18v-6h-18Z" fill="#1d3557"/><rect x="-11" y="-104" width="22" height="3" fill="#2b2b2b"/></g>`
const horseTail = (x: number, y: number) =>
  `<path d="M${x - 38} ${y - 50}Q${x - 50} ${y - 36} ${x - 46} ${y - 18}" stroke="#2b1a10" stroke-width="7" fill="none" stroke-linecap="round"/>`

/** Police motorbike with its rider, faces right, without the saddle bag; (x, y) = ground center. Bounds: x ±34, y from −70 to 0. */
const policeBike = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><circle cx="-20" cy="-12" r="12" fill="#2b2b2b"/><circle cx="22" cy="-12" r="12" fill="#2b2b2b"/>` +
  `<path d="M-28 -26H14L24 -12" stroke="#f4f1e8" stroke-width="10" stroke-linecap="round"/><path d="M14 -30l8 -10h6" stroke="#3d4a55" stroke-width="3" fill="none"/>` +
  `<rect x="20" y="-46" width="10" height="6" rx="2" fill="#3a86ff"/>` +
  `<path d="M-10 -28L-6 -54H8L10 -34" fill="#ffd23f"/><path d="M6 -48L20 -38" stroke="#ffd23f" stroke-width="5" stroke-linecap="round"/>` +
  `<circle cx="0" cy="-60" r="9" fill="#ffffff"/><path d="M-9 -60h18" stroke="#1d3557" stroke-width="3"/></g>`

/** Police dog standing, faces left, without its vest; (x, y) = feet. Bounds: x from −24 to +20, y from −32 to 0. */
const policeDog = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-12 -12V0M-4 -12V0M8 -12V0M14 -12V0" stroke="#3d2a1a" stroke-width="4"/>` +
  `<path d="M16 -18l6 -6" stroke="#3d2a1a" stroke-width="4" stroke-linecap="round"/><rect x="-16" y="-24" width="34" height="14" rx="7" fill="#3d2a1a"/>` +
  `<ellipse cx="-16" cy="-26" rx="8" ry="7" fill="#3d2a1a"/><path d="M-20 -30l-2 -6l6 3ZM-14 -31l1 -6l4 5Z" fill="#3d2a1a"/><path d="M-24 -24h6" stroke="#c48a5a" stroke-width="4" stroke-linecap="round"/>` +
  `<circle cx="-18" cy="-28" r="1.2" fill="#fff"/></g>`

/** Pedestrian light's figure, walking (green) or standing (red), in its box at (x, y). Bounds: ±9. */
const walker = (x: number, y: number, walking: boolean) =>
  walking
    ? `<g fill="#8ac926"><circle cx="${x}" cy="${y - 6}" r="2.5"/><path d="M${x - 1} ${y - 3}l-4 8M${x} ${y - 3}l1 6l4 4M${x} ${y - 2}l5 2" stroke="#8ac926" stroke-width="2.5" fill="none"/></g>`
    : `<g fill="#e63946"><circle cx="${x}" cy="${y - 6}" r="2.5"/><path d="M${x} ${y - 3}v10M${x - 3} ${y - 2}v6M${x + 3} ${y - 2}v6" stroke="#e63946" stroke-width="2.5"/></g>`

export default svgLevel({
  id: 165,
  chapter: 'city',
  title: 'policeStation',
  parTimeSec: 92,
  scene: ({ diff, anim, rand, extra }) => {
    const flying = anim({ id: 'heli', type: 'path', points: [[0, 0], [140, 20], [0, 30]], period: 8 }, helicopter(150, 80))
    return (
      `<rect width="800" height="500" fill="#d3ecf7"/>` + skyline(rand, 300) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 28 }, cloud(620, 60, 0.6)) +
      diff(142, 79, 44, helicopter(150, 80), flying, 'heli') +
      // Station: flag, blue lamp, number plate
      `<rect x="220" y="120" width="360" height="212" fill="#c9d1d9"/><rect x="214" y="112" width="372" height="12" fill="#5c677d"/>` +
      `<rect x="330" y="140" width="140" height="34" rx="4" fill="#1d3557"/><path d="M400 146l12 5v8q0 8 -12 12q-12 -4 -12 -12v-8Z" fill="#ffd23f"/>` +
      [260, 520].map((x) => `<rect x="${x - 22}" y="200" width="44" height="50" fill="#bde3f2" stroke="#5c677d" stroke-width="4"/>`).join('') +
      `<rect x="370" y="260" width="60" height="72" fill="#1d3557"/><path d="M400 260v72" stroke="#5c677d" stroke-width="2"/><rect x="356" y="320" width="88" height="12" fill="#adb5bd"/>` +
      `<path d="M430 236h-14v-4" stroke="#3d4a55" stroke-width="3" fill="none"/>` +
      diff(404, 236, 22, `<rect x="396" y="226" width="16" height="22" rx="3" fill="#3a86ff"/><rect x="398" y="222" width="12" height="4" fill="#3d4a55"/>`, `<rect x="396" y="226" width="16" height="22" rx="3" fill="#f4f1e8"/><rect x="398" y="222" width="12" height="4" fill="#3d4a55"/>`) +
      diff(240, 270, 22, `<rect x="230" y="262" width="20" height="14" rx="2" fill="#3a86ff"/><path d="M234 269h12" stroke="#ffffff" stroke-width="2"/>`, `<rect x="230" y="262" width="20" height="14" rx="2" fill="#e63946"/><path d="M234 269h12" stroke="#ffffff" stroke-width="2"/>`) +
      `<path d="M510 112V76" stroke="#3d4a55" stroke-width="2.5"/>` +
      diff(520, 86, 22, `<rect x="510" y="76" width="22" height="14" fill="#3a86ff"/><path d="M510 83h22" stroke="#ffffff" stroke-width="3"/>`, '') +
      cityTree(620, 330) + cityTree(760, 330, 0.9) +
      // Sidewalk: parking sign, pedestrian light, the dog handler and his dog
      `<rect y="330" width="800" height="18" fill="#cfd5da"/>` +
      `<path d="M40 346V306" stroke="#6c757d" stroke-width="4"/>` +
      diff(40, 296, 22, `<rect x="28" y="282" width="24" height="26" rx="3" fill="#3a86ff"/><path d="M36 302V288h6a5 5 0 0 1 0 10h-6" stroke="#ffffff" stroke-width="3" fill="none"/>`, `<rect x="28" y="282" width="24" height="26" rx="3" fill="#2a9d8f"/><path d="M36 302V288h6a5 5 0 0 1 0 10h-6" stroke="#ffffff" stroke-width="3" fill="none"/>`) +
      `<path d="M456 346V310" stroke="#6c757d" stroke-width="4"/><rect x="444" y="284" width="24" height="28" rx="3" fill="#2b2b2b"/>` +
      diff(456, 298, 22, walker(456, 300, false), walker(456, 300, true)) +
      person(250, 348, '#1d3557', false, '#c68b5e', '#2b2b2b') + `<path d="M262 322q8 8 14 6" stroke="#3d2a1a" stroke-width="1.5" fill="none"/>` +
      policeDog(290, 348) + diff(292, 334, 22, `<rect x="282" y="327" width="18" height="10" rx="2" fill="#ffd23f"/>`, `<rect x="282" y="327" width="18" height="10" rx="2" fill="#e63946"/>`) +
      // Road: zebra crossing, the patrol car, the mounted officer, the motorbike
      `<rect y="348" width="800" height="132" fill="#4a5058"/><path d="M0 414H800" stroke="#ffffff" stroke-width="3" stroke-dasharray="28 22"/>` +
      [324, 348, 372, 396, 420].map((x) => `<rect x="${x}" y="352" width="14" height="124" fill="#f4f1e8"/>`).join('') +
      `<rect y="480" width="800" height="20" fill="#cfd5da"/>` +
      patrolCar(600, 410) + diff(680, 336, 22, anim({ type: 'blink', duty: 0.5, period: 0.6 }, lightBar(681, 336)), lightBar(681, 336)) +
      diff(620, 386, 22, `<rect x="604" y="380" width="34" height="10" fill="#3a86ff"/>`, `<rect x="604" y="380" width="34" height="10" fill="#ffd23f"/>`) +
      diff(488, 444, 28, horseTail(530, 476), anim({ type: 'sway', angle: 16, pivot: [492, 426], period: 1.4 }, horseTail(530, 476))) +
      policeHorse(530, 476) +
      policeBike(130, 440) + diff(104, 404, 22, `<rect x="92" y="400" width="18" height="16" rx="3" fill="#2b2b2b"/>`, '') +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['cone', 200, 470],
        ['bin', 560, 346],
        ['hydrant', 120, 346],
        ['coffeeCup', 360, 344],
        ['pigeon', 740, 474],
      ])
    )
  },
})
