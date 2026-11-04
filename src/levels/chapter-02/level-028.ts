// Motion differences: the exhaust puff bobs only on picture B; the cyclist weaves through faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bike, bollard, building, bus, car, cloud, mailbox, newspaperBox, parkingMeter, person, sandwichBoard, skyline, street, trafficLight } from './shapes.ts'

/** Destination board on the bus at (x, y) = ground center. Bounds: x ±16, y from −54 to −48. */
const board = (x: number, y: number, color: string) => `<rect x="${x - 16}" y="${y - 54}" width="32" height="6" rx="2" fill="${color}"/>`

/** Exhaust puff; (x, y) = center. Bounds: x ±10, y ±8. */
const puff = (x: number, y: number) => `<circle cx="${x - 4}" cy="${y + 2}" r="6" fill="#c9c9c9"/><circle cx="${x + 4}" cy="${y - 2}" r="6" fill="#d6d6d6"/>`

export default svgLevel({
  id: 28,
  chapter: 'city',
  title: 'trafficJam',
  parTimeSec: 110,
  scene: ({ diff, anim, rand, extra }) => {
    const weaving = (period: number) =>
      anim({ id: 'bike', type: 'path', points: [[0, 0], [120, 0]], period }, bike(560, 456, '#8ac926'))
    const exhaust = puff(126, 462)

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(500, 60, 0.8)) +
      skyline(rand, 200) +
      building(0, 300, 180, 160, '#f2cc8f') +
      building(180, 300, 220, 200, '#81b29a') +
      building(400, 300, 180, 170, '#c98bb9') +
      building(580, 300, 220, 190, '#7aa6d6') +
      street(320, 180, 20) +
      `<path d="M0 410H800" stroke="#fff" stroke-width="4" stroke-dasharray="30 22"/>` +
      `<path d="M0 365H800" stroke="#4a5058" stroke-width="8"/>` +
      diff(700, 240, 28, trafficLight(700, 300, 0), trafficLight(700, 300, 2)) +
      person(120, 300, '#ffb703') +
      diff(200, 265, 20, person(200, 300, '#e63946', true), person(200, 300, '#8ac926', true)) +
      person(640, 300, '#8338ec', true) +
      // Far lane
      diff(80, 371, 47, car(80, 390, '#e63946'), car(80, 390, '#3a86ff')) +
      car(190, 390, '#ffb703') +
      bus(360, 390, '#2a9d8f') +
      diff(360, 339, 18, board(360, 390, '#ffd166'), board(360, 390, '#ff006e')) +
      car(500, 390, '#8338ec') +
      car(620, 390, '#3a86ff') +
      car(740, 390, '#e63946') +
      // Near lane
      diff(300, 451, 47, car(300, 470, '#ff6b8b'), '') +
      car(420, 470, '#ffb703') +
      car(700, 470, '#8ac926') +
      car(180, 470, '#81b29a') +
      diff(126, 462, 22, exhaust, anim({ id: 'puff', type: 'bob', dx: 3, dy: 3, period: 0.8 }, exhaust), 'puff') +
      diff(560, 439, 34, weaving(9), weaving(4), 'bike') +
      mailbox(60, 312) +
      parkingMeter(155, 312) +
      newspaperBox(300, 312) +
      sandwichBoard(450, 312) +
      bollard(570, 312) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['flowerBox', 344, 279, '#ff006e'],
        ['balloon', 727, 43, '#8ac926'],
        ['birds', 205, 56],
        ['cone', 717, 353],
        ['pigeon', 463, 356],
        ['cone', 167, 350],
        ['pigeon', 53, 465],
      ])
    )
  },
})
