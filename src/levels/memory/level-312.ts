import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { around, backpack, big, blackboard, books, cube, fruit, glassJar, globe, painting, pottedPlant, room, schoolDesk, shelf, sticker, wallClock } from './shapes.ts'
import { bin } from '../chapter-02/shapes.ts'
import { poster } from '../time/shapes.ts'

/** Chalk lines on the board. */
const chalk = (d: string) => `<path d="${d}" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`

export default memoryLevel({
  id: 312,
  title: 'memoryClassroom',
  showSeconds: 3,
  scene: ({ diff, extra, anim }) =>
    room(360, '#f6efd9', '#c98f5a') +
    blackboard(220, 60, 360, 170) +
    chalk('M274 130a26 26 0 1 0 52 0a26 26 0 1 0 -52 0M300 90v-12M300 182v-12M260 130h-12M352 130h-12M272 102l-8 -8M328 158l8 8M328 102l8 -8M272 158l-8 8') +
    chalk('M250 205h120M250 216h80') +
    diff(...around(428, 98, 512, 192), chalk('M440 190V140H500V190ZM430 140L470 100L510 140M462 190v-26h16v26'), '') +
    diff(690, 110, 46, wallClock(690, 110, 40, '#3a86ff'), wallClock(690, 110, 40, '#e63946')) +
    // Cabinet with a globe and books
    `<rect x="40" y="260" width="180" height="100" rx="6" fill="#a0703f"/><path d="M130 268v84" stroke="#7a4e33" stroke-width="4"/>` +
    globe(80, 260) +
    books(170, 260, ['#e63946', '#3a86ff']) +
    diff(...around(136, 206, 204, 260), books(170, 260, ['#e63946', '#3a86ff', '#ffb703']), '') +
    schoolDesk(400, 470) +
    books(370, 408, ['#3fa46f']) +
    diff(430, 390, 32, '', fruit(430, 394, 14, '#e63946')) +
    diff(...around(590, 394, 650, 470), backpack(620, 470, '#3a86ff'), backpack(620, 470, '#ffb703')) +
    // Decor: small things that fill the room, the same in both pictures
    painting(30, 30, 60, 46, '#3fa46f') +
    poster(120, 30, 40, 56, '#ffb703') +
    sticker(250, 25, '#ffd23f') +
    sticker(560, 25, '#ff6b8b') +
    shelf(610, 230, 170) +
    big(640, 230, 0.5, books(0, 0, ['#8338ec', '#3fa46f'])) +
    glassJar(690, 230, '#3fa46f', '#ff6b8b') +
    cube(725, 230, 22, '#e63946') +
    big(760, 230, 0.3, globe(0, 0, '#ffb703')) +
    poster(640, 270, 34, 46, '#4dabf7') +
    poster(700, 270, 34, 46, '#ff6b8b') +
    cube(40, 470, 30, '#ffb703') +
    big(100, 470, 1.4, bin(0, 0, '#3a86ff')) +
    backpack(200, 470, '#e63946') +
    big(280, 470, 0.6, books(0, 0, ['#8338ec', '#ffd23f'])) +
    pottedPlant(740, 470) +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['ball', 245, 457, '#ffb703'],
      ['cube', 528, 413, '#e63946'],
      ['slippers', 53, 390, '#ff6b8b'],
      ['frame', 618, 62, '#3fa46f'],
    ]),
})
