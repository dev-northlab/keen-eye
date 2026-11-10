import type { LevelPictures } from '../../engine/types.ts'

// Level 36 ("iceRink") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the skater in red
// gets a woolly hat, the skater in green's jacket turns pink, the star on the Christmas tree from gold to silver, the
// red bauble in the middle of the tree green, the awning's middle red stripe blue, the snowman's top hat from black to
// red, and the top snowball of the pile is gone. Touched up by hand: B is A with only Gemini's hat, jacket, star,
// bauble and top hat laid over it. Gemini drew a new awning without snow (the snowy one stays, its middle stripe
// recolored blue by hand), and took away the lone snowball and the blue bird by the snowman instead of the pile's top
// snowball (they stay as in A): the top snowball is painted out with the snow and the rink's edge beside it.
export const level036Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-036-a.avif',
  imageB: 'levels/redesign/level-036-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The star on top of the Christmas tree: gold in A, silver in B.
    { x: 2100, y: 878, r: 60 },
    // The bauble in the middle of the Christmas tree: red in A, green in B.
    { x: 2060, y: 1110, r: 60 },
    // A red-and-white woolly hat on the skater in red, only in B.
    { x: 858, y: 1234, r: 60 },
    // The middle stripe of the stall's awning: red in A, blue in B.
    { x: 2366, y: 1268, r: 60 },
    // The snowman's top hat: black in A, red in B.
    { x: 198, y: 1356, r: 66 },
    // The jacket of the skater in green: green in A, pink in B.
    { x: 548, y: 1406, r: 80 },
    // The top snowball of the pile next to the snowman, only in A.
    { x: 394, y: 1550, r: 60 },
  ],
}
