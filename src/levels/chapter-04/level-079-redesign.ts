import type { LevelPictures } from '../../engine/types.ts'

// Level 79 ("sea market") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the fish on the shop
// sign turns red, the gull standing by the red house grey, the left awning's blue stripes red, the scale's face yellow,
// one grey fish on the left stall is gone, the lobster turns blue, the crab in the middle purple, the yellow shirt of the
// man on the left pink, the man in purple gets a red cap and the orange crab at the bottom left turns green. B is A with
// only these changes laid over it. Fixed by hand: Gemini kept all three fish, so the lower left one is covered with ice
// from the right stall (the upper right one would put its zone on the lobster's); it redrew the cobbles a little
// shifted, so the crabs are A's own, recoloured.
export const level079Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-079-a.webp',
  imageB: 'levels/redesign/level-079-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The fish painted on the hanging shop sign: yellow in A, red in B.
    { x: 523, y: 710, r: 60 },
    // The gull standing on the right, by the red house: white in A, grey in B.
    { x: 2280, y: 945, r: 60 },
    // The stripes of the left awning: blue in A, red in B.
    { x: 936, y: 947, r: 139 },
    // The round face of the hanging scale: white in A, yellow in B.
    { x: 1305, y: 966, r: 90 },
    // The lower left grey fish on the left stall's ice, only in A.
    { x: 881, y: 1196, r: 98 },
    // The lobster on the left stall: red in A, blue in B.
    { x: 1114, y: 1194, r: 75 },
    // The crab on the cobbles in the middle: red in A, purple in B.
    { x: 1571, y: 1547, r: 82 },
    // The shirt of the man on the left: yellow in A, pink in B.
    { x: 658, y: 1175, r: 101 },
    // A red cap on the man in purple on the right, only in B.
    { x: 2082, y: 1101, r: 60 },
    // The crab at the bottom left: orange in A, green in B.
    { x: 393, y: 1549, r: 86 },
  ],
}
