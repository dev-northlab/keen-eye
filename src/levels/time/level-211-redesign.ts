import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 211 ("nightAvenue") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the old-town avenue
// with a tram on a sunny afternoon, B the same avenue at night with its seven differences; only one is a colour
// change. Gemini made the night, the missing gable window, the teal door and the flag's star, and sat a cat on a
// window sill of the corner house (kept as a difference instead of a missing window). Made by hand: the shop's left
// flower box taken away, the tram's round front sign and a pigeon on the pavement taken away (Gemini kept the dog's
// collar). B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // A window sill of the brick corner house: empty in A, a cat sitting on it in B.
  { x: 853, y: 540, r: 85 },
  // The small round window in the cream house's gable: there in A, plain wall in B.
  { x: 1194, y: 171, r: 79 },
  // The flower box under the shop's left window: pink flowers in A, gone in B.
  { x: 1444, y: 746, r: 85 },
  // The shop's door: yellow in A, teal in B.
  { x: 1614, y: 984, r: 90 },
  // The flag on the bank's roof: plain red in A, a white star on it in B.
  { x: 1955, y: 223, r: 79 },
  // The round sign on the tram's front: there in A, gone in B.
  { x: 2068, y: 1146, r: 79 },
  // A pigeon on the pavement in front of the shop: there in A, gone in B.
  { x: 1374, y: 1274, r: 79 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // The street lamp's head, lit at night.
  { x: 1029, y: 845, r: 60, hint: 'lights' },
  // A window of the cream house, lit at night.
  { x: 1260, y: 394, r: 70, hint: 'lights' },
  // A window of the bank, lit at night.
  { x: 1895, y: 472, r: 55, hint: 'lights' },
  // The tram's headlight on the road.
  { x: 1960, y: 1270, r: 65, hint: 'lights' },
  // Stars in the sky.
  { x: 1500, y: 130, r: 120, hint: 'stars' },
  // The sun by day, the moon at night.
  { x: 262, y: 140, r: 135, hint: 'moon' },
]

export const level211Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-211-a.avif',
  imageB: 'levels/redesign/level-211-b.avif',
  viewBox,
  differences,
  traps,
}
