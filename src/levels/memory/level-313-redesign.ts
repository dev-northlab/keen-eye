import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 313 ("memoryHarbor") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: a big seagull new in the open sky, the lighthouse's stripes blue, the sailboat
// gone, the top crate on the pier gone. Gemini redrew the water too, and the changes show in it far past their zones
// (the lighthouse's blue reflection, no sailboat's), so B is its own picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The big seagull in the open sky between the sun and the big cloud: not in A, there in B.
  { x: 740, y: 560, r: 150 },
  // The lighthouse's two stripes: red in A, blue in B.
  { x: 1391, y: 921, r: 200 },
  // The sailboat with white sails: there in A, gone in B.
  { x: 1218, y: 1729, r: 270 },
  // The top crate of the three on the pier: there in A, gone in B.
  { x: 353, y: 1201, r: 140 },
]

export const level313Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-313-a.avif',
  imageB: 'levels/redesign/level-313-b.avif',
  viewBox,
  differences,
}
