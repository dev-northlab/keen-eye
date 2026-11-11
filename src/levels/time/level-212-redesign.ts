import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 212 ("farmYear") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the farmstead with the
// windmill in summer, B the same farm in winter with its seven differences; only one is a colour change. Gemini made
// the winter, the missing windmill, attic and door windows and the blue well roof. Made by hand: a picket of the fence
// (one with no flowers in front of it), the birdhouse's round hole and the barrel's middle hoop taken away. B is a
// whole picture: the seasons differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The small round window of the windmill's tower: there in A, plain wall in B.
  { x: 2106, y: 748, r: 79 },
  // The small attic window in the farmhouse roof: there in A, gone in B.
  { x: 354, y: 551, r: 79 },
  // The small window in the blue front door: there in A, plain door in B.
  { x: 816, y: 853, r: 79 },
  // The well's roof: red-brown in A, blue in B.
  { x: 1732, y: 840, r: 110 },
  // A picket in the middle of the fence: there in A, a gap in B.
  { x: 965, y: 1387, r: 180 },
  // The birdhouse's round entrance hole: there in A, plain wall in B.
  { x: 2452, y: 963, r: 79 },
  // The barrel's middle hoop: there in A, gone in B.
  { x: 2335, y: 1325, r: 110 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // Icicles under the farmhouse roof.
  { x: 620, y: 700, r: 70, hint: 'icicles' },
  // Smoke from the chimney in winter.
  { x: 850, y: 230, r: 100, hint: 'smoke' },
  // The apple tree: leaves and apples in summer, bare in winter.
  { x: 1330, y: 640, r: 130, hint: 'leaves' },
  // The pond, frozen in winter.
  { x: 1650, y: 1300, r: 220, hint: 'ice' },
  // The poppies and cornflowers, gone under the snow.
  { x: 300, y: 1500, r: 110, hint: 'flowers' },
  // The snowman in front of the farmhouse.
  { x: 696, y: 1018, r: 90, hint: 'snowman' },
]

export const level212Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-212-a.avif',
  imageB: 'levels/redesign/level-212-b.avif',
  viewBox,
  differences,
  traps,
}
