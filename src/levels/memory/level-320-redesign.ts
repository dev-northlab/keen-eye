import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 320 ("memoryToyShelf") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the robot red, the teddy bear gone from the top shelf (its shadow stays on the
// shelf's back, inside its zone), the heart block gone from the top of the stack, a pink ball new on the third shelf.
// Gemini also redrew the floor's edge a little, and the ball's shadow falls on the books beside it, lit in A: a
// cut-out would cut that shadow, so B is its own picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The toy robot on the top shelf: grey in A, red in B.
  { x: 430, y: 888, r: 125 },
  // The brown teddy bear on the top shelf: there in A, gone in B.
  { x: 1027, y: 877, r: 175 },
  // The yellow heart block on top of the block stack: there in A, gone in B.
  { x: 267, y: 1117, r: 102 },
  // The big pink ball on the third shelf: not in A, there in B.
  { x: 980, y: 1835, r: 160 },
]

export const level320Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-320-a.avif',
  imageB: 'levels/redesign/level-320-b.avif',
  viewBox,
  differences,
}
