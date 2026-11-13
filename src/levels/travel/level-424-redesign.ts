import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 424 ("seoul") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): N Seoul Tower's antenna, the cable car, the
// golden rings on the middle door, the right lantern, the banner, the red flowers of the bed, the guard's hat, the
// hanbok skirt's colour, the magpie. Gemini made all nine but took the rings off all three doors, redrew the whole
// flower bed and the trees: B is A with only the listed changes of Gemini's laid over it (the middle door's rings, the
// bed's middle).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The red-and-white antenna on top of N Seoul Tower: there in A, gone in B.
  { x: 1952, y: 182, r: 129 },
  // The red cable car cabin on the mountain slope: there in A, gone in B (the cables stay).
  { x: 2169, y: 520, r: 60 },
  // The golden rings on the middle door of the gate: there in A, gone in B.
  { x: 890, y: 1091, r: 60 },
  // The red lantern under the gate's right roof corner: there in A, gone in B.
  { x: 1286, y: 840, r: 60 },
  // The yellow banner on the pole: there in A, gone in B (the pole stays).
  { x: 1607, y: 826, r: 86 },
  // The red flowers in the middle of the bed before the statue: there in A, bare soil in B.
  { x: 2002, y: 1450, r: 148 },
  // The guard's black gat hat: there in A, gone in B.
  { x: 394, y: 1346, r: 60 },
  // The woman's hanbok skirt: pink in A, turquoise in B.
  { x: 1185, y: 1493, r: 125 },
  // The magpie on the pine: there in A, gone in B.
  { x: 2366, y: 1006, r: 94 },
]

export const level424Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-424-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-424-b-<n>.webp).
  imageB: 'levels/redesign/level-424-a.avif',
  patchesB: zonePatches('levels/redesign/level-424-b', differences, viewBox),
  viewBox,
  differences,
}
