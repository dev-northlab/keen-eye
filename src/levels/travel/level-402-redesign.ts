import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 402 ("venice") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on their
// pixel difference. Small parts only (docs/redesign-travel.md): the shirt on the washing line, one of three geraniums,
// the gull on the roof, the golden angel on the bell tower, the ivy on the right palace, the cap of the right mooring
// pole, the gondola's ferro, the gondolier's hat ribbon. Gemini also turned the whole right pole red, redrew the pink
// palace's window boxes, the weeds along the water, the ducks' heads and the reflections, and put a pigeon on the
// right palace's corner: B is A with only the listed changes of Gemini's laid over it, and the pole's cap recoloured
// red by hand on A's picture (the stripes stay blue).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The red shirt on the washing line of the pink palace: there in A, gone in B.
  { x: 100, y: 915, r: 136 },
  // The middle one of the three red geraniums in the terracotta palace's window box: there in A, gone in B.
  { x: 1210, y: 924, r: 79 },
  // The gull standing on the cream palace's roof: there in A, gone in B.
  { x: 1565, y: 538, r: 79 },
  // The golden angel on the tip of the bell tower: there in A, a bare rod in B.
  { x: 2042, y: 54, r: 79 },
  // The ivy hanging from the roof of the right palace: there in A, mostly gone in B.
  { x: 2356, y: 582, r: 300 },
  // The metal ferro on the gondola's bow: there in A, gone in B.
  { x: 1878, y: 1266, r: 140 },
  // The red ribbon on the gondolier's straw hat: there in A, gone in B.
  { x: 1088, y: 1218, r: 79 },
  // The cap on top of the right mooring pole: blue in A, red in B.
  { x: 2360, y: 1080, r: 79 },
]

export const level402Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-402-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-402-b-<n>.webp).
  imageB: 'levels/redesign/level-402-a.avif',
  patchesB: zonePatches('levels/redesign/level-402-b', differences, viewBox),
  viewBox,
  differences,
}
