// River viaduct: a train on a stone viaduct over a river in summer and in winter, among the ten hardest of "time"
// (hidden until released, levels/upcoming.ts). The locomotive and its carriages, ivy and a signal on the viaduct, a
// rowing boat, a fisherman with his bucket, a cottage and a mailbox; the river freezes in winter.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bareTree, bucket, bush, butterfly, chimney, cloud, deer, door, flowers, fox, grass, hedgehog, house, icicles, logPile, mailbox, mountains, oak, pane, person, pine, pineSnow, rabbit, roofSnow, rowboat, sky, smoke, snowCap, snowfall, snowman, winterPerson, winterSky, bird, cat } from './shapes.ts'

/** Carriage body from x0 to x0 + w with its roof, on rails at y = 170. */
const coach = (x0: number, w: number, color: string) =>
  `<rect x="${x0}" y="112" width="${w}" height="52" rx="4" fill="${color}"/><rect x="${x0 - 2}" y="106" width="${w + 4}" height="8" rx="3" fill="#3d4a55"/>` +
  `<circle cx="${x0 + 18}" cy="166" r="6" fill="#2b2b2b"/><circle cx="${x0 + w - 18}" cy="166" r="6" fill="#2b2b2b"/>`

export default svgLevel({
  id: 238,
  chapter: 'time',
  title: 'riverViaduct',
  pair: 'summer-winter',
  parTimeSec: 170,
  scene: ({ diff, time, trap, extra, anim }) => {
    let piers = ''
    let spandrels = ''
    for (const x of [80, 200, 320, 440, 560, 680]) piers += `<rect x="${x}" y="186" width="20" height="160" fill="#a8957f"/>`
    for (const x of [100, 220, 340, 460, 580]) spandrels += `<path d="M${x} 186H${x + 100}V232Q${x + 50} 196 ${x} 232Z" fill="#b8a58f"/>`
    let windows2 = ''
    for (const x of [372, 396, 420]) windows2 += `<rect x="${x}" y="120" width="16" height="14" rx="2" fill="#bde3f2"/>`
    return (
      time(sky(false, 230), winterSky(230)) + mountains(230, time(false, true)) +
      `<rect y="230" width="800" height="270" fill="${time('#8fc25a', '#f4f8fb')}"/>` +
      `<path d="M0 326Q200 312 400 330T800 330V412Q600 422 400 404T0 380Z" fill="${time('#4aa3c7', '#cfe6f2')}"/>` +
      // The viaduct: ivy, the signal
      piers + `<rect x="80" y="170" width="640" height="16" fill="#b8a58f"/>` + spandrels +
      time('', snowCap(80, 170, 640)) +
      diff(...around(250, 196, 290, 226), `<circle cx="258" cy="204" r="7" fill="#3f9a5a"/><circle cx="272" cy="200" r="8" fill="#4caf6a"/><circle cx="282" cy="212" r="7" fill="#3f9a5a"/><circle cx="264" cy="218" r="7" fill="#4caf6a"/>`, '') +
      `<path d="M740 236V152" stroke="#3d4a55" stroke-width="4"/><rect x="730" y="150" width="20" height="34" rx="4" fill="#2b2d42"/><circle cx="740" cy="174" r="5" fill="#5c677d"/>` +
      diff(...around(734, 152, 746, 164), `<circle cx="740" cy="158" r="5" fill="#8ac926"/>`, `<circle cx="740" cy="158" r="5" fill="#ff3b3b"/>`) +
      // The train: cab window, a carriage door, a window, the tail lamp
      `<path d="M80 170H720" stroke="#3d4a55" stroke-width="3"/>` +
      `<rect x="120" y="134" width="70" height="30" rx="8" fill="#2b2d42"/><rect x="190" y="118" width="30" height="46" fill="#2b2d42"/><rect x="138" y="110" width="12" height="24" fill="#2b2d42"/>` +
      `<rect x="120" y="150" width="100" height="6" fill="#e63946"/><circle cx="140" cy="166" r="7" fill="#5c677d"/><circle cx="170" cy="166" r="7" fill="#5c677d"/><circle cx="204" cy="166" r="7" fill="#5c677d"/>` +
      diff(...around(196, 126, 216, 144), `<rect x="198" y="128" width="16" height="14" rx="2" fill="#bde3f2"/>`, '') +
      coach(230, 120, '#2a9d8f') + `<rect x="242" y="120" width="16" height="14" rx="2" fill="#bde3f2"/><rect x="314" y="120" width="16" height="14" rx="2" fill="#bde3f2"/>` +
      diff(...around(284, 136, 296, 164), `<rect x="284" y="136" width="12" height="28" fill="#1d6b62"/>`, `<rect x="284" y="136" width="12" height="28" fill="#ffd23f"/>`) +
      coach(360, 120, '#e9c46a') + windows2 +
      diff(...around(444, 120, 460, 134), `<rect x="444" y="120" width="16" height="14" rx="2" fill="#bde3f2"/>`, '') +
      coach(490, 110, '#e63946') + `<rect x="504" y="120" width="16" height="14" rx="2" fill="#bde3f2"/><rect x="530" y="120" width="16" height="14" rx="2" fill="#bde3f2"/><rect x="556" y="120" width="16" height="14" rx="2" fill="#bde3f2"/>` +
      diff(...around(594, 144, 606, 156), `<circle cx="600" cy="150" r="5" fill="#ffd23f"/>`, `<circle cx="600" cy="150" r="5" fill="#3a86ff"/>`) +
      time('', snowCap(230, 104, 120) + snowCap(360, 104, 120) + snowCap(490, 104, 110)) +
      // The rowing boat, the fisherman's hat, his bucket
      diff(...around(360, 364, 440, 386), rowboat(400, 380, '#e63946'), rowboat(400, 380, '#3a86ff')) +
      person(560, 450, '#2a9d8f', true) + `<path d="M548 420L500 380M500 380V410" stroke="#5c4033" stroke-width="2"/>` +
      diff(...around(547, 384, 573, 394), `<path d="M547 394H573L570 386H550Z" fill="#e9c46a"/>`, `<path d="M547 394H573L570 386H550Z" fill="#e63946"/>`) +
      diff(...around(583, 446, 617, 476), bucket(600, 476, '#8d99ae'), '') +
      // The cottage: door, window; the mailbox
      chimney(150, 376, '#7a5236') +
      house(110, 450, 140, 60, 30, '#e07a5f', '#9c4a3a') +
      time('', roofSnow(110, 360, 82, 32)) +
      diff(...around(54, 404, 86, 450), door(70, 450, '#2f6e8c'), door(70, 450, '#ffb703')) +
      diff(...around(127, 407, 157, 435), pane(130, 410, 24, 22), '') +
      diff(...around(226, 420, 254, 470), mailbox(240, 470, '#3a86ff'), mailbox(240, 470, '#e63946')) +
      // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
      cloud(400, 50, 0.45) +
      cloud(700, 60, 0.4) +
      bird(90, 170) +
      pine(30, 330, 0.6) +
      time('', pineSnow(30, 330, 0.6)) +
      pine(780, 300, 0.5) +
      time('', pineSnow(780, 300, 0.5)) +
      deer(380, 300) +
      logPile(22, 488) +
      time('', snowCap(4, 460, 36)) +
      fox(520, 312) +
      rabbit(60, 302) +
      cat(680, 490, '#5c677d') +
      bush(400, 490, 0.6) +
      time('', snowCap(388, 476, 24)) +
      hedgehog(270, 302) +
      time(butterfly(640, 330) + grass(300, 494) + grass(520, 494), '') +
      // Natural changes: smoke, icicles, ice, leaves, a snowman, warm clothes, flowers
      trap(161, 314, 35, '', smoke(147, 342), 'smoke') +
      trap(500, 194, 32, '', icicles(470, 530, 186), 'icicles') +
      trap(260, 380, 24, '', `<path d="M240 376l16 8l18 -6" stroke="#9fc4d8" stroke-width="2" fill="none"/>`, 'ice') +
      trap(740, 416, 43, oak(740, 450, 0.7), bareTree(740, 450, 0.65), 'leaves') +
      trap(480, 448, 50, '', snowman(480, 490), 'snowman') +
      trap(330, 452, 37, person(330, 488, '#e76f51'), winterPerson(330, 488, '#8338ec', false, '#ffd23f'), 'clothes') +
      trap(640, 269, 27, flowers(640, 280, '#ff6b8b'), '', 'flowers') +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 560, 60],
        ['birds', 120, 70],
      ]) +
      time('', snowfall(238, 230, 46))
    )
  },
})
