import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 319 ("memoryAutumnPark") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the
// zones measured on their pixel difference: the big tree's crown at the right yellow, the right duck of the three gone,
// a squirrel new on the bench, the big pile of leaves gone. Gemini redrew the grass all over the park (the same objects
// in the same places), so a cut-out would show a seam: B is its own picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The crown of the big tree at the right: red in A, yellow in B.
  { x: 1325, y: 630, r: 280 },
  // The right one of the three ducks on the pond: there in A, gone in B.
  { x: 1065, y: 1545, r: 120 },
  // The red squirrel on the left end of the bench: not in A, there in B.
  { x: 323, y: 2028, r: 105 },
  // The big pile of leaves at the bottom right: there in A, gone in B.
  { x: 1357, y: 2313, r: 290 },
]

export const level319Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-319-a.avif',
  imageB: 'levels/redesign/level-319-b.avif',
  viewBox,
  differences,
}
