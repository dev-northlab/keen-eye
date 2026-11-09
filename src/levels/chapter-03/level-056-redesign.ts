import type { LevelPictures } from '../../engine/types.ts'

// Level 56 ("woodpecker") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): two
// leaves at the tip of the left branch turn orange, the bird on the right branch yellow, the squirrel in the hollow
// grey, the woodpecker gets a red patch on the back of its head, the lowest of the three shelf mushrooms at the foot
// of the trunk is gone, the hanging spider turns red, a small hazelnut lies on the grass at the bottom left and the
// red beetle loses its black dots. B is A with only these changes of Gemini's laid over it (the bird, the squirrel,
// the spider); it also hung three new orange leaves in the sky, took away the blue bird under the branch, redrew the
// woodpecker's crown and added a big ladybird (all left out), so five are done by hand on A's picture: the leaves
// and the patch recoloured, the mushroom painted out with the trunk and grass below it, the dots filled with the
// beetle's red, the nut made of the acorn beside it with a pale scar on top.
export const level056Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-056-a.webp',
  imageB: 'levels/redesign/level-056-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // Two leaves at the tip of the left branch: green in A, orange in B.
    { x: 688, y: 316, r: 63 },
    // The bird on the right branch: blue in A, yellow in B.
    { x: 1692, y: 464, r: 60 },
    // The squirrel peeking out of the hollow: red in A, grey in B.
    { x: 1318, y: 1059, r: 95 },
    // A red patch on the back of the woodpecker's head, only in B.
    { x: 1485, y: 630, r: 60 },
    // The lowest shelf mushroom of the three at the foot of the trunk, only in A.
    { x: 1548, y: 1322, r: 60 },
    // The spider hanging on its thread: black in A, red in B.
    { x: 1766, y: 726, r: 60 },
    // A small hazelnut on the grass at the bottom left, only in B.
    { x: 644, y: 1602, r: 60 },
    // The black dots of the red beetle, only in A.
    { x: 1695, y: 1544, r: 60 },
  ],
}
