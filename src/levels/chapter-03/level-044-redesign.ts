import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 44 ("mushrooms") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the smoke
// over the gnome house's chimney is gone, its door turns red, the fly agaric at the bottom left loses some of its white
// dots, the big orange mushroom's cap turns purple, the frog yellow, the spines of the hedgehog by the squirrel light
// grey, the snail's shell blue, and one of the three mushrooms in the basket is gone. B is A with only these changes of
// Gemini's laid over it. Gemini also turned the small orange mushroom on the right purple (left out); in the basket it
// left one mushroom standing and laid two caps in it, so the basket is A's with its right mushroom painted out by hand
// (the grass and the basket's weave filled in from beside it).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The white smoke over the gnome house's chimney, only in A.
  { x: 1306, y: 992, r: 139 },
  // The door of the gnome house: blue in A, red in B.
  { x: 1274, y: 1426, r: 75 },
  // The white dots of the fly agaric at the bottom left: more in A, fewer in B.
  { x: 332, y: 1426, r: 74 },
  // The cap of the big mushroom on the right: orange in A, purple in B.
  { x: 2254, y: 1350, r: 144 },
  // The frog: green in A, yellow in B.
  { x: 594, y: 1424, r: 87 },
  // The spines of the hedgehog by the squirrel: brown in A, light grey in B.
  { x: 352, y: 1144, r: 77 },
  // The snail's shell: orange in A, blue in B.
  { x: 1836, y: 1528, r: 74 },
  // The right one of the three mushrooms in the basket, only in A.
  { x: 2018, y: 1304, r: 74 },
]

export const level044Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-044-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-044-b-<n>.webp).
  imageB: 'levels/redesign/level-044-a.avif',
  patchesB: zonePatches('levels/redesign/level-044-b', differences, viewBox),
  viewBox,
  differences,
}
