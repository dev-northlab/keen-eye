import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 221 ("constructionSite") as two pictures (public/levels/redesign/, Gemini's full 2752×1536): A the building
// site in summer, B the same site in winter with its nine tiny differences; only one is a colour change. Gemini made
// the winter, the bricks gone from the crane's hook, the jib's red light and the bucket on the scaffold gone and the
// blue stripes of the mixer. Made by hand: the office's left window, the excavator bucket's teeth, the shovel in the
// sand pile and the bulldozer's exhaust pipe taken away, and the dump truck's sand heap made lower (Gemini only put
// snow on it: each column squashed down to the rim, the snow behind it filled in). Gemini also took away the
// two sparrows on the bricks (laid back from A, so they are no difference) and the butterfly (gone in winter, like
// the drawn scene's summer-only butterfly: a natural change, not a trap). B is a whole picture: the seasons
// differ everywhere.
const viewBox = { w: 2752, h: 1536 }
const differences: Difference[] = [
  // The pallet of bricks on the crane's hook: there in A, an empty hook in B.
  { x: 1114, y: 590, r: 83 },
  // The small red light on the crane's jib tip: there in A, gone in B.
  { x: 548, y: 84, r: 83 },
  // The bucket on the top scaffold floor: there in A, gone in B.
  { x: 1460, y: 460, r: 83 },
  // The site office's left window: there in A, plain wall in B.
  { x: 2073, y: 757, r: 83 },
  // The excavator bucket's teeth: there in A, a plain edge in B.
  { x: 735, y: 1015, r: 83 },
  // The sand in the dump truck: a tall heap in A, lower in B.
  { x: 1080, y: 935, r: 110 },
  // The mixer drum's stripes: orange in A, blue in B.
  { x: 1790, y: 1010, r: 100 },
  // The shovel in the sand pile: there in A, gone in B.
  { x: 2322, y: 935, r: 83 },
  // The bulldozer's exhaust pipe: there in A, gone in B.
  { x: 590, y: 1188, r: 83 },
]
// The natural changes of winter, in the drawn scene's order.
const traps: Trap[] = [
  // The worker: a shirt and a hard hat in summer, a coat and a knitted hat in winter.
  { x: 1100, y: 1390, r: 85, hint: 'clothes' },
  // The snowman.
  { x: 1850, y: 1310, r: 90, hint: 'snowman' },
  // The tree at the right: green in summer, bare in winter.
  { x: 2570, y: 600, r: 150, hint: 'leaves' },
  // Icicles hanging from the scaffold.
  { x: 1560, y: 740, r: 80, hint: 'icicles' },
  // Smoke from the office's chimney pipe.
  { x: 1990, y: 400, r: 100, hint: 'smoke' },
]

export const level221Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-221-a.avif',
  imageB: 'levels/redesign/level-221-b.avif',
  viewBox,
  differences,
  traps,
}
