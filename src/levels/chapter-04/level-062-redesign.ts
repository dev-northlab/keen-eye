import type { LevelPictures } from '../../engine/types.ts'

// Level 62 ("harbor") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the crane's hook turns
// red, the gull on the left post grey, the top crate of the two stacked on the left is gone, the orange cat's tail turns
// white, the coat of the fisherman in yellow blue, the anchor on the pier red, the red parts of the life ring on the
// warehouse yellow, a small blue flag flies on the red boat's mast and the red buoy on the right turns green. B is A with
// only these changes of Gemini's laid over it (the hook, the gull, the life ring, the anchor, the buoy); it also turned
// the red buoy under the pier yellow (left out) and left the rest undone, so four are done by hand on A's picture: the
// top crate painted out with the sky and sea beside it, the tail and the coat recoloured, and the flag laid on the mast
// (the blue sandcastle flag of level 61's picture, scaled).
export const level062Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-062-a.avif',
  imageB: 'levels/redesign/level-062-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The crane's hook: dark in A, red in B.
    { x: 2296, y: 642, r: 60 },
    // The gull on the left post: white in A, grey in B.
    { x: 490, y: 948, r: 60 },
    // The top crate of the two stacked on the left, only in A.
    { x: 198, y: 996, r: 66 },
    // The orange cat's tail: orange in A, white in B.
    { x: 1292, y: 1078, r: 60 },
    // The coat of the fisherman on the left: yellow in A, blue in B.
    { x: 1509, y: 991, r: 71 },
    // The anchor standing on the pier: dark in A, red in B.
    { x: 1960, y: 1056, r: 60 },
    // The red parts of the life ring on the warehouse wall: red in A, yellow in B.
    { x: 820, y: 1043, r: 60 },
    // A small blue flag on top of the red boat's mast, only in B.
    { x: 1779, y: 1238, r: 60 },
    // The buoy in the water on the right: red in A, green in B.
    { x: 2302, y: 1487, r: 111 },
  ],
}
