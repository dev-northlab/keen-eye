import { svgLevel } from '../helpers.ts'
import { around, buoy, cat, crate, door, DUSK, flowerBox, glow, gull, hangingSign, lampHead, lampPost, moon, pane, rowboat, sky, stars, sun, wallLamp, waves } from './shapes.ts'

/** Narrow harbour house from x0, w wide, wall from top down to 330 under a gable 40 high. */
const narrowHouse = (x0: number, w: number, top: number, wall: string, roof: string) =>
  `<rect x="${x0}" y="${top}" width="${w}" height="${330 - top}" fill="${wall}"/><path d="M${x0 - 6} ${top + 2}L${x0 + w / 2} ${top - 40}L${x0 + w + 6} ${top + 2}Z" fill="${roof}"/>`

export default svgLevel({
  id: 220,
  chapter: 'time',
  title: 'fishingHarbor',
  pair: 'day-night',
  parTimeSec: 125,
  scene: ({ diff, time, trap }) =>
    sky(time(false, true), 330) +
    narrowHouse(0, 150, 150, '#e76f51', '#7a3b22') +
    pane(20, 180, 30, 34) +
    pane(100, 180, 30, 34) +
    pane(20, 250, 30, 34) +
    diff(...around(97, 247, 133, 287), pane(100, 250, 30, 34), '') +
    door(75, 330, '#3d4a55') +
    narrowHouse(150, 140, 120, '#f4a261', '#7a3b22') +
    pane(170, 150, 30, 34) +
    pane(240, 150, 30, 34) +
    door(220, 330, '#2a9d8f') +
    `<path d="M196 230h12" stroke="#3d4a55" stroke-width="2"/>` +
    diff(...around(196, 230, 244, 272), hangingSign(220, 230, '#2f6e8c', 'fish'), hangingSign(220, 230, '#2f6e8c', 'cup')) +
    narrowHouse(290, 140, 160, '#2a9d8f', '#1d5e5a') +
    pane(310, 190, 30, 34) +
    pane(380, 190, 30, 34) +
    diff(...around(344, 284, 376, 330), door(360, 330, '#ffb703'), door(360, 330, '#e63946')) +
    narrowHouse(430, 150, 130, '#e9c46a', '#9c4a3a') +
    pane(450, 160, 30, 34) +
    pane(530, 160, 30, 34) +
    pane(530, 240, 30, 34) +
    door(480, 330, '#6b4f3a') +
    diff(...around(447, 194, 483, 230), cat(465, 230), cat(465, 230, '#3d3d3d')) +
    narrowHouse(580, 220, 150, '#8ecae6', '#2f6e8c') +
    pane(610, 180, 30, 34) +
    pane(700, 180, 30, 34) +
    pane(700, 250, 30, 34) +
    door(640, 330, '#e63946') +
    diff(...around(607, 200, 643, 218), flowerBox(625, 218, '#ff6b8b'), flowerBox(625, 218, '#ffd23f')) +
    // Quay and harbour
    `<rect y="330" width="800" height="70" fill="#cbb89a"/><rect y="396" width="800" height="6" fill="#8d99ae"/>` +
    crate(300, 390, 26) +
    crate(272, 390, 26, '#b07a42') +
    diff(...around(287, 338, 313, 364), crate(300, 364, 26), '') +
    lampPost(720, 395) +
    `<rect y="402" width="800" height="98" fill="#3ba7cc"/>` +
    waves(420, 8, 100, '#2f93ba') +
    diff(...around(160, 434, 240, 456), rowboat(200, 450, '#e63946'), rowboat(200, 450, '#ffffff')) +
    rowboat(420, 470, '#3a86ff') +
    diff(...around(510, 438, 530, 468), buoy(520, 460), buoy(520, 460, '#2a9d8f')) +
    time('', DUSK) +
    time('', glow(20, 180, 30, 34) + glow(530, 240, 30, 34) + glow(700, 250, 30, 34)) +
    trap(325, 207, 24, '', glow(310, 190, 30, 34), 'lights') +
    trap(444, 270, 24, wallLamp(430, 260, false), wallLamp(430, 260, true), 'lights') +
    trap(720, 295, 34, lampHead(720, 395, false), lampHead(720, 395, true), 'lights') +
    trap(550, 80, 36, gull(530, 72) + gull(570, 90), '', 'birds') +
    trap(380, 70, 40, '', stars(380, 70), 'stars') +
    trap(720, 70, 54, sun(720, 70), moon(720, 70), 'moon'),
})
