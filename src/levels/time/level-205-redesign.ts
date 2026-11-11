import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 205 ("duskYard") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the courtyard on a
// sunny afternoon, B the same courtyard at night with its five differences, both made by Gemini. Fixed by hand:
// Gemini also took away the rightmost window of the second row, so it is laid back from A with its colours fitted to
// the night (an affine colour fit on the window below it). B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The second window from the right in the building's second row: there in A, plain wall in B.
  { x: 1622, y: 485, r: 85 },
  // The swing's blue seat and its ropes: there in A, gone in B.
  { x: 1690, y: 1250, r: 110 },
  // The ball on the grass: red and white in A, yellow and white in B.
  { x: 950, y: 1500, r: 79 },
  // The cat on the bench: orange in A, white in B.
  { x: 1960, y: 1335, r: 82 },
  // The middle T-shirt on the washing line: yellow in A, green in B.
  { x: 2415, y: 1060, r: 79 },
]
// The natural changes of the night, in the drawn scene's order.
const traps: Trap[] = [
  // The street lamp's head, lit at night.
  { x: 1148, y: 1125, r: 65, hint: 'lights' },
  // The second window from the left in the second row, lit at night.
  { x: 885, y: 485, r: 79, hint: 'lights' },
  // The stars at the top left.
  { x: 270, y: 160, r: 150, hint: 'stars' },
  // The sun by day, the moon at night.
  { x: 2376, y: 230, r: 130, hint: 'moon' },
]

export const level205Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-205-a.avif',
  imageB: 'levels/redesign/level-205-b.avif',
  viewBox,
  differences,
  traps,
}
