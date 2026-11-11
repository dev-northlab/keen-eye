import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 203 ("duskCamp") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the camp in the
// clearing on a sunny afternoon, B the same camp at night with its five differences, both made by Gemini. Fixed by
// hand: Gemini took away both small pines, so the tiny one by the logs is laid back (A's pine with its colours fitted
// to the night); it left the signpost's arrow pointed and kept every stump, so the tip is cut off (the ground right
// of it cloned over) and the small stump at the edge of the fire pit's sand is cloned away. B is a whole picture: the
// moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The small pine right of the big pine at the left: there in A, gone in B.
  { x: 318, y: 1152, r: 228 },
  // The arrow board of the signpost: pointed in A, its tip cut flat in B.
  { x: 2204, y: 1112, r: 79 },
  // The cap of the spotted mushroom in front of the fire pit: red in A, purple in B.
  { x: 1541, y: 1546, r: 79 },
  // The rabbit at the bottom: white in A, brown in B.
  { x: 787, y: 1482, r: 82 },
  // The small stump at the edge of the fire pit's sand: there in A, gone in B.
  { x: 1940, y: 1505, r: 82 },
]
// The natural changes of the night, in the drawn scene's order.
const traps: Trap[] = [
  // The campfire, burning at night.
  { x: 1725, y: 1320, r: 100, hint: 'lights' },
  // The flock of birds by the cloud in the middle of the sky, gone at night.
  { x: 1460, y: 175, r: 100, hint: 'birds' },
  // Stars in the sky.
  { x: 1700, y: 300, r: 100, hint: 'stars' },
  // The sun by day, the moon at night.
  { x: 816, y: 190, r: 140, hint: 'moon' },
]

export const level203Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-203-a.avif',
  imageB: 'levels/redesign/level-203-b.avif',
  viewBox,
  differences,
  traps,
}
