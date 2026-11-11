import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 214 ("forestYear") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the log cabin by the
// river in summer, B the same clearing in winter with its eight tiny differences; only one is a colour change.
// Gemini made the winter, the light blue birdhouse, the door without its handle and the rock without its pebble; it
// left the rest. Made by hand: the bridge's second railing post, the window's horizontal bar, the signpost arrow's
// tip, the stump's branch stub and the bench's back plank taken away, and a blue bird Gemini put on the chimney.
// B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The footbridge's second railing post from the left: there in A, gone in B.
  { x: 1262, y: 1217, r: 82 },
  // The cabin window's white cross: a horizontal bar in A, only the vertical one in B.
  { x: 1987, y: 835, r: 79 },
  // The cabin door's round metal handle: there in A, gone in B.
  { x: 2148, y: 908, r: 79 },
  // The birdhouse: yellow in A, light blue in B.
  { x: 1542, y: 880, r: 79 },
  // The signpost's arrow board: a pointed tip in A, cut flat in B.
  { x: 114, y: 1370, r: 79 },
  // The tree stump's broken branch stub: there in A, gone in B.
  { x: 1190, y: 1487, r: 79 },
  // The small round pebble on top of the grey rock: there in A, gone in B.
  { x: 1704, y: 1500, r: 79 },
  // The bench's upper back plank: there in A, only the seat in B.
  { x: 2040, y: 1463, r: 115 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // The river, frozen in winter.
  { x: 850, y: 1240, r: 90, hint: 'ice' },
  // Smoke from the cabin's chimney in winter.
  { x: 2180, y: 300, r: 120, hint: 'smoke' },
  // The big pine at the right, heavy with snow.
  { x: 2460, y: 700, r: 150, hint: 'snow' },
  // The oak, bare in winter.
  { x: 420, y: 800, r: 140, hint: 'leaves' },
  // The daisies by the river, gone under the snow.
  { x: 1750, y: 1110, r: 90, hint: 'flowers' },
]

export const level214Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-214-a.avif',
  imageB: 'levels/redesign/level-214-b.avif',
  viewBox,
  differences,
  traps,
}
