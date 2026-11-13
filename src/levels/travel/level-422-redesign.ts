import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 422 ("bangkok") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the main prang's spire, the right chofa horn, the
// temple door's colour, the lantern's tassel, the stone elephant, the boat's garland, the vendor's hat, her bananas,
// the suitcase on the tuk-tuk. Gemini made all nine but also redrew the roofs, the prangs, the trees and the water and
// turned the windows blue too: B is A with only the listed changes of Gemini's laid over it.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The gilded spire on top of the tall middle prang of Wat Arun: there in A, gone in B.
  { x: 1859, y: 154, r: 60 },
  // The golden chofa horn on the right end of the temple roof: there in A, gone in B.
  { x: 872, y: 551, r: 60 },
  // The temple's door: red in A, blue in B.
  { x: 558, y: 915, r: 85 },
  // The red tassel under the lantern: there in A, gone in B.
  { x: 341, y: 884, r: 60 },
  // The stone elephant statue by the temple steps: there in A, gone in B.
  { x: 850, y: 990, r: 83 },
  // The flower garland on the long-tail boat's bow: there in A, gone in B.
  { x: 960, y: 1174, r: 64 },
  // The vendor's conical straw hat: there in A, gone in B.
  { x: 2007, y: 1071, r: 81 },
  // The bunch of bananas in her boat: there in A, gone in B.
  { x: 2187, y: 1238, r: 101 },
  // The suitcase on the tuk-tuk's roof, with its shadow: there in A, gone in B.
  { x: 625, y: 1400, r: 68 },
]

export const level422Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-422-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-422-b-<n>.webp).
  imageB: 'levels/redesign/level-422-a.avif',
  patchesB: zonePatches('levels/redesign/level-422-b', differences, viewBox),
  viewBox,
  differences,
}
