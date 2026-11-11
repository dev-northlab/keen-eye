import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 209 ("snowPier") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the pier and the
// boathouse in summer, B the same bay in winter with its six differences; only one is a colour change. Gemini made the
// winter, the blue barrel, the boathouse's missing window and the missing flag; the rest is made by hand: the crate's
// diagonal plank taken away (the boards behind it filled in), the white hook above the life ring and the red buoy's
// white band taken away (Gemini kept the ring and the buoy's top, so these replace them). B is a whole picture: the
// seasons differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The boathouse's small window: there in A, plain wall in B.
  { x: 2056, y: 675, r: 79 },
  // The crate on the pier: a diagonal plank on its front in A, plain boards in B.
  { x: 555, y: 1022, r: 79 },
  // The barrel on the pier: brown in A, blue in B.
  { x: 768, y: 1003, r: 79 },
  // The yellow flag: on its pole in A, a bare pole in B.
  { x: 925, y: 880, r: 85 },
  // The small white hook above the life ring: there in A, gone in B.
  { x: 1393, y: 1115, r: 79 },
  // The red buoy: a white band in A, all red in B.
  { x: 776, y: 1430, r: 79 },
]
// The natural changes of winter, in the drawn scene's order.
const traps: Trap[] = [
  // Icicles under the boathouse roof.
  { x: 2330, y: 560, r: 110, hint: 'icicles' },
  // Ice along the shore.
  { x: 1480, y: 1450, r: 140, hint: 'ice' },
  // The seagulls in the middle of the sky, gone in winter.
  { x: 1310, y: 320, r: 150, hint: 'birds' },
]

export const level209Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-209-a.avif',
  imageB: 'levels/redesign/level-209-b.avif',
  viewBox,
  differences,
  traps,
}
