import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 53 ("treehouse") redrawn as two pictures (public/levels/redesign/, Gemini's full 2612×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// right half of the kite turns yellow, the right nest loses one egg, the window's shutters turn red, the flag on the
// roof blue, the rope ladder loses a rung in the middle, the bucket on the rope turns red, the squirrel's tail grey
// and the mushroom cap with white dots brown. B is A with only these changes of Gemini's laid over it (the kite, the
// shutters, the flag, the bucket); it left the other four undone, so they are done by hand on A's picture: the egg
// painted out with the nest's straw, the rung with the grass above it (the ropes kept), the tail and the cap
// recoloured with their shading and the cap's dots kept.
const viewBox = { w: 2612, h: 1632 }
const differences: Difference[] = [
  // The right half of the kite: pink in A, yellow in B.
  { x: 1080, y: 360, r: 74 },
  // The right egg of the right nest on the left branch, only in A.
  { x: 1076, y: 838, r: 60 },
  // The shutters of the treehouse window: teal in A, red in B.
  { x: 1304, y: 792, r: 156 },
  // The flag on the treehouse roof: red in A, blue in B.
  { x: 1614, y: 420, r: 60 },
  // A rung in the middle of the rope ladder, only in A.
  { x: 1078, y: 1157, r: 60 },
  // The bucket hanging on the rope: grey in A, red in B.
  { x: 1826, y: 1088, r: 60 },
  // The squirrel's tail: red in A, grey in B.
  { x: 1132, y: 1342, r: 83 },
  // The cap of the mushroom with white dots at the bottom: red in A, brown in B.
  { x: 630, y: 1434, r: 87 },
]

export const level053Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-053-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-053-b-<n>.webp).
  imageB: 'levels/redesign/level-053-a.avif',
  patchesB: zonePatches('levels/redesign/level-053-b', differences, viewBox),
  viewBox,
  differences,
}
