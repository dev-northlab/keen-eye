import type { LevelPictures } from '../../engine/types.ts'

// Level 20 ("stable") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. The drawn scene's differences, smaller where they can be: the weathervane, which turns
// the other way in the drawn scene, loses its arrow's right arrowhead; the paddock horse's tail, which swings faster
// in the drawn scene, turns blond instead (pictures do not move); the horse in the window, the horseshoe, the cart
// and the brown hen as drawn (one of the hen's colour instead of the hen gone). Touched up by hand: Gemini redrew
// the grass, the tree and the wood textures and kept the arrowhead, so B is A with only Gemini's horse, door, cart,
// tail and hen laid over it, and the arrowhead painted over with the sky above it.
export const level020Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-020-a.webp',
  imageB: 'levels/redesign/level-020-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The right arrowhead of the weathervane's arrow, only in A.
    { x: 1056, y: 384, r: 60 },
    // The horse looking out of the stable window: brown in A, black in B.
    { x: 615, y: 864, r: 120 },
    // The horseshoe on the stable door, only in A.
    { x: 981, y: 847, r: 60 },
    // The hay cart's box: wooden in A, blue in B.
    { x: 1847, y: 1084, r: 160 },
    // The paddock horse's tail: black in A, blond in B.
    { x: 1956, y: 1434, r: 105 },
    // The brown hen: brown in A, black in B.
    { x: 1185, y: 1418, r: 120 },
  ],
}
