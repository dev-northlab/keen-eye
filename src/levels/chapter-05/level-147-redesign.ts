import type { LevelPictures } from '../../engine/types.ts'

// Level 147 ("satelliteRepair") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the light
// at the left wing's end turns green, the dish's tip blue, the status light red, the hatch dark blue, a corner bolt
// goes, the rightmost panel turns gold, the visor of the astronaut on the tether green, the other astronaut's chest
// badge orange, the toolbox blue, and a screwdriver floats at the bottom right. B is A with only these changes of
// Gemini's laid over it. Fixed by hand: Gemini drew the screwdriver over the yellow star at the bottom right, so it is
// moved a little right and up and the star stays; its re-drawn gold foil and astronauts are left out.
export const level147Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-147-a.avif',
  imageB: 'levels/redesign/level-147-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The light at the left end of the left wing: red in A, green in B.
    { x: 464, y: 748, r: 73 },
    // The tip of the dish antenna on top of the satellite: red in A, blue in B.
    { x: 1223, y: 488, r: 73 },
    // The status light at the upper right of the gold body: green in A, red in B.
    { x: 1504, y: 653, r: 73 },
    // The square hatch in the middle of the gold body: grey in A, dark blue in B.
    { x: 1322, y: 800, r: 82 },
    // The silver bolt in the lower right corner of the gold body, only in A.
    { x: 1534, y: 866, r: 73 },
    // The rightmost solar panel of the right wing: blue in A, gold in B.
    { x: 2174, y: 750, r: 120 },
    // The visor of the astronaut on the tether: yellow in A, green in B.
    { x: 984, y: 1102, r: 73 },
    // The chest badge of the astronaut with the blue visor: red in A, orange in B.
    { x: 1826, y: 1126, r: 73 },
    // The toolbox floating at the lower left: red in A, blue in B.
    { x: 644, y: 1342, r: 77 },
    // A screwdriver with a yellow handle at the bottom right, only in B.
    { x: 2376, y: 1464, r: 123 },
  ],
}
