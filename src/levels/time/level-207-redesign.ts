import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 207 ("snowStreet") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the bakery street
// in summer, B the same street in winter with its six differences, both made by Gemini; only one is a colour change.
// Fixed by hand: Gemini took away the cats' window of the green house's second row (kept as the difference) and also
// the window below it, so that one is laid back from A with its colours fitted to winter, its snowy flower box taken
// from the window beside it and the bare tree's branches kept in front; it left the hydrant's side cap and the
// bicycle's basket, so both are cloned away. Its golden "key" by the passer-by's legs was a shapeless lump, and the
// blocky passer-by in the teal coat did not fit the scene: both are taken away from both pictures (the lilac house's
// next window column laid over them). The category's key is laid over the pictures as its own image (level 48's key,
// mirrored and scaled) behind the left flower pot, its blade hidden by the pot. The summer passer-by in the pink
// T-shirt is made smaller (82 %, the shop window behind him from the next shelf section). B is a whole picture: the
// seasons differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The window with the cats in the green house's second row: there in A, plain wall in B.
  { x: 532, y: 512, r: 79 },
  // The bakery's blue door: a small round window in A, none in B.
  { x: 1523, y: 970, r: 79 },
  // The hanging sign: a loaf of bread in A, a fish in B.
  { x: 1726, y: 680, r: 79 },
  // The fire hydrant: a round cap on its side in A, none in B.
  { x: 377, y: 1083, r: 79 },
  // The yellow bicycle: a wicker basket on its handlebar in A, none in B.
  { x: 1365, y: 1042, r: 79 },
  // The bin by the bakery: green in A, orange in B.
  { x: 1831, y: 1085, r: 79 },
]
// The natural changes of winter, in the drawn scene's order.
const traps: Trap[] = [
  // Icicles under the bakery's awning.
  { x: 1120, y: 855, r: 85, hint: 'icicles' },
  // The street tree: leafy in summer, bare in winter.
  { x: 650, y: 900, r: 120, hint: 'leaves' },
  // The person by the shop window: a T-shirt in summer, a winter coat in winter.
  { x: 1052, y: 1030, r: 90, hint: 'clothes' },
  // Snow on the red car.
  { x: 2390, y: 1250, r: 140, hint: 'snow' },
]

export const level207Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-207-a.avif',
  imageB: 'levels/redesign/level-207-b.avif',
  viewBox,
  differences,
  traps,
  // The category's key on the ground behind the left flower pot, its blade hidden by the pot.
  secret: {
    x: 1962,
    y: 1122,
    r: 28,
    on: 'both',
    image: { href: 'levels/redesign/level-207-key.webp', x: 1916, y: 1104, w: 61, h: 38 },
  },
}
