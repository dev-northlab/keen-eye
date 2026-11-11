import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 216 ("marketSquare") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the old-town market square
// on a sunny afternoon, B the same square in the evening with its eight tiny differences; only one is a colour change.
// Gemini made the evening, the town hall door without its window, two red apples, the plain board and the green
// lemons. Made by hand: the window's horizontal bar, the girl's hair bow and the dog's collar taken away; Gemini
// redrew the whole flower box under the top left window, so A's box is laid back (colours matched to the evening)
// with one flower taken away. B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The yellow house's top middle window: a horizontal bar in A, only the vertical one in B.
  { x: 390, y: 587, r: 79 },
  // The flower box under the yellow house's top left window: a pink flower hanging over its left end in A, gone in B.
  { x: 97, y: 679, r: 79 },
  // The small square window in the town hall's door: there in A, plain door in B.
  { x: 1316, y: 872, r: 79 },
  // The pile of red apples on the red stall: three in A, two in B.
  { x: 478, y: 1200, r: 79 },
  // The white line on the green stall's dark board: there in A, gone in B.
  { x: 1312, y: 1311, r: 79 },
  // The lemons on the yellow stall: yellow in A, green in B.
  { x: 2140, y: 1208, r: 79 },
  // The little girl's pink hair bow: there in A, gone in B.
  { x: 1003, y: 1386, r: 79 },
  // The dog's red collar: there in A, gone in B.
  { x: 1745, y: 1502, r: 79 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // The town hall clock: four o'clock by day, half past seven in the evening.
  { x: 1316, y: 266, r: 80, hint: 'clock' },
  // The mint-green house's top right window, lit in the evening.
  { x: 2444, y: 600, r: 75, hint: 'lights' },
  // The string of bulbs across the square, lit in the evening.
  { x: 1106, y: 772, r: 60, hint: 'lights' },
  // The street lamp's head, lit in the evening.
  { x: 2430, y: 1030, r: 70, hint: 'lights' },
  // Stars in the sky.
  { x: 1720, y: 80, r: 70, hint: 'stars' },
  // The sun by day, the moon in the evening.
  { x: 336, y: 114, r: 90, hint: 'moon' },
]

export const level216Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-216-a.avif',
  imageB: 'levels/redesign/level-216-b.avif',
  viewBox,
  differences,
  traps,
}
