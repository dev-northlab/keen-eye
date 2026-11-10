import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 86 ("alienVillage") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the big
// planet turns light blue, the glowing star left of the yellow planet goes, the saucer's lights turn red, the left
// spot of the red cap goes, the purple house's window turns blue, the blue house's door red, the left lamp goes out,
// the one-eyed alien gets two eyes, the orange alien turns pink and the far left bulb plant's bulb yellow. B is A with
// only these changes of Gemini's laid over it. Fixed by hand: Gemini left the cap spot as a pale ghost, so it is
// painted out with the cap's red (a seamless clone); it gave the alien three eyes, so A's eye is covered with its own
// skin and only Gemini's left and right eyes are laid on; it also dimmed the lamp's light on the ground and the purple
// house, which is left out (only the lamp's head is taken).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The big ringed planet at the top left: pink in A, light blue in B.
  { x: 490, y: 288, r: 135 },
  // The glowing yellow star left of the yellow planet, only in A.
  { x: 1572, y: 224, r: 75 },
  // The three lights of the orange flying saucer: white in A, red in B.
  { x: 2230, y: 500, r: 90 },
  // The white spot on the left of the red mushroom cap, only in A.
  { x: 426, y: 1052, r: 60 },
  // The round window of the purple mushroom house: yellow in A, blue in B.
  { x: 1308, y: 1082, r: 60 },
  // The door of the blue mushroom house: brown in A, red in B.
  { x: 2102, y: 1293, r: 60 },
  // The light on the left lamp post: glowing cyan in A, out in B.
  { x: 1052, y: 1216, r: 80 },
  // The green alien in the middle left: one eye in A, two in B.
  { x: 886, y: 1370, r: 60 },
  // The furry alien in the middle: orange in A, pink in B.
  { x: 1706, y: 1429, r: 90 },
  // The bulb of the tall bulb plant at the far left: pink in A, yellow in B.
  { x: 198, y: 1209, r: 82 },
]

export const level086Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-086-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-086-b-<n>.webp).
  imageB: 'levels/redesign/level-086-a.avif',
  patchesB: zonePatches('levels/redesign/level-086-b', differences, viewBox),
  viewBox,
  differences,
}
