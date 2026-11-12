import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 230 ("downtown") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the downtown street on
// a sunny afternoon, B the same street at night with its ten tiny differences; only one is a colour change. Gemini
// made the night, the blue circle on the billboard, the antenna without its light, the flower box, the taxi's sign
// and the dog's leash gone. Made by hand: the door's window, the bus's destination board, the hydrant's front cap and
// the bus symbol on the stop sign (Gemini only redrew it) taken away, and the red bird on the green building's roof
// (instead of the blue building's top left window, which Gemini lit instead). B is a whole picture: the moments
// differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The circle on the billboard: red in A, blue in B.
  { x: 1070, y: 665, r: 90 },
  // The red light on the tower's antenna: there in A, gone in B.
  { x: 1513, y: 82, r: 79 },
  // The small window in the beige building's door: there in A, a plain door in B.
  { x: 1940, y: 1040, r: 79 },
  // The flower box on the green building: there in A, gone in B.
  { x: 2315, y: 1135, r: 100 },
  // The hydrant's round front cap: there in A, gone in B.
  { x: 651, y: 1243, r: 79 },
  // The bus symbol on the stop sign: there in A, a plain sign in B.
  { x: 1373, y: 955, r: 79 },
  // The bus's destination board: there in A, plain yellow in B.
  { x: 943, y: 1005, r: 90 },
  // The sign on the taxi's roof: there in A, gone in B.
  { x: 1815, y: 1155, r: 79 },
  // The leash between the man and his dog: there in A, gone in B.
  { x: 1630, y: 1440, r: 100 },
  // The red bird on the green building's roof: there in A, gone in B.
  { x: 2160, y: 162, r: 79 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // The windows near the top of the light blue tower, lit at night.
  { x: 1530, y: 345, r: 60, hint: 'lights' },
  // The billboard, lit at night.
  { x: 1232, y: 598, r: 50, hint: 'lights' },
  // The bus's headlights, lit at night.
  { x: 880, y: 1200, r: 50, hint: 'lights' },
  // The right street lamp, lit at night.
  { x: 2555, y: 795, r: 60, hint: 'lights' },
  // Stars in the sky.
  { x: 1780, y: 80, r: 70, hint: 'stars' },
  // The sun by day, the moon at night.
  { x: 690, y: 170, r: 120, hint: 'moon' },
]

export const level230Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-230-a.avif',
  imageB: 'levels/redesign/level-230-b.avif',
  viewBox,
  differences,
  traps,
}
