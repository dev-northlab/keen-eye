import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 92 ("alienMarket") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the small
// orange moon turns light blue, the second fruit of the left stall's bottom row green, the middle stall's seller gets
// two small eyes, the right stall's round sign turns blue, its right star goes, the second lantern turns purple, the
// fifth orange, the orange alien light blue, the top crate goes and the robot's eyes turn red. B is A with only these
// changes of Gemini's laid over it. Fixed by hand: Gemini greened the third fruit (by the key) instead of the second,
// so the second is recoloured on A; it gave the seller three eyes, so A's eye is filled with the skin round it and
// only Gemini's outer two eyes are laid on.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The small moon at the right of the sky, above the sun: orange in A, light blue in B.
  { x: 2426, y: 554, r: 60 },
  // The second fruit from the left in the left stall's bottom row: yellow in A, green in B.
  { x: 425, y: 1082, r: 60 },
  // The green seller of the middle stall: one big eye in A, two smaller ones in B.
  { x: 1310, y: 1026, r: 60 },
  // The round sign under the right stall's awning: yellow in A, blue in B.
  { x: 2132, y: 973, r: 60 },
  // The right one of the three stars on the right stall's counter, only in A.
  { x: 2262, y: 1081, r: 60 },
  // The second lantern from the left on the rope: pink in A, purple in B.
  { x: 655, y: 349, r: 60 },
  // The fifth lantern from the left on the rope: light blue in A, orange in B.
  { x: 1640, y: 366, r: 60 },
  // The two-eyed alien between the left and the middle stall: orange in A, light blue in B.
  { x: 885, y: 1463, r: 85 },
  // The top crate of the stack, only in A.
  { x: 1768, y: 1414, r: 72 },
  // The grey robot's eyes at the right: cyan in A, red in B.
  { x: 2492, y: 1420, r: 60 },
]

export const level092Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-092-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-092-b-<n>.webp).
  imageB: 'levels/redesign/level-092-a.avif',
  patchesB: zonePatches('levels/redesign/level-092-b', differences, viewBox),
  viewBox,
  differences,
  // The space chapter's golden key standing behind the last fruit of the left stall: cut out of the pictures (the stall
  // and counter beside it cloned over its place) into its own image, so a tap takes it off like a drawn scene's key.
  secret: {
    x: 540,
    y: 1068,
    r: 40,
    on: 'both',
    image: { href: 'levels/redesign/level-092-key.webp', x: 518, y: 1038, w: 45, h: 71 },
  },
}
