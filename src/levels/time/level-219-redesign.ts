import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 219 ("lakeCottage") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the red cottage by
// the forest lake in summer, B the same shore in winter with its eight tiny differences; only one is a colour change.
// Gemini made the winter, the teal canoe and the buoy without its flag; it also made the buoy all white, so A's buoy
// is laid back with its red bands. Made by hand: the right window's vertical bar, what was left of the horseshoe, the
// vane's feathered tail, the dog bowl and the coiled rope taken away, and the little wooden post by the path (instead
// of the picnic table's front bench, which carries the table's brackets); Gemini's flock of birds taken away too.
// B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The right window's white cross: a vertical bar in A, only the horizontal one in B.
  { x: 705, y: 910, r: 79 },
  // The small horseshoe above the front door: there in A, gone in B.
  { x: 562, y: 806, r: 79 },
  // The weather vane's upper arrow: a feathered tail in A, none in B.
  { x: 527, y: 370, r: 79 },
  // The round metal dog bowl in front of the kennel: there in A, gone in B.
  { x: 888, y: 1100, r: 79 },
  // The tiny red flag on top of the buoy: there in A, gone in B.
  { x: 1510, y: 790, r: 79 },
  // The coiled rope on the pier: there in A, gone in B.
  { x: 1452, y: 1013, r: 79 },
  // The canoe: red in A, teal in B.
  { x: 1690, y: 1120, r: 120 },
  // The little wooden post by the path: there in A, gone in B.
  { x: 732, y: 1195, r: 79 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // Smoke from the chimney in winter.
  { x: 590, y: 110, r: 85, hint: 'smoke' },
  // The lake, frozen in winter.
  { x: 1100, y: 850, r: 120, hint: 'ice' },
  // The two ducks on the lake, gone in winter.
  { x: 1700, y: 945, r: 50, hint: 'birds' },
  // The oak, bare in winter.
  { x: 2350, y: 700, r: 200, hint: 'leaves' },
  // A snowman in winter.
  { x: 1200, y: 1210, r: 70, hint: 'snowman' },
  // The person in a T-shirt in summer, a winter coat in winter.
  { x: 1345, y: 1240, r: 65, hint: 'clothes' },
]

export const level219Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-219-a.avif',
  imageB: 'levels/redesign/level-219-b.avif',
  viewBox,
  differences,
  traps,
}
