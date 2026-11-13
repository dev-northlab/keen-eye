import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 421 ("dubai") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the Burj Khalifa's needle, the red light and the
// antenna on two glass towers, the Burj Al Arab's helipad, the dhow's sail colour, the fountain's middle jet, the
// balloon's basket, the camel's halter, the bunch of dates. Gemini also redrew the palms and squared the hotel's left
// platform: B is A with only the listed changes of Gemini's laid over it. It kept the antenna, painted away by hand on
// A's picture (a fill of sky), and left a faint smudge where the helipad was, filled with sky the same way. Its red sail
// is bigger than the white one, so its zone takes the whole sail with its reflection.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The long needle on top of the Burj Khalifa: there in A, gone in B.
  { x: 1086, y: 135, r: 68 },
  // The red light on the roof of the glass tower left of the Burj Khalifa: there in A, gone in B.
  { x: 755, y: 612, r: 60 },
  // The round helipad sticking out near the top of the Burj Al Arab: there in A, gone in B.
  { x: 2239, y: 658, r: 60 },
  // The dhow's sail, with its reflection: white in A, red in B.
  { x: 640, y: 1194, r: 277 },
  // The tall middle jet of the fountain: there in A, gone in B.
  { x: 1428, y: 1122, r: 189 },
  // The wicker basket under the hot-air balloon: there in A, gone in B (the ropes stay).
  { x: 1706, y: 452, r: 60 },
  // The rope halter on the camel's head: there in A, gone in B.
  { x: 1789, y: 1332, r: 103 },
  // The bunch of dates on the palm: there in A, gone in B.
  { x: 200, y: 624, r: 255 },
  // The thin antenna on the roof of the glass tower right of the red light: there in A, gone in B.
  { x: 919, y: 636, r: 60 },
]

export const level421Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-421-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-421-b-<n>.webp).
  imageB: 'levels/redesign/level-421-a.avif',
  patchesB: zonePatches('levels/redesign/level-421-b', differences, viewBox),
  viewBox,
  differences,
}
