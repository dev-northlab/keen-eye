import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bareTree, bucket, butterfly, cloud, cone, grass, icicles, oak, pane, person, sky, smoke, snowCap, snowfall, snowman, winterPerson, winterSky } from './shapes.ts'
import {
  barrier,
  brickPallet,
  bulldozer,
  bulldozerExhaust,
  dumpLoad,
  dumpTruck,
  excavator,
  excavatorBucket,
  hardHat,
  mixerStripes,
  mixerTruck,
  shovel,
  toolbox,
  wheelbarrow,
} from './vehicles.ts'

/** Lattice between (x0, y) and (x1, y + h): a frame with zigzag struts. */
const truss = (x0: number, x1: number, y: number, h: number, color: string) => {
  let zig = `M${x0} ${y + h}`
  for (let x = x0, up = true; x < x1; x += h, up = !up) zig += `L${Math.min(x + h, x1)} ${up ? y : y + h}`
  return `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${h}" fill="none" stroke="${color}" stroke-width="3"/><path d="${zig}" stroke="${color}" stroke-width="2" fill="none"/>`
}

/** The same lattice standing upright from (x, y0) down to y1, w wide. */
const mast = (x: number, y0: number, y1: number, w: number, color: string) => {
  let zig = `M${x} ${y0}`
  for (let y = y0, left = false; y < y1; y += w, left = !left) zig += `L${left ? x : x + w} ${Math.min(y + w, y1)}`
  return `<rect x="${x}" y="${y0}" width="${w}" height="${y1 - y0}" fill="none" stroke="${color}" stroke-width="3"/><path d="${zig}" stroke="${color}" stroke-width="2" fill="none"/>`
}

export default svgLevel({
  id: 221,
  chapter: 'time',
  title: 'constructionSite',
  pair: 'summer-winter',
  parTimeSec: 135,
  scene: ({ diff, time, trap, extra, anim }) =>
    time(sky(false, 270), winterSky(270)) +
    `<rect y="270" width="800" height="230" fill="${time('#c9a878', '#f4f8fb')}"/>` +
    `<path d="M0 300H800" stroke="${time('#b08d5c', '#dfe9f0')}" stroke-width="4"/>` +
    // Tower crane: mast, jib, counter-jib with its weights, cab, trolley and hook
    `<rect x="98" y="288" width="44" height="12" fill="#8d99a6"/>` +
    mast(112, 76, 288, 16, '#ffb703') +
    truss(128, 380, 66, 10, '#ffb703') +
    truss(40, 112, 66, 10, '#ffb703') +
    `<path d="M120 30V66M120 30L40 66M120 30L380 66" stroke="#ffb703" stroke-width="2.5"/>` +
    `<rect x="44" y="76" width="30" height="24" fill="#8d99a6"/><rect x="78" y="76" width="22" height="20" fill="#8d99a6"/>` +
    `<rect x="128" y="76" width="22" height="20" rx="2" fill="#ffb703"/><rect x="132" y="80" width="14" height="10" fill="#bde3f2"/>` +
    `<rect x="292" y="76" width="16" height="6" fill="#55606b"/><path d="M300 82V186" stroke="#3d4a55" stroke-width="2"/>` +
    `<path d="M300 186v6q0 6 -6 6" stroke="#3d4a55" stroke-width="3" fill="none"/>` +
    diff(...around(278, 188, 322, 222), `<path d="M296 192L282 200M304 192L318 200" stroke="#3d4a55" stroke-width="2"/>${brickPallet(300, 222)}`, '') +
    diff(...around(372, 48, 388, 66), `<path d="M380 66v-8" stroke="#55606b" stroke-width="2"/><circle cx="380" cy="55" r="4" fill="#e63946"/>`, '') +
    time('', snowCap(44, 72, 54) + snowCap(130, 72, 246)) +
    // House being built: slabs, columns, the first floor walled, a scaffold
    `<rect x="330" y="248" width="190" height="48" fill="#c0504d"/><rect x="330" y="188" width="96" height="52" fill="#c0504d"/>` +
    `<rect x="440" y="256" width="30" height="28" fill="#3a3f36"/>` +
    pane(350, 256, 30, 28) +
    pane(440, 256, 30, 28) +
    pane(486, 256, 26, 28) +
    pane(352, 198, 30, 30) +
    [334, 380, 426, 472, 512].map((x) => `<rect x="${x}" y="120" width="8" height="176" fill="#adb5bd"/>`).join('') +
    [120, 180, 240].map((y) => `<rect x="326" y="${y}" width="198" height="8" fill="#ced4da"/>`).join('') +
    `<path d="M528 120V300M546 120V300M524 180H550M524 240H550" stroke="#a0703f" stroke-width="3"/>` +
    time('', snowCap(326, 116, 198) + snowCap(326, 176, 198) + snowCap(426, 236, 98)) +
    diff(...around(453, 88, 487, 120), '', bucket(470, 120)) +
    // Site office with its stove pipe
    `<rect x="580" y="236" width="140" height="64" fill="#2f6e8c"/><path d="M600 240v56M640 240v56M690 240v56" stroke="#265a73" stroke-width="2"/>` +
    `<rect x="576" y="230" width="148" height="8" fill="#1d3b4f"/><rect x="590" y="214" width="6" height="16" fill="#55606b"/>` +
    diff(...around(592, 248, 630, 278), pane(596, 252, 30, 22), '') +
    `<rect x="652" y="252" width="26" height="48" fill="#ced4da"/><circle cx="672" cy="278" r="2" fill="#2b2d42"/>` +
    pane(690, 252, 24, 22) +
    time('', snowCap(574, 226, 152)) +
    // Middle row: excavator, dump truck, mixer, a heap of sand with a shovel
    excavator(130, 392) +
    diff(232, 344, 31, excavatorBucket(130, 392), excavatorBucket(130, 392, -70)) +
    dumpTruck(340, 392) +
    diff(...around(268, 302, 368, 330), dumpLoad(340, 392, 30), dumpLoad(340, 392, 52)) +
    mixerTruck(560, 392) +
    diff(...around(508, 310, 572, 364), mixerStripes(560, 392), mixerStripes(560, 392, '#3a86ff')) +
    `<path d="M650 394Q700 330 760 394Z" fill="#e9c46a"/>` +
    diff(...around(692, 294, 724, 356), shovel(698, 352), '') +
    time('', snowCap(670, 352, 64)) +
    // Front row: bulldozer, barrow, bricks, worker, cones and a barrier
    bulldozer(120, 482) +
    diff(...around(132, 400, 148, 434), bulldozerExhaust(120, 482), '') +
    wheelbarrow(280, 488) +
    brickPallet(350, 488) +
    toolbox(230, 490, '#e63946') +
    cone(640, 490) +
    cone(676, 490) +
    barrier(750, 490) +
    trap(450, 445, 38, person(450, 482, '#fb8500') + hardHat(450, 424), winterPerson(450, 482, '#fb8500', false, '#ffb703'), 'clothes') +
    trap(560, 438, 44, '', snowman(560, 480), 'snowman') +
    trap(748, 248, 44, oak(748, 300), bareTree(748, 300), 'leaves') +
    trap(478, 256, 44, '', icicles(436, 520, 248), 'icicles') +
    trap(606, 186, 36, '', smoke(592, 214), 'smoke') +
    // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
    cloud(480, 50, 0.45) +
    cloud(700, 110, 0.4) +
    time(grass(40, 496) + grass(600, 498) + butterfly(330, 440), '') +
    // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
    extras({ extra, anim }, [
      ['birds', 200, 150],
      ['birds', 600, 60],
    ]) +
    time('', snowfall(221, 270, 40)),
})
