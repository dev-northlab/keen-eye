import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 316 ("memoryLivingRoom") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the
// zones measured on their pixel difference: the big landscape painting gone, the wall clock's rim blue, the blue vase of
// flowers gone from the bookcase, the cat moved right off the rug (its zone covers both places). Gemini also redrew the
// rug's weave and the throw on the sofa a little, and its wall came out a shade lighter: laid over A, the cut-outs
// showed the painting's and the vase's outlines, so B is its own picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The landscape painting in the coral frame at the top middle: there in A, gone in B.
  { x: 866, y: 344, r: 265 },
  // The round wall clock: a coral rim in A, a blue one in B.
  { x: 1424, y: 298, r: 130 },
  // The blue vase with three flowers on the bookcase's top shelf: there in A, gone in B.
  { x: 1320, y: 761, r: 125 },
  // The grey cat: on the rug in A, right of it in B.
  { x: 1409, y: 2248, r: 250 },
]

export const level316Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-316-a.avif',
  imageB: 'levels/redesign/level-316-b.avif',
  viewBox,
  differences,
}
