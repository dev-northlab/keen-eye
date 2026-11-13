import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 405 ("agra") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on their
// pixel difference. Small parts only (docs/redesign-travel.md): the main dome's finial, the right kiosk's spike, the
// far right minaret's middle ring, one lotus, the peacock's crest, the monkey, the roses of the big bush, the kite's
// tail. Gemini whitened every lotus and stripped both rose bushes, and redrew the flower beds, the trees and the arch's
// inlay: B is A with only the listed changes of Gemini's laid over it (one lotus, the big bush).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The golden finial on top of the main dome: there in A, gone in B.
  { x: 1311, y: 231, r: 79 },
  // The golden spike on the right small kiosk: there in A, gone in B.
  { x: 1522, y: 520, r: 79 },
  // The middle balcony ring of the far right minaret: there in A, gone in B.
  { x: 2000, y: 670, r: 79 },
  // The lotus flower in the middle of the pool: pink in A, white in B.
  { x: 1344, y: 1420, r: 79 },
  // The crest on the peacock's head: there in A, gone in B.
  { x: 2065, y: 1314, r: 79 },
  // The monkey sitting on the platform: there in A, gone in B.
  { x: 2074, y: 936, r: 79 },
  // The pink roses on the big bush at the bottom left: there in A, gone in B.
  { x: 212, y: 1478, r: 197 },
  // The kite's tail of red bows: there in A, gone in B (its cord stays).
  { x: 242, y: 1008, r: 116 },
]

export const level405Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-405-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-405-b-<n>.webp).
  imageB: 'levels/redesign/level-405-a.avif',
  patchesB: zonePatches('levels/redesign/level-405-b', differences, viewBox),
  viewBox,
  differences,
}
