import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 420 ("istanbul") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the minaret's upper balcony, the Galata Tower's
// flag, the ferry's funnel, the flag at its bow, the gull on its railing, the simit rings in the cart, the cat, the
// middle tulip's colour. Gemini made all eight but also redrew the trees on the hill, the water, the other minarets'
// balconies and the small flowers, and took the life ring off the ferry: B is A with only the listed changes of
// Gemini's laid over it; a stub of the balcony it left on the minaret is painted away by hand (sky cloned beside it).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The upper balcony of the minaret right of the dome: there in A, gone in B.
  { x: 1300, y: 529, r: 60 },
  // The small flag on top of the Galata Tower: there in A, gone in B.
  { x: 2276, y: 339, r: 60 },
  // The ferry's black-topped funnel with its smoke: there in A, gone in B.
  { x: 1452, y: 966, r: 115 },
  // The Turkish flag at the ferry's bow: there in A, gone in B.
  { x: 1234, y: 1062, r: 74 },
  // The gull standing on the ferry's railing: there in A, gone in B.
  { x: 1760, y: 1116, r: 60 },
  // The stack of simit rings in the cart's glass case: there in A, an empty case in B.
  { x: 558, y: 1378, r: 151 },
  // The orange cat on the pavement, with its shadow: there in A, gone in B.
  { x: 1039, y: 1556, r: 122 },
  // The middle tulip of the three: red in A, yellow in B.
  { x: 1967, y: 1517, r: 60 },
]

export const level420Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-420-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-420-b-<n>.webp).
  imageB: 'levels/redesign/level-420-a.avif',
  patchesB: zonePatches('levels/redesign/level-420-b', differences, viewBox),
  viewBox,
  differences,
}
