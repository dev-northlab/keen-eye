import type { LevelPictures } from '../../engine/types.ts'

// Level 130 ("owlHollow") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): a leaf on
// the left branch turns yellow, the spider red, the big owl's eyes orange, its chest gets a fourth row of V marks, the
// left owlet's eyes turn yellow, the right owlet light brown, a moth rests on the bark, the beetle turns green, the
// upper bracket fungus red-brown and the squirrel's tail grey. B is A with only these changes of Gemini's laid over it
// (of the two yellow leaves it made, one); it also recoloured the lower fungi, moved the squirrel and gave it a bigger
// tail, and redrew the owl's chest without a clear new row (all left out), so the fourth row is copied from the second
// and the tail recoloured by hand on A's picture.
export const level130Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-130-a.avif',
  imageB: 'levels/redesign/level-130-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // A leaf on the left branch: green in A, yellow in B.
    { x: 306, y: 381, r: 73 },
    // The spider on its thread: black in A, red in B.
    { x: 360, y: 817, r: 73 },
    // The big owl's eyes: yellow in A, orange in B.
    { x: 1313, y: 647, r: 73 },
    // The fourth row of V marks on the owl's chest, only in B.
    { x: 1314, y: 944, r: 73 },
    // The left owlet's eyes: dark in A, yellow in B.
    { x: 1214, y: 1062, r: 73 },
    // The right owlet: white in A, light brown in B.
    { x: 1415, y: 1081, r: 93 },
    // The moth on the bark, only in B.
    { x: 900, y: 131, r: 73 },
    // The beetle on the bark: dark in A, green in B.
    { x: 975, y: 1443, r: 73 },
    // The upper bracket fungus: tan in A, red-brown in B.
    { x: 1827, y: 1369, r: 81 },
    // The squirrel's tail: orange in A, grey in B.
    { x: 2223, y: 1111, r: 73 },
  ],
}
