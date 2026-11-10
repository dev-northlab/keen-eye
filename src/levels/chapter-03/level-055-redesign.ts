import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 55 ("picnic") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the kite's long
// ribbon tail turns red, the frisbee yellow, the blanket loses one of its two apples, the small watermelon slice on
// the board turns yellow inside, the left bottle green, the ball green-and-white, the shirt of the person at the
// right of the blanket teal and the dog gets a dark brown ear. B is A with only these changes of Gemini's laid over
// it (the ribbon, the frisbee, the apple, the small slice, the ball); it also turned the big slice yellow (left out,
// its zone would overlap the bottle's) and gave the dog an upright ear of its own colour, so three are done by hand
// on A's picture: the bottle and the shirt recoloured with their shading kept, a floppy ear darkened on the back of
// the dog's head (A's dog shows none). The apple's and the ball's zones sit a little apart from the middles of the
// two, which lie too close for two zones.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The kite's long ribbon tail down to the boy: blue in A, red in B.
  { x: 1982, y: 700, r: 298 },
  // The frisbee in the air: pink in A, yellow in B.
  { x: 1181, y: 586, r: 60 },
  // The left apple of the two on the blanket, only in A.
  { x: 876, y: 1415, r: 60 },
  // The small watermelon slice on the board: red inside in A, yellow in B.
  { x: 1149, y: 1439, r: 60 },
  // The left bottle of the two: blue in A, green in B.
  { x: 1316, y: 1437, r: 60 },
  // The ball on the blanket: blue-and-white in A, green-and-white in B.
  { x: 782, y: 1493, r: 60 },
  // The shirt of the person at the right of the blanket: purple in A, teal in B.
  { x: 1574, y: 1456, r: 71 },
  // A dark brown ear on the dog's head, only in B.
  { x: 1820, y: 1468, r: 60 },
]

export const level055Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-055-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-055-b-<n>.webp).
  imageB: 'levels/redesign/level-055-a.avif',
  patchesB: zonePatches('levels/redesign/level-055-b', differences, viewBox),
  viewBox,
  differences,
}
