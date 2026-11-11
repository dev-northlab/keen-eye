import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 202 ("duskStreet") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the street on a
// sunny morning, B the same street at night with its five differences, both made by Gemini. Fixed by hand: Gemini
// also took away the middle window of the corner house's top row and emptied the big flower box on the pavement, so
// both are laid back from A with their colours fitted to the night (an affine colour fit on the window beside it and
// on the box's wall). B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The middle window of the corner house's middle row: there in A, plain brick wall in B.
  { x: 625, y: 700, r: 95 },
  // The flower box under the corner house's middle row: pink flowers in A, empty in B.
  { x: 430, y: 792, r: 90 },
  // The board of the hanging café sign: green in A, red in B.
  { x: 1563, y: 757, r: 79 },
  // The fire hydrant in front of the café: red in A, yellow in B.
  { x: 1017, y: 1208, r: 79 },
  // The bench in front of the tall building: brown in A, blue in B.
  { x: 1804, y: 1096, r: 110 },
]
// The natural changes of the night, in the drawn scene's order.
const traps: Trap[] = [
  // The street lamp's head, lit at night.
  { x: 760, y: 745, r: 45, hint: 'lights' },
  // The top right window of the tall building, lit at night.
  { x: 1957, y: 453, r: 55, hint: 'lights' },
  // The car's headlights and their beam on the road.
  { x: 1775, y: 1315, r: 100, hint: 'lights' },
  // The sun by day, the moon at night.
  { x: 2386, y: 166, r: 120, hint: 'moon' },
]

export const level202Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-202-a.avif',
  imageB: 'levels/redesign/level-202-b.avif',
  viewBox,
  differences,
  traps,
}
