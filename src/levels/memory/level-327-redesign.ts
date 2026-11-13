import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 327 ("memoryAirfield") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference, small parts of objects: the red balloon's basket gone (its ropes stay), the
// tower's antenna gone, the plane's tail red, the flag gone from its pole, the right one of the two cones gone. Gemini
// redrew the grass and the runway all over (the same objects in the same places), so a cut-out would show a seam: B
// is its own picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The wicker basket under the red balloon: there in A, gone in B.
  { x: 340, y: 800, r: 102 },
  // The thin antenna on the control tower's roof: there in A, gone in B.
  { x: 1485, y: 1150, r: 102 },
  // The white plane's tail: white in A, red in B.
  { x: 700, y: 2210, r: 110 },
  // The small red flag on the pole at the far right: there in A, gone in B.
  { x: 1640, y: 1835, r: 102 },
  // The right one of the two orange cones: there in A, gone in B.
  { x: 1465, y: 2395, r: 102 },
]

export const level327Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-327-a.avif',
  imageB: 'levels/redesign/level-327-b.avif',
  viewBox,
  differences,
}
