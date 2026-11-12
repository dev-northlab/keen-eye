import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 228 ("seaPromenade") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the seaside
// promenade on a sunny afternoon, B the same promenade at night with its ten tiny differences; only one is a colour
// change. Gemini made the night, the sailboat's flag and the buoy's light gone, the green towel, the cart's picture and
// the bin's lid gone. Made by hand: the parasol's knob, the coffee cup, the dog's collar and the bicycle's basket taken
// away; Gemini also added a second string of bulbs over the deck at the right, taken away too (A's deck laid in,
// colours fitted to the night). Also by hand: the small pink starfish on the sand. B is a whole picture: the moments
// differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The red flag on the white sailboat's mast: there in A, gone in B.
  { x: 680, y: 722, r: 79 },
  // The yellow light on top of the red and white buoy: there in A, gone in B.
  { x: 1376, y: 925, r: 79 },
  // The striped beach towel: blue in A, green in B.
  { x: 982, y: 1210, r: 100 },
  // The knob on the pink parasol's top: there in A, gone in B.
  { x: 1643, y: 1056, r: 79 },
  // The coffee cup on the right café table: there in A, gone in B.
  { x: 952, y: 1428, r: 79 },
  // The ice cream picture on the cart's front: there in A, gone in B.
  { x: 2040, y: 1498, r: 79 },
  // The green bin's lid: there in A, gone in B.
  { x: 2362, y: 1350, r: 79 },
  // The dog's red collar: there in A, gone in B.
  { x: 1418, y: 1528, r: 79 },
  // The bicycle's basket: there in A, gone in B.
  { x: 1772, y: 1472, r: 79 },
  // The small pink starfish on the sand: there in A, gone in B.
  { x: 732, y: 1280, r: 79 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // The string of bulbs along the promenade, lit at night.
  { x: 560, y: 1380, r: 55, hint: 'lights' },
  // The left street lamp, lit at night.
  { x: 130, y: 1238, r: 60, hint: 'lights' },
  // The right street lamp, lit at night.
  { x: 2492, y: 1238, r: 60, hint: 'lights' },
  // The moonlight on the sea.
  { x: 2330, y: 830, r: 110, hint: 'moon' },
  // Stars in the sky.
  { x: 1350, y: 170, r: 90, hint: 'stars' },
  // The sun by day, the moon at night.
  { x: 2230, y: 224, r: 150, hint: 'moon' },
]

export const level228Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-228-a.avif',
  imageB: 'levels/redesign/level-228-b.avif',
  viewBox,
  differences,
  traps,
}
