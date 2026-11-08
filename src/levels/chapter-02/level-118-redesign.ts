import type { LevelPictures } from '../../engine/types.ts'

// Level 118 ("buildingSite") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): a pigeon
// sits on the crane's jib above the counterweight, the hard hat of the worker in blue turns red, the concrete mixer's
// drum green, the excavator's beacon is off, the cable drum's center turns red, the right barrier's stripes yellow,
// the middle cone blue, the exclamation mark on the warning sign red and the top brick of the pile grey. B is A with
// only these changes of Gemini's laid over it. Gemini also put warning lamps on top of both barriers: kept as decor on
// both pictures; its exclamation mark was crimson, made redder.
export const level118Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-118-a.webp',
  imageB: 'levels/redesign/level-118-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // A small dark grey pigeon on the crane's jib above the counterweight, only in B.
    { x: 2215, y: 137, r: 74 },
    // The hard hat of the worker in the blue shirt: yellow in A, red in B.
    { x: 789, y: 903, r: 74 },
    // The exclamation mark on the yellow warning sign: black in A, red in B.
    { x: 1367, y: 1180, r: 74 },
    // The beacon light on the excavator: orange and glowing in A, dark grey in B.
    { x: 2232, y: 1210, r: 74 },
    // The drum of the concrete mixer truck: orange stripes in A, green in B.
    { x: 1599, y: 1414, r: 178 },
    // The center of the wooden cable drum: blue in A, red in B.
    { x: 333, y: 1534, r: 74 },
    // The stripes of the right barrier: red in A, yellow in B.
    { x: 679, y: 1548, r: 92 },
    // The middle traffic cone of the three: orange in A, blue in B.
    { x: 1082, y: 1563, r: 74 },
    // The top brick of the pile next to the mixer: red in A, grey in B.
    { x: 1834, y: 1526, r: 73 },
  ],
}
