import type { LevelPictures } from '../../engine/types.ts'

// Level 64 ("lighthouse") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the right gull of the
// three flying left of the lighthouse turns grey, the lantern room goes dark, the lowest red stripe of the lighthouse
// turns blue, the small round window goes dark, the flag on the keeper's house turns yellow, its door red, the beak of the
// gull standing on the rocks black, the left seal brown (and lifts its head), the sailboat's hull red and the small rock
// in the water at the bottom left sandy. B is A with only these changes of Gemini's laid over it (the lantern, the
// window, the flag, the door, the seal, the hull, the rock); it painted the whole foot of the tower blue instead of the
// lowest stripe (left out) and left the rest undone, so three are recoloured by hand on A's picture: the gull, the
// stripe and the beak.
export const level064Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-064-a.avif',
  imageB: 'levels/redesign/level-064-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The right gull of the three flying left of the lighthouse: white in A, grey in B.
    { x: 852, y: 582, r: 60 },
    // The lantern room at the top of the lighthouse: lit in A, dark in B.
    { x: 1323, y: 350, r: 103 },
    // The lowest stripe of the lighthouse: red in A, blue in B.
    { x: 1317, y: 882, r: 85 },
    // The small round window in the middle of the lighthouse: lit in A, dark in B.
    { x: 1318, y: 649, r: 60 },
    // The flag on the keeper's house: red in A, yellow in B.
    { x: 1680, y: 576, r: 60 },
    // The door of the keeper's house: teal in A, red in B.
    { x: 1737, y: 914, r: 66 },
    // The beak of the gull standing on the rocks: orange in A, black in B.
    { x: 1222, y: 999, r: 60 },
    // The left seal of the two on the rocks: grey and lying in A, brown with its head up in B.
    { x: 1763, y: 1112, r: 91 },
    // The sailboat's hull: blue in A, red in B.
    { x: 2296, y: 1452, r: 130 },
    // The small rock in the water at the bottom left: dark in A, sandy in B.
    { x: 346, y: 1504, r: 215 },
  ],
}
