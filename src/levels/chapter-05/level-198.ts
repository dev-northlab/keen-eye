// Space junkyard: a scrapyard on a red planet among the space world's ten hardest (hidden until released,
// levels/upcoming.ts). New in space: a magnet crane with its cabin and beacon, scrap piles, a broken rocket, a
// crusher press, a one-wheeled scrap robot, a robot dog, an alien scavenger with a sack, a fire barrel and the yard's
// sign. Motion differences: the crane's beacon flashes and the robot dog wags only on picture A; the press stamps
// only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { alien, planet, starField } from './shapes.ts'

export default svgLevel({
  id: 198,
  chapter: 'space',
  title: 'spaceJunkyard',
  parTimeSec: 108,
  scene: ({ diff, anim, rand, extra }) => {
    const beacon = `<circle cx="306" cy="114" r="5" fill="#ff3b3b"/><circle cx="306" cy="114" r="10" fill="#ff3b3b" fill-opacity="0.35"/>`
    const plate = `<rect x="656" y="266" width="48" height="14" rx="2" fill="#adb5bd"/><path d="M660 273H700" stroke="#5c677d" stroke-width="2"/>`
    const tail = `<path d="M412 452L400 440" stroke="#8d99ae" stroke-width="4" stroke-linecap="round"/><circle cx="400" cy="440" r="3" fill="#ff3b3b"/>`
    return (
      `<rect width="800" height="500" fill="#3a1f2b"/>` + starField(rand, 0, 260, 40) + planet(680, 110, 8, '#bfc7d5') +
      diff(560, 70, 22, planet(560, 70, 14, '#f4a261'), planet(560, 70, 14, '#7bdff2')) +
      `<path d="M0 300V260H90V240H180V270H520V246H640V266H800V300Z" fill="#6b3a2a"/>` +
      `<path d="M0 300Q400 284 800 300V500H0Z" fill="#9c5b3c"/><path d="M0 440Q400 430 800 440V500H0Z" fill="#874c31"/>` +
      // The magnet crane: cabin window, beacon, the scrap on the magnet
      `<path d="M70 380L80 128M92 380L84 128M72 340L90 300M74 300L90 260M76 260L88 220M78 220L88 180" stroke="#ffb703" stroke-width="4" fill="none"/>` +
      `<rect x="74" y="118" width="48" height="34" rx="3" fill="#ffb703"/><rect x="40" y="120" width="270" height="8" fill="#ffb703"/><rect x="40" y="128" width="26" height="22" fill="#5c677d"/>` +
      diff(104, 132, 22, `<rect x="92" y="124" width="24" height="16" rx="2" fill="#8ecae6"/>`, `<rect x="92" y="124" width="24" height="16" rx="2" fill="#ff9f43"/>`) +
      diff(306, 114, 22, anim({ type: 'blink', duty: 0.5, period: 1 }, beacon), beacon) +
      `<path d="M260 128V186" stroke="#3d4a55" stroke-width="2"/><ellipse cx="260" cy="192" rx="22" ry="7" fill="#5c677d"/>` +
      diff(261, 209, 22, `<path d="M244 200H278L274 218H248Z" fill="#8d99ae"/><path d="M252 204l8 10M266 204l-4 12" stroke="#5c677d" stroke-width="2"/>`, '') +
      // Scrap pile and the wheel on top
      `<path d="M60 420Q150 330 240 420Z" fill="#7a6a5e"/><path d="M90 400l30 -14M150 380l40 10M110 410h40M180 404l24 6" stroke="#5c677d" stroke-width="5" stroke-linecap="round"/>` +
      diff(150, 358, 22, `<circle cx="150" cy="358" r="12" fill="#2b2d42"/><circle cx="150" cy="358" r="4" fill="#adb5bd"/>`, '') +
      // The broken rocket and its porthole
      `<path d="M330 296L360 274V318Z" fill="#e63946"/><rect x="356" y="274" width="184" height="44" rx="10" fill="#d0d4de"/><path d="M540 274l-10 8l12 8l-12 8l12 8l-10 12" fill="#3a1f2b"/>` +
      `<path d="M380 280l10 10M470 300l14 -6" stroke="#8d99ae" stroke-width="3"/><circle cx="420" cy="296" r="11" fill="#5c677d"/>` +
      diff(420, 296, 22, `<circle cx="420" cy="296" r="8" fill="#8ecae6"/>`, `<circle cx="420" cy="296" r="8" fill="#ffd23f"/>`) +
      // The crusher press
      `<rect x="620" y="200" width="120" height="180" fill="#5c677d"/><rect x="636" y="216" width="88" height="164" fill="#2b2d42"/><rect x="676" y="216" width="8" height="74" fill="#8d99ae"/>` +
      `<rect x="650" y="340" width="60" height="40" fill="#8a6a5a"/><path d="M650 352h60M664 340v40M690 340v40" stroke="#6b4a3a" stroke-width="3"/>` +
      diff(680, 276, 32, plate, anim({ type: 'bob', dx: 0, dy: 8, period: 1.4 }, plate)) +
      // The junkyard sign
      `<path d="M770 380V310" stroke="#8d99ae" stroke-width="4"/>` +
      diff(770, 300, 22, `<rect x="752" y="290" width="36" height="20" rx="3" fill="#ffd23f"/><path d="M758 300h24" stroke="#3d4a55" stroke-width="3"/>`, `<rect x="752" y="290" width="36" height="20" rx="3" fill="#8ac926"/><path d="M758 300h24" stroke="#3d4a55" stroke-width="3"/>`) +
      // Scrap robot, robot dog, the scavenger's sack, the fire barrel
      `<circle cx="330" cy="460" r="10" fill="#3d4a55"/><rect x="316" y="418" width="28" height="32" rx="4" fill="#ff9f43"/><rect x="320" y="404" width="20" height="14" rx="3" fill="#bfc7d5"/>` +
      `<circle cx="326" cy="411" r="2" fill="#222"/><circle cx="334" cy="411" r="2" fill="#222"/><path d="M330 404V392" stroke="#8d99ae" stroke-width="2"/><path d="M316 430l-10 8M344 430l10 -6" stroke="#5c677d" stroke-width="4" stroke-linecap="round"/>` +
      diff(330, 396, 22, `<circle cx="330" cy="389" r="4" fill="#3ae0ff"/>`, `<circle cx="330" cy="389" r="4" fill="#ff006e"/>`) +
      `<path d="M418 462v12M444 462v12" stroke="#8d99ae" stroke-width="4"/><rect x="412" y="448" width="36" height="14" rx="4" fill="#bfc7d5"/><rect x="442" y="434" width="18" height="16" rx="3" fill="#bfc7d5"/><circle cx="454" cy="440" r="2" fill="#ff3b3b"/>` +
      diff(404, 446, 22, anim({ type: 'sway', angle: 20, pivot: [412, 452], period: 0.5 }, tail), tail) +
      alien(520, 480, '#8338ec', 2) +
      diff(544, 448, 22, `<path d="M532 462Q530 438 544 434Q558 438 556 462Z" fill="#c9a26b"/><path d="M538 438l12 0" stroke="#8a6a44" stroke-width="2"/>`, `<path d="M532 462Q530 438 544 434Q558 438 556 462Z" fill="#3a86ff"/><path d="M538 438l12 0" stroke="#1d5e8c" stroke-width="2"/>`) +
      `<rect x="704" y="440" width="32" height="40" rx="3" fill="#6c757d"/><path d="M704 452h32M704 468h32" stroke="#495057" stroke-width="2"/>` +
      diff(720, 428, 22, `<path d="M708 440Q706 424 716 414Q716 426 722 424Q722 416 730 412Q734 428 732 440Z" fill="#ff7b00"/>`, `<path d="M708 440Q706 424 716 414Q716 426 722 424Q722 416 730 412Q734 428 732 440Z" fill="#3ae0ff"/>`) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['wrench', 200, 470],
        ['fuelCanister', 604, 486],
        ['toolbox', 280, 486],
        ['spaceStar', 420, 60],
        ['asteroid', 760, 200],
      ])
    )
  },
})
