import { svgLevel } from '../helpers.ts'
import { bareTree, barrel, bird, bucket, butterfly, cloud, crate, fence, flowers, grass, hayBale, hen, kennel, oak, pane, picket, pine, pineSnow, pond, rock, roofSnow, sack, sky, snowCap, snowfall, snowman, stump, vane, winterSky } from './shapes.ts'

export default svgLevel({
  id: 206,
  chapter: 'time',
  title: 'snowFarm',
  pair: 'summer-winter',
  parTimeSec: 85,
  scene: ({ diff, time, trap }) =>
    time(sky(false, 290), winterSky(290)) +
    cloud(250, 80, 0.7) +
    `<rect y="290" width="800" height="210" fill="${time('#9ccc65', '#f4f8fb')}"/>` +
    `<path d="M0 290Q160 250 330 290Z" fill="${time('#86b85a', '#e4edf4')}"/>` +
    // Barn and silo
    `<rect x="650" y="160" width="62" height="170" fill="#a7b4c2"/><path d="M650 162a31 31 0 0 1 62 0Z" fill="#8d99ae"/>` +
    time('', snowCap(652, 134, 58)) +
    diff(681, 200, 24, `<circle cx="681" cy="200" r="9" fill="#3d4a55"/>`, '') +
    `<rect x="440" y="190" width="200" height="140" fill="#c0392b"/>` +
    `<path d="M428 194L540 120L652 194Z" fill="#6b3a2e"/>` +
    time('', roofSnow(540, 120, 112, 74)) +
    `<rect x="505" y="255" width="70" height="75" fill="#ffffff"/><rect x="511" y="261" width="58" height="69" fill="#a8322a"/>` +
    `<path d="M511 261l58 69M569 261l-58 69" stroke="#ffffff" stroke-width="5"/>` +
    diff(540, 172, 24, pane(528, 160, 24, 24), '') +
    diff(540, 97, 32, vane(540, 120, 1), vane(540, 120, -1)) +
    // Oak: leaves in summer, bare in winter
    trap(300, 255, 64, oak(300, 320, 1.2), bareTree(300, 320, 1.2), 'leaves') +
    fence(380, 10, 380, '#e9d3a7', 22, [6]) +
    time('', snowCap(378, 348, 212)) +
    diff(517, 358, 24, picket(512, 380), '') +
    diff(720, 380, 30, kennel(720, 400), kennel(720, 400, '#3a86ff')) +
    diff(630, 410, 24, barrel(630, 424), barrel(630, 424, '#2f7d55')) +
    trap(180, 420, 70, pond(180, 420, 110, 40, false), pond(180, 420, 110, 40, true), 'ice') +
    trap(370, 446, 34, flowers(370, 466) + flowers(410, 470, '#ffd23f'), '', 'flowers') +
    trap(100, 300, 44, '', snowman(100, 344), 'snowman') +
    // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
    cloud(120, 60, 0.6) +
    cloud(400, 160, 0.4) +
    cloud(220, 130, 0.4) +
    pine(30, 300, 0.6) +
    time('', pineSnow(30, 300, 0.6)) +
    pine(770, 300, 0.7) +
    time('', pineSnow(770, 300, 0.7)) +
    hayBale(395, 330) +
    time('', snowCap(375, 298, 40)) +
    sack(625, 330) +
    time('', snowCap(615, 306, 20)) +
    crate(755, 330) +
    time('', snowCap(739, 300, 32)) +
    bird(583, 336, '#e63946') +
    hen(60, 410) +
    time(butterfly(430, 420, '#ff6b8b'), '') +
    time(grass(260, 480), '') +
    rock(470, 470) +
    time('', snowCap(458, 456, 24)) +
    stump(560, 470) +
    time('', snowCap(546, 450, 28)) +
    bucket(760, 470) +
    time('', snowCap(744, 444, 32)) +
    time('', snowfall(206, 280, 30)),
})
