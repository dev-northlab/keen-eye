import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 87 ("asteroidBelt") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the big
// planet turns teal green, the sparkle left of the saucer yellow, the top right star pink, the big asteroid below the
// planet sandy beige, the top right one blue-grey, the asteroid right of the ringed planet goes, the flag turns
// yellow, the tallest crystal goes, the astronaut's visor turns green and the rocket's nose and fins blue. B is A with
// only these changes of Gemini's laid over it. Fixed by hand: Gemini made the beige asteroid only a little lighter, so
// its brown is brought up to a clear sandy beige; its other small changes (a pebble in the belt, asteroid craters,
// the saucer) are left out.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The big planet at the top left: red in A, teal green in B.
  { x: 236, y: 222, r: 165 },
  // The sparkle at the top, left of the flying saucer: white in A, yellow in B.
  { x: 1170, y: 256, r: 70 },
  // The star at the top right: yellow in A, pink in B.
  { x: 2426, y: 194, r: 60 },
  // The big asteroid below and right of the planet: brown in A, sandy beige in B.
  { x: 726, y: 550, r: 110 },
  // The big asteroid at the top right, right of the saucer: brown in A, blue-grey in B.
  { x: 1968, y: 354, r: 85 },
  // The asteroid right of the small ringed planet and lower, only in A.
  { x: 2296, y: 844, r: 62 },
  // The flag on the asteroid at the left: red in A, yellow in B.
  { x: 440, y: 858, r: 60 },
  // The tallest cyan crystal on top of the purple asteroid, only in A.
  { x: 1556, y: 690, r: 75 },
  // The visor of the astronaut standing on the asteroid: yellow in A, green in B.
  { x: 1903, y: 1087, r: 60 },
  // The nose and fins of the rocket at the bottom left: orange in A, blue in B.
  { x: 489, y: 1439, r: 100 },
]

export const level087Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-087-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-087-b-<n>.webp).
  imageB: 'levels/redesign/level-087-a.avif',
  patchesB: zonePatches('levels/redesign/level-087-b', differences, viewBox),
  viewBox,
  differences,
}
