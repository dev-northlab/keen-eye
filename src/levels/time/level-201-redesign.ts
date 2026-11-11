import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 201 ("duskFarm") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the farm on a sunny
// morning, B the same farm at night, which Gemini made from A with no differences (moon, stars, the left window lit).
// The differences are painted on the night picture by hand: the attic window's cross gone, the weather vane mirrored
// about its post (pointing left; the old arms covered with the sky above them), the pointed top of the third picket
// cut flat, the mailbox recoloured red and the cat dark grey. B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The small attic window in the roof: a white cross in A, one plain pane in B.
  { x: 818, y: 594, r: 79 },
  // The weather vane on the roof: pointing right in A, left in B.
  { x: 819, y: 351, r: 79 },
  // The third picket of the fence: pointed in A, its top cut flat in B.
  { x: 2140, y: 1175, r: 79 },
  // The mailbox on its post: blue in A, red in B.
  { x: 1248, y: 1043, r: 79 },
  // The cat on the grass: orange in A, dark grey in B.
  { x: 412, y: 1314, r: 79 },
]
// The natural changes of the night, in the drawn scene's order.
const traps: Trap[] = [
  // The oak's shadow on the grass, gone with the sun.
  { x: 1650, y: 1115, r: 100, hint: 'shadow' },
  // The left ground-floor window, lit at night.
  { x: 622, y: 817, r: 100, hint: 'lights' },
  // The stars at the top left.
  { x: 355, y: 210, r: 205, hint: 'stars' },
  // The sun by day, the moon at night.
  { x: 2262, y: 260, r: 150, hint: 'moon' },
]

export const level201Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-201-a.avif',
  imageB: 'levels/redesign/level-201-b.avif',
  viewBox,
  differences,
  traps,
}
