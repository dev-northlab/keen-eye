import type { LevelPictures } from '../../engine/types.ts'

// Level 84 ("ringedPlanet") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the spiral
// galaxy turns pink, the comet loses its tail, the flying saucer's lights turn pink, the small moon by the light blue
// planet red-brown, the dark spot on the ringed planet goes, the pale moon below the ring turns yellow, the left
// sparkle yellow, the biggest asteroid dark grey, an asteroid at the bottom orange-red and the rocket's nose and fins
// red. B is A with only these changes of Gemini's laid over it. Fixed by hand: Gemini also redrew the rocket's
// porthole (dark blue with stars), so A's porthole is kept; its redrawn satellites are left out.
export const level084Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-084-a.avif',
  imageB: 'levels/redesign/level-084-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The spiral galaxy at the top: pale blue in A, pink in B.
    { x: 655, y: 194, r: 90 },
    // The long tail of the comet at the left, only in A.
    { x: 410, y: 332, r: 110 },
    // The three lights of the flying saucer: yellow in A, pink in B.
    { x: 1836, y: 240, r: 85 },
    // The small moon right of the light blue planet: grey in A, red-brown in B.
    { x: 2374, y: 364, r: 60 },
    // The dark orange spot right of the middle of the ringed planet, only in A.
    { x: 1404, y: 814, r: 70 },
    // The pale moon below the ring at the right: grey in A, yellow in B.
    { x: 1836, y: 1238, r: 60 },
    // The sparkle at the left, below the yellow star and the toolbox: white in A, yellow in B.
    { x: 357, y: 969, r: 85 },
    // The biggest asteroid at the lower right: brown in A, dark grey in B.
    { x: 2298, y: 1306, r: 85 },
    // The asteroid at the bottom, below the pale moon: brown in A, orange-red in B.
    { x: 2045, y: 1502, r: 62 },
    // The nose and fins of the rocket at the bottom left: blue in A, red in B.
    { x: 453, y: 1374, r: 105 },
  ],
}
