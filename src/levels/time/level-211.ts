import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level211Redesign } from './level-211-redesign.ts'
import { awning, bench, bin, bird, cloud, cone, dog, door, DUSK, flowerBox, glow, lampHead, lampPost, moon, pane, pigeon, poster, pot, roadSign, sky, stars, street, sun, window } from './shapes.ts'

/** Tram, faces right; body from x0 to x0 + 250 standing on rails at y. Its windows are `tramWindows`. Bounds: x0…x0 + 250, y from −86 to 0. */
const tram = (x0: number, y: number) =>
  `<path d="M${x0 + 110} ${y - 74}l20 -12h20l-20 12" stroke="#3d4a55" stroke-width="3" fill="none"/>` +
  `<rect x="${x0}" y="${y - 74}" width="250" height="66" rx="10" fill="#e63946"/><rect x="${x0}" y="${y - 30}" width="250" height="10" fill="#ffffff"/>` +
  `<circle cx="${x0 + 40}" cy="${y - 4}" r="6" fill="#2b2b2b"/><circle cx="${x0 + 210}" cy="${y - 4}" r="6" fill="#2b2b2b"/>`

/** The tram's windows (x0 = left end, y = rails). */
const tramWindows = (x0: number, y: number, fill: string) =>
  [0, 1, 2, 3].map((i) => `<rect x="${x0 + 18 + i * 46}" y="${y - 64}" width="32" height="26" rx="3" fill="${fill}"/>`).join('')

export default svgLevel({
  id: 211,
  chapter: 'time',
  title: 'nightAvenue',
  pair: 'day-night',
  parTimeSec: 95,
  redesign: level211Redesign,
  scene: ({ diff, time, trap, extra, anim }) => {
    let corner = ''
    for (const y of [176, 218, 260]) for (const x of [40, 110]) if (x !== 40 || y !== 218) corner += window(x, y, '#cfe3ee')
    let bank = ''
    for (const y of [146, 188, 230]) for (const x of [575, 635, 695, 755]) bank += window(x, y)
    return (
      sky(time(false, true), 330) +
      // Corner house
      `<rect y="140" width="150" height="190" fill="#e07a5f"/><rect y="132" width="154" height="10" fill="#ffffff" fill-opacity="0.4"/>` +
      corner +
      diff(40, 220, 24, window(40, 218, '#cfe3ee'), '') +
      // Tower with a gable
      `<rect x="160" y="70" width="140" height="260" fill="#f2cc8f"/><path d="M152 72L230 20L308 72Z" fill="#8d5a3b"/>` +
      pane(186, 100, 28, 36) +
      pane(246, 100, 28, 36) +
      pane(186, 170, 28, 36) +
      pane(246, 170, 28, 36) +
      pane(186, 240, 28, 36) +
      pane(246, 240, 28, 36) +
      diff(230, 52, 20, `<circle cx="230" cy="52" r="11" fill="#f4efe6"/><circle cx="230" cy="52" r="8" fill="#bde3f2"/>`, '') +
      `<rect x="214" y="290" width="32" height="40" fill="#6b4f3a"/>` +
      // Flower shop
      `<rect x="310" y="160" width="210" height="170" fill="#81b29a"/><rect x="306" y="152" width="218" height="10" fill="#ffffff" fill-opacity="0.4"/>` +
      window(350, 196) +
      window(415, 196) +
      window(480, 196) +
      `<g transform="translate(415 233)"><circle cx="-10" cy="-12" r="5" fill="#ffd23f"/><circle cy="-14" r="5" fill="#ffd23f"/><circle cx="10" cy="-12" r="5" fill="#ffd23f"/><path d="M-18 -8h36l-3 8h-30Z" fill="#a0703f"/></g>` +
      diff(350, 224, 24,
        `<g transform="translate(350 233)"><circle cx="-10" cy="-12" r="5" fill="#ff6b8b"/><circle cy="-14" r="5" fill="#ff6b8b"/><circle cx="10" cy="-12" r="5" fill="#ff6b8b"/><path d="M-18 -8h36l-3 8h-30Z" fill="#a0703f"/></g>`,
        `<g transform="translate(350 233)"><circle cx="-10" cy="-12" r="5" fill="#4dabf7"/><circle cy="-14" r="5" fill="#4dabf7"/><circle cx="10" cy="-12" r="5" fill="#4dabf7"/><path d="M-18 -8h36l-3 8h-30Z" fill="#a0703f"/></g>`) +
      awning(400, 248, 170, '#8338ec') +
      `<rect x="324" y="280" width="120" height="48" fill="#f4efe6"/><rect x="328" y="284" width="112" height="42" fill="#bde3f2"/>` +
      diff(480, 307, 28, door(480, 330, '#ffb703'), door(480, 330, '#2a9d8f')) +
      // Bank
      `<rect x="530" y="110" width="270" height="220" fill="#7aa6d6"/><rect x="526" y="102" width="278" height="10" fill="#ffffff" fill-opacity="0.4"/>` +
      bank +
      door(665, 330, '#2b2d42') +
      `<rect x="758" y="44" width="4" height="60" fill="#5c677d"/>` +
      diff(776, 61, 20, `<path d="M762 52h28l-6 9l6 9h-28Z" fill="#e63946"/>`, `<path d="M762 52h28l-6 9l6 9h-28Z" fill="#ffb703"/>`) +
      street(360, 100, 30) +
      `<rect y="460" width="800" height="40" fill="#cfd5da"/>` +
      `<path d="M0 420H800M0 432H800" stroke="#8d99ae" stroke-width="3"/>` +
      lampPost(150, 350) +
      diff(400, 345, 26, dog(400, 358), dog(400, 358, '#3d3d3d')) +
      tram(470, 452) +
      tramWindows(470, 452, '#bde3f2') +
      diff(705, 395, 20, `<circle cx="705" cy="395" r="10" fill="#ffd23f"/><path d="M702 390h5v10" stroke="#2b2b2b" stroke-width="2.5" fill="none"/>`,
        `<circle cx="705" cy="395" r="10" fill="#ffffff"/><path d="M701 390h7l-5 10" stroke="#2b2b2b" stroke-width="2.5" fill="none"/>`) +
      // Decor: the same at both moments, darkened by the evening with the rest
      cloud(330, 60, 0.5) +
      cloud(600, 50, 0.6) +
      bird(120, 133) +
      poster(560, 270, 30, 40, '#ffb703') +
      poster(720, 265, 30, 40, '#e63946') +
      flowerBox(60, 356, '#ff6b8b') +
      bin(250, 356) +
      pigeon(300, 358) +
      roadSign(545, 358) +
      bench(600, 358) +
      pot(760, 358) +
      bin(60, 490, '#3a86ff') +
      bench(200, 492, '#3a86ff') +
      pigeon(260, 492, true) +
      cone(360, 492) +
      // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 533, 57],
        ['birds', 688, 57],
      ]) +
      time('', DUSK) +
      time('', tramWindows(470, 452, '#ffe08a') + glow(328, 284, 112, 42)) +
      trap(150, 250, 34, lampHead(150, 350, false), lampHead(150, 350, true), 'lights') +
      trap(260, 188, 26, '', glow(246, 170, 28, 36), 'lights') +
      trap(695, 146, 24, '', glow(685, 133, 20, 26), 'lights') +
      trap(765, 425, 32, '', `<path d="M720 425L800 405V445Z" fill="#fff3b0" fill-opacity="0.5"/>`, 'lights') +
      trap(420, 70, 42, '', stars(420, 70), 'stars') +
      trap(90, 60, 54, sun(90, 60), moon(90, 60), 'moon')
    )
  },
})
