import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// The bonus level 900 ("treasury") redrawn as two pictures (public/levels/redesign/, Gemini's 2612×1632), the zones
// measured on their pixel difference. 15 small differences, all still (pictures do not move: the swinging lantern, the
// running spider and the blinking sparkle of the drawn level become still changes). B is A with only these changes of
// Gemini's laid over it. Gemini made them in two edits (kit PROMPTS-900.md: B, then B2): it left the hourglass, the
// cork and the compass rose alone at first, then emptied the hourglass's upper bulb on the second edit. Fixed by hand:
// the blown-out candle kept a see-through ghost of its flame and the removed green pennant a faded ghost — both
// painted over with the wall beside them.
const viewBox = { w: 2612, h: 1632 }
const differences: Difference[] = [
  // The hanging lantern: its glass split by a dark bar (a strange thing inside) in A, one lit glass in B.
  { x: 1211, y: 301, r: 66 },
  // The cobweb in the top left corner: a black spider on its thread in A, only the thread in B.
  { x: 116, y: 278, r: 66 },
  // The hourglass on the upper shelf: sand in both bulbs in A, the upper one empty in B.
  { x: 463, y: 436, r: 66 },
  // The candle at the end of the upper shelf: lit in A, blown out in B.
  { x: 615, y: 400, r: 66 },
  // The pennant garland: a green pennant in A, gone in B.
  { x: 777, y: 178, r: 66 },
  // The ship on the map: a small front sail and a red flag in A, only the main sail in B.
  { x: 2000, y: 289, r: 66 },
  // The palm on the map's big island: more leaves in A, fewer in B.
  { x: 2171, y: 456, r: 76 },
  // The treasure island on the map: a red X in A, none in B.
  { x: 2412, y: 664, r: 66 },
  // The compass rose on the map: a red "N" over it in A, none in B.
  { x: 1901, y: 635, r: 66 },
  // The blue shield: a plain gold star in A, a red gem in the star in B.
  { x: 2019, y: 1028, r: 66 },
  // The crown on the coin heap: a red gem in its middle in A, a blue one in B.
  { x: 362, y: 1332, r: 66 },
  // The little goblet on the floor: a red gem on its cup in A, plain gold in B.
  { x: 688, y: 1420, r: 66 },
  // The big chest: a string of pearls hanging over its front in A, none in B.
  { x: 1095, y: 1140, r: 95 },
  // The coins on the floor: one stack in A, a taller one and a low one beside it in B.
  { x: 1730, y: 1482, r: 100 },
  // The padlock of the small chest: a keyhole in A, plain gold in B.
  { x: 2059, y: 1440, r: 66 },
]

export const level900Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-900-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-900-b-<n>.webp).
  imageB: 'levels/redesign/level-900-a.avif',
  patchesB: zonePatches('levels/redesign/level-900-b', differences, viewBox),
  viewBox,
  differences,
}
