import type { LevelPictures } from '../../engine/types.ts'

// Level 50 ("berries") redrawn as two pictures (public/levels/redesign/, Gemini's full 2612×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the bird by the tree
// trunk turns red, the twig hanging below the tree loses one berry, the small round bush on the left gets blue
// berries, the wasp loses its stripes, the girl's shirt turns green, the basket loses one of its three berries, the
// left jar's lid turns blue and the bear's nose pink. Gemini made only the bird and the shirt (laid over A; it also
// hung big berries around the bird, left out); the other six are done by hand on A's picture: the berry painted out
// with the grass below and the twig drawn on, the bush's berries recoloured, the stripes filled with the yellow beside
// them, the basket's right berry painted out with the ground above it and the rim, the lid and the nose recoloured
// with their shading kept.
export const level050Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-050-a.avif',
  imageB: 'levels/redesign/level-050-b.avif',
  viewBox: { w: 2612, h: 1632 },
  differences: [
    // The bird on the branch by the tree trunk: yellow in A, red in B.
    { x: 2102, y: 752, r: 74 },
    // The bottom berry of the twig hanging below the tree, only in A.
    { x: 1906, y: 914, r: 60 },
    // The berries of the small round bush on the left: red in A, blue in B.
    { x: 398, y: 1362, r: 76 },
    // The black stripes of the wasp, only in A.
    { x: 1374, y: 1144, r: 60 },
    // The girl's shirt: pink in A, green in B.
    { x: 1190, y: 1484, r: 104 },
    // The right berry of the three in the basket, only in A.
    { x: 1388, y: 1508, r: 60 },
    // The lid of the left jar: white in A, blue in B.
    { x: 1538, y: 1526, r: 60 },
    // The bear's nose: black in A, pink in B.
    { x: 1708, y: 1202, r: 60 },
  ],
}
