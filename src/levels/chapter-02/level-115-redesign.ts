import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 115 ("metroStation") redrawn as two pictures (public/levels/redesign/, Gemini's full 2612×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// ceiling light right of the pillar is off, one dot of the departure board is off, the clock has lost its thin second
// hand, the bar across the red ring sign turns green, the sun on the small landscape poster orange-red, the middle
// stripe of the yellow poster is gone, the ring of the right hand strap in the left train window is red and so is the handle of the blue
// suitcase. B is A with only these changes of Gemini's laid over it. Gemini also turned off the dot left of that one
// and made the suitcase's wheels red (both left out), and painted the clock's hands red and dropped the second hand:
// the clock is A's with only the second hand painted out by hand (three hands in A, two in B).
const viewBox = { w: 2612, h: 1632 }
const differences: Difference[] = [
  // The ceiling light just right of the pillar: lit in A, dark grey in B.
  { x: 1828, y: 100, r: 120 },
  // One orange dot in the middle of the departure board: lit in A, black in B.
  { x: 2119, y: 268, r: 74 },
  // The thin second hand of the station clock, only in A (the hour and minute hands stay).
  { x: 1702, y: 345, r: 74 },
  // The bar across the red ring sign: blue in A, green in B.
  { x: 1958, y: 641, r: 88 },
  // The sun on the small landscape poster: yellow in A, orange-red in B.
  { x: 1567, y: 777, r: 74 },
  // The middle teal stripe of the yellow poster, only in A.
  { x: 2287, y: 756, r: 74 },
  // The ring of the right hand strap in the left train window: wooden in A, red in B.
  { x: 540, y: 625, r: 74 },
  // The handle of the blue suitcase: dark grey in A, red in B.
  { x: 1377, y: 1430, r: 74 },
]

export const level115Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-115-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-115-b-<n>.webp).
  imageB: 'levels/redesign/level-115-a.avif',
  patchesB: zonePatches('levels/redesign/level-115-b', differences, viewBox),
  viewBox,
  differences,
}
