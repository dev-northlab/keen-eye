import type { LevelPictures } from '../../engine/types.ts'

// Level 128 ("fireflyNight") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the small
// star below the moon goes, a second bat flies, the owl's eyes turn green, a lily pad yellow-brown, the frog's throat
// pink-red, the second glowing mushroom's cap blue, the rightmost purple mushroom loses its spots, the lower hedgehog's
// spines turn light grey and a firefly above the fir tops goes. B is A with only these changes of Gemini's laid over
// it; it took away the big yellow star (kept: too easy to see), so the small star is painted out with the sky by hand,
// and it turned the third mushroom blue instead of the second (left out), so the second one's teal cap and glow are
// recoloured blue by hand.
export const level128Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-128-a.avif',
  imageB: 'levels/redesign/level-128-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The small star below the moon, only in A.
    { x: 1938, y: 516, r: 73 },
    // The second bat, only in B.
    { x: 1008, y: 296, r: 85 },
    // The owl's eyes: yellow in A, green in B.
    { x: 492, y: 484, r: 73 },
    // A lily pad left of the pale stone: green in A, yellow-brown in B.
    { x: 1636, y: 1296, r: 73 },
    // The throat of the frog in the water: pale in A, pink-red in B.
    { x: 2040, y: 1385, r: 80 },
    // The cap of the second glowing mushroom: teal in A, blue in B.
    { x: 500, y: 1476, r: 73 },
    // The white spots on the rightmost purple mushroom, only in A.
    { x: 768, y: 1492, r: 73 },
    // The spines of the lower hedgehog: brown in A, light grey in B.
    { x: 1340, y: 1508, r: 90 },
    // A firefly above the fir tops, only in A.
    { x: 980, y: 816, r: 73 },
  ],
}
