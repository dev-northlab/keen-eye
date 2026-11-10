// Castle hill: a castle above its village in summer and in winter, among the ten hardest of "time" (hidden until
// released, levels/upcoming.ts). Towers with their flags, a gate, a banner, a cottage, an inn with its sign, a well,
// a cart of sacks and a signpost on the road up the hill.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bareTree, barrel, bench, bird, butterfly, cat, chimney, cloud, door, flowers, grass, hangingSign, house, icicles, logPile, mountains, oak, pane, person, pine, pineSnow, pond, rabbit, rock, roofSnow, sack, signpost, sky, smoke, snowCap, snowfall, snowman, squirrel, stump, winterPerson, winterSky } from './shapes.ts'

export default svgLevel({
  id: 234,
  chapter: 'time',
  title: 'castleHill',
  pair: 'summer-winter',
  parTimeSec: 162,
  scene: ({ diff, time, trap, extra, anim }) => {
    const winter = time(false, true)
    return (
      time(sky(false, 250), winterSky(250)) + mountains(250, winter) +
      `<rect y="250" width="800" height="250" fill="${time('#8fc25a', '#f4f8fb')}"/>` +
      `<path d="M100 330Q260 170 410 172Q560 170 720 330Z" fill="${time('#6fae4a', '#e6eef4')}"/>` +
      `<path d="M396 230Q380 320 300 380T270 500H330Q340 420 430 340Q444 280 424 230Z" fill="${time('#d9c08f', '#e8edf2')}"/>` +
      // The castle: flags, window, banner, gate
      `<rect x="320" y="130" width="180" height="100" fill="#c9c2b2"/><path d="M320 130v-10h14v10h14v-10h14v10h14v-10h14v10h14v-10h14v10h14v-10h14v10h14v-10h14v10h14v-10h12v10Z" fill="#c9c2b2"/>` +
      `<rect x="296" y="90" width="48" height="140" fill="#b8b09e"/><rect x="476" y="100" width="48" height="130" fill="#b8b09e"/>` +
      `<path d="M290 92L320 50L350 92Z" fill="#7a3b2a"/><path d="M470 102L500 62L530 102Z" fill="#7a3b2a"/>` +
      `<rect x="314" y="110" width="12" height="18" rx="6" fill="#3d4a55"/><rect x="494" y="120" width="12" height="18" rx="6" fill="#3d4a55"/>` +
      time('', roofSnow(320, 50, 30, 42) + roofSnow(500, 62, 30, 40) + snowCap(320, 120, 180)) +
      `<path d="M320 50V24M500 62V36" stroke="#5c677d" stroke-width="2"/>` +
      diff(...around(320, 24, 342, 36), `<rect x="320" y="24" width="22" height="12" fill="#e63946"/>`, `<rect x="320" y="24" width="22" height="12" fill="#3a86ff"/>`) +
      diff(...around(500, 36, 522, 48), `<rect x="500" y="36" width="22" height="12" fill="#ffd23f"/>`, `<rect x="500" y="36" width="22" height="12" fill="#2a9d8f"/>`) +
      diff(...around(352, 140, 368, 160), `<rect x="352" y="140" width="16" height="20" rx="8" fill="#3d4a55"/>`, '') +
      diff(...around(440, 146, 460, 180), `<path d="M440 146H460V180L450 172L440 180Z" fill="#8338ec"/><circle cx="450" cy="158" r="4" fill="#ffd23f"/>`, `<path d="M440 146H460V180L450 172L440 180Z" fill="#e63946"/><circle cx="450" cy="158" r="4" fill="#ffd23f"/>`) +
      diff(...around(392, 182, 428, 230), `<path d="M392 230V200a18 18 0 0 1 36 0V230Z" fill="#6b4f3a"/><path d="M410 182V230M392 214H428" stroke="#4a3426" stroke-width="2"/>`, `<path d="M392 230V200a18 18 0 0 1 36 0V230Z" fill="#2f6e8c"/><path d="M410 182V230M392 214H428" stroke="#1d4e63" stroke-width="2"/>`) +
      // The cottage: door and window
      chimney(205, 338, '#7a5236') +
      house(160, 420, 140, 70, 32, '#e07a5f', '#9c4a3a') +
      time('', roofSnow(160, 318, 82, 34)) +
      diff(...around(94, 374, 126, 420), door(110, 420, '#2f6e8c'), door(110, 420, '#ffb703')) +
      diff(...around(167, 365, 201, 395), pane(170, 368, 28, 24), '') +
      // The inn and its sign
      house(640, 420, 130, 70, 30, '#81b29a', '#4f7f68') +
      time('', roofSnow(640, 320, 77, 32)) +
      door(610, 420, '#4f7f68') + pane(640, 372, 26, 24) +
      diff(...around(666, 360, 714, 402), hangingSign(690, 360, '#e63946', 'cup'), hangingSign(690, 360, '#e63946', 'bread')) +
      // The well and its bucket, the cart of sacks, the signpost
      `<rect x="276" y="430" width="48" height="30" rx="4" fill="#9a9a9a"/><path d="M280 430V392M320 430V392" stroke="#6b4f3a" stroke-width="4"/><path d="M272 394L300 380L328 394Z" fill="#9c4a3a"/><path d="M300 392V398" stroke="#5c677d" stroke-width="1.5"/>` +
      time('', snowCap(274, 426, 52) + snowCap(272, 388, 56)) +
      diff(...around(283, 398, 317, 428), `<path d="M290 404H310L307 426H293Z" fill="#8d99ae"/><rect x="288" y="402" width="24" height="4" rx="2" fill="#5c677d"/>`, '') +
      `<rect x="452" y="442" width="64" height="10" fill="#a0703f"/><circle cx="466" cy="458" r="10" fill="#6b4f3a"/><circle cx="502" cy="458" r="10" fill="#6b4f3a"/><path d="M452 446L430 452" stroke="#6b4f3a" stroke-width="4"/>` +
      sack(470, 442) +
      diff(...around(482, 416, 506, 442), sack(494, 442, '#c9a26b'), '') +
      time('', snowCap(456, 418, 52)) +
      diff(...around(510, 256, 570, 320), signpost(540, 320, 1), signpost(540, 320, -1)) +
      // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
      cloud(150, 60, 0.45) +
      cloud(660, 70, 0.5) +
      cloud(250, 140, 0.35) +
      pine(30, 480, 0.6) +
      time('', pineSnow(30, 480, 0.6)) +
      pine(780, 480, 0.5) +
      time('', pineSnow(780, 480, 0.5)) +
      barrel(250, 412) +
      time('', snowCap(237, 380, 26)) +
      logPile(720, 492) +
      time('', snowCap(702, 464, 36)) +
      bench(660, 474) +
      time('', snowCap(630, 446, 60)) +
      cat(780, 420, '#5c677d') +
      rabbit(330, 362) +
      bird(150, 318) +
      bird(640, 320, '#e63946') +
      stump(30, 384) +
      time('', snowCap(16, 364, 28)) +
      squirrel(526, 490) +
      rock(170, 490, 0.6) +
      time('', snowCap(160, 482, 22)) +
      time(butterfly(380, 300) + grass(420, 492) + grass(600, 492), '') +
      // Natural changes: leaves, smoke, icicles, ice, a snowman, warm clothes, flowers
      trap(60, 291, 49, oak(60, 330, 0.8), bareTree(60, 330, 0.75), 'leaves') +
      trap(216, 276, 35, '', smoke(202, 304), 'smoke') +
      trap(600, 358, 27, '', icicles(575, 625, 350), 'icicles') +
      trap(750, 312, 46, pond(750, 312, 44, 10, false), pond(750, 312, 44, 10, true), 'ice') +
      trap(380, 448, 50, '', snowman(380, 490), 'snowman') +
      trap(560, 434, 37, person(560, 470, '#e76f51', true), winterPerson(560, 470, '#3a86ff', true, '#ffd23f'), 'clothes') +
      trap(240, 459, 27, flowers(240, 470, '#ff6b8b'), '', 'flowers') +
      // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 640, 150],
        ['birds', 160, 160],
      ]) +
      time('', snowfall(234, 250, 46))
    )
  },
})
