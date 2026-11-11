import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 217 ("mountainVillage") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the alpine
// chalet in summer, B the same village in winter with its eight differences; only one is a colour change. Gemini made
// the winter, the yellow mailbox, the door without its knocker, the vane without its arrowheads, the birdhouse without
// its perch, the signpost without its lower board, and it took away the wooden crate (kept as a difference: the bench
// had no armrests to take). Made by hand: the left window's left shutter and the attic window's vertical bar taken
// away, and what Gemini added: a stack of logs, a pigeon and the flocks in the sky. B is a whole picture: the moments
// differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The left window's left green shutter: there in A, plain wall in B.
  { x: 765, y: 966, r: 88 },
  // The attic window's white cross: a vertical bar in A, only the horizontal one in B.
  { x: 1057, y: 618, r: 79 },
  // The weather vane: arrowheads in A, plain ends in B.
  { x: 1110, y: 320, r: 95 },
  // The front door's round brass knocker: there in A, gone in B.
  { x: 1063, y: 968, r: 79 },
  // The mailbox: red in A, yellow in B.
  { x: 450, y: 1110, r: 79 },
  // The little perch stick under the birdhouse's hole: there in A, gone in B.
  { x: 1590, y: 984, r: 79 },
  // The signpost's lower arrow board: there in A, gone in B.
  { x: 2410, y: 1165, r: 90 },
  // The small wooden crate on the meadow: there in A, gone in B.
  { x: 1570, y: 1300, r: 79 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // Icicles hanging from the roof's eaves in winter.
  { x: 540, y: 820, r: 60, hint: 'icicles' },
  // Smoke from the chimney in winter.
  { x: 760, y: 250, r: 100, hint: 'smoke' },
  // The meadow's flowers, gone under the snow.
  { x: 1680, y: 1480, r: 90, hint: 'flowers' },
  // The person in a T-shirt in summer, a winter coat in winter.
  { x: 995, y: 1310, r: 75, hint: 'clothes' },
  // A snowman in winter.
  { x: 1690, y: 1150, r: 75, hint: 'snowman' },
  // The mountain peaks, white with snow in winter.
  { x: 1700, y: 160, r: 120, hint: 'snow' },
]

export const level217Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-217-a.avif',
  imageB: 'levels/redesign/level-217-b.avif',
  viewBox,
  differences,
  traps,
}
