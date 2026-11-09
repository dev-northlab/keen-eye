import type { LevelPictures } from '../../engine/types.ts'

// Level 124 ("mistyThicket") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the owl's
// eyes turn orange, the right bird on the branch blue, the long curved branch loses its forked tip, a black spider
// sits in the web, the right cluster of berries on the right bush turns purple, a fern at the bottom left yellow-brown,
// a second orange mushroom grows by the path and the smaller rock turns brown. B is A with only these changes of
// Gemini's laid over it; it cut the branch back far past the fork, so only the forked tip is taken from B, and made all
// the bush's berries purple, so only the right cluster is.
export const level124Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-124-a.webp',
  imageB: 'levels/redesign/level-124-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The owl's eyes: yellow in A, orange in B.
    { x: 297, y: 641, r: 73 },
    // The right bird on the branch: brown in A, blue in B.
    { x: 1093, y: 500, r: 73 },
    // The forked tip of the long curved branch, only in A.
    { x: 1568, y: 632, r: 85 },
    // The spider in the middle of the web, only in B.
    { x: 2133, y: 595, r: 73 },
    // The right cluster of berries on the right bush: red in A, purple in B.
    { x: 1856, y: 1423, r: 73 },
    // The fern at the bottom left: green in A, yellow-brown in B.
    { x: 200, y: 1400, r: 190 },
    // The second orange mushroom by the path, only in B.
    { x: 1188, y: 1460, r: 73 },
    // The smaller rock at the bottom right: grey in A, brown in B.
    { x: 2264, y: 1576, r: 75 },
  ],
}
