import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 429 ("cusco") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the right peak's snow cap, the bell, the dome's
// lantern, the round window, the balcony's roof, the rainbow flag, the grass tuft, the hat's flower, the corn's colour,
// the llama's tassels. Gemini made all ten but also redrew roofs, the woman's clothes and the llama's blanket: B is A
// with only the listed changes of Gemini's laid over it. It also turned the hat's red band brown: kept, as it lies in
// the flower's zone.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The snow cap on the right peak: there in A, green slopes in B.
  { x: 2226, y: 380, r: 261 },
  // The bronze bell in the arch of the left bell tower: there in A, gone in B.
  { x: 1184, y: 492, r: 67 },
  // The stone lantern with its cross on the right tower's dome: there in A, a low drum in B.
  { x: 1764, y: 286, r: 66 },
  // The round window above the cathedral's main door: there in A, plain stone in B.
  { x: 1564, y: 786, r: 89 },
  // The small tiled roof over the carved wooden balcony: there in A, gone in B.
  { x: 442, y: 700, r: 310 },
  // The rainbow flag on its pole: there in A, gone in B (the pole stays).
  { x: 2487, y: 738, r: 82 },
  // The tuft of grass growing between the Inca stones: there in A, gone in B.
  { x: 450, y: 1339, r: 81 },
  // The flower on the woman's hat band: there in A, gone in B.
  { x: 1380, y: 1270, r: 60 },
  // The corn cobs in the basket: yellow in A, purple in B.
  { x: 1240, y: 1476, r: 108 },
  // The pink woollen tassels in the llama's ears: there in A, gone in B.
  { x: 1996, y: 1142, r: 62 },
]

export const level429Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-429-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-429-b-<n>.webp).
  imageB: 'levels/redesign/level-429-a.avif',
  patchesB: zonePatches('levels/redesign/level-429-b', differences, viewBox),
  viewBox,
  differences,
}
