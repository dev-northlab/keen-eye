import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 208 ("snowForest") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the log cabin in
// summer, B the same clearing in winter with its six differences; only one is a colour change. Gemini made the winter
// and the blue door but skipped the rest, so they are made by hand: the left shutter (plain log wall laid over it),
// the birdhouse's perch, the signpost's lower board (the post continued), the axe in the stump and the pine cone
// right of the grey rock (Gemini drew no pebble there) are cloned away. It also greyed the squirrel's fur, so A's fur
// colour is laid back on B's brightness. B is a whole picture: the seasons differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The cabin window's left shutter: there in A, gone in B.
  { x: 649, y: 990, r: 79 },
  // The cabin's door: dark brown in A, blue in B.
  { x: 938, y: 1055, r: 130 },
  // The perch under the birdhouse's hole: there in A, gone in B.
  { x: 1380, y: 1060, r: 79 },
  // The signpost's lower arrow board: there in A, gone in B.
  { x: 1785, y: 1144, r: 80 },
  // The axe in the stump by the cabin: there in A, gone in B.
  { x: 1242, y: 1136, r: 73 },
  // The pine cone right of the grey rock: there in A, gone in B.
  { x: 1101, y: 1398, r: 79 },
]
// The natural changes of winter, in the drawn scene's order.
const traps: Trap[] = [
  // Smoke from the chimney in winter.
  { x: 1030, y: 400, r: 150, hint: 'smoke' },
  // The big pine at the left, heavy with snow.
  { x: 230, y: 700, r: 200, hint: 'snow' },
  // The oak: green in summer, frosted in winter.
  { x: 2000, y: 650, r: 230, hint: 'leaves' },
  // The pond, frozen in winter.
  { x: 2230, y: 1420, r: 160, hint: 'ice' },
  // The flowers in front of the cabin, gone under the snow.
  { x: 630, y: 1400, r: 100, hint: 'flowers' },
]

export const level208Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-208-a.avif',
  imageB: 'levels/redesign/level-208-b.avif',
  viewBox,
  differences,
  traps,
}
