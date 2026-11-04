import { svgLevel } from '../helpers.ts'
import { around, bench, bin, bird, bus, car, cloud, cone, dog, door, DUSK, flowerBox, hydrant, lampHead, lampPost, moon, person, pigeon, pot, roadSign, sky, stars, sun } from './shapes.ts'

/** Grid of office windows from (x0, y0): cols × rows, 14 × 18 each, 28 and 34 apart; `skip` = "col,row" keys. */
const officeWindows = (x0: number, y0: number, cols: number, rows: number, glass: string, skip: string[] = []) => {
  let out = ''
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) if (!skip.includes(`${c},${r}`)) out += `<rect x="${x0 + c * 28}" y="${y0 + r * 34}" width="14" height="18" fill="${glass}"/>`
  return out
}

export default svgLevel({
  id: 230,
  chapter: 'time',
  title: 'downtown',
  pair: 'day-night',
  parTimeSec: 155,
  scene: ({ diff, time, trap }) =>
    sky(time(false, true), 300) +
    // Towers
    `<rect x="20" y="60" width="140" height="240" fill="#7aa6d6"/>` +
    officeWindows(32, 76, 4, 6, '#e3f2fd', ['2,3']) +
    diff(...around(88, 178, 102, 196), `<rect x="88" y="178" width="14" height="18" fill="#e3f2fd"/>`, '') +
    `<rect x="160" y="120" width="170" height="180" fill="#bdb2ff"/>` +
    `<rect x="180" y="140" width="130" height="56" fill="#ffffff"/><path d="M250 156h44M250 170h36M250 184h44" stroke="#8d99ae" stroke-width="4"/>` +
    diff(...around(206, 154, 234, 182), `<circle cx="220" cy="168" r="14" fill="#e63946"/>`, `<circle cx="220" cy="168" r="14" fill="#3a86ff"/>`) +
    officeWindows(176, 212, 5, 2, '#e3f2fd') +
    `<rect x="398" y="26" width="4" height="24" fill="#5c677d"/>` +
    diff(...around(395, 19, 405, 29), `<circle cx="400" cy="24" r="5" fill="#e63946"/>`, '') +
    `<rect x="330" y="50" width="140" height="250" fill="#8ecae6"/>` +
    officeWindows(344, 66, 4, 7, '#e3f2fd') +
    `<rect x="470" y="100" width="150" height="200" fill="#f2cc8f"/>` +
    officeWindows(484, 116, 5, 4, '#e3f2fd') +
    `<rect x="490" y="260" width="40" height="36" fill="#bde3f2"/>` +
    diff(...around(529, 254, 561, 300), door(545, 300, '#2b2d42'), door(545, 300, '#e63946')) +
    `<rect x="620" y="70" width="170" height="230" fill="#81b29a"/>` +
    officeWindows(636, 86, 5, 5, '#e3f2fd') +
    diff(...around(687, 244, 723, 262), flowerBox(705, 262, '#ff6b8b'), '') +
    // Street
    `<rect y="300" width="800" height="30" fill="#cfd5da"/><rect y="330" width="800" height="110" fill="#4a5058"/>` +
    [360, 380, 400, 420, 440].map((x) => `<rect x="${x}" y="336" width="10" height="98" fill="#ffffff" fill-opacity="0.8"/>`).join('') +
    `<rect y="440" width="800" height="60" fill="#cfd5da"/>` +
    diff(...around(101, 296, 119, 328), hydrant(110, 328), hydrant(110, 328, '#ffb703')) +
    `<rect x="298" y="280" width="4" height="50" fill="#5c677d"/>` +
    diff(...around(290, 270, 310, 290), `<circle cx="300" cy="280" r="10" fill="#2a9d8f"/><rect x="295" y="276" width="10" height="8" fill="#ffffff"/>`,
      `<circle cx="300" cy="280" r="10" fill="#e63946"/><rect x="295" y="276" width="10" height="8" fill="#ffffff"/>`) +
    person(420, 330, '#ffb703') +
    bus(200, 420, '#ffb703') +
    diff(...around(150, 368, 170, 378), `<rect x="150" y="368" width="20" height="10" fill="#2b2d42"/>`, `<rect x="150" y="368" width="20" height="10" fill="#e63946"/>`) +
    car(560, 430, '#ffb703') +
    diff(...around(548, 384, 572, 394), `<rect x="550" y="386" width="20" height="8" rx="2" fill="#2b2d42"/>`, '') +
    person(600, 492, '#3a86ff', true) +
    diff(...around(628, 460, 672, 486), dog(650, 486), dog(650, 486, '#f2f2f2')) +
    lampPost(40, 330) +
    lampPost(760, 330) +
    time(lampHead(40, 330, false), '') +
    // Decor: the same at both moments, darkened by the evening with the rest
    cloud(160, 40, 0.4) +
    cloud(480, 70, 0.4) +
    cloud(700, 40, 0.4) +
    bird(80, 60) +
    bird(700, 70, '#e63946') +
    bin(190, 328) +
    pot(230, 328) +
    roadSign(470, 328, '#e63946') +
    bench(650, 328) +
    pigeon(720, 328, true) +
    bench(150, 490) +
    pigeon(220, 492) +
    cone(300, 490) +
    pot(520, 490, '#3a86ff') +
    bench(740, 490, '#3a86ff') +
    time('', DUSK) +
    time('', lampHead(40, 330, true) + officeWindows(32, 76, 4, 2, '#ffe08a') + officeWindows(636, 86, 5, 1, '#ffe08a') + officeWindows(484, 150, 5, 1, '#ffe08a')) +
    trap(407, 126, 30, '', officeWindows(372, 100, 3, 2, '#ffe08a'), 'lights') +
    trap(280, 168, 22, '', `<path d="M250 210L300 140h12L270 210Z" fill="#fff3b0" fill-opacity="0.4"/><circle cx="280" cy="208" r="5" fill="#fff3b0"/>`, 'lights') +
    trap(300, 410, 26, '', `<path d="M262 404L330 392V424Z" fill="#fff3b0" fill-opacity="0.5"/>`, 'lights') +
    trap(760, 230, 34, lampHead(760, 330, false), lampHead(760, 330, true), 'lights') +
    trap(550, 50, 36, '', stars(550, 50), 'stars') +
    trap(245, 60, 54, sun(245, 60), moon(245, 60), 'moon'),
})
