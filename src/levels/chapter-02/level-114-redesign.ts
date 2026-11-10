import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 114 ("streetMarket") redrawn as two pictures (public/levels/redesign/, Gemini's A at its full 2624×1632), the
// zones measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// third bulb from the left on the string of lights is off, the bulb over the right part of the flower stall glows red,
// the watermelon slice is yellow inside, one lemon in the crate is green, the dish of the hanging scale is copper,
// the sign board in front of the flower stall is blue, the middle round cheese is white and the board under the teal
// awning has one chalk line instead of two. Gemini returned B at another size (2752×1536) with the whole scene drawn
// anew and shifted, and turned off two other bulbs, the whole scale copper and the newspaper box blue; so B is A with
// these parts recoloured by hand (keeping A's shading), Gemini's dark bulb laid on the third one and its red bulb on
// its place, and the chalk line painted over with the board above it.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The third bulb from the left, over the red-and-white stall: lit in A, off in B.
  { x: 424, y: 262, r: 74 },
  // The bulb over the right part of the flower stall: yellow in A, red in B.
  { x: 1904, y: 286, r: 74 },
  // The watermelon slice in front of the green apples: red inside in A, yellow in B.
  { x: 539, y: 941, r: 74 },
  // The top middle lemon in the crate: yellow in A, green in B.
  { x: 1076, y: 870, r: 74 },
  // The dish of the hanging scale under the yellow awning: silver in A, copper in B.
  { x: 1181, y: 704, r: 74 },
  // The sign board on the post in front of the flower stall: yellow in A, blue in B.
  { x: 1606, y: 1105, r: 78 },
  // The middle round cheese of the bread-and-cheese stall: yellow in A, white in B.
  { x: 2263, y: 946, r: 74 },
  // The lower chalk line on the board under the teal awning, only in A.
  { x: 2087, y: 654, r: 74 },
]

export const level114Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-114-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-114-b-<n>.webp).
  imageB: 'levels/redesign/level-114-a.avif',
  patchesB: zonePatches('levels/redesign/level-114-b', differences, viewBox),
  viewBox,
  differences,
}
