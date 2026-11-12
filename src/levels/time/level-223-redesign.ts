import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 223 ("orchardHives") as two pictures (public/levels/redesign/, Gemini's full 2752×1536): A the orchard with
// its hives in summer, B the same orchard in winter with its nine tiny differences; only one is a colour change.
// Gemini made the winter, the door without its knob, the birdhouse without its perch (a stub of it taken away by
// hand), the light blue middle hive, the scarecrow without its hat, the wheelbarrow without its spade and one picket
// gone from the fence. Made by hand: the ladder's second rung and the house's window taken away, the squirrel by the
// first tree too (instead of the barrel's hoop, which Gemini kept), and the flock in the middle of the sky. B is a
// whole picture: the seasons differ everywhere.
const viewBox = { w: 2752, h: 1536 }
const differences: Difference[] = [
  // The ladder's second rung from the top: there in A, gone in B.
  { x: 827, y: 845, r: 83 },
  // The farmhouse's window: there in A, plain wall in B.
  { x: 2125, y: 845, r: 106 },
  // The round brass knob of the door: there in A, gone in B.
  { x: 2385, y: 893, r: 83 },
  // The little perch under the birdhouse's hole: there in A, gone in B.
  { x: 2632, y: 815, r: 83 },
  // The middle beehive: yellow in A, light blue in B.
  { x: 560, y: 1290, r: 110 },
  // The scarecrow's straw hat: there in A, gone in B.
  { x: 1700, y: 924, r: 83 },
  // The spade in the wheelbarrow: there in A, gone in B.
  { x: 1480, y: 1280, r: 90 },
  // One picket of the fence: there in A, a gap in B.
  { x: 1868, y: 1340, r: 83 },
  // The squirrel by the first tree: there in A, gone in B.
  { x: 292, y: 1009, r: 83 },
]
// The natural changes of winter, in the drawn scene's order.
const traps: Trap[] = [
  // An apple tree: leaves and apples in summer, bare in winter.
  { x: 1090, y: 640, r: 140, hint: 'leaves' },
  // Icicles hanging from the house's eaves.
  { x: 2480, y: 735, r: 60, hint: 'icicles' },
  // Smoke from the chimney.
  { x: 2370, y: 300, r: 120, hint: 'smoke' },
  // The snowman.
  { x: 1410, y: 1100, r: 90, hint: 'snowman' },
  // The person: a T-shirt in summer, a winter coat in winter.
  { x: 1776, y: 1210, r: 60, hint: 'clothes' },
  // The flock in the middle of the sky, gone in winter.
  { x: 1660, y: 180, r: 110, hint: 'birds' },
]

export const level223Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-223-a.avif',
  imageB: 'levels/redesign/level-223-b.avif',
  viewBox,
  differences,
  traps,
}
