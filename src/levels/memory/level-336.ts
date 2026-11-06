// Music room: instruments everywhere, among the ten hardest of "memory" (hidden until released, levels/upcoming.ts). An
// upright piano with a vase, a metronome and sheet music, a violin on the wall, a guitar on its stand, a drum kit with a
// cymbal and a record player.
import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { around, big, books, cube, flowerVase, painting, pottedPlant, room, rug, wallClock } from './shapes.ts'

/** Metronome; (x, y) = bottom center. Bounds: x ±14, y from −40 to 0. */
const metronome = (x: number, y: number) =>
  `<path d="M${x - 14} ${y}L${x - 6} ${y - 40}H${x + 6}L${x + 14} ${y}Z" fill="#a0703f"/><path d="M${x} ${y - 6}L${x + 6} ${y - 34}" stroke="#f4f1e8" stroke-width="2"/>`

/** Violin hanging on the wall; (x, y) = center. Bounds: x ±16, y ±46. */
const violin = (x: number, y: number) =>
  `<rect x="${x - 3}" y="${y - 46}" width="6" height="40" fill="#3d2a20"/><ellipse cx="${x}" cy="${y + 4}" rx="14" ry="12" fill="#b5523b"/><ellipse cx="${x}" cy="${y + 28}" rx="16" ry="16" fill="#b5523b"/>` +
  `<path d="M${x - 4} ${y + 20}q-3 6 0 12M${x + 4} ${y + 20}q3 6 0 12" stroke="#3d2a20" stroke-width="2" fill="none"/>`

/** Guitar stand and neck; (x, y) = floor under the stand. Bounds: x ±16, y from −180 to 0. The body is `guitarBody`. */
const guitar = (x: number, y: number) =>
  `<path d="M${x - 16} ${y}L${x} ${y - 30}L${x + 16} ${y}" stroke="#3d3d3d" stroke-width="3" fill="none"/><rect x="${x - 4}" y="${y - 180}" width="8" height="110" fill="#6b4226"/>`
/** Body of `guitar(x, y)` in `color`. Bounds: x ±28, y from −116 to −32. */
const guitarBody = (x: number, y: number, color: string) =>
  `<circle cx="${x}" cy="${y - 60}" r="28" fill="${color}"/><circle cx="${x}" cy="${y - 96}" r="20" fill="${color}"/><circle cx="${x}" cy="${y - 72}" r="7" fill="#3d2a20"/>`

export default memoryLevel({
  id: 336,
  title: 'memoryMusicRoom',
  showSeconds: 5,
  scene: ({ diff, extra, anim }) =>
    room(540, '#e0e7ff', '#8a5a33') +
    // Wall: the violin, a poster, the clock
    diff(...around(284, 104, 316, 196, 30), violin(300, 150), '') +
    painting(360, 60, 70, 90, '#8338ec') + wallClock(460, 230, 22, '#3a86ff') +
    `<path d="M230 260v-22l14 -4v22M230 260a5 4 0 1 1 -1 0M244 256a5 4 0 1 1 -1 0" stroke="#3d3d3d" stroke-width="2" fill="none"/>` +
    // The piano: vase, metronome moved, sheet music
    `<rect x="20" y="320" width="200" height="220" fill="#3d2a20"/><rect x="20" y="420" width="200" height="22" fill="#ffffff"/>` +
    `<path d="M40 420V442M60 420V442M80 420V442M100 420V442M120 420V442M140 420V442M160 420V442M180 420V442M200 420V442" stroke="#adb5bd" stroke-width="1.5"/>` +
    `<path d="M36 420v12M56 420v12M96 420v12M116 420v12M136 420v12M176 420v12M196 420v12" stroke="#2b2b2b" stroke-width="7"/><rect x="40" y="470" width="160" height="56" rx="4" fill="#4a3426"/>` +
    diff(...around(47, 269, 73, 320, 30), flowerVase(60, 320, '#3a86ff', '#ff6b8b'), '') +
    diff(...around(106, 280, 184, 320, 30), metronome(120, 320), metronome(170, 320)) +
    `<rect x="100" y="362" width="60" height="52" fill="#f4f1e8"/>` +
    diff(...around(106, 370, 154, 408, 30), `<path d="M108 374H152M108 386H152M108 398H152" stroke="#2b2b2b" stroke-width="1.5"/><circle cx="118" cy="386" r="3" fill="#2b2b2b"/><circle cx="136" cy="374" r="3" fill="#2b2b2b"/>`, `<path d="M108 374H152M108 386H152M108 398H152" stroke="#e63946" stroke-width="1.5"/><circle cx="118" cy="386" r="3" fill="#e63946"/><circle cx="136" cy="374" r="3" fill="#e63946"/>`) +
    // The record player and its record
    `<rect x="240" y="480" width="140" height="60" fill="#a0703f"/><rect x="250" y="458" width="120" height="22" rx="3" fill="#5c677d"/><ellipse cx="300" cy="466" rx="40" ry="8" fill="#2b2b2b"/>` +
    diff(...around(292, 460, 308, 472, 30), `<ellipse cx="300" cy="466" rx="8" ry="3" fill="#e63946"/>`, `<ellipse cx="300" cy="466" rx="8" ry="3" fill="#ffd23f"/>`) +
    `<path d="M350 462L330 470" stroke="#bfc7d5" stroke-width="3"/>` +
    // The guitar
    guitar(440, 540) + diff(...around(412, 424, 468, 508, 30), guitarBody(440, 540, '#e9a23b'), guitarBody(440, 540, '#3a86ff')) +
    // The drum kit: logo, cymbal
    rug(270, 700, 150, '#e63946') +
    `<path d="M180 560V640M340 566V640M176 640h8M336 640h8" stroke="#bfc7d5" stroke-width="3"/><ellipse cx="180" cy="558" rx="26" ry="5" fill="#e9c46a"/>` +
    diff(...around(310, 552, 370, 568, 30), `<ellipse cx="340" cy="560" rx="30" ry="6" fill="#e9c46a"/>`, '') +
    `<circle cx="270" cy="640" r="50" fill="#f4f1e8" stroke="#e63946" stroke-width="8"/><rect x="200" y="600" width="44" height="26" rx="4" fill="#e63946"/>` +
    diff(...around(256, 626, 284, 654, 30), `<circle cx="270" cy="640" r="14" fill="#3a86ff"/>`, `<circle cx="270" cy="640" r="14" fill="#8ac926"/>`) +
    // Decor: small things that fill the room, the same in both pictures
    `<rect x="462" y="560" width="34" height="90" rx="4" fill="#2b2b2b"/><circle cx="479" cy="584" r="9" fill="#5c677d"/><circle cx="479" cy="624" r="12" fill="#5c677d"/>` +
    `<path d="M110 700h40l10 -10v20l-10 -10M150 700q-20 -14 -30 0" stroke="#e9c46a" stroke-width="4" fill="none"/>` +
    big(60, 744, 0.5, pottedPlant(0, 0, '#e07a5f')) +
    big(400, 744, 1, books(0, 0, ['#3fa46f', '#ffd23f'])) +
    cube(470, 740, 22, '#e63946') +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['cube', 160, 740, '#3a86ff'],
      ['sticker', 240, 80, '#ffd23f'],
      ['frame', 470, 300, '#3fa46f'],
      ['slippers', 60, 600, '#8338ec'],
    ]),
})
