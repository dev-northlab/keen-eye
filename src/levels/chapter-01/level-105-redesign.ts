import type { LevelPictures } from '../../engine/types.ts'

// Level 105 ("harvestFair") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. The drawn scene's differences, smaller where they can be: the middle pennant,
// which flutters in the drawn scene, turns purple, and the balloon, which bobs faster, turns green (pictures do not
// move); one apple turns yellow; the jam jar is gone; the prize sign turns yellow instead of leaning; the signpost
// turns green instead of pointing the other way; the small pumpkin turns orange instead of growing; the goose turns
// grey instead of moving. Touched up by hand: Gemini redrew the whole fair, so B is A with only Gemini's pennant,
// prize sign and signpost laid over it. Gemini also turned two pennants purple (one taken), greened only the
// balloon's top half and left the apple, the jar, the pumpkin and the goose as they were: the balloon, the apple,
// the pumpkin and the goose are recoloured with their shading kept, the jar painted over with the trees above it.
export const level105Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-105-a.avif',
  imageB: 'levels/redesign/level-105-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The middle pennant of the string: green in A, purple in B.
    { x: 1311, y: 249, r: 73 },
    // The third apple in the crate of red apples: red in A, yellow in B.
    { x: 330, y: 1073, r: 73 },
    // The fourth jar on the jam stall's top shelf, only in A.
    { x: 1407, y: 817, r: 73 },
    // The balloon: blue in A, green in B.
    { x: 1771, y: 460, r: 80 },
    // The prize sign's board in the giant pumpkin: grey in A, yellow in B.
    { x: 1959, y: 1000, r: 73 },
    // The arrow signpost on the left: wooden in A, green in B.
    { x: 127, y: 1249, r: 92 },
    // The small pumpkin on the left hay bale: pale yellow in A, orange in B.
    { x: 389, y: 1332, r: 84 },
    // The goose: white in A, grey in B.
    { x: 1389, y: 1473, r: 78 },
  ],
}
