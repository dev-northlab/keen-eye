import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bareTree, barrel, bird, bucket, bush, butterfly, chimney, cloud, crate, fence, grass, hayBale, hen, house, icicles, kennel, logPile, oak, pane, picket, pine, pineSnow, pond, roofSnow, sack, sheep, sky, small, smoke, snowCap, snowfall, stones, sunflower, tractor, vane, winterSky } from './shapes.ts'

export default svgLevel({
  id: 227,
  chapter: 'time',
  title: 'farmyardSeasons',
  pair: 'summer-winter',
  parTimeSec: 150,
  scene: ({ diff, time, trap, extra, anim }) =>
    time(sky(false, 270), winterSky(270)) +
    `<rect y="270" width="800" height="230" fill="${time('#9ccc65', '#f4f8fb')}"/>` +
    // Barn
    `<rect x="40" y="170" width="200" height="150" fill="#c0392b"/><path d="M28 174L140 110L252 174Z" fill="#6b3a2e"/>` +
    time('', roofSnow(140, 110, 112, 64)) +
    `<rect x="105" y="250" width="70" height="70" fill="#ffffff"/>` +
    diff(...around(105, 250, 175, 320), `<rect x="111" y="256" width="58" height="64" fill="#a8322a"/><path d="M111 256l58 64M169 256l-58 64" stroke="#ffffff" stroke-width="5"/>`,
      `<rect x="111" y="256" width="58" height="64" fill="#2f6e8c"/><path d="M111 256l58 64M169 256l-58 64" stroke="#ffffff" stroke-width="5"/>`) +
    diff(...around(125, 137, 155, 167), pane(128, 140, 24, 24), '') +
    diff(...around(120, 64, 160, 110), vane(140, 110, 1), vane(140, 110, -1)) +
    // Farmhouse
    chimney(690, 155) +
    house(640, 300, 200, 120, 60, '#f4d6a0', '#7a4e33') +
    time('', roofSnow(640, 120, 112, 62) + snowCap(680, 117, 20)) +
    pane(560, 210, 36, 36) +
    diff(...around(681, 207, 723, 249), pane(684, 210, 36, 36), '') +
    `<rect x="624" y="250" width="32" height="50" fill="#6b4f3a"/>` +
    trap(580, 190, 20, '', icicles(528, 752, 182), 'icicles') +
    trap(712, 95, 28, '', smoke(695, 123), 'smoke') +
    trap(440, 232, 60, oak(440, 290, 1.2), bareTree(440, 290, 1.1), 'leaves') +
    trap(530, 285, 34, sunflower(520, 320, 70) + sunflower(542, 320, 60), '', 'flowers') +
    // Yard
    diff(...around(300, 280, 360, 330), kennel(330, 330, '#e9c46a'), kennel(330, 330, '#8ecae6')) +
    time('', snowCap(298, 278, 64)) +
    hayBale(250, 380) +
    trap(250, 370, 34, '', snowCap(214, 350, 72), 'snow') +
    small(300, 400, hen(300, 400)) +
    diff(...around(346, 366, 395, 410), small(370, 390, hen(370, 390)), small(370, 390, hen(370, 390, false, '#c98b4e'))) +
    diff(...around(533, 383, 594, 421), small(563, 402, sheep(563, 402)), small(563, 402, sheep(563, 402, false, '#3d3d3d'))) +
    trap(450, 450, 40, `<ellipse cx="450" cy="450" rx="70" ry="20" fill="#8d6e4f"/><ellipse cx="440" cy="452" rx="44" ry="10" fill="#7a5c3f"/>`, pond(450, 450, 70, 20, true), 'ice') +
    diff(...around(675, 404, 764, 470), small(720, 470, tractor(720, 470, '#d62828')), small(720, 470, tractor(720, 470, '#2a9d8f'))) +
    time('', snowCap(692, 403, 26)) +
    fence(40, 9, 470, '#e9d3a7', 22, [4]) +
    time('', snowCap(38, 438, 192)) +
    diff(...around(128, 426, 138, 470), picket(128, 470), '') +
    diff(...around(246, 436, 274, 470), barrel(260, 470), barrel(260, 470, '#3a86ff')) +
    // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
    cloud(300, 80, 0.6) +
    cloud(500, 120, 0.4) +
    cloud(780, 40, 0.3) +
    bird(60, 157) +
    pine(20, 330, 0.6) +
    time('', pineSnow(20, 330, 0.6)) +
    bucket(20, 420) +
    time('', snowCap(4, 394, 32)) +
    sack(240, 325) +
    time('', snowCap(230, 302, 20)) +
    logPile(430, 340) +
    time('', snowCap(415, 308, 30)) +
    crate(640, 340, 26) +
    time('', snowCap(627, 314, 26)) +
    bucket(680, 345) +
    time('', snowCap(664, 319, 32)) +
    bush(775, 300, 0.7) +
    time('', snowCap(761, 283, 28)) +
    time(butterfly(480, 330) + grass(510, 495) + stones(350, 492) + grass(620, 495), '') +
    // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
    extras({ extra, anim }, [
      ['birds', 303, 192],
      ['birds', 598, 74],
      ['birds', 411, 54],
    ]) +
    time('', snowfall(227, 270, 46)),
})
