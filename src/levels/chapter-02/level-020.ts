import { cityLevel } from './city.ts'

export default cityLevel({
  id: 20,
  title: 'clockTower',
  parTimeSec: 120,
  differences: 7,
  motion: 1,
  sky: 'day',
  facades: ['#cdb4db', '#ffc8dd', '#bde0fe', '#a2d2ff'],
  shops: true,
  cars: 1,
  busy: 1,
})
