import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 406 ("greatWall") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): a battlement tooth, the left tower's left window,
// the magpie, the hiker's sun hat, the lantern, the kite's bows, the small pine, the peach blossoms. Gemini also redrew
// the wall's bricks and the grass everywhere: B is A with only the listed changes of Gemini's laid over it. It kept every
// battlement tooth: one is taken away by hand on A's picture (the sky filled smoothly, the parapet's dark top edge
// carried along its slope from the gap beside it). B is its own picture, whole: Gemini's hill behind the magpie came out
// a shade darker, below a cut-out's threshold, so a cut-out would lay only the bird's outline on A's hill, a dark ghost.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // One battlement tooth on the wall left of the left tower: there in A, gone in B.
  { x: 530, y: 842, r: 73 },
  // The left one of the left tower's two arched windows: there in A, gone in B.
  { x: 744, y: 660, r: 73 },
  // The magpie on the wall: there in A, gone in B.
  { x: 1094, y: 789, r: 76 },
  // The yellow sun hat of the hiker in the green jacket: there in A, gone in B.
  { x: 1446, y: 862, r: 73 },
  // The paper lantern on the right tower: red in A, yellow in B.
  { x: 2082, y: 536, r: 73 },
  // The two yellow bows on the kite's tail: there in A, gone in B.
  { x: 2416, y: 488, r: 107 },
  // The small pine on the near hill: there in A, gone in B.
  { x: 2090, y: 1252, r: 148 },
  // The pink blossoms of the peach tree: there in A, a green tree in B.
  { x: 420, y: 1315, r: 237 },
]

export const level406Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-406-a.avif',
  imageB: 'levels/redesign/level-406-b.avif',
  viewBox,
  differences,
}
