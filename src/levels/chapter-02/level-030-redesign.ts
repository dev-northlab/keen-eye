import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 30 ("fountainSquare") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the left
// flag turns from red to green, the statue has no hat, the fountain's right jet is off, the leftmost flower of the
// left bed is a yellow sunflower, the shirt of the man at the left of the fountain turns from blue to green, the
// balloon of the woman in purple from red to yellow, the right pigeon of the two in front of the fountain from grey to
// white. Touched up by hand: B is A with only Gemini's flag, sunflower and balloon laid over it. Gemini also redrew the
// two pigeons and the man's shirt (with blue edges left): those stay as in A, the shirt and the pigeon recolored by
// hand. It kept the right jet and the hat: the jet is painted out column by column with the tiles, the rim and the
// water beside it, and the hat with the wall above it, the statue's head given a rounded stone top.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The flag on the left pole: red in A, green in B.
  { x: 450, y: 728, r: 72 },
  // The stone statue's hat, only in A.
  { x: 1314, y: 846, r: 60 },
  // The fountain's right water jet, only in A.
  { x: 1546, y: 1270, r: 105 },
  // The leftmost flower of the left bed: pink in A, a yellow sunflower in B.
  { x: 100, y: 1230, r: 72 },
  // The balloon held by the woman in purple: red in A, yellow in B.
  { x: 2354, y: 1300, r: 100 },
  // The shirt of the man at the left of the fountain: blue in A, green in B.
  { x: 854, y: 1472, r: 66 },
  // The right pigeon of the two in front of the fountain: grey in A, white in B.
  { x: 1188, y: 1574, r: 60 },
]

export const level030Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-030-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-030-b-<n>.webp).
  imageB: 'levels/redesign/level-030-a.avif',
  patchesB: zonePatches('levels/redesign/level-030-b', differences, viewBox),
  viewBox,
  differences,
}
