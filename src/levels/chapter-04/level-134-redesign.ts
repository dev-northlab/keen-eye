import type { LevelPictures } from '../../engine/types.ts'

// Level 134 ("umbrellaBeach") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the left
// swimmer's cap turns yellow, the lifeguard tower's flag blue, the blue panel left of the yellow-and-blue umbrella's
// pole red, the green towel orange, the red towel gets a third stripe, the sandcastle's flag goes, the beach ball's
// red quarter turns green, the spade's blade blue, the second shell from the left purple, and a red crab sits by the
// snorkel mask. B is A with only Gemini's cap, flag, towels, shell and crab laid over it. Fixed by hand: Gemini turned
// the umbrella's panels around, made half the ball green, the whole spade blue, both orange shells purple and left a
// pale flag on the castle, so the umbrella panel, the ball's quarter and the blade are recoloured on A's own, and the
// castle's flag and pole are covered with the sand beside them.
export const level134Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-134-a.avif',
  imageB: 'levels/redesign/level-134-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The left swimmer's cap: red in A, yellow in B.
    { x: 660, y: 684, r: 73 },
    // The flag on top of the lifeguard tower: red and yellow in A, blue in B.
    { x: 2468, y: 600, r: 73 },
    // The panel of the yellow-and-blue umbrella just left of its pole: blue in A, red in B.
    { x: 920, y: 856, r: 73 },
    // The towel in front of the green-and-white umbrella: green in A, orange in B.
    { x: 1528, y: 1208, r: 116 },
    // A third white stripe on the red towel by the person in the blue shirt, only in B.
    { x: 2096, y: 1148, r: 73 },
    // The small red flag on top of the sandcastle, only in A.
    { x: 1308, y: 1280, r: 73 },
    // The red quarter of the beach ball: green in B.
    { x: 1836, y: 1440, r: 73 },
    // The blade of the spade: red in A, blue in B.
    { x: 1532, y: 1552, r: 73 },
    // The second shell from the left at the bottom: orange in A, purple in B.
    { x: 920, y: 1512, r: 73 },
    // The red crab between the snorkel mask and the pink shell, only in B.
    { x: 652, y: 1516, r: 73 },
  ],
  // The sea's golden key behind the surfboard: cut out of the pictures (the sand above it laid over its place) into
  // its own image, so a tap takes it off like a drawn scene's key.
  secret: {
    x: 240,
    y: 1374,
    r: 40,
    on: 'both',
    image: { href: 'levels/redesign/level-134-key.webp', x: 222, y: 1358, w: 35, h: 34 },
  },
}
