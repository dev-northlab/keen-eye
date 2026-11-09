import type { LevelPictures } from '../../engine/types.ts'

// Level 121 ("autumnGlade") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the red
// leaf hanging from the maple's long branch turns yellow, the tail of the squirrel on the left birch grey, the trail
// marker's stripe blue, the high bracket fungus on the middle birch goes, one leaf in the big pile turns green, the
// right acorn of three on the stump goes, an orange mushroom grows beside the red-and-white one and the hedgehog
// carries an apple. B is A with only these changes of Gemini's laid over it; it also took the lower fungus off the
// middle birch, painted a second blue stripe there and swapped the two small yellow mushrooms for a brown one (all
// left out), and hung a new yellow leaf at the branch's end beside the red one, so the red leaf is recoloured by hand.
export const level121Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-121-a.webp',
  imageB: 'levels/redesign/level-121-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The leaf hanging from the maple's long branch: red in A, yellow in B.
    { x: 696, y: 768, r: 73 },
    // The tail of the squirrel on the left birch: orange in A, grey in B.
    { x: 2164, y: 970, r: 78 },
    // The stripe of the trail marker on the middle birch: red in A, blue in B.
    { x: 2329, y: 1210, r: 73 },
    // The bracket fungus high on the middle birch, only in A.
    { x: 2307, y: 305, r: 73 },
    // One leaf in the middle of the big pile: green in B.
    { x: 562, y: 1411, r: 75 },
    // The right acorn of the three on the stump, only in A.
    { x: 1127, y: 1468, r: 73 },
    // The orange mushroom right of the red-and-white one, only in B.
    { x: 1431, y: 1537, r: 77 },
    // The apple on the hedgehog's back, only in B.
    { x: 1816, y: 1439, r: 73 },
  ],
}
