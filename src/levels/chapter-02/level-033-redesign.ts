import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 33 ("rooftops") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the smoke above the
// near left chimney is gone, the water tank's bands turn red, the TV antenna loses its crossbar, the pink towel turns
// yellow, the orange cat on the blue house turns grey, the frame of the leftmost skylight turns red, the pigeon left
// of the coffee cup turns white. Touched up by hand: B is A with only Gemini's bands, antenna, towel, cat, skylight and
// pigeon laid over it. Gemini kept the smoke of both left chimneys: the smoke of the near one is painted out with the
// wall beside it, the far one's stays on both pictures.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The metal bands around the water tank: grey in A, red in B.
  { x: 854, y: 784, r: 78 },
  // The TV antenna's crossbar, only in A.
  { x: 1182, y: 770, r: 60 },
  // The towel on the clothesline: pink in A, yellow in B.
  { x: 1780, y: 810, r: 78 },
  // The cat sitting on the blue house: orange in A, grey in B.
  { x: 2446, y: 976, r: 78 },
  // The smoke above the near left chimney, only in A.
  { x: 156, y: 1072, r: 140 },
  // The frame of the leftmost skylight on the near roof: grey in A, red in B.
  { x: 386, y: 1434, r: 160 },
  // The pigeon left of the coffee cup: grey in A, white in B.
  { x: 698, y: 1554, r: 84 },
]

export const level033Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-033-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-033-b-<n>.webp).
  imageB: 'levels/redesign/level-033-a.avif',
  patchesB: zonePatches('levels/redesign/level-033-b', differences, viewBox),
  viewBox,
  differences,
}
