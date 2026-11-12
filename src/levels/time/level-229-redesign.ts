import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 229 ("cableCar") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the alpine resort with
// its cable car in summer, B the same valley in winter with its ten tiny differences; only one is a colour change.
// Gemini made the winter, the teal middle cabin and the plain sign board; it left the rest. Made by hand: the right
// cabin's window, the chalet's right window (a board of the wall repeated over it), the door's knob, the vane's
// arrowhead, the top right log, the birdhouse's perch and the signpost's tip taken away, and the bucket by the pond
// (instead of the bench's armrest: Gemini drew the bench without armrests). The lavender left in bloom is frosted over.
// B is a whole picture: the seasons differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The middle cable-car cabin: red in A, teal in B.
  { x: 1311, y: 640, r: 79 },
  // The right cabin's window: there in A, a plain yellow side in B.
  { x: 2232, y: 776, r: 79 },
  // The chalet's right window: there in A, plain boards in B.
  { x: 555, y: 1135, r: 100 },
  // The brass knob of the chalet's door: there in A, gone in B.
  { x: 826, y: 1264, r: 79 },
  // The white stripe on the sign board: there in A, a plain board in B.
  { x: 592, y: 906, r: 90 },
  // The weather vane's arrowhead: there in A, gone in B.
  { x: 648, y: 645, r: 79 },
  // The top right log of the stack: there in A, gone in B.
  { x: 1162, y: 1266, r: 79 },
  // The little perch under the birdhouse's hole: there in A, gone in B.
  { x: 1376, y: 1140, r: 79 },
  // The signpost's arrow: a pointed tip in A, cut flat in B.
  { x: 1626, y: 1362, r: 79 },
  // The bucket by the pond: there in A, gone in B.
  { x: 1246, y: 1554, r: 79 },
]
// The natural changes of winter, in the drawn scene's order.
const traps: Trap[] = [
  // Smoke from the chimney.
  { x: 830, y: 540, r: 100, hint: 'smoke' },
  // Icicles hanging from the chalet's roof.
  { x: 236, y: 960, r: 60, hint: 'icicles' },
  // The oak: green in summer, bare in winter.
  { x: 1975, y: 900, r: 130, hint: 'leaves' },
  // The pond, frozen in winter.
  { x: 970, y: 1535, r: 90, hint: 'ice' },
  // The person: a T-shirt in summer, a coat and a hat in winter.
  { x: 2430, y: 1400, r: 80, hint: 'clothes' },
  // The lavender, frosted over in winter.
  { x: 200, y: 1530, r: 80, hint: 'flowers' },
]

export const level229Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-229-a.avif',
  imageB: 'levels/redesign/level-229-b.avif',
  viewBox,
  differences,
  traps,
}
