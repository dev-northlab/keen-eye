import type { LevelPictures } from '../../engine/types.ts'

// Level 35 ("school") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the clock's hands
// turn red, the flag from red to blue, the basketball backboard from white to yellow, the backpack of the child in red
// from blue to green, the shirt of the child in yellow light blue, the ball on the road from orange to blue, and the
// stop sign at the back of the school bus loses its white letters. B is A with only these changes of Gemini's laid
// over it.
export const level035Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-035-a.webp',
  imageB: 'levels/redesign/level-035-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The school clock's hands: black in A, red in B.
    { x: 1318, y: 342, r: 60 },
    // The flag on the tall pole: red in A, blue in B.
    { x: 250, y: 538, r: 75 },
    // The basketball backboard: white in A, yellow in B.
    { x: 2008, y: 788, r: 105 },
    // The backpack of the child in red: blue in A, green in B.
    { x: 704, y: 1216, r: 60 },
    // The shirt of the child in yellow: yellow in A, light blue in B.
    { x: 984, y: 1226, r: 60 },
    // The ball on the road: orange in A, blue in B.
    { x: 1838, y: 1376, r: 60 },
    // The white letters on the stop sign at the back of the school bus, only in A.
    { x: 2480, y: 1458, r: 60 },
  ],
}
