import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 314 ("memoryParty") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the red balloon dark blue, the rightmost candle gone, the blue gift on the table
// gone (Gemini stood a striped party hat in its place: one change at one place still), a grey cat new by the table
// leg. Gemini also scattered the confetti on the floor anew: left out, B is A with its four changes laid over it, one
// cut-out per zone.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The balloon at the top left: red in A, dark blue in B.
  { x: 308, y: 616, r: 140 },
  // The rightmost of the three candles on the cake: there in A, gone in B.
  { x: 916, y: 1480, r: 102 },
  // The blue gift box with the yellow ribbon on the table: there in A, a party hat in B.
  { x: 1365, y: 1753, r: 165 },
  // The grey cat by the table leg at the bottom left: not in A, there in B.
  { x: 330, y: 2195, r: 175 },
]

export const level314Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-314-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-314-b-<n>.webp).
  imageB: 'levels/redesign/level-314-a.avif',
  patchesB: zonePatches('levels/redesign/level-314-b', differences, viewBox),
  viewBox,
  differences,
}
