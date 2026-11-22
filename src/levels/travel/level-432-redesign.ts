import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 432 ("astana") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): a Baiterek branch, Khan Shatyr's mast and
// canopy, the tower's antenna, the kite's tail, the yurt's door (the one colour change) and smoke-hole cover, the
// lamb, the saddle, a dot on the mushroom. B is A with only these parts of Gemini's B: it also redrew the grass and
// trees and took away the man in yellow and the mushroom. By hand: Gemini cut Khan Shatyr's whole crown with the
// mast — the mast is taken off A's crown (a fill of sky); it redrew the Baiterek with a stray strut instead of taking
// a branch — the outermost left branch's tips are cut short on A; it left the antenna — taken away by hand; it
// redrew the whole horse without mane and tail — only its coat where the saddle was is laid on A's horse, matched in colour; the
// tail of the kite is only shortened (its last three bows), not taken whole, to keep the zone small; and it left the
// eagle's hood on, so a fifth white dot on the mushroom's cap stands in for that change (the user, 2026-11-19, in
// place of taking the mushroom away; the big middle dot copied smaller).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The tips of the Baiterek's outermost left branch: there in A, cut short in B.
  { x: 1185, y: 376, r: 60 },
  // The tall mast on top of Khan Shatyr: there in A, gone in B (the crown stays).
  { x: 2127, y: 300, r: 139 },
  // The striped canopy over Khan Shatyr's entrance: there in A, gone in B.
  { x: 2137, y: 1035, r: 115 },
  // The antenna on the tall glass tower: there in A, gone in B.
  { x: 398, y: 371, r: 75 },
  // The end of the kite's tail with its last three bows: there in A, gone in B.
  { x: 941, y: 754, r: 106 },
  // The yurt's door: red in A, blue in B.
  { x: 462, y: 1465, r: 99 },
  // The felt cover of the yurt's smoke hole: there in A, the hole open in B.
  { x: 463, y: 1278, r: 67 },
  // The lamb on the grass: there in A, gone in B.
  { x: 792, y: 1556, r: 79 },
  // The horse's red saddle: there in A, gone in B.
  { x: 1408, y: 1394, r: 90 },
  // The red mushroom's cap: four white dots in A, a fifth on its lower right in B.
  { x: 1182, y: 1537, r: 60 },
]

export const level432Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-432-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-432-b-<n>.webp).
  imageB: 'levels/redesign/level-432-a.avif',
  patchesB: zonePatches('levels/redesign/level-432-b', differences, viewBox),
  viewBox,
  differences,
}
