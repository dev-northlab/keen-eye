import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 329 ("memoryOasis") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference, small parts of objects: the flag gone from the tent's pole, the coconuts gone
// from the left palm, the white flower gone from the lily pad, the small cactus's left arm gone by the pond, the big
// cactus's left arm gone. Gemini made the camel's saddle blanket green too: the user wanted the small cactus instead,
// so B got A's purple blanket back and lost the small cactus's arm by hand (sand from below it). Gemini redrew the
// sand's ripples and the pond's water all over (the same objects in the same places), so a cut-out would show a seam:
// B is its own picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The small yellow flag on top of the tent's pole: there in A, gone in B.
  { x: 300, y: 1570, r: 102 },
  // The bunch of coconuts under the left palm's leaves: there in A, gone in B.
  { x: 870, y: 1325, r: 102 },
  // The white flower on the right lily pad: there in A, gone in B.
  { x: 1262, y: 1640, r: 102 },
  // The left arm of the small cactus right of the pond: there in A, gone in B.
  { x: 1612, y: 1730, r: 102 },
  // The left arm of the big cactus: there in A, gone in B.
  { x: 1270, y: 2165, r: 110 },
]

export const level329Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-329-a.avif',
  imageB: 'levels/redesign/level-329-b.avif',
  viewBox,
  differences,
}
