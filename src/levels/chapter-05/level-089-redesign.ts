import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 89 ("spaceStation") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the small
// moon in the window goes, the left island on the Earth goes, the apple turns green, the poster rocket's nose and fins
// green, the flower above the shelf goes, the panel's red button turns green, its zigzag cyan, its red light blue, the
// left astronaut's visor green and the right one's light blue. B is A with only these changes of Gemini's laid over
// it. Fixed by hand: on the panel Gemini made the yellow button green and the red one yellow, the red light teal and
// the green one blue, so its green button and blue light are moved onto the red ones' places and the others stay as in
// A; its other changes (the wall domes, the probes' centres, the window's bolts) are left out.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The small grey moon in the round window, only in A.
  { x: 1478, y: 486, r: 60 },
  // The left green island on the Earth in the window, only in A.
  { x: 1212, y: 832, r: 60 },
  // The apple floating left of the window: red in A, green in B.
  { x: 990, y: 485, r: 60 },
  // The rocket on the poster: red nose and fins in A, green in B.
  { x: 2263, y: 396, r: 90 },
  // The small pink flower above the shelf, only in A.
  { x: 2033, y: 638, r: 60 },
  // The rectangular button on the control panel: red in A, green in B.
  { x: 394, y: 1438, r: 60 },
  // The zigzag on the panel's small screen: green in A, cyan in B.
  { x: 610, y: 1412, r: 65 },
  // The round light on the panel: red in A, blue in B.
  { x: 786, y: 1374, r: 60 },
  // The visor of the astronaut at the left: yellow in A, green in B.
  { x: 596, y: 847, r: 60 },
  // The visor of the astronaut at the right: yellow in A, light blue in B.
  { x: 2035, y: 1179, r: 60 },
]

export const level089Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-089-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-089-b-<n>.webp).
  imageB: 'levels/redesign/level-089-a.avif',
  patchesB: zonePatches('levels/redesign/level-089-b', differences, viewBox),
  viewBox,
  differences,
}
