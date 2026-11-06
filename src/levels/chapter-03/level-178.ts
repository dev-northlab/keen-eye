// Forest railway: a narrow-gauge line among the forest's ten hardest (hidden until released, levels/upcoming.ts).
// New in the forest: a steam locomotive and a wagon of crates on a timber trestle over a gorge, a station hut with
// a sign and a bell, a station master, a hand car with two workers, a water tower with a hawk on top and a
// semaphore signal. Motion differences: the engine puffs steam and the hand car's lever pumps only on picture A;
// the driving wheel turns only on B.
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, pine } from './shapes.ts'

/** Driving wheel with spokes; (x, y) = hub. Bounds: radius 16. */
const driveWheel = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><circle r="15" fill="#2b2b2b"/><circle r="11" fill="#c0392b"/>` +
  [0, 45, 90, 135].map((a) => `<path d="M-11 0H11" stroke="#2b2b2b" stroke-width="2" transform="rotate(${a})"/>`).join('') + `<circle r="3" fill="#2b2b2b"/></g>`

/** Steam locomotive facing right without its driving wheel and headlamp; (x, y) = rail under its back. Bounds: x from 0 to +112, y from −76 to 0. */
const locomotive = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="0" y="-74" width="38" height="66" fill="#3d4a55"/><rect x="6" y="-66" width="24" height="18" fill="#ffd166"/><rect x="-4" y="-78" width="46" height="6" fill="#2b2b2b"/>` +
  `<rect x="36" y="-52" width="72" height="36" rx="16" fill="#2a9d8f"/><path d="M84 -52V-66h12V-52" fill="#2b2b2b"/><path d="M80 -68h20" stroke="#2b2b2b" stroke-width="5"/>` +
  `<rect x="56" y="-60" width="12" height="10" rx="5" fill="#ffd23f"/><rect x="0" y="-12" width="112" height="6" fill="#2b2b2b"/>` +
  `<circle cx="86" cy="-6" r="8" fill="#2b2b2b"/><circle cx="104" cy="-6" r="8" fill="#2b2b2b"/></g>`

/** Hawk perched, faces left; (x, y) = feet. Bounds: x ±12, y from −20 to 0. */
const hawk = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M6 -6l6 6h-8Z" fill="#7a4a24"/><ellipse cy="-9" rx="8" ry="10" fill="#8a5a33"/><ellipse cx="-1" cy="-6" rx="4" ry="6" fill="#e9dcc4"/>` +
  `<circle cx="-3" cy="-18" r="5" fill="#8a5a33"/><path d="M-7 -19l-5 2l5 1Z" fill="#ffd23f"/><circle cx="-4" cy="-19" r="1.1" fill="#222"/></g>`

/** Semaphore arm on a post top at (x, y), level (stop) or raised. Bounds: x from −26 to +2, y ±14. */
const semaphoreArm = (x: number, y: number, raised: boolean) =>
  `<g transform="rotate(${raised ? 40 : 0} ${x} ${y})"><rect x="${x - 26}" y="${y - 3}" width="26" height="7" fill="#e63946"/><rect x="${x - 18}" y="${y - 3}" width="5" height="7" fill="#ffffff"/></g><circle cx="${x}" cy="${y}" r="3" fill="#2b2b2b"/>`

/** Hand car with its two workers; the lever beam separate. (x, y) = rail under its middle. Bounds: x ±44, y from −60 to 0. */
const handCar = (x: number, y: number) =>
  `<rect x="${x - 40}" y="${y - 20}" width="80" height="10" fill="#8a5a33"/><circle cx="${x - 26}" cy="${y - 6}" r="7" fill="#2b2b2b"/><circle cx="${x + 26}" cy="${y - 6}" r="7" fill="#2b2b2b"/>` +
  `<path d="M${x} ${y - 20}V${y - 44}" stroke="#3d4a55" stroke-width="4"/>` +
  `<g transform="translate(${x - 24} ${y - 20}) scale(0.7)">${person(0, 0, '#3a86ff', false, '#e0b48a', '#5a3d2b')}</g>` +
  `<g transform="translate(${x + 24} ${y - 20}) scale(0.7)">${person(0, 0, '#ffb703', true, '#c68b5e', '#2b2b2b')}</g>`
const lever = (x: number, y: number) => `<path d="M${x - 26} ${y - 44}H${x + 26}" stroke="#3d4a55" stroke-width="4" stroke-linecap="round"/>`

export default svgLevel({
  id: 178,
  chapter: 'forest',
  title: 'forestRailway',
  parTimeSec: 104,
  scene: ({ diff, anim, extra }) => {
    const steam = `<circle cx="472" cy="222" r="9" fill="#ffffff" fill-opacity="0.85"/><circle cx="484" cy="208" r="11" fill="#ffffff" fill-opacity="0.7"/>`
    let forest = ''
    for (let x = -10; x < 820; x += 40) forest += pine(x, 300, 0.7 + ((x / 40) % 3) * 0.1, x % 3 ? '#2f7d55' : '#24684a')
    let bents = ''
    for (const x of [260, 320, 380, 440, 500, 560]) bents += `<path d="M${x} 304V490" stroke="#8a5a33" stroke-width="7"/>`
    for (const [x0, x1] of [[260, 320], [320, 380], [440, 500], [500, 560]]) bents += `<path d="M${x0} 360L${x1} 420M${x1} 360L${x0} 420M${x0} 420H${x1}" stroke="#a0703f" stroke-width="4"/>`
    bents += `<path d="M380 360L440 420M440 360L380 420" stroke="#a0703f" stroke-width="4"/>`
    return (
      `<rect width="800" height="500" fill="#d3ecf7"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(300, 70, 0.6)) +
      `<path d="M0 240Q200 190 400 220T800 200V300H0Z" fill="#a9c97a"/>` + forest +
      // Ground both sides of the gorge, the stream, the trestle with its missing tie beam
      `<path d="M0 300H250L270 500H0Z" fill="#8a9a5b"/><path d="M570 300H800V500H550Z" fill="#8a9a5b"/><path d="M250 300L560 300L550 500H270Z" fill="#6b5a48"/>` +
      `<path d="M270 480Q410 460 550 480V500H270Z" fill="#5aa9d6"/>` + bents +
      diff(410, 420, 28, `<path d="M384 420H436" stroke="#a0703f" stroke-width="4"/>`, '') +
      `<rect x="240" y="296" width="340" height="10" fill="#6b4a2b"/><path d="M0 300H800" stroke="#3d4a55" stroke-width="3"/>` +
      // Station: hut with its sign and bell, the station master
      `<rect x="30" y="200" width="140" height="100" fill="#c68b4e"/><path d="M20 204L100 160L180 204Z" fill="#8e2c27"/><rect x="84" y="244" width="30" height="56" fill="#6b4a2b"/>` +
      `<rect x="44" y="236" width="28" height="24" fill="#bde3f2"/><rect x="74" y="206" width="52" height="16" rx="3" fill="#f4f1e8"/>` +
      diff(100, 214, 22, `<path d="M82 214h36" stroke="#2a9d8f" stroke-width="5" stroke-linecap="round"/>`, `<path d="M82 214h36" stroke="#e63946" stroke-width="5" stroke-linecap="round"/>`) +
      `<path d="M170 226h22" stroke="#3d4a55" stroke-width="3"/>` +
      diff(196, 238, 22, `<path d="M188 244Q188 230 196 230Q204 230 204 244Z" fill="#d9a400"/><circle cx="196" cy="246" r="2" fill="#a07800"/>`, '') +
      person(40, 300, '#1d3557', false, '#e0b48a', '#5a3d2b') +
      diff(40, 240, 22, `<path d="M30 248h20v-6h-18Z" fill="#e63946"/><rect x="28" y="246" width="24" height="3" fill="#2b2b2b"/>`, `<path d="M30 248h20v-6h-18Z" fill="#1d3557"/><rect x="28" y="246" width="24" height="3" fill="#2b2b2b"/>`) +
      // Train on the trestle: wagon of crates, locomotive with its steam, wheel and headlamp
      `<rect x="296" y="276" width="76" height="14" fill="#7a5230"/><circle cx="312" cy="294" r="7" fill="#2b2b2b"/><circle cx="356" cy="294" r="7" fill="#2b2b2b"/><path d="M372 284h10" stroke="#2b2b2b" stroke-width="3"/>` +
      `<rect x="304" y="256" width="22" height="20" fill="#c68b4e" stroke="#8a5a33" stroke-width="2"/>` +
      diff(338, 264, 22, `<rect x="328" y="252" width="22" height="24" fill="#e9c46a" stroke="#8a5a33" stroke-width="2"/>`, `<rect x="328" y="252" width="22" height="24" fill="#8ac926" stroke="#8a5a33" stroke-width="2"/>`) +
      locomotive(380, 300) +
      diff(476, 216, 28, anim({ type: 'bob', dx: 2, dy: -6, period: 1.4 }, steam), steam) +
      diff(432, 286, 22, driveWheel(432, 286), anim({ type: 'rotate', pivot: [432, 286], period: 1.2 }, driveWheel(432, 286))) +
      diff(494, 276, 22, `<circle cx="494" cy="276" r="5" fill="#fff3b0" stroke="#2b2b2b" stroke-width="2"/>`, `<circle cx="494" cy="276" r="5" fill="#8ac926" stroke="#2b2b2b" stroke-width="2"/>`) +
      // Water tower with its spout and the hawk, the semaphore
      `<path d="M670 300L680 220M730 300L720 220M674 260H726" stroke="#6b4a2b" stroke-width="5"/>` +
      `<rect x="660" y="160" width="80" height="62" rx="6" fill="#a0703f"/><path d="M660 180H740M660 200H740" stroke="#7a5230" stroke-width="2"/><path d="M654 162L700 138L746 162Z" fill="#5e3b1a"/>` +
      diff(700, 128, 22, hawk(700, 140), '') +
      diff(648, 208, 22, `<path d="M660 206H642V228" stroke="#3d4a55" stroke-width="5" fill="none"/>`, `<path d="M660 206H642V188" stroke="#3d4a55" stroke-width="5" fill="none"/>`) +
      `<path d="M772 300V204" stroke="#3d4a55" stroke-width="4"/>` +
      diff(760, 206, 26, semaphoreArm(772, 206, false), semaphoreArm(772, 206, true)) +
      // Hand car on the siding
      `<path d="M0 470H240" stroke="#3d4a55" stroke-width="3"/>` + handCar(130, 470) +
      diff(130, 426, 30, anim({ type: 'sway', angle: 16, pivot: [130, 426], period: 1.4 }, lever(130, 470)), lever(130, 470)) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['mushroom', 220, 340],
        ['pineCone', 600, 330],
        ['fern', 760, 480],
        ['rabbit', 630, 470],
        ['birds', 560, 80],
      ])
    )
  },
})
