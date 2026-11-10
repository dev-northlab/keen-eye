import type { LevelPictures } from '../../engine/types.ts'

// Level 18 ("rainyDay") redrawn as two pictures (public/levels/redesign/, Gemini's full 2612×1632), the zones
// measured on their pixel difference. The drawn scene's differences, smaller where they can be: the rainbow, only in A;
// the weathervane, which turns the other way in the drawn scene, loses its arrow's left arrowhead (pictures do not
// move); the lantern, which swings in the drawn scene, goes dark; one boot of the pair, the frog in the right puddle
// and the umbrella's colour as drawn. Touched up by hand: B is A with only Gemini's sky, lantern, frog and canopy
// laid over it. Gemini also darkened the right window (kept lit, from A), took the small lower arrow off the vane
// instead of the arrowhead (A's vane with the arrowhead painted over with sky) and left both boots (the right one
// painted over with the wall above it and the mat left of the boots). Gemini's A had a small bright rainbow over the
// top of a big faint one, and its B a ghost of the big one: B's sky got the ghost smoothed away, and A keeps only the
// big rainbow, its top under the small one drawn again from the profile of its visible parts.
export const level018Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-018-a.avif',
  imageB: 'levels/redesign/level-018-b.avif',
  viewBox: { w: 2612, h: 1632 },
  differences: [
    // The big rainbow over the farmhouse, only in A (the zone on its upper arc; the feet by the birds and the
    // weathervane stay out of it).
    { x: 1250, y: 430, r: 300 },
    // The left arrowhead of the weathervane's arrow, only in A.
    { x: 1636, y: 516, r: 80 },
    // The lantern at the house's right corner: lit in A, dark in B.
    { x: 2029, y: 820, r: 84 },
    // The right boot of the pair by the door, only in A.
    { x: 1885, y: 1140, r: 80 },
    // The frog in the right puddle, only in B.
    { x: 2015, y: 1408, r: 88 },
    // The umbrella's canopy: red in A, blue in B.
    { x: 1268, y: 1168, r: 226 },
  ],
}
