import type { LevelPictures } from '../../engine/types.ts'

// Level 98 ("spaceport") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the small moon turns
// light blue, the control tower loses its radar bar, its stripe turns blue, the windsock green, one tile of the board
// red, the saucer orange, the light on the ground green, the rocket's nose blue, the truck's tank grey and the
// astronaut's case blue. B is A with only these changes of Gemini's laid over it. Fixed by hand: Gemini reddened the
// board's second tile, so its red tile is moved onto the third (the second stays blue); it put a tall post in the
// radar's place, so on A the bar is filled with the sky round it and the pedestal kept; its other changes (the solar
// panel, a helmet, the saucer pad's ring) are left out.
export const level098Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-098-a.avif',
  imageB: 'levels/redesign/level-098-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The small moon right of the big one: peach in A, light blue in B.
    { x: 659, y: 202, r: 60 },
    // The radar bar on the control tower's roof, only in A.
    { x: 330, y: 476, r: 65 },
    // The stripe on the tower's shaft: red in A, blue in B.
    { x: 335, y: 831, r: 60 },
    // The windsock: orange in A, green in B.
    { x: 720, y: 986, r: 75 },
    // The third tile from the left in the board's middle row: green in A, red in B.
    { x: 2476, y: 924, r: 60 },
    // The flying saucer on the right pad: purple in A, orange in B.
    { x: 1873, y: 1293, r: 167 },
    // The light glowing on the ground right of the saucer's pad: red in A, green in B.
    { x: 2250, y: 1354, r: 124 },
    // The landing rocket's nose: red in A, blue in B.
    { x: 1080, y: 846, r: 60 },
    // The fuel tank on the truck: yellow in A, grey in B.
    { x: 1578, y: 1478, r: 91 },
    // The case carried by the white astronaut: orange-red in A, blue in B.
    { x: 2105, y: 1512, r: 66 },
  ],
}
