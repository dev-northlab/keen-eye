import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 103 ("barnInside") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. The drawn scene's differences, smaller where they can be: the fence post
// through the door; the lantern, which swings in the drawn scene, goes dark; the cat's tail, which moves in the drawn
// scene, is gone (pictures do not move); the bell, which grows in the drawn scene, turns silver; the mouse, which
// moves in the drawn scene, turns white; the horseshoe and the milk can's band as drawn. Touched up by hand: Gemini
// redrew the straw and the wood, did only the lantern and the cat (B is A with only those laid over it), added a
// fence instead of removing a post, and left the bell, the mouse, the horseshoe and the band as they were: the post
// is painted over with the gap beside it, the bell made silver and the mouse white with their shading kept, the
// horseshoe painted over with the same boards above it, and the band recoloured red.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The middle post of the small fence through the barn door, only in A.
  { x: 1385, y: 1083, r: 73 },
  // The left hanging lantern: lit in A, dark in B.
  { x: 654, y: 366, r: 96 },
  // The grey cat on the beam: its tail hanging down only in A.
  { x: 1565, y: 229, r: 155 },
  // The bell on the cow's collar: golden in A, silver in B.
  { x: 480, y: 1019, r: 73 },
  // The mouse by the sacks: grey in A, white in B.
  { x: 736, y: 1559, r: 73 },
  // The middle horseshoe of the three on the right wall, only in A.
  { x: 1876, y: 655, r: 73 },
  // The middle milk can's band: blue in A, red in B.
  { x: 1957, y: 1492, r: 73 },
]

export const level103Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-103-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-103-b-<n>.webp).
  imageB: 'levels/redesign/level-103-a.avif',
  patchesB: zonePatches('levels/redesign/level-103-b', differences, viewBox),
  viewBox,
  differences,
}
