import type { LevelPictures } from '../../engine/types.ts'

// Level 73 ("island") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the highest gull on the
// right gets black wing tips, the parrot's head turns red, the coconut hanging alone on its string green, the crab
// yellow, the starfish purple, the orange shell between the campfire and the starfish white, the grey rock at the left
// end of the island gets green moss, the raft's sail turns red and the tilted bottle on the left green. B is A with only
// these changes of Gemini's laid over it (it did all nine; its black wing tips on the other two gulls, redrawn palm
// leaves and surf are left out).
export const level073Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-073-a.avif',
  imageB: 'levels/redesign/level-073-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The wing tips of the highest of the three gulls on the right: white in A, black in B.
    { x: 2231, y: 347, r: 63 },
    // The head of the parrot in the big palm: green in A, red in B.
    { x: 1468, y: 560, r: 60 },
    // The coconut hanging alone under the big palm's crown: brown in A, green in B.
    { x: 1126, y: 869, r: 60 },
    // The crab: red in A, yellow in B.
    { x: 1547, y: 1061, r: 91 },
    // The starfish on the island: orange in A, purple in B.
    { x: 1899, y: 1092, r: 91 },
    // The shell between the campfire and the starfish: orange in A, white in B.
    { x: 1709, y: 1128, r: 79 },
    // The grey rock at the left end of the island: bare in A, mossy on top in B.
    { x: 463, y: 1113, r: 160 },
    // The sail of the wooden raft: cream in A, red in B.
    { x: 2343, y: 1314, r: 100 },
    // The tilted bottle with a cork on the left: clear in A, green in B.
    { x: 380, y: 1383, r: 66 },
  ],
}
