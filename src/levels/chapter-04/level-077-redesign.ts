import type { LevelPictures } from '../../engine/types.ts'

// Level 77 ("ice floes") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): a small orange fish
// in the beak of the penguin lying on its belly, a red scarf on the middle standing penguin, a blue knitted hat on the
// right one, the polar bear's ears turn dark brown, the seal's raised flipper black, the small grey fish right of the
// seal's head is gone, a red flag stands on the small floe at the bottom right, the grey fish at the left turns orange,
// a small grey fish swims right of the lower-left life ring and the piece of ice floating alone on the right is gone.
// B is A with only these changes laid over it. Fixed by hand: Gemini drew a big black blob in place of the seal's
// flipper, so A's own flipper is painted black; the scarf's red reflection in the water is left out.
export const level077Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-077-a.avif',
  imageB: 'levels/redesign/level-077-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // A small orange fish in the beak of the penguin lying on its belly, only in B.
    { x: 587, y: 1064, r: 60 },
    // A red scarf on the middle standing penguin, only in B.
    { x: 1114, y: 1028, r: 60 },
    // A blue knitted hat on the right standing penguin, only in B.
    { x: 1377, y: 975, r: 60 },
    // The polar bear's ears: white in A, dark brown in B.
    { x: 323, y: 985, r: 60 },
    // The seal's raised front flipper: grey in A, black in B.
    { x: 1811, y: 1253, r: 60 },
    // The small grey fish right of the seal's head, only in A.
    { x: 2080, y: 1238, r: 60 },
    // A red flag on the small ice floe at the bottom right, only in B.
    { x: 2428, y: 1386, r: 110 },
    // The fish at the left, above the lower-left life ring: grey in A, orange in B.
    { x: 380, y: 1372, r: 66 },
    // A small grey fish right of the lower-left life ring, only in B.
    { x: 980, y: 1518, r: 60 },
    // The small piece of ice floating alone on the right, only in A.
    { x: 2425, y: 997, r: 84 },
  ],
}
