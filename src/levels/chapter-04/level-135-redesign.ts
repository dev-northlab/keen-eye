import type { LevelPictures } from '../../engine/types.ts'

// Level 135 ("stormLighthouse") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the right
// lightning bolt goes, so do the second railing post under the lantern room, the lit window in the middle of the
// tower, the top puff of the chimney's smoke and the weather vane's arrow; the lighthouse door turns green, the
// cottage's right window goes dark, a seagull flies between the bolts, the buoy's stripe turns red and a rock by the
// shore grows moss. B is A with only Gemini's window, door, smoke, cottage window and rock laid over it. Fixed by
// hand: Gemini's sky where it took the bolt away was darker than A's beam, so the bolt is painted out on A itself (each
// row of the beam and clouds carried across from beside it, A's grain kept, the bolt's warm glow cooled); it only
// blurred the railing post and kept the vane's arrow, so the post is painted out (sky carried across, the four rails
// redrawn) and the arrow too (the sky above and below carried across, the pole kept); it added no seagull, so A's
// lower seagull is copied there; it reshaped the buoy, so A's stripe is recoloured instead.
export const level135Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-135-a.avif',
  imageB: 'levels/redesign/level-135-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The right one of the two lightning bolts, only in A.
    { x: 1060, y: 320, r: 134 },
    // The second post from the left of the railing under the lantern room, only in A.
    { x: 1728, y: 332, r: 73 },
    // The small lit window in the middle of the tower, only in A.
    { x: 1800, y: 700, r: 73 },
    // The lighthouse's arched door: blue in A, green in B.
    { x: 1808, y: 1124, r: 73 },
    // The top puff of smoke above the cottage chimney, only in A.
    { x: 2224, y: 664, r: 76 },
    // The arrow of the weather vane on the cottage roof, only in A.
    { x: 2036, y: 888, r: 73 },
    // The cottage's right window: lit in A, dark in B.
    { x: 2240, y: 1076, r: 73 },
    // The seagull below the light beam between the bolts, only in B.
    { x: 780, y: 588, r: 73 },
    // The stripe of the yellow buoy: white in A, red in B.
    { x: 1228, y: 1292, r: 73 },
    // The rock by the shore: grey in A, green with moss in B.
    { x: 2280, y: 1376, r: 156 },
  ],
}
