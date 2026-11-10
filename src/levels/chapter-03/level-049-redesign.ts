import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 49 ("nightOwls") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): a small star in the
// sky at the top left, the full moon becomes a crescent, the bat turns light grey, the small owl's eyes yellow, the big
// owl's face in the hollow white, the light in the tent green, the fox's tail loses its white tip and the glowing
// mushroom glows blue. B is A with only these changes of Gemini's laid over it (the moon's with its whole glow, so
// no seam shows); Gemini left the crescent's unlit part as a pale disc, painted over with the sky beside it.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // A small yellow star in the sky at the top left, only in B.
  { x: 156, y: 128, r: 60 },
  // The moon: full in A, a thin crescent in B.
  { x: 2224, y: 216, r: 173 },
  // The bat in the middle of the sky: dark in A, light grey in B.
  { x: 1410, y: 420, r: 74 },
  // The eyes of the small owl on the branch: pale in A, yellow in B.
  { x: 998, y: 668, r: 60 },
  // The face of the big owl in the hollow: brown in A, white in B.
  { x: 872, y: 714, r: 70 },
  // The light inside the purple tent: warm in A, green in B.
  { x: 2192, y: 1366, r: 167 },
  // The tip of the fox's tail: white in A, orange in B.
  { x: 498, y: 1482, r: 70 },
  // The glowing mushroom: pale green in A, blue in B.
  { x: 1842, y: 1502, r: 137 },
]

export const level049Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-049-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-049-b-<n>.webp).
  imageB: 'levels/redesign/level-049-a.avif',
  patchesB: zonePatches('levels/redesign/level-049-b', differences, viewBox),
  viewBox,
  differences,
}
