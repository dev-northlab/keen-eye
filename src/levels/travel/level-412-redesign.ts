import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 412 ("giza") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on their
// pixel difference. Small parts only (docs/redesign-travel.md): the falcon, the casing on the middle pyramid's tip, a
// queens' pyramid, the Sphinx's headdress stripes, the lizard, the dates, the left camel's blanket, the right camel's
// halter. Gemini also redrew the big pyramids' blocks, the palm and the sand, took away all three queens' pyramids and
// recoloured the right camel's blanket: B is A with only the listed changes of Gemini's laid over it — of the queens'
// pyramids only the leftmost (the rightmost stands behind the halter camel's head, their zones would overlap), blended
// in seamlessly, Gemini's sand being a shade lighter there. It redrew the Sphinx's whole head without the stripes.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The falcon flying at the top right: there in A, gone in B.
  { x: 2029, y: 306, r: 79 },
  // The smooth white casing on the middle pyramid's tip: there in A, plain blocks in B.
  { x: 1652, y: 594, r: 151 },
  // The leftmost of the three small queens' pyramids: there in A, gone in B.
  { x: 1970, y: 1219, r: 100 },
  // The Sphinx's headdress: blue and gold stripes in A, plain stone in B.
  { x: 690, y: 1220, r: 121 },
  // The lizard on the Sphinx's back: there in A, gone in B.
  { x: 420, y: 1274, r: 67 },
  // The bunch of dates under the palm's leaves: there in A, gone in B.
  { x: 1007, y: 1206, r: 73 },
  // The left camel's saddle blanket: red in A, blue in B.
  { x: 1700, y: 1313, r: 96 },
  // The rope halter on the right camel's head: there in A, gone in B.
  { x: 2224, y: 1330, r: 116 },
]

export const level412Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-412-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-412-b-<n>.webp).
  imageB: 'levels/redesign/level-412-a.avif',
  patchesB: zonePatches('levels/redesign/level-412-b', differences, viewBox),
  viewBox,
  differences,
}
