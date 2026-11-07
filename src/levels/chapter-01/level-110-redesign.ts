import type { LevelPictures } from '../../engine/types.ts'

// Level 110 ("lanternNight") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. The drawn scene's differences, smaller where they can be: the porch lantern,
// which swings in the drawn scene, is turned off, and the firefly right of the doghouse, which blinks, is gone
// (pictures do not move); the star left of the moon is gone; a bat is added; the upper left window's light turns
// orange; the striped shirt turns green; the weathervane loses its arrow instead of turning; the middle pumpkin turns
// pale instead of growing; the mailbox's flag turns yellow instead of flipping; the cat turns grey instead of
// moving. Touched up by hand: B is A with only Gemini's star, bat, window, lantern, shirt, pumpkin, flag and cat laid
// over it. Gemini also took two stars at the top left away and changed a flower by the porch (those stay as in A),
// left a small flame in the lantern, kept the weathervane's arrow (adding a scroll under it) and the firefly: the
// flame is darkened, the arrow painted out with the sky and trees around it (rooster and pole kept), and the firefly
// with the ground beside it.
export const level110Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-110-a.webp',
  imageB: 'levels/redesign/level-110-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The small bright star just left of the moon, only in A.
    { x: 1690, y: 283, r: 73 },
    // A bat above the left part of the barn roof, only in B.
    { x: 1917, y: 442, r: 73 },
    // The light in the house's upper left window: yellow in A, orange in B.
    { x: 564, y: 663, r: 73 },
    // The lantern on the porch: lit in A, off in B.
    { x: 1150, y: 940, r: 110 },
    // The striped shirt on the clothesline: blue in A, green in B.
    { x: 1532, y: 871, r: 73 },
    // The weathervane's arrow, only in A.
    { x: 2119, y: 476, r: 73 },
    // The middle pumpkin by the barn: orange in A, pale white in B.
    { x: 2374, y: 1141, r: 78 },
    // The mailbox's flag: red in A, yellow in B.
    { x: 1401, y: 1152, r: 73 },
    // The firefly right of the doghouse, only in A.
    { x: 623, y: 1242, r: 73 },
    // The cat by the fence: black in A, grey in B.
    { x: 1929, y: 1208, r: 94 },
  ],
}
