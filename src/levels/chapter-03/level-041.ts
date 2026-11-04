// Motion differences: the butterfly flutters faster on picture B; the bird hops only on B; the big flower sways faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { acorn, anthill, bird, bluebells, butterfly, cloud, deer, floor, flower, FLOWER_COLORS, fox, log, mushroom, oak, pick, pine, pineCone, rabbit, rock, stump, sun, trailSign } from './shapes.ts'

export default svgLevel({
  id: 41,
  chapter: 'forest',
  title: 'clearing',
  parTimeSec: 120,
  scene: ({ diff, anim, rand, extra }) => {
    let flowers = ''
    for (let i = 0; i < 14; i++) flowers += flower(20 + rand() * 760, 400 + rand() * 90, pick(rand, FLOWER_COLORS))
    const fluttering = (period: number) =>
      anim({ id: 'butterfly', type: 'path', points: [[0, 0], [40, -24], [80, 0], [40, 20]], period }, butterfly(400, 300, '#ff6b8b'))
    const perched = bird(620, 236, '#e63946')
    const swaying = (period: number) => anim({ type: 'sway', angle: 8, pivot: [700, 470], period }, flower(700, 470, '#ff9f43'))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(120, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(500, 60, 0.8)) +
      // Far pines
      `<path d="M0 260Q200 230 400 250T800 240V500H0Z" fill="#a9d3a0"/>` +
      pine(40, 250, 0.9, '#7fb88a') +
      pine(110, 240, 1.1, '#7fb88a') +
      pine(200, 255, 0.8, '#7fb88a') +
      pine(560, 250, 1, '#7fb88a') +
      pine(760, 245, 1.1, '#7fb88a') +
      // Clearing
      `<rect y="320" width="800" height="180" fill="#8fca68"/><path d="M0 330Q400 290 800 330V340H0Z" fill="#8fca68"/>` +
      diff(290, 236, 38, oak(290, 300, 1), oak(290, 300, 1, '#e9a23b')) +
      oak(680, 320, 1.4, '#3f9a5a') +
      diff(620, 229, 18, perched, anim({ id: 'bird', type: 'bob', dx: 0, dy: 4, period: 0.8 }, perched), 'bird') +
      diff(400, 300, 20, fluttering(6), fluttering(3), 'butterfly') +
      diff(140, 364, 52, deer(140, 400), deer(140, 400, true)) +
      fox(470, 380) +
      diff(560, 414, 22, rabbit(560, 430), '') +
      rabbit(330, 440, true, '#c9a06c') +
      stump(240, 470) +
      log(430, 480) +
      diff(600, 470, 28, rock(600, 480), rock(600, 480, 1.3)) +
      diff(80, 465, 22, mushroom(80, 480), mushroom(80, 480, '#a0703f')) +
      mushroom(110, 486, '#ffb703', 0.8) +
      floor(rand, 340, 480) +
      flowers +
      diff(700, 455, 20, swaying(2.5), swaying(1)) +
      trailSign(330, 345) +
      pineCone(30, 415) +
      anthill(510, 492) +
      acorn(640, 330) +
      bluebells(765, 480) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['mushroom', 99, 286],
        ['fern', 679, 388],
        ['pineCone', 290, 402],
        ['bluebells', 491, 470],
        ['acorn', 146, 479],
        ['wildStrawberry', 552, 282],
        ['leafPile', 749, 287],
        ['butterfly', 321, 64],
        ['cloud', 670, 133],
        ['birds', 445, 175],
      ])
    )
  },
})
