import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 210 ("snowYard") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the yard of two houses
// in summer, B the same yard in winter with its six differences; only one is a colour change. Gemini made the winter,
// the blue mailbox and the missing attic and lilac-house windows. Fixed by hand: it took the whole cat off the bench,
// so A's cat is laid back without its tail (colours fitted to winter); the right swing seat is taken away; its
// snowman stands where the ball lay, so the ball is taken off the summer lawn too and the sparrow on the birdhouse
// goes in winter instead. B is a whole picture: the seasons differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The attic window of the yellow house: there in A, plain roof in B.
  { x: 546, y: 328, r: 79 },
  // The middle window of the lilac house: there in A, plain wall in B.
  { x: 1838, y: 583, r: 85 },
  // The swing's right seat: there in A, its ropes hang empty in B.
  { x: 417, y: 1448, r: 79 },
  // The mailbox: red in A, blue in B.
  { x: 1410, y: 1045, r: 79 },
  // The cat on the bench: a long tail in A, none in B.
  { x: 1170, y: 1460, r: 90 },
  // The sparrow on the birdhouse roof: there in A, gone in B.
  { x: 2300, y: 1262, r: 79 },
]
// The natural changes of winter, in the drawn scene's order.
const traps: Trap[] = [
  // The oak at the right: green in summer, frosted in winter.
  { x: 2400, y: 1000, r: 150, hint: 'leaves' },
  // The boy: a T-shirt in summer, a winter coat in winter.
  { x: 788, y: 1260, r: 110, hint: 'clothes' },
  // The snowman on the lawn.
  { x: 1615, y: 1234, r: 90, hint: 'snowman' },
  // The vegetable patch, under the snow in winter.
  { x: 1838, y: 1195, r: 120, hint: 'flowers' },
]

export const level210Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-210-a.avif',
  imageB: 'levels/redesign/level-210-b.avif',
  viewBox,
  differences,
  traps,
}
