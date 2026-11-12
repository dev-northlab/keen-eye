import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 308 ("memorySpace") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: a glowing yellow ring new round the big orange planet, the flag blue, the moon
// rover gone. Gemini changed nothing else, so B is its own picture, whole: the ring arcs across the top left corner,
// far past its zone.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The ring round the big orange planet at the top left: not in A, there in B.
  { x: 430, y: 300, r: 300 },
  // The flag on its pole: red in A, blue in B.
  { x: 822, y: 1630, r: 105 },
  // The yellow moon rover at the bottom right: there in A, gone in B.
  { x: 1350, y: 2310, r: 190 },
]

export const level308Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-308-a.avif',
  imageB: 'levels/redesign/level-308-b.avif',
  viewBox,
  differences,
}
