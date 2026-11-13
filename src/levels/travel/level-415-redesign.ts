import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 415 ("southernAlps") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the sailboat's flag, the kayak's paddle, the
// cottage roof, the tui, the sheep at the right, the tree fern's lower left frond, the pohutukawa's red flowers, the red
// mushroom. Gemini also redrew the grass, the lupins, the fern and the other sheep, and in place of the snow on the
// middle peak drew a whole new bare mountain — far more than a part, so that is left out and the red mushroom it took
// away is taken instead. B is A with only the listed changes of Gemini's laid over it: the flowers only on the upper
// crown (a zone for the whole tree would overlap the roof's and the sheep's), and a dark sliver of the paddle Gemini
// left under the kayak cloned away by hand. Its blue roof came with a dark smudge on the water beside it, so A's red
// roof is recoloured blue by hand instead, its shading kept.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The small flag on top of the sailboat's mast: there in A, gone in B.
  { x: 1620, y: 864, r: 66 },
  // The kayak's paddle: there in A, gone in B (the paddler sits with crossed legs).
  { x: 825, y: 1057, r: 122 },
  // The cottage roof: red in A, blue in B.
  { x: 2119, y: 1028, r: 132 },
  // The tui bird in the grass: there in A, gone in B.
  { x: 1384, y: 1292, r: 66 },
  // The sheep at the right edge: there in A, gone in B.
  { x: 2502, y: 1200, r: 147 },
  // The tree fern's lower left frond: there in A, gone in B.
  { x: 130, y: 1000, r: 176 },
  // The red flowers on the pohutukawa's upper crown: there in A, a green tree in B.
  { x: 2440, y: 630, r: 290 },
  // The red mushroom in the grass: there in A, gone in B.
  { x: 2110, y: 1357, r: 66 },
]

export const level415Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-415-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-415-b-<n>.webp).
  imageB: 'levels/redesign/level-415-a.avif',
  patchesB: zonePatches('levels/redesign/level-415-b', differences, viewBox),
  viewBox,
  differences,
}
