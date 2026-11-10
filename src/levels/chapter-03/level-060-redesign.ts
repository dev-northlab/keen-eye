import type { LevelPictures } from '../../engine/types.ts'

// Level 60 ("forestFestival") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the fifth
// pennant from the left turns yellow, the yellow paper lantern blue, the ring of stones under the campfire loses one
// stone, the bear's drumstick turns red, the white rabbit's flag green, the hedgehog's spines light grey, the pink
// balloon blue and the cake loses one of its three candles. B is A with only these changes of Gemini's laid over it
// (the lantern, the spines, the balloon); it made the sixth pennant yellow instead of the fifth (left out) and left
// the rest undone, so five are done by hand on A's picture: the pennant, the drumstick and the flag recoloured, the
// right candle painted out with the dark background beside it, and the back stone at the left end of the ring with the
// grass beside it (the whole ring, asked of Gemini, is too tangled with the logs to repaint; one stone goes instead).
export const level060Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-060-a.avif',
  imageB: 'levels/redesign/level-060-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The fifth pennant from the left: red in A, yellow in B.
    { x: 1244, y: 862, r: 60 },
    // The paper lantern on the right: yellow in A, blue in B.
    { x: 2032, y: 604, r: 66 },
    // The back stone at the left end of the ring under the fire, only in A.
    { x: 1428, y: 1346, r: 60 },
    // The drumstick in the bear's paw: light wood in A, red in B.
    { x: 2022, y: 1327, r: 61 },
    // The small flag by the white rabbit: red in A, green in B.
    { x: 738, y: 1286, r: 60 },
    // The hedgehog's spines: brown in A, light grey in B.
    { x: 1258, y: 1235, r: 102 },
    // The balloon on the right: pink in A, blue in B.
    { x: 2294, y: 1298, r: 70 },
    // The right candle of the three on the cake, only in A.
    { x: 428, y: 1200, r: 60 },
  ],
}
