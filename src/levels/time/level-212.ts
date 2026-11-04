import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bareTree, barrel, bird, birdHouse, bucket, bush, butterfly, chimney, cloud, crate, door, fence, flowers, grass, house, icicles, logPile, oak, pane, picket, pine, pineSnow, pond, rock, roofSnow, sack, sky, smoke, snowCap, snowfall, snowman, stones, winterSky } from './shapes.ts'

/** Apples on an `oak` (forest shapes) at (x, y), scale 1.2. Bounds: inside its crown. */
const apples = (x: number, y: number) =>
  [[-26, -70], [14, -92], [28, -62], [-6, -100], [-34, -50]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="5" fill="#e63946"/>`).join('')

/** Windmill tower; (x, y) = bottom center. Bounds: x ±80, y from −220 to 0. */
const windmill = (x: number, y: number) =>
  `<path d="M${x - 34} ${y}L${x - 22} ${y - 140}h44L${x + 34} ${y}Z" fill="#e9d3a7"/><path d="M${x - 28} ${y - 142}q28 -30 56 0Z" fill="#9c4a3a"/>` +
  `<rect x="${x - 10}" y="${y - 40}" width="20" height="40" fill="#6b4f3a"/>` +
  `<g transform="translate(${x} ${y - 150}) rotate(20)" fill="#f4efe6" stroke="#8a5a33" stroke-width="2"><rect x="-6" y="-72" width="12" height="62"/><rect x="-6" y="10" width="12" height="62"/>` +
  `<rect x="-72" y="-6" width="62" height="12"/><rect x="10" y="-6" width="62" height="12"/></g><circle cx="${x}" cy="${y - 150}" r="7" fill="#6b4f3a"/>`

/** Well; (x, y) = ground center. Its roof is `wellRoof`. Bounds of the base: x ±26, y from −64 to 0. */
const well = (x: number, y: number) =>
  `<rect x="${x - 24}" y="${y - 30}" width="48" height="30" fill="#a7b4c2"/><path d="M${x - 24} ${y - 20}h48M${x - 24} ${y - 10}h48" stroke="#8d99ae" stroke-width="2"/>` +
  `<path d="M${x - 20} ${y - 30}V${y - 64}M${x + 20} ${y - 30}V${y - 64}" stroke="#6b4f3a" stroke-width="4"/>`

/** Roof of `well(x, y)`. Bounds: x ±30, y from −82 to −62. */
const wellRoof = (x: number, y: number, color: string) => `<path d="M${x - 30} ${y - 62}L${x} ${y - 82}L${x + 30} ${y - 62}Z" fill="${color}"/>`

export default svgLevel({
  id: 212,
  chapter: 'time',
  title: 'farmYear',
  pair: 'summer-winter',
  parTimeSec: 100,
  scene: ({ diff, time, trap, extra, anim }) =>
    time(sky(false, 300), winterSky(300)) +
    cloud(130, 70, 0.6) +
    `<path d="M0 300Q250 230 520 290T800 280V310H0Z" fill="${time('#86b85a', '#e4edf4')}"/>` +
    `<rect y="300" width="800" height="200" fill="${time('#9ccc65', '#f4f8fb')}"/>` +
    windmill(660, 330) +
    time('', snowCap(634, 182, 52)) +
    diff(660, 270, 20, `<circle cx="660" cy="270" r="8" fill="#f4efe6"/><circle cx="660" cy="270" r="5" fill="#bde3f2"/>`, '') +
    // Farmhouse
    chimney(300, 190) +
    house(240, 340, 220, 130, 70, '#fff3d6', '#7a4e33') +
    time('', roofSnow(240, 140, 122, 72) + snowCap(290, 154, 20)) +
    pane(160, 250, 36, 40) +
    pane(286, 250, 36, 40) +
    diff(240, 192, 22, pane(229, 181, 22, 22), '') +
    diff(240, 317, 28, door(240, 340, '#3a86ff'), door(240, 340, '#e63946')) +
    trap(175, 222, 22, '', icicles(150, 330, 212), 'icicles') +
    trap(320, 128, 32, '', smoke(305, 156), 'smoke') +
    // Orchard tree and the well
    trap(470, 290, 62, oak(470, 350, 1.2) + apples(470, 350), bareTree(470, 350, 1.1), 'leaves') +
    well(560, 400) +
    diff(560, 328, 32, wellRoof(560, 400, '#9c4a3a'), wellRoof(560, 400, '#2f6e8c')) +
    fence(30, 9, 440, '#e9d3a7', 22, [3]) +
    time('', snowCap(28, 408, 192)) +
    diff(101, 418, 24, picket(96, 440), '') +
    diff(750, 416, 42, birdHouse(750, 455, '#e07a5f'), birdHouse(750, 455, '#8ac926')) +
    diff(660, 453, 28, barrel(650, 470), barrel(670, 470)) +
    trap(420, 452, 46, pond(420, 452, 100, 30, false), pond(420, 452, 100, 30, true), 'ice') +
    trap(560, 470, 26, flowers(560, 488, '#b38cff'), '', 'flowers') +
    trap(260, 430, 44, '', snowman(260, 474), 'snowman') +
    // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
    cloud(450, 60, 0.6) +
    cloud(520, 110, 0.4) +
    cloud(60, 160, 0.4) +
    bird(180, 176) +
    pine(40, 330, 0.6) +
    time('', pineSnow(40, 330, 0.6)) +
    bush(90, 340, 0.8) +
    time('', snowCap(74, 321, 32)) +
    logPile(20, 410) +
    time('', snowCap(7, 378, 26)) +
    sack(330, 390) +
    time('', snowCap(320, 367, 20)) +
    bucket(370, 392) +
    time('', snowCap(354, 366, 32)) +
    crate(725, 345, 26) +
    time('', snowCap(712, 319, 26)) +
    pine(780, 330, 0.5) +
    time('', pineSnow(780, 330, 0.5)) +
    rock(200, 490, 0.8) +
    time('', snowCap(188, 478, 24)) +
    time(butterfly(390, 340, '#ff6b8b'), '') +
    time(grass(150, 490) + stones(500, 495), '') +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md): flocks in the sky, the same at both moments.
    extras({ extra, anim }, [
      ['birds', 433, 166],
      ['birds', 73, 217],
    ]) +
    time('', snowfall(212, 300, 36)),
})
