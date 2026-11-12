import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 215 ("yardNight") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the front yard with
// the house and the garage on a sunny afternoon, B the same yard at night with its eight tiny differences; only one is
// a colour change. Gemini made the night, the attic window without its cross, the garage door without its lower
// groove, the weather vane without its rooster, the yellow mailbox flag and the pot with fewer flowers. Made by hand:
// the gnome's shovel, the bicycle's saddle and the cat's bell taken away, and the butterfly on the fence given back
// its pink (Gemini made it purple). B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The small round attic window: a white cross in A, one plain pane in B.
  { x: 705, y: 410, r: 79 },
  // The garage door's lower groove: there in A, gone in B.
  { x: 1540, y: 843, r: 152 },
  // The weather vane's little rooster: there in A, gone in B.
  { x: 1560, y: 420, r: 79 },
  // The mailbox's flag: red in A, yellow in B.
  { x: 600, y: 1095, r: 79 },
  // The flowers of the right pot: more in A, fewer in B.
  { x: 205, y: 940, r: 79 },
  // The gnome's tiny shovel: there in A, gone in B.
  { x: 1925, y: 1543, r: 79 },
  // The bicycle's saddle: there in A, gone in B.
  { x: 2457, y: 1223, r: 79 },
  // The little golden bell on the cat's collar: there in A, gone in B.
  { x: 1558, y: 1075, r: 79 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // The upper left window, lit at night.
  { x: 400, y: 735, r: 95, hint: 'lights' },
  // The porch light above the door, lit at night.
  { x: 705, y: 625, r: 60, hint: 'lights' },
  // The string of bulbs, lit at night.
  { x: 1900, y: 665, r: 60, hint: 'lights' },
  // The street lamp's head, lit at night.
  { x: 348, y: 975, r: 55, hint: 'lights' },
  // Stars in the sky.
  { x: 1250, y: 120, r: 100, hint: 'stars' },
  // The sun by day, the moon at night.
  { x: 2410, y: 170, r: 120, hint: 'moon' },
]

export const level215Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-215-a.avif',
  imageB: 'levels/redesign/level-215-b.avif',
  viewBox,
  differences,
  traps,
}
