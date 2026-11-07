import type { LevelPictures } from '../../engine/types.ts'

// Level 14 ("swing") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel
// difference. The drawn scene's differences made smaller: the kite loses its tail instead of going; the swing,
// which swings differently in the drawn scene, gets a blue seat (pictures do not move); the shirt, the dog house's
// roof and the ball change colour as drawn. Gemini changed nothing else.
export const level014Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-014-a.webp',
  imageB: 'levels/redesign/level-014-b.webp',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // The kite's string tail, only in A.
    { x: 1018, y: 272, r: 44 },
    // The swing's seat: red in A, blue in B.
    { x: 490, y: 538, r: 44 },
    // The middle shirt on the clothesline: yellow in A, red in B.
    { x: 1163, y: 440, r: 44 },
    // The dog house's roof: red in A, blue in B.
    { x: 931, y: 586, r: 104 },
    // The ball: red in A, blue in B.
    { x: 702, y: 736, r: 40 },
  ],
}
