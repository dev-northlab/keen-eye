import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 48 ("waterfall") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the dark
// bird above the left forest turns white, the small rainbow keeps only its red, orange and yellow bands, the frog in the
// water on the right turns brown, the jumping fish blue, the bear's muzzle white, the small railing on the log loses
// its middle post, a mossy rock lies at the bottom right and the hiker's backpack turns blue. B is A with only Gemini's
// bird, fish, muzzle, rock and backpack laid over it; Gemini left the rainbow, the foam and the railing as they were.
// Done by hand: the rainbow's green, blue and purple bands lose their colour (the falling water's texture kept; the
// blue and purple alone were too faint to see), the post is painted out with the water and the log beside it row by
// row, and the frog is recoloured in place of the foam at the foot of the waterfall (too wide to paint out cleanly).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The bird flying above the left forest: dark in A, white in B.
  { x: 398, y: 306, r: 86 },
  // The inner green, blue and purple bands of the rainbow over the waterfall, only in A.
  { x: 1313, y: 858, r: 110 },
  // The frog in the water on the right: green in A, brown in B.
  { x: 2158, y: 1356, r: 74 },
  // The fish jumping in the river: orange in A, blue in B.
  { x: 978, y: 1312, r: 74 },
  // The muzzle of the bear on the left bank: cream in A, white in B.
  { x: 300, y: 1402, r: 74 },
  // The middle post of the small railing on the log, only in A.
  { x: 672, y: 1416, r: 74 },
  // A mossy green rock at the bottom right, only in B.
  { x: 2486, y: 1516, r: 175 },
  // The hiker's backpack: red in A, blue in B.
  { x: 1808, y: 1292, r: 74 },
]

export const level048Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-048-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-048-b-<n>.webp).
  imageB: 'levels/redesign/level-048-a.avif',
  patchesB: zonePatches('levels/redesign/level-048-b', differences, viewBox),
  viewBox,
  differences,
  // The forest's golden key in the grass at the water's edge, right of the log's end: cut out of the pictures (the
  // grass above and below it blended over its place) into its own image, so a tap takes it off like a drawn scene's key.
  secret: {
    x: 2270,
    y: 1578,
    r: 45,
    on: 'both',
    image: { href: 'levels/redesign/level-048-key.webp', x: 2229, y: 1553, w: 81, h: 51 },
  },
}
