import type { LevelPictures } from '../../engine/types.ts'

// Level 150 ("blackHole") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the
// zones measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): a
// small comet flies above the black hole, the pink star right of it goes, the telescope tube turns gold, the door red,
// the annex window goes dark, the mast light turns green, the small dish light blue, the left astronaut's visor green,
// the other astronaut's chest badge yellow and the smaller rock reddish brown. B is A with only these changes of
// Gemini's laid over it. Fixed by hand: Gemini reddened both small rocks, so only the smaller, right one is laid over A;
// it also took away the lower pink star, tinted the dish under the mast and gave the left astronaut a green badge,
// all left out.
export const level150Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-150-a.webp',
  imageB: 'levels/redesign/level-150-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // A small white comet with a pale blue tail above the left side of the black hole, only in B.
    { x: 1324, y: 249, r: 109 },
    // The small pink star right of the black hole, only in A.
    { x: 2226, y: 282, r: 73 },
    // The telescope tube sticking out of the observatory dome: grey in A, gold in B.
    { x: 718, y: 858, r: 92 },
    // The door of the observatory: blue in A, red in B.
    { x: 656, y: 1218, r: 73 },
    // The window grid of the annex: lit yellow in A, dark in B.
    { x: 1001, y: 1219, r: 111 },
    // The light on top of the thin antenna mast: red in A, green in B.
    { x: 1246, y: 1056, r: 88 },
    // The bowl of the small dish antenna at the right: white in A, light blue in B.
    { x: 2371, y: 1196, r: 79 },
    // The visor of the astronaut on the left: yellow in A, green in B.
    { x: 1488, y: 1332, r: 73 },
    // The chest badge of the astronaut with the blue visor: red in A, yellow in B.
    { x: 1952, y: 1402, r: 73 },
    // The smaller rock right of the big dark rock at the bottom left: grey in A, reddish brown in B.
    { x: 385, y: 1548, r: 73 },
  ],
}
