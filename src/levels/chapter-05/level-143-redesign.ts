import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 143 ("cockpit") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the warning light
// over the windshield turns yellow, the green alien plush loses its right antenna, the bar graph gets a fifth bar, the
// left gauge's needle turns red, the top row's right button green, the round knob red, the fourth toggle loses its
// lever, the line on the small screen turns red, the mug light blue, and a sticky note lies by the joystick. B is A
// with only these changes of Gemini's laid over it. Fixed by hand: Gemini took both antennae away, so only its head's
// top right is laid over A; it only shortened the fourth bar, so A's bars are laid again a little narrower and closer
// with a fifth right of them; it took the fifth toggle's lever, so A's fourth one is covered with the panel beside it;
// its other changes (the two satellites outside) are left out.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The warning light at the top of the windshield frame: red in A, yellow in B.
  { x: 1310, y: 99, r: 115 },
  // The right antenna of the green alien plush hanging from the ceiling, only in A.
  { x: 846, y: 186, r: 73 },
  // The bar graph screen in the middle of the console: four bars in A, five in B.
  { x: 1310, y: 990, r: 85 },
  // The needle of the left round gauge: black in A, red in B.
  { x: 2024, y: 974, r: 73 },
  // The button at the right end of the top row of colorful buttons: blue in A, green in B.
  { x: 1481, y: 1206, r: 73 },
  // The small round knob left of the colorful buttons: silver in A, red in B.
  { x: 787, y: 1280, r: 73 },
  // The lever of the fourth toggle switch from the left at the bottom left, only in A.
  { x: 568, y: 1446, r: 73 },
  // The line on the small screen at the right: yellow in A, red in B.
  { x: 2262, y: 1376, r: 82 },
  // The mug: pink in A, light blue in B.
  { x: 1819, y: 1525, r: 77 },
  // The yellow sticky note on the console left of the joystick, only in B.
  { x: 991, y: 1578, r: 100 },
]

export const level143Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-143-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-143-b-<n>.webp).
  imageB: 'levels/redesign/level-143-a.avif',
  patchesB: zonePatches('levels/redesign/level-143-b', differences, viewBox),
  viewBox,
  differences,
}
