import type { LevelPictures } from '../../engine/types.ts'

// Level 10 ("pasture") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel difference.
// The drawn scene's differences made smaller: the vane loses its arrow, the door one board of its cross, the milk
// can its lid, a cow one spot, and the other cow gets an ear tag instead of turning round. Gemini left the can's lid
// on and laid a second one on the grass, added a can and a basket handle; B got the can opened by hand (the lid on
// the grass stays, as the one taken off) and the rest back from A.
export const level010Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-010-a.avif',
  imageB: 'levels/redesign/level-010-b.avif',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // The weathervane's arrow, only in A.
    { x: 1026, y: 120, r: 60 },
    // One diagonal board of the cross on the barn door, only in A.
    { x: 1028, y: 515, r: 88 },
    // The middle milk can: closed in A, open with its lid on the grass in B.
    { x: 210, y: 742, r: 66 },
    // A big black spot on the left cow's side, only in A.
    { x: 320, y: 643, r: 46 },
    // A yellow tag in the middle cow's ear, only in B.
    { x: 801, y: 640, r: 40 },
  ],
}
