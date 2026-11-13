import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 427 ("toronto") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): a red light on a skyscraper, the stadium's flag,
// the canoe's colour, the squirrel, a goose, the Canadian flag, the CN Tower's antenna, the sparrow, the yellow buoy, a
// small balloon. Gemini's first B made the first six (A has two red lights on the tower: it took the middle one), its
// second edit in the same chat the antenna, the sparrow and the streetcar's trolley pole; B is A with only those parts
// of the two laid over it. The trolley pole is left out (its zone would overlap the yellow canoe's) and Gemini kept the
// yacht's jib both times, so the yellow buoy (its water cloned from beside it) and a small balloon in the sky (a fill
// of sky) are taken away by hand in their place.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The red light with its glow in the middle of the tall glass skyscraper: there in A, gone in B.
  { x: 824, y: 608, r: 79 },
  // The small Canadian flag on top of the stadium's dome: there in A, gone in B.
  { x: 1714, y: 850, r: 60 },
  // The canoe: red in A, yellow in B.
  { x: 2134, y: 1310, r: 117 },
  // The squirrel on the maple's trunk: there in A, gone in B.
  { x: 201, y: 1081, r: 90 },
  // One of the two Canada geese on the grass: there in A, gone in B.
  { x: 990, y: 1522, r: 102 },
  // The Canadian flag on the shore: there in A, gone in B (the pole stays).
  { x: 1600, y: 1309, r: 62 },
  // The long antenna on top of the CN Tower: there in A, gone in B.
  { x: 1312, y: 216, r: 130 },
  // The sparrow on the grass: there in A, gone in B.
  { x: 586, y: 1498, r: 67 },
  // The yellow buoy on the lake, with its reflection: there in A, gone in B.
  { x: 1087, y: 1225, r: 79 },
  // A small yellow balloon in the sky: there in A, gone in B.
  { x: 2324, y: 526, r: 60 },
]

export const level427Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-427-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-427-b-<n>.webp).
  imageB: 'levels/redesign/level-427-a.avif',
  patchesB: zonePatches('levels/redesign/level-427-b', differences, viewBox),
  viewBox,
  differences,
}
