import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 47 ("forestLake") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): a red
// dragonfly flies over the far shore, the rower's shirt turns red, the jumping fish silver-grey, the swan's beak black,
// the pier loses its right front post, the bucket on the pier turns blue, a cattail on the right loses its head and moss
// covers the big rock at the bottom right. B is A with only these changes of Gemini's laid over it. Gemini left the
// swan's beak orange (painted black by hand) and kept the post (painted out by hand: the deck moved along from its
// left, the water blended row by row); it covered both rocks with moss, only the big one keeps it.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // A red dragonfly over the far shore, left of the signpost, only in B.
  { x: 1010, y: 828, r: 85 },
  // The shirt of the man in the rowboat: blue in A, red in B.
  { x: 1322, y: 1200, r: 110 },
  // The fish jumping out of the water: orange in A, silver-grey in B.
  { x: 1826, y: 1170, r: 97 },
  // The swan's beak: orange in A, black in B.
  { x: 594, y: 1148, r: 60 },
  // The front post at the right end of the pier, only in A.
  { x: 680, y: 1470, r: 84 },
  // The bucket on the pier: red in A, blue in B.
  { x: 556, y: 1340, r: 80 },
  // The brown head of a cattail on the right shore, only in A.
  { x: 2600, y: 1130, r: 99 },
  // Moss on top of the big grey rock at the bottom right, only in B.
  { x: 2390, y: 1514, r: 206 },
]

export const level047Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-047-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-047-b-<n>.webp).
  imageB: 'levels/redesign/level-047-a.avif',
  patchesB: zonePatches('levels/redesign/level-047-b', differences, viewBox),
  viewBox,
  differences,
}
