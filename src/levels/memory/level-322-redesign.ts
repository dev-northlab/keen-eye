import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 322 ("memoryCircus") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the big star gone from the big top's roof, the booth's roof red, the green
// balloon gone from the bunch, the ball gone from the podium, a skateboard new on the arena. Gemini redrew the grass
// and the arena's sand all over (the same objects in the same places), so a cut-out would show a seam: B is its own
// picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The big yellow star in the middle of the big top's roof: there in A, gone in B.
  { x: 1219, y: 705, r: 102 },
  // The ticket booth's scalloped roof: purple in A, red in B.
  { x: 1362, y: 1290, r: 200 },
  // The green balloon of the bunch at the bottom right: there in A, gone in B.
  { x: 1543, y: 2213, r: 102 },
  // The big blue ball on the podium: there in A, gone in B.
  { x: 340, y: 2107, r: 115 },
  // The skateboard on the sand in the middle of the arena: not in A, there in B.
  { x: 1030, y: 2065, r: 185 },
]

export const level322Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-322-a.avif',
  imageB: 'levels/redesign/level-322-b.avif',
  viewBox,
  differences,
}
