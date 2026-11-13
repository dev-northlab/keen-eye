import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 403 ("amsterdam") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the hoist beam on the cream gable, the wall lantern,
// the green house's window box, the red bike's basket, the tulips, the bird on the round tree, the houseboat's
// lifebuoy, the potted shrub on the houseboat's roof. Gemini also redrew the trees, the quay and the water and took
// away the bird on the right roof as well: B is A with only the listed changes of Gemini's laid over it. It kept the
// potted shrub: taken away by hand on A's picture (quay, curb and roof copied from just beside it, its shadow too).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The hoist beam with its hook under the cream house's gable: there in A, gone in B.
  { x: 954, y: 529, r: 101 },
  // The wall lantern beside the green door of the first house: there in A, gone in B.
  { x: 342, y: 966, r: 79 },
  // The window box of red geraniums on the dark green house: there in A, gone in B.
  { x: 529, y: 798, r: 88 },
  // The front basket of the red bike: there in A, gone in B.
  { x: 882, y: 1098, r: 79 },
  // The tulips in the clay pot: red in A, yellow in B.
  { x: 1538, y: 1083, r: 79 },
  // The small brown bird on top of the round tree: there in A, gone in B.
  { x: 2526, y: 889, r: 79 },
  // The lifebuoy on the houseboat's cabin: there in A, gone in B.
  { x: 1828, y: 1329, r: 79 },
  // The potted shrub on the houseboat's roof: there in A, gone in B.
  { x: 1981, y: 1192, r: 97 },
]

export const level403Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-403-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-403-b-<n>.webp).
  imageB: 'levels/redesign/level-403-a.avif',
  patchesB: zonePatches('levels/redesign/level-403-b', differences, viewBox),
  viewBox,
  differences,
}
