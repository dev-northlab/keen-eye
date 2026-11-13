import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 330 ("memoryHoliday") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference, small parts of objects: the golden star gone from the tree's top, the blue
// ornament red, the right candle's flame out, the left stocking's white cuff gone, the bow gone from the green gift.
// Gemini also turned the green stocking red and blew out the left candle: left out, B is A with its five changes
// laid over it, one cut-out per zone.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The golden star on top of the Christmas tree: there in A, gone in B.
  { x: 1566, y: 480, r: 105 },
  // The ornament ball in the middle of the tree: blue in A, red in B.
  { x: 1428, y: 1242, r: 102 },
  // The flame of the right candle on the mantel: lit in A, out in B.
  { x: 859, y: 1015, r: 102 },
  // The white cuff of the left red stocking: there in A, gone in B.
  { x: 287, y: 1236, r: 102 },
  // The red ribbon bow on top of the green gift: there in A, gone in B.
  { x: 1015, y: 1595, r: 110 },
]

export const level330Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-330-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-330-b-<n>.webp).
  imageB: 'levels/redesign/level-330-a.avif',
  patchesB: zonePatches('levels/redesign/level-330-b', differences, viewBox),
  viewBox,
  differences,
}
