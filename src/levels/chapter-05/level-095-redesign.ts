import type { LevelPictures } from '../../engine/types.ts'

// Level 95 ("spaceGarden") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the red
// planet turns purple, the right hanging lamp pink, water sprays above the sprinkler, two tomatoes of the middle plant
// turn yellow, the rightmost big carrot goes, the middle lettuce turns purple, the right flower's petals orange, the
// light blue butterfly goes and the robot's eyes turn red. B is A with only these changes of Gemini's laid over it.
// Fixed by hand: Gemini redrew the tomato plants and made five tomatoes yellow, so two of A's middle plant are
// recoloured instead; it also took the small sprout carrot away and made the blurred lettuce and flower behind the
// glass purple and orange, all left out.
export const level095Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-095-a.webp',
  imageB: 'levels/redesign/level-095-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The planet at the top left: red in A, purple in B.
    { x: 182, y: 184, r: 140 },
    // The right one of the two hanging lamps: yellow in A, pink in B.
    { x: 1781, y: 591, r: 117 },
    // A spray of water drops above the sprinkler's head, only in B.
    { x: 1838, y: 824, r: 95 },
    // Two tomatoes of the middle tomato plant: red in A, yellow in B.
    { x: 508, y: 1274, r: 66 },
    // The rightmost of the three carrots in the left bed, only in A.
    { x: 1058, y: 1264, r: 122 },
    // The middle one of the three lettuces: green in A, purple in B.
    { x: 1676, y: 1327, r: 82 },
    // The petals of the right tall flower: pink in A, orange in B.
    { x: 2297, y: 1113, r: 62 },
    // The light blue butterfly at the upper left, only in A.
    { x: 984, y: 715, r: 60 },
    // The yellow robot's eyes: cyan in A, red in B.
    { x: 524, y: 1416, r: 60 },
  ],
}
