import type { LevelPictures } from '../../engine/types.ts'

// Level 108 ("fruitGarden") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. The drawn scene's differences, smaller where they can be: a cherry pair, which
// swings in the drawn scene, turns yellow, and the wasp, which hovers faster, loses its black stripes (pictures do
// not move); one apple in the left tree turns yellow instead of being gone; a pear turns red; the bird on the pear
// tree turns yellow instead of moving; a cherry pair is added; the birdhouse's roof turns green instead of tilting;
// the bottom-left crate loses a slat; the apple on the grass turns green instead of growing. Touched up by hand: B is
// A with only Gemini's apple, pear, bird, cherries, roof and green apple laid over it. Gemini also turned a second
// cherry pair yellow (it stays red), left the wasp striped and the crate whole: the wasp's body is painted plain
// yellow with its shading kept, and the upper slat of the crate's right end is painted out with the dark inside of
// the crate.
export const level108Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-108-a.webp',
  imageB: 'levels/redesign/level-108-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // An apple in the middle of the left tree's crown: red in A, yellow in B.
    { x: 567, y: 600, r: 111 },
    // The pear above the top of the ladder: yellow in A, red in B.
    { x: 1685, y: 556, r: 87 },
    // The bird on top of the pear tree: red in A, yellow in B.
    { x: 1316, y: 202, r: 73 },
    // A pair of cherries at the upper right of the cherry tree, only in B.
    { x: 2560, y: 353, r: 91 },
    // A cherry pair at the left of the cherry tree's crown: red in A, yellow in B.
    { x: 1986, y: 672, r: 73 },
    // The roof of the birdhouse on the cherry tree: red in A, green in B.
    { x: 2444, y: 662, r: 120 },
    // The upper slat of the bottom-left crate's right end, only in A.
    { x: 377, y: 1405, r: 73 },
    // The wasp above the grass: striped in A, plain yellow in B.
    { x: 837, y: 1187, r: 73 },
    // The apple on the grass right of the basket: red in A, green in B.
    { x: 1270, y: 1571, r: 95 },
  ],
}
