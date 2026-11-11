import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 204 ("duskPier") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the harbour on a
// sunny morning, B the same harbour at night with its five differences, both made by Gemini (its first night came
// out 2752×1536 with the objects drifted, so it was made again at A's size). Fixed by hand: Gemini left the white
// bands on the life ring, so they are recoloured red with their shading kept. B is a whole picture: the moments
// differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The buoy with the white stripe: red in A, teal in B.
  { x: 1540, y: 1365, r: 79 },
  // The small rowboat: blue in A, red in B.
  { x: 1050, y: 1432, r: 135 },
  // The flag on the pier: red in A, blue in B.
  { x: 930, y: 885, r: 79 },
  // The crate on the pier: a diagonal plank on its front in A, plain boards in B.
  { x: 657, y: 1027, r: 79 },
  // The life ring on the pier post: red and white in A, all red in B.
  { x: 1179, y: 1171, r: 79 },
]
// The natural changes of the night, in the drawn scene's order.
const traps: Trap[] = [
  // The street lamp's head, lit at night.
  { x: 1312, y: 748, r: 55, hint: 'lights' },
  // The lighthouse lamp and its beams.
  { x: 2264, y: 430, r: 160, hint: 'lights' },
  // The two seagulls in the middle of the sky, gone at night.
  { x: 1545, y: 280, r: 110, hint: 'birds' },
  // The sun by day, the moon at night.
  { x: 390, y: 228, r: 160, hint: 'moon' },
]

export const level204Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-204-a.avif',
  imageB: 'levels/redesign/level-204-b.avif',
  viewBox,
  differences,
  traps,
}
