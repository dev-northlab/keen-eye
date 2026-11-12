import { memoryLevel } from '../helpers.ts'
import { around, backpack, big, blackboard, books, cube, fruit, glassJar, globe, painting, pottedPlant, room, schoolDesk, shelf, sticker, wallClock } from './shapes.ts'
import { bin } from '../chapter-02/shapes.ts'
import { poster } from '../time/shapes.ts'

/** Chalk lines on the board. */
const chalk = (d: string) =>
  `<path d="${d}" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(-150 -30)"/>`

export default memoryLevel({
  id: 312,
  title: 'memoryClassroom',
  showSeconds: 3,
  scene: ({ diff }) =>
    room(440, '#f6efd9', '#c98f5a') +
    blackboard(70, 30, 360, 170) +
    chalk('M274 130a26 26 0 1 0 52 0a26 26 0 1 0 -52 0M300 90v-12M300 182v-12M260 130h-12M352 130h-12M272 102l-8 -8M328 158l8 8M328 102l8 -8M272 158l-8 8') +
    chalk('M250 205h120M250 216h80') +
    diff(...around(278, 68, 362, 162), chalk('M440 190V140H500V190ZM430 140L470 100L510 140M462 190v-26h16v26'), '') +
    diff(450, 280, 46, wallClock(450, 280, 40, '#3a86ff'), wallClock(450, 280, 40, '#e63946')) +
    // Cabinet with a globe and books
    `<rect x="30" y="350" width="180" height="90" rx="6" fill="#a0703f"/><path d="M120 358v74" stroke="#7a4e33" stroke-width="4"/>` +
    globe(70, 350) +
    books(160, 350, ['#e63946', '#3a86ff']) +
    diff(...around(126, 296, 194, 350), books(160, 350, ['#e63946', '#3a86ff', '#ffb703']), '') +
    schoolDesk(250, 600) +
    books(220, 538, ['#3fa46f']) +
    diff(280, 520, 32, '', fruit(280, 524, 14, '#e63946')) +
    backpack(420, 600, '#3a86ff') +
    // Decor: small things that fill the room, the same in both pictures
    painting(225, 242, 50, 40, '#3fa46f') +
    poster(300, 236, 34, 46, '#ffb703') +
    sticker(30, 40, '#ffd23f') +
    sticker(470, 30, '#ff6b8b') +
    shelf(230, 330, 130) +
    big(255, 330, 0.5, books(0, 0, ['#8338ec', '#3fa46f'])) +
    glassJar(295, 330, '#3fa46f', '#ff6b8b') +
    cube(325, 330, 22, '#e63946') +
    big(350, 330, 0.3, globe(0, 0, '#ffb703')) +
    poster(390, 350, 34, 46, '#4dabf7') +
    poster(440, 350, 34, 46, '#ff6b8b') +
    cube(40, 720, 30, '#ffb703') +
    big(110, 720, 1.4, bin(0, 0, '#3a86ff')) +
    backpack(80, 600, '#e63946') +
    big(200, 720, 0.6, books(0, 0, ['#8338ec', '#ffd23f'])) +
    pottedPlant(440, 745),
})
