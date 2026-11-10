import type { LevelPictures } from '../../engine/types.ts'

// Level 94 ("crystalCave") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the yellow
// star in the opening goes, the rightmost stalactite goes, the pink cluster on the back wall turns green, the bat
// purple, the big floor cluster's middle point purple, the left mushroom's cap orange, the miner gets two small eyes,
// the pickaxe loses its head, the gold nuggets turn grey and the cart's body red. B is A with only these changes of
// Gemini's laid over it. Fixed by hand: Gemini only darkened the pickaxe head, so it is painted out on A with the dark
// rock round it and the handle carried up; it drew new stones in place of the nuggets and dropped the pink sprout, so
// A's nuggets are turned grey instead; it redrew the cart's ore, so A's cart body is tinted red (gold and wheels
// kept); A's eye of the miner is filled with its face and only Gemini's two eyes laid on (its flat mouth left out).
export const level094Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-094-a.webp',
  imageB: 'levels/redesign/level-094-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The small yellow star in the night sky of the ceiling opening, only in A.
    { x: 1246, y: 92, r: 60 },
    // The rightmost stalactite at the right, only in A.
    { x: 2404, y: 392, r: 190 },
    // The three-pointed crystal cluster on the back wall at the upper right: pink in A, green in B.
    { x: 2040, y: 532, r: 80 },
    // The bat in the middle: black in A, purple in B.
    { x: 1572, y: 488, r: 60 },
    // The tallest middle point of the big glowing crystal cluster: light blue in A, purple in B.
    { x: 532, y: 1168, r: 135 },
    // The cap of the left mushroom: green in A, orange in B.
    { x: 210, y: 1404, r: 80 },
    // The green miner: one big eye in A, two smaller ones in B.
    { x: 824, y: 1438, r: 60 },
    // The head of the pickaxe, only in A.
    { x: 686, y: 1428, r: 60 },
    // The pile of nuggets on the floor: gold in A, grey stones in B.
    { x: 1082, y: 1504, r: 116 },
    // The mine cart's body: grey in A, red in B.
    { x: 2134, y: 1375, r: 195 },
  ],
}
