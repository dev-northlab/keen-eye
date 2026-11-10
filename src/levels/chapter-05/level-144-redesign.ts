import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 144 ("asteroidField") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the pitted
// asteroid at the top turns reddish brown, the big asteroid at the upper left gets a pit, the middle of three small
// asteroids goes, the asteroid at the right turns sandy beige, the pitted asteroid right of the middle loses a pit, the
// tall crystal turns yellow, a green flag stands on the flat asteroid, a small rock turns light grey, the rocket's band
// orange and the drone's lamp goes out. B is A with only these changes of Gemini's laid over it. Fixed by hand: Gemini
// added four pits to the big asteroid, so only its top one is laid over A; it reshuffled all the pits of the asteroid
// right of the middle, so its lower right pit is cloned out of A with the rock beside it; it also turned the rocket's
// nose and fins orange, so only the band is laid over A; its other changes (the far right asteroid at the edge, the
// wrench turned into a rock) are left out.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The big asteroid with dark pits at the top middle, below the comet: grey in A, reddish brown in B.
  { x: 1388, y: 296, r: 88 },
  // A new dark pit at the top of the big asteroid at the upper left, only in B.
  { x: 742, y: 250, r: 73 },
  // The middle one of the three small asteroids left of the ringed planet, only in A.
  { x: 2100, y: 376, r: 73 },
  // The asteroid at the right, below the one at the edge: pitted brown in A, sandy beige in B.
  { x: 2301, y: 980, r: 89 },
  // The lower right pit of the pitted asteroid right of the middle, only in A.
  { x: 1867, y: 1093, r: 73 },
  // The tall crystal in the middle of the crystal asteroid: pink in A, yellow in B.
  { x: 416, y: 1152, r: 73 },
  // The green flag on top of the flat asteroid at the bottom middle, only in B.
  { x: 1023, y: 1292, r: 73 },
  // The right one of the two small rocks floating at the bottom middle: dark in A, light grey in B.
  { x: 1726, y: 1373, r: 73 },
  // The band near the back of the white rocket: blue in A, orange in B.
  { x: 1296, y: 782, r: 73 },
  // The lamp under the mining drone: lit yellow in A, dark in B.
  { x: 326, y: 698, r: 73 },
]

export const level144Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-144-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-144-b-<n>.webp).
  imageB: 'levels/redesign/level-144-a.avif',
  patchesB: zonePatches('levels/redesign/level-144-b', differences, viewBox),
  viewBox,
  differences,
}
