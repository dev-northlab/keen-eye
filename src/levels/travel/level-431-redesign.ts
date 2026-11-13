import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 431 ("moscow") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the Spasskaya Tower's star, the clock's hands,
// two merlons, a dome's colour, a small dome, a lamp globe, the smallest matryoshka, the yellow balloon of the bunch,
// the boy's pompom, a balloon in the sky. Gemini also redrew the trees and the boy's whole hat plain blue (a second
// colour change, left out: the pompom is taken away by hand on A's hat, the pavement cloned from beside it), and it
// moved the clock's hands rather than taking the minute hand away (kept: the clock shows another time). It took the
// lone pigeon too, but that zone would overlap the balloon bunch's: the balloon high in the sky is taken away by hand
// in its place (a fill of sky).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The red star on the Spasskaya Tower's spire: there in A, a thin gilded tip in B.
  { x: 498, y: 98, r: 60 },
  // The clock's gold hands: about ten past ten in A, four o'clock in B.
  { x: 494, y: 688, r: 85 },
  // Two swallow-tail merlons of the Kremlin wall: there in A, a gap in B.
  { x: 936, y: 822, r: 106 },
  // The striped onion dome right of the tall tent: green and yellow in A, blue and white in B.
  { x: 2068, y: 490, r: 136 },
  // The small striped dome low on the left of the tent: there in A, gone in B.
  { x: 1868, y: 714, r: 107 },
  // One of the street lamp's two globes: there in A, gone in B.
  { x: 236, y: 1216, r: 70 },
  // The smallest matryoshka at the right end of the stall: there in A, gone in B.
  { x: 1232, y: 1410, r: 60 },
  // The yellow balloon of the seller's bunch: there in A, gone in B (the red and the blue one stay).
  { x: 2382, y: 1218, r: 172 },
  // The pompom on the boy's knitted hat: there in A, gone in B.
  { x: 1529, y: 1374, r: 60 },
  // The yellow balloon high in the sky: there in A, gone in B.
  { x: 2354, y: 289, r: 60 },
]

export const level431Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-431-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-431-b-<n>.webp).
  imageB: 'levels/redesign/level-431-a.avif',
  patchesB: zonePatches('levels/redesign/level-431-b', differences, viewBox),
  viewBox,
  differences,
}
