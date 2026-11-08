import type { LevelPictures } from '../../engine/types.ts'

// Level 120 ("citySalute") redrawn as two pictures (public/levels/redesign/, Gemini's full 2612×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// bright star in the top left corner is gone, the moon turns orange, the small green burst white, the small orange
// burst red, the small purple burst turquoise, one bar of the bridge railing is gone, the yellow boat's flag turns
// green, the white boat's cabin windows go dark, the buoy is green-and-white and a pink balloon floats above the water
// left of the yellow boat. B is A with only these changes of Gemini's laid over it, with the water's reflections of
// the windows, the buoy and the balloon (in the same zones). Gemini's moon was only a little peach (A's moon recoloured
// orange by hand) and it cut the railing's handrail instead of taking a bar away (the bar right of the bicycle's
// wheel painted out by hand with the gap beside it).
export const level120Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-120-a.webp',
  imageB: 'levels/redesign/level-120-b.webp',
  viewBox: { w: 2612, h: 1632 },
  differences: [
    // The bright star in the top left corner, only in A.
    { x: 199, y: 128, r: 74 },
    // The crescent moon: cream in A, orange in B.
    { x: 2268, y: 195, r: 96 },
    // The small firework burst under the big yellow one: green in A, white in B.
    { x: 817, y: 552, r: 89 },
    // The small firework burst in the middle: orange in A, red in B.
    { x: 1403, y: 548, r: 74 },
    // The small firework burst on the right: purple in A, turquoise in B.
    { x: 2040, y: 616, r: 91 },
    // A vertical bar of the bridge railing right of the yellow bicycle, only in A.
    { x: 546, y: 974, r: 74 },
    // The small flag of the yellow boat: red in A, green in B.
    { x: 1599, y: 1153, r: 74 },
    // A small pink balloon above the water left of the yellow boat, with its reflection, only in B.
    { x: 1225, y: 1243, r: 142 },
    // The buoy and its reflection: red-and-white in A, green-and-white in B.
    { x: 1873, y: 1378, r: 79 },
    // The cabin windows of the white boat and their reflection: lit yellow in A, dark in B.
    { x: 2212, y: 1349, r: 127 },
  ],
}
