import type { LevelPictures } from '../../engine/types.ts'

// Level 9 ("meadow") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel difference.
// The drawn scene's differences made smaller: a sheep's face turns white instead of the whole sheep turning dark,
// and a bell comes on another sheep instead of it turning round. Gemini also made the white-faced sheep's legs white
// and lost its eye; B got the legs back from A and the eye painted by hand.
export const level009Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-009-a.avif',
  imageB: 'levels/redesign/level-009-b.avif',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // A stone in the top row of the wall, on the right, only in A.
    { x: 1064, y: 497, r: 42 },
    // The wagon's door: red in A, yellow in B.
    { x: 1084, y: 400, r: 40 },
    // The face of the sheep in the middle: black in A, white in B.
    { x: 595, y: 645, r: 40 },
    // A red collar with a golden bell on the front-left sheep, only in B.
    { x: 338, y: 726, r: 40 },
    // Some of the bush's red berries, only in A.
    { x: 870, y: 741, r: 72 },
  ],
}
