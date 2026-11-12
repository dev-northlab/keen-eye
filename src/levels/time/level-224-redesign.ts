import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 224 ("riverTown") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the river town on a
// sunny afternoon, B the same town at night with its nine tiny differences; only one is a colour change. Gemini made
// the night, the red house without its right window, the lilac house without its chimney, the lamp post without its
// flag, the teal rowboat and the bench without its backrest. Made by hand: the green house's flower box (its window's
// bottom frame drawn from the window beside it), the buoy's red cone, the railing post below the middle arch and the
// dog's tail taken away. B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The red house's right window: there in A, plain wall in B.
  { x: 356, y: 630, r: 85 },
  // The flower box under the green house's right window: there in A, gone in B.
  { x: 1130, y: 672, r: 85 },
  // The lilac house's chimney: there in A, gone in B.
  { x: 1550, y: 450, r: 85 },
  // The small red flag on the bridge's right lamp post: there in A, gone in B.
  { x: 2510, y: 640, r: 79 },
  // The rowboat: yellow in A, teal in B.
  { x: 980, y: 1196, r: 140 },
  // The red cone on top of the striped buoy: there in A, gone in B.
  { x: 1970, y: 1105, r: 79 },
  // The railing post right below the bridge's middle arch: there in A, gone in B.
  { x: 2163, y: 1340, r: 79 },
  // The wooden bench's backrest: there in A, only the seat in B.
  { x: 660, y: 1466, r: 100 },
  // The dog's curled tail: there in A, gone in B.
  { x: 1772, y: 1497, r: 79 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // The middle lamp on the bridge, lit at night.
  { x: 2214, y: 550, r: 60, hint: 'lights' },
  // The cream house's left window, lit at night.
  { x: 586, y: 625, r: 60, hint: 'lights' },
  // The street lamp on the promenade, lit at night.
  { x: 2300, y: 1230, r: 70, hint: 'lights' },
  // The moonlight on the water.
  { x: 2450, y: 1000, r: 100, hint: 'moon' },
  // Stars in the sky.
  { x: 400, y: 70, r: 60, hint: 'stars' },
  // The sun by day, the moon at night.
  { x: 2344, y: 194, r: 110, hint: 'moon' },
]

export const level224Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-224-a.avif',
  imageB: 'levels/redesign/level-224-b.avif',
  viewBox,
  differences,
  traps,
}
