import type { LevelPictures } from '../../engine/types.ts'

// Level 34 ("fireStation") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the bell
// turns from gold to silver, the badge on the right garage door from red to blue, the hydrant's cap from red to yellow,
// the coiled hose from beige to blue-and-white, the light on the truck's cab from blue to orange, the left firefighter's
// helmet from yellow to red, and the left dalmatian loses its spots. Touched up by hand: B is A with only Gemini's
// bell, badge, cap, hose, light and helmet laid over it. Gemini drew a new white dog (another head, no collar): the
// dog stays as in A and its spots are painted over with the white fur beside them (a few small ones on the legs stay).
export const level034Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-034-a.webp',
  imageB: 'levels/redesign/level-034-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The bell under the tower: gold in A, silver in B.
    { x: 1308, y: 530, r: 64 },
    // The round badge on the right garage door: red in A, blue in B.
    { x: 1902, y: 962, r: 75 },
    // The cap on top of the fire hydrant: red in A, yellow in B.
    { x: 197, y: 1085, r: 60 },
    // The coiled fire hose: beige in A, blue and white in B.
    { x: 333, y: 1118, r: 75 },
    // The helmet of the firefighter on the left: yellow in A, red in B.
    { x: 976, y: 1338, r: 60 },
    // The light on the fire truck's cab: blue in A, orange in B.
    { x: 1410, y: 1348, r: 60 },
    // The left dalmatian: spotted in A, plain white in B.
    { x: 1916, y: 1492, r: 80 },
  ],
}
