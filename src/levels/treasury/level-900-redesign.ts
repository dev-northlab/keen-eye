import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// The bonus level 900 ("treasury") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the
// zones measured on their pixel difference. The hardest differences of the game: each one a tiny part of an object,
// all still (pictures do not move; the swinging lantern and the blinking sparkle of the drawn level become the
// lantern's bar and a gem in the chest). B is A with only these changes of Gemini's laid over it. Fixed by hand:
// Gemini took the lantern's bar away, so A's bar is moved 6 px right instead (glass painted over its old place);
// it only shrank the goblet's gem, so it is painted out on A's goblet; it left the floor stack at four coins and
// grew the two little stacks beside the chest instead, so those stay as in A and the floor stack gets a fifth coin
// (A's stack laid again one coin higher).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The bar splitting the hanging lantern's glass: in the middle in A, a little to the right in B.
  { x: 1314, y: 297, r: 66 },
  // The green potion bottle on the shelf: full in A, half full in B.
  { x: 347, y: 778, r: 92 },
  // The gold star on the blue shield: plain in A, a small red gem in its center in B.
  { x: 1968, y: 656, r: 66 },
  // The crown on the coin heap: a white pearl right of its red gem in A, plain gold in B.
  { x: 534, y: 1324, r: 66 },
  // The little gold goblet: a red gem on its cup in A, plain gold in B.
  { x: 804, y: 1438, r: 66 },
  // The middle gem on the gold in the big chest: blue in A, violet in B.
  { x: 1368, y: 1072, r: 66 },
  // The stack of coins on the floor: four coins in A, five in B.
  { x: 1704, y: 1492, r: 66 },
  // The padlock of the small chest: a keyhole in A, plain gold in B.
  { x: 2133, y: 1440, r: 66 },
  // The right sword in the barrel: a round gold pommel in A, none in B.
  { x: 2502, y: 1120, r: 66 },
]

export const level900Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-900-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-900-b-<n>.webp).
  imageB: 'levels/redesign/level-900-a.avif',
  patchesB: zonePatches('levels/redesign/level-900-b', differences, viewBox),
  viewBox,
  differences,
}
