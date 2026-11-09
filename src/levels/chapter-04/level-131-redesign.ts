import type { LevelPictures } from '../../engine/types.ts'

// Level 131 ("coralReef") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the second
// fish from the left of the school turns navy, the tail fin of a fish lower in the school yellow, the turtle's head
// brown, the angelfish loses its middle stripe, the sea fan on the rock turns orange, the seahorse above the tall coral
// purple, the clownfish yellow and the brain coral light green; the white scallop shell goes and a black sea urchin
// lies on the sand. B is A with only these changes of Gemini's laid over it. Fixed by hand: Gemini added a new navy
// fish above the school instead of recolouring one, so its navy fish is moved onto A's second fish (the new one left
// out); a second yellow clownfish it put on the left anemone is left out too.
export const level131Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-131-a.webp',
  imageB: 'levels/redesign/level-131-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The second fish from the left of the school at the top right: light blue in A, navy in B.
    { x: 1972, y: 340, r: 73 },
    // The tail fin of the fish low in the school: light blue in A, yellow in B.
    { x: 2384, y: 456, r: 73 },
    // The sea turtle's head: green in A, brown in B.
    { x: 1048, y: 464, r: 73 },
    // The middle black stripe of the angelfish, only in A.
    { x: 1420, y: 816, r: 73 },
    // The sea fan on top of the grey rock: purple in A, orange in B.
    { x: 2292, y: 1100, r: 88 },
    // The seahorse above the tall pink coral: orange in A, purple in B.
    { x: 1724, y: 1044, r: 80 },
    // The clownfish in the pink anemone: orange in A, yellow in B.
    { x: 520, y: 1268, r: 73 },
    // The brain coral on the sand: purple in A, light green in B.
    { x: 976, y: 1440, r: 100 },
    // The white scallop shell on the sand, only in A.
    { x: 2008, y: 1560, r: 73 },
    // The black sea urchin between the bottle and the pink shell, only in B.
    { x: 1556, y: 1500, r: 96 },
  ],
}
