import type { LevelPictures } from '../../engine/types.ts'

// Level 74 ("tide pools") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the dark rock at the
// right of the shore gets green moss, the gull standing by it turns grey, the anemone in the left pool yellow, the
// starfish in that pool purple, a second small yellow fish swims there, the shrimp in the right pool turns white, a small
// green fish swims right of it, the shirt of the man on the right turns blue and the crab at the bottom left yellow.
// B is A with only these changes laid over it. Fixed by hand: Gemini mossed the whole shore around the rock, so only
// its mossy rock is laid inside A's rock outline, and the gull (standing on that moss in B) is A's own, tinted grey;
// Gemini's extra shrimp in the right pool and its redrawn surf are left out.
export const level074Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-074-a.webp',
  imageB: 'levels/redesign/level-074-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The dark rock at the far right of the shore: bare in A, mossy in B.
    { x: 2426, y: 949, r: 102 },
    // The gull standing near the right rock: white in A, grey in B.
    { x: 2226, y: 944, r: 60 },
    // The sea anemone in the left pool: pink in A, yellow in B.
    { x: 750, y: 1423, r: 70 },
    // The starfish in the left pool: orange in A, purple in B.
    { x: 560, y: 1373, r: 76 },
    // A second small yellow fish below the first one in the left pool, only in B.
    { x: 933, y: 1404, r: 60 },
    // The shrimp in the right pool: pink in A, white in B.
    { x: 1837, y: 1305, r: 60 },
    // A small green fish right of the shrimp, only in B.
    { x: 2010, y: 1365, r: 60 },
    // The shirt of the man on the right: red in A, blue in B.
    { x: 1444, y: 1004, r: 104 },
    // The crab at the bottom left: red in A, yellow in B.
    { x: 199, y: 1541, r: 86 },
  ],
}
