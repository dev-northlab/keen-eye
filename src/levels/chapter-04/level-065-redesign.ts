import type { LevelPictures } from '../../engine/types.ts'

// Level 65 ("pirateShip") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the skull
// and crossbones on the pirate flag turn yellow, the patch on the top sail blue, the parrot on the top yard red, the
// lantern on the bracket goes dark, so does the second porthole from the left, the bandana of the pirate on the left
// turns blue, the pile of cannonballs loses its top one, the treasure chest its gold coins, the golden anchor at the bow
// turns black and the tip of the shark fin white. B is A with only these changes of Gemini's laid over it (it did all but
// redrew the clouds, so the sky stays A's); the anchor is recoloured by hand on A's picture, keeping A's sky around it.
export const level065Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-065-a.avif',
  imageB: 'levels/redesign/level-065-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The skull and crossbones on the black flag: white in A, yellow in B.
    { x: 1372, y: 174, r: 60 },
    // The patch on the top sail: brown in A, blue in B.
    { x: 1119, y: 520, r: 60 },
    // The parrot on the top yard: green in A, red in B.
    { x: 988, y: 303, r: 60 },
    // The lantern hanging on the bracket: lit in A, dark in B.
    { x: 1836, y: 874, r: 60 },
    // The second porthole from the left: lit in A, dark in B.
    { x: 1121, y: 1286, r: 60 },
    // The bandana of the pirate on the left: red in A, blue in B.
    { x: 798, y: 890, r: 60 },
    // The top cannonball of the pile of three, only in A.
    { x: 1051, y: 1029, r: 60 },
    // The gold coins in the open treasure chest, only in A.
    { x: 1836, y: 1024, r: 69 },
    // The anchor at the bow: golden in A, black in B.
    { x: 2100, y: 983, r: 69 },
    // The tip of the shark fin: grey in A, white in B.
    { x: 321, y: 1395, r: 60 },
  ],
}
