import type { LevelPictures } from '../../engine/types.ts'

// Level 90 ("ufoFarm") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the moon turns
// yellow, the silo's dome red, the hayloft window goes dark, the weather vane turns gold, the third fence post goes,
// the hay bale turns dark brown, the sheep's wool light brown, the boy's shirt red, the cow's spots brown and the
// saucer's lights yellow. B is A with only these changes of Gemini's laid over it. Fixed by hand: Gemini took the
// fourth fence post away and cut the rails short, so the third post is painted out on A with a seamless clone of the
// span beside it (the rails run on through); it also made the cow's hooves and tail tip brown, left out, as are its
// other small changes (the fern, the grass).
export const level090Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-090-a.avif',
  imageB: 'levels/redesign/level-090-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The moon at the top left: pale in A, yellow in B.
    { x: 296, y: 226, r: 90 },
    // The dome on top of the silo: grey in A, red in B.
    { x: 2394, y: 698, r: 75 },
    // The barn's hayloft window: lit in A, dark in B.
    { x: 2062, y: 938, r: 70 },
    // The weather vane on the barn roof: grey in A, gold in B.
    { x: 2065, y: 599, r: 75 },
    // The third fence post from the left, only in A.
    { x: 669, y: 1252, r: 75 },
    // The round hay bale at the bottom left: yellow in A, dark brown in B.
    { x: 396, y: 1450, r: 85 },
    // The sheep's wool at the right: white in A, light brown in B.
    { x: 2288, y: 1429, r: 80 },
    // The boy's shirt: blue in A, red in B.
    { x: 851, y: 1420, r: 60 },
    // The floating cow's spots: black in A, brown in B.
    { x: 1318, y: 936, r: 100 },
    // The flying saucer's three lights: red in A, yellow in B.
    { x: 1308, y: 373, r: 115 },
  ],
}
