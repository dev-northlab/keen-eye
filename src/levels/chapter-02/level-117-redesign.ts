import type { LevelPictures } from '../../engine/types.ts'

// Level 117 ("fountainPark") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the pink
// kite turns blue, the right duck's green head brown, a small blue bird sits on the right street lamp, the right
// bench's backrest loses most of a slat, the squirrel on the trunk turns grey, the dog on the leash black, the left
// pigeon of the two right of the ice cream cart white, the ball on the grass yellow and the big pink balloon light
// blue. B is A with only these changes of Gemini's laid over it. Gemini also turned the squirrel on the branch grey,
// the whole right duck brown and both pigeons white (all left out: the duck keeps A's white body, the lower pigeon
// stays A's), and its duck's head was olive, made a little browner.
export const level117Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-117-a.webp',
  imageB: 'levels/redesign/level-117-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The kite: pink in A, blue in B.
    { x: 979, y: 154, r: 93 },
    // The squirrel on the trunk of the big tree: red-brown in A, grey in B.
    { x: 214, y: 873, r: 106 },
    // A small blue bird on top of the right street lamp, only in B.
    { x: 1872, y: 682, r: 74 },
    // The middle slat of the right bench's backrest, broken off in B (stubs left at its ends).
    { x: 2258, y: 1072, r: 74 },
    // The head of the right duck in the fountain pool: green in A, brown in B.
    { x: 1770, y: 1162, r: 74 },
    // The dog on the leash: brown in A, black in B.
    { x: 690, y: 1187, r: 97 },
    // The big balloon held by the man in green: pink in A, light blue in B.
    { x: 2404, y: 970, r: 102 },
    // The ball on the grass: blue in A, yellow in B.
    { x: 798, y: 1461, r: 74 },
    // The left (back) pigeon of the two right of the ice cream cart: grey in A, white in B.
    { x: 1496, y: 1463, r: 74 },
  ],
}
