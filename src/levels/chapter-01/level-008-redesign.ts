import type { LevelPictures } from '../../engine/types.ts'

// Level 8 ("wheat") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel difference.
// The same differences as the drawn scene, made smaller: the tractor loses its exhaust pipe instead of changing
// colour, and a pitchfork comes by the right hay bale instead of a bale going. Gemini also turned the silo's walls
// to brick; B got them back from A.
export const level008Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-008-a.avif',
  imageB: 'levels/redesign/level-008-b.avif',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // The farmhouse chimney, only in A.
    { x: 250, y: 368, r: 40 },
    // The silo's dome: red in A, blue in B.
    { x: 1176, y: 271, r: 58 },
    // The black crow on the fence, only in A.
    { x: 341, y: 450, r: 42 },
    // The tractor's exhaust pipe, only in A.
    { x: 652, y: 615, r: 40 },
    // A pitchfork leaning on the right hay bale, only in B.
    { x: 1230, y: 638, r: 84 },
  ],
}
