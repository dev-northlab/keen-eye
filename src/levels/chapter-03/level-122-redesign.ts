import type { LevelPictures } from '../../engine/types.ts'

// Level 122 ("mushroomHollow") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// spider on its thread turns yellow, a snail crawls on the mossy log, the cap of the second fly agaric from the left
// turns orange, the larger brown mushroom at the bottom left loses its white spots, the left fly agaric of the two on
// the right turns yellow, the middle porcini's cap dark grey, the frog at the bottom brown and the beetle purple. B is
// A with only these changes of Gemini's laid over it; it also turned the third fly agaric orange (left out) and drew a
// bigger plain mushroom over the spotted one, so its spots are painted out by hand on A's cap instead.
export const level122Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-122-a.webp',
  imageB: 'levels/redesign/level-122-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The spider hanging from the bare branch: black in A, yellow in B.
    { x: 1837, y: 763, r: 73 },
    // The snail on the mossy log, only in B.
    { x: 1354, y: 1155, r: 86 },
    // The cap of the second fly agaric from the left: red in A, orange in B.
    { x: 847, y: 1403, r: 73 },
    // The white spots on the larger brown mushroom at the bottom left, only in A.
    { x: 494, y: 1522, r: 73 },
    // The cap of the left fly agaric of the two on the right: red in A, yellow in B.
    { x: 1958, y: 1397, r: 73 },
    // The cap of the middle porcini: brown in A, dark grey in B.
    { x: 2292, y: 1516, r: 73 },
    // The frog at the bottom in the middle: green in A, brown in B.
    { x: 1109, y: 1568, r: 73 },
    // The beetle's shell: dark teal in A, purple in B.
    { x: 1692, y: 1538, r: 73 },
  ],
}
