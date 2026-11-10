import type { LevelPictures } from '../../engine/types.ts'

// Level 13 ("river") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel
// difference. The drawn scene's lamp, boat and mushroom; the jumping fish turns blue instead of going, and the duck,
// which swims differently in the drawn scene, gets a red beak (pictures do not move). Gemini also turned the jumping
// fish's faint reflection blue; B got it back from A.
export const level013Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-013-a.avif',
  imageB: 'levels/redesign/level-013-b.avif',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // The lamp on the bridge post, only in A.
    { x: 244, y: 370, r: 40 },
    // The fish jumping on the right: orange in A, blue in B.
    { x: 1184, y: 516, r: 44 },
    // The boat's hull: red in A, blue in B.
    { x: 981, y: 624, r: 80 },
    // The duck's beak: orange in A, red in B.
    { x: 457, y: 580, r: 40 },
    // The mushroom's cap on the front bank: red in A, brown in B.
    { x: 523, y: 735, r: 42 },
  ],
}
