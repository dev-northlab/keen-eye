import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 133 ("sunkenChest") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the pink
// jellyfish's bell turns blue, a board of the wreck's hatch goes, the moray's head turns yellow, the chest's red gem
// green, a gold coin goes, the note leaves the bottle, a red crab sits by the chest, the anchor turns rusty, the top
// cannonball goes and the octopus's head turns pink. B is A with only these changes of Gemini's laid over it. Gemini
// took the leftmost coin of the group instead of the second (that one lies in front of the seaweed) and it stays so;
// it kept the top cannonball, so the ball is covered by hand with the sand on its right; it also turned the
// octopus's tentacles pink, so only its head is taken.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The bell of the jellyfish in the middle: pink in A, blue in B.
  { x: 1840, y: 460, r: 96 },
  // The second board of the square hatch on the wreck, only in A.
  { x: 660, y: 1064, r: 80 },
  // The head of the moray in the dark hole: green in A, yellow in B.
  { x: 404, y: 1248, r: 73 },
  // The gem on top of the treasure: red in A, green in B.
  { x: 1360, y: 1268, r: 73 },
  // The leftmost gold coin between the bottle and the chest, only in A.
  { x: 916, y: 1568, r: 73 },
  // The paper note in the green bottle, only in A.
  { x: 748, y: 1528, r: 73 },
  // The red crab right of the coin under the chest, only in B.
  { x: 1560, y: 1492, r: 84 },
  // The anchor: grey in A, rusty brown in B.
  { x: 2096, y: 1292, r: 73 },
  // The top cannonball of the pile, only in A.
  { x: 1940, y: 1536, r: 76 },
  // The octopus's head: purple in A, pink in B.
  { x: 2368, y: 1368, r: 73 },
]

export const level133Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-133-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-133-b-<n>.webp).
  imageB: 'levels/redesign/level-133-a.avif',
  patchesB: zonePatches('levels/redesign/level-133-b', differences, viewBox),
  viewBox,
  differences,
}
