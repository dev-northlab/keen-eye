import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 318 ("memoryStation") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the locomotive's cab green, a fair-haired passenger new in the car's second
// window, the blue suitcase gone from the three, the station clock gone with its post. Gemini redrew the platform's
// slabs all over (the same objects in the same places), so a cut-out would show a seam: B is its own picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The locomotive's driver's cab: red in A, green in B.
  { x: 594, y: 1221, r: 250 },
  // The passenger with fair hair in the second window of the passenger car: not in A, there in B.
  { x: 970, y: 1136, r: 102 },
  // The blue suitcase in the middle of the three: there in A, gone in B.
  { x: 535, y: 1933, r: 115 },
  // The round station clock on its post: there in A, gone in B.
  { x: 1462, y: 1985, r: 200 },
]

export const level318Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-318-a.avif',
  imageB: 'levels/redesign/level-318-b.avif',
  viewBox,
  differences,
}
