import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 430 ("buenosAires") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the obelisk's window, the balcony's flower pot,
// the sign's curl, the trousers and the shirt on the line, the fedora, the dress's colour, a shutter, the coin hat, the
// ball. Gemini's first B made the first seven (it also redrew the trees and the bandoneon), its second edit in the same
// chat the shutter and the coin hat, and it took the yellow ball by the small jacaranda instead of the flowers of its
// lower branch: B is A with only those parts of the two laid over it.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The small window near the obelisk's tip: there in A, plain stone in B.
  { x: 1312, y: 284, r: 60 },
  // The flower pot on the red house's balcony: there in A, gone in B.
  { x: 238, y: 764, r: 71 },
  // The big curl on the right end of the filete sign: there in A, gone in B.
  { x: 972, y: 983, r: 60 },
  // The blue trousers on the clothesline: there in A, gone in B.
  { x: 1208, y: 724, r: 73 },
  // The white shirt on the clothesline: there in A, gone in B.
  { x: 1412, y: 711, r: 68 },
  // The tango dancer's black fedora: there in A, gone in B.
  { x: 1029, y: 1262, r: 60 },
  // The tango dancer's long dress: red in A, purple in B.
  { x: 1085, y: 1474, r: 154 },
  // The left green shutter of the yellow house's window: there in A, gone in B.
  { x: 465, y: 817, r: 75 },
  // The upturned coin hat on the pavement before the bandoneon player: there in A, gone in B.
  { x: 2088, y: 1595, r: 60 },
  // The yellow ball by the small jacaranda, with its shadow: there in A, gone in B.
  { x: 1555, y: 1560, r: 60 },
]

export const level430Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-430-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-430-b-<n>.webp).
  imageB: 'levels/redesign/level-430-a.avif',
  patchesB: zonePatches('levels/redesign/level-430-b', differences, viewBox),
  viewBox,
  differences,
}
