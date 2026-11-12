import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 227 ("farmyardSeasons") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the farmyard
// with its red barn in summer, B the same yard in winter with its ten tiny differences; only one is a colour change.
// Gemini made the winter, the barn door with one bar, the hayloft window and the vane's arrowhead gone, the light blue
// kennel and one picket gone; it took the combs off both hens, so the first hen's is laid back from A. Made by hand:
// the farmhouse's right window, the sheep's bell and the tractor's exhaust pipe taken away. Also by hand: the right
// sparrow on the snow. B is a whole picture: the seasons differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The barn door's X: two white bars in A, one in B.
  { x: 460, y: 935, r: 100 },
  // The barn's hayloft window: there in A, plain boards in B.
  { x: 458, y: 494, r: 79 },
  // The weather vane's arrowhead: there in A, gone in B.
  { x: 510, y: 250, r: 79 },
  // The farmhouse's right window: there in A, plain wall in B.
  { x: 2300, y: 748, r: 95 },
  // The dog kennel: yellow in A, light blue in B.
  { x: 1083, y: 995, r: 90 },
  // The red comb of the second hen: there in A, gone in B.
  { x: 1250, y: 1218, r: 79 },
  // The sheep's golden bell: there in A, gone in B.
  { x: 1912, y: 1348, r: 79 },
  // The tractor's exhaust pipe: there in A, gone in B.
  { x: 2196, y: 1200, r: 79 },
  // One picket of the fence: there in A, a gap in B.
  { x: 510, y: 1450, r: 79 },
  // The right sparrow on the snow: there in A, gone in B.
  { x: 470, y: 1262, r: 79 },
]
// The natural changes of winter, in the drawn scene's order.
const traps: Trap[] = [
  // Icicles hanging from the farmhouse's roof.
  { x: 2040, y: 625, r: 60, hint: 'icicles' },
  // Smoke from the chimney.
  { x: 2300, y: 260, r: 110, hint: 'smoke' },
  // The oak: green in summer, bare in winter.
  { x: 1430, y: 700, r: 150, hint: 'leaves' },
  // The sunflowers, gone in winter.
  { x: 1720, y: 860, r: 80, hint: 'flowers' },
  // The hay bale, snowed on in winter.
  { x: 820, y: 1170, r: 90, hint: 'snow' },
  // The muddy puddle, frozen in winter.
  { x: 1450, y: 1470, r: 110, hint: 'ice' },
]

export const level227Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-227-a.avif',
  imageB: 'levels/redesign/level-227-b.avif',
  viewBox,
  differences,
  traps,
}
