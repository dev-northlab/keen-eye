import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 325 ("memoryIceRink") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the left skater's coat blue, the middle skater gone, a red bird new on the left
// street lamp, the bench gone (Gemini heaped a snowdrift in its place: one change at one place still), the stand's
// striped roof gone. Gemini redrew the snowy bushes and the falling snow all over, so a cut-out would show a seam: B is
// its own picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The striped roof of the hot chocolate stand: there in A, gone in B.
  { x: 1356, y: 987, r: 265 },
  // The left skater's coat: red in A, blue in B.
  { x: 513, y: 1855, r: 110 },
  // The middle skater in the green coat: there in A, gone in B.
  { x: 884, y: 1753, r: 180 },
  // The wooden bench in front of the rink: there in A, a snowdrift in B.
  { x: 845, y: 2324, r: 245 },
  // The red bird on top of the left street lamp: not in A, there in B.
  { x: 349, y: 935, r: 102 },
]

export const level325Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-325-a.avif',
  imageB: 'levels/redesign/level-325-b.avif',
  viewBox,
  differences,
}
