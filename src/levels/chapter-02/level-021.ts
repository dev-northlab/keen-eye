// Motion differences: the cyclist rides the other way round on picture B; the balloon bobs faster on B.
import { decor, extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { awning, balloon, bike, bin, building, car, cityTree, cloud, dog, door, flowerBox, lampHead, lampPost, mailbox, manhole, newspaperBox, parkingMeter, person, pigeon, sandwichBoard, signBoard, skyline, street, sun } from './shapes.ts'
import { level021Redesign } from './level-021-redesign.ts'

export default svgLevel({
  id: 21,
  chapter: 'city',
  title: 'shopStreet',
  parTimeSec: 110,
  redesign: level021Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const ride = (reverse: boolean) =>
      anim({ id: 'bike', type: 'path', points: [[0, 0], [180, 0]], flipX: 560, period: 11, reverse }, bike(560, 470, '#e63946'))
    const bobbing = (period: number) => anim({ id: 'balloon', type: 'bob', dx: 0, dy: 4, period }, balloon(436, 268, '#ff006e'))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(700, 70) +
      anim({ type: 'path', points: [[0, 0], [70, 0]], period: 30 }, cloud(160, 70, 0.7)) +
      skyline(rand, 180) +
      building(0, 340, 200, 220, '#f2cc8f') +
      building(200, 340, 200, 260, '#e07a5f') +
      building(400, 340, 160, 200, '#81b29a') +
      building(560, 340, 240, 240, '#7aa6d6') +
      // Shop fronts
      door(300, 340, '#2a9d8f') +
      diff(300, 294, 54, awning(300, 280, 100, '#e63946'), awning(300, 280, 100, '#3a86ff')) +
      door(480, 340, '#6b4f3a') +
      awning(480, 282, 90, '#8338ec') +
      door(680, 340, '#264653') +
      diff(680, 250, 37, signBoard(680, 250, 70, '#ffb703'), signBoard(680, 250, 70, '#8ac926')) +
      diff(80, 288, 22, flowerBox(80, 297, '#e63946'), flowerBox(80, 297, '#ffd166')) +
      flowerBox(160, 297, '#ff6b8b') +
      street(360, 140) +
      lampPost(720, 340) +
      lampHead(720, 340) +
      bin(760, 340) +
      cityTree(40, 340, 1.1) +
      // Passers-by
      person(420, 340, '#3a86ff') +
      diff(436, 280, 34, bobbing(2.6), bobbing(1.2), 'balloon') +
      person(600, 340, '#ffb703', true) +
      diff(640, 327, 26, dog(640, 340), '') +
      pigeon(520, 340) +
      pigeon(545, 340, true) +
      // Traffic
      diff(200, 421, 47, car(200, 440, '#ffb703'), car(200, 440, '#8ac926')) +
      car(380, 430, '#e63946', true) +
      diff(560, 453, 34, ride(false), ride(true), 'bike') +
      mailbox(130, 352) +
      sandwichBoard(240, 352) +
      newspaperBox(375, 352) +
      parkingMeter(575, 352) +
      manhole(330, 472) +
      // A busier shop street, the same in both pictures: a plane, a hot-air balloon and a swallow in the sky, a crow, a
      // pigeon and a cat on the roofs, flower boxes on the windows, a hydrant, a shopping bag and a coffee cup.
      decor({ anim }, [
        ['plane', 470, 22],
        ['hotAirBalloon', 60, 45],
        ['swallow', 300, 30],
        ['crow', 370, 72],
        ['pigeon', 440, 132],
        ['cat', 780, 92, '#6b6b6b'],
        ['flowerBox', 120, 217, '#4dabf7'],
        ['flowerBox', 240, 175, '#ffd23f'],
        ['flowerBox', 520, 235, '#b38cff'],
        ['hydrant', 210, 354],
        ['shoppingBag', 160, 356, '#2a9d8f'],
        ['coffeeCup', 395, 356],
      ]) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['balloon', 593, 41, '#ff006e'],
        ['pigeon', 467, 414],
        ['cone', 112, 398],
        ['pigeon', 290, 415],
        ['pigeon', 65, 478],
      ])
    )
  },
})
