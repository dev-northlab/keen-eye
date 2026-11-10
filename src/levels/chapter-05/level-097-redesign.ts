import type { LevelPictures } from '../../engine/types.ts'

// Level 97 ("spaceCafe") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the top left star
// goes, the green saucer's dome turns pink, the neon planet's ring yellow, the head in the right window pink, the
// diner's door purple, the rocket's porthole yellow, the parked saucer's lights light blue, the parasol green, the
// steam above the cup goes and the robot waiter's eyes turn red. B is A with only these changes of Gemini's laid over
// it. Fixed by hand: Gemini also made the sign's yellow neon lines blue and the waiter's chest panel red, left out.
export const level097Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-097-a.webp',
  imageB: 'levels/redesign/level-097-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The yellow star at the top left, below the small ringed planet, only in A.
    { x: 520, y: 266, r: 60 },
    // The glass dome of the green flying saucer: pale in A, pink in B.
    { x: 2033, y: 340, r: 60 },
    // The ring of the neon planet on the roof sign: pink in A, yellow in B.
    { x: 1316, y: 560, r: 75 },
    // The alien head in the right window: light blue in A, pink in B.
    { x: 1508, y: 888, r: 66 },
    // The diner's door: blue in A, purple in B.
    { x: 1308, y: 1040, r: 93 },
    // The glass of the parked rocket's round porthole: light blue in A, yellow in B.
    { x: 250, y: 928, r: 60 },
    // The lights of the purple saucer parked at the right: yellow in A, light blue in B.
    { x: 2354, y: 1042, r: 107 },
    // The parasol: pink in A, green in B.
    { x: 421, y: 1174, r: 135 },
    // The steam above the cup on the right table, only in A.
    { x: 2228, y: 1178, r: 60 },
    // The robot waiter's eyes: green in A, red in B.
    { x: 656, y: 1302, r: 60 },
  ],
}
