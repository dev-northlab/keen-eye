import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 45 ("autumn") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the last goose of the
// flock is gone, the lower half of the small green tree's crown turns red, the swing's seat red, the red leaf falling
// in the middle of the sky yellow, the top of the leaf pile at the bottom left yellow, the rake loses its teeth, the
// squirrel on the stump gets a grey tail and an acorn lies right of the stump. B is A with only these changes of
// Gemini's laid over it. Gemini also took away a bird at the top right (put back from A) and drew the rake anew, a
// longer handle without teeth: the rake is A's with its teeth and their bar painted out by hand.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The last goose at the right end of the flock, only in A.
  { x: 906, y: 328, r: 74 },
  // The lower half of the small round tree's crown on the left: green in A, red in B.
  { x: 594, y: 682, r: 129 },
  // The seat of the swing on the big tree: wooden in A, red in B.
  { x: 1936, y: 988, r: 86 },
  // The leaf falling in the middle of the sky: red in A, yellow in B.
  { x: 1320, y: 654, r: 74 },
  // The top of the leaf pile at the bottom left: orange in A, yellow in B.
  { x: 382, y: 1474, r: 123 },
  // The teeth of the rake, only in A.
  { x: 730, y: 1568, r: 74 },
  // The tail of the squirrel on the stump: red in A, grey in B.
  { x: 952, y: 1456, r: 92 },
  // An acorn on the ground right of the stump, only in B.
  { x: 1146, y: 1556, r: 74 },
]

export const level045Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-045-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-045-b-<n>.webp).
  imageB: 'levels/redesign/level-045-a.avif',
  patchesB: zonePatches('levels/redesign/level-045-b', differences, viewBox),
  viewBox,
  differences,
}
