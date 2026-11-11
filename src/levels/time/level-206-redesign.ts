import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 206 ("snowFarm") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the farm on a summer
// day, B the same farm in winter with its six differences, both made by Gemini. Fixed by hand: Gemini left the fence
// whole, so one picket left of the barrel is taken away (each column filled from the gaps beside it along the
// rails). B is a whole picture: the seasons differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The round window of the silo: there in A, plain silo wall in B.
  { x: 2243, y: 525, r: 79 },
  // The attic window in the barn's gable: there in A, plain boards in B.
  { x: 1673, y: 526, r: 79 },
  // The weather vane's arrowhead: there in A, a plain rod in B.
  { x: 1745, y: 287, r: 79 },
  // A picket of the fence left of the barrel: there in A, a gap in B.
  { x: 1953, y: 1180, r: 85 },
  // The dog kennel's walls: orange in A, blue in B.
  { x: 2410, y: 1090, r: 120 },
  // The barrel's staves: brown in A, green in B.
  { x: 2030, y: 1365, r: 100 },
]
// The natural changes of winter, in the drawn scene's order.
const traps: Trap[] = [
  // The oak: leafy in summer, bare in winter.
  { x: 860, y: 580, r: 240, hint: 'leaves' },
  // The pond, frozen in winter.
  { x: 650, y: 1420, r: 200, hint: 'ice' },
  // The flowers by the pond, gone in winter.
  { x: 520, y: 1130, r: 100, hint: 'flowers' },
  // The snowman by the pine at the left.
  { x: 320, y: 1010, r: 80, hint: 'snowman' },
]

export const level206Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-206-a.avif',
  imageB: 'levels/redesign/level-206-b.avif',
  viewBox,
  differences,
  traps,
}
