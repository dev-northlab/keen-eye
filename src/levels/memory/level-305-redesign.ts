import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 305 ("memoryPlayground") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the slide green, the bench gone, a big red ball new on the grass between them.
// Gemini's first B put the ball on the bench's place and its second redrew the whole lawn, so B is A with the green
// slide of the first and the bench's place and the ball (with its shadow) of the second laid over it. B is a whole
// picture: the slide runs far past its zone's circle.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The slide: yellow in A, green in B.
  { x: 524, y: 1960, r: 280 },
  // The red ball on the grass right of the slide: not in A, there in B.
  { x: 994, y: 2160, r: 120 },
  // The wooden bench at the bottom right: there in A, gone in B.
  { x: 1348, y: 2258, r: 200 },
]

export const level305Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-305-a.avif',
  imageB: 'levels/redesign/level-305-b.avif',
  viewBox,
  differences,
}
