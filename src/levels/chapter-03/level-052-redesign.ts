import type { LevelPictures } from '../../engine/types.ts'

// Level 52 ("foxDen") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the hawk turns
// dark grey, small grey stones lie by the den's entrance, the big fox's ears turn black, the left cub of the pair on
// the right brown, the bone grey, the crow on the log grey, the red mushroom at the bottom left yellow and the
// dandelion loses the left half of its seed head. B is A with only these changes of Gemini's laid over it (the
// stones, the crow, the mushroom); it also turned the other two mushrooms yellow, took away the pink butterfly,
// added two cubs and drew a bigger dandelion with a gap (all left out), so five are done by hand on A's picture: the
// hawk, the ears, the cub and the bone recoloured with their shading kept, the half seed head painted out with the
// grass beside it.
export const level052Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-052-a.avif',
  imageB: 'levels/redesign/level-052-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The hawk circling in the sky: brown in A, dark grey in B.
    { x: 1838, y: 361, r: 81 },
    // Small grey stones by the den's entrance, only in B.
    { x: 1085, y: 1334, r: 110 },
    // The big fox's ears: orange in A, black in B.
    { x: 1033, y: 1166, r: 60 },
    // The left cub of the pair on the right: orange in A, brown in B.
    { x: 1383, y: 1482, r: 67 },
    // The bone on the grass: white in A, grey in B.
    { x: 1642, y: 1440, r: 60 },
    // The crow on the fallen log: black in A, grey in B.
    { x: 1942, y: 1316, r: 117 },
    // The cap of the mushroom with white dots at the bottom left: red in A, yellow in B.
    { x: 261, y: 1468, r: 60 },
    // The left half of the dandelion's seed head at the bottom right, only in A.
    { x: 2348, y: 1483, r: 60 },
  ],
}
