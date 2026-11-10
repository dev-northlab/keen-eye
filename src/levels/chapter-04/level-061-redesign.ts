import type { LevelPictures } from '../../engine/types.ts'

// Level 61 ("beach") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the flying gull's wing
// tips turn black, the left half of the red parasol green, the blue stripes of the towel pink, the teal top of the
// woman at the bottom right red, the sandcastle's flag blue, the red half of the beach ball yellow, the crab blue, the
// starfish left of the middle red and the shell right of the beach ball purple. B is A with only these changes of
// Gemini's laid over it (the gull, the parasol, the towel, the flag, the ball, the crab); it also turned the purple
// towel blue (left out) and left the rest undone, so three are recoloured by hand on A's picture: the woman's top, the
// starfish and the shell.
export const level061Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-061-a.avif',
  imageB: 'levels/redesign/level-061-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The wing tips of the gull flying under the cloud: small grey tips in A, big black tips in B.
    { x: 663, y: 274, r: 103 },
    // The left half of the red parasol on the left: red in A, green in B.
    { x: 642, y: 1105, r: 127 },
    // The stripes of the towel on the left: blue in A, pink in B.
    { x: 792, y: 1370, r: 118 },
    // The top of the woman at the bottom right: teal in A, red in B.
    { x: 2362, y: 1484, r: 68 },
    // The small flag on the sandcastle: red in A, blue in B.
    { x: 1377, y: 1103, r: 60 },
    // The upper half of the beach ball: red in A, yellow in B.
    { x: 1313, y: 1435, r: 60 },
    // The crab: red in A, blue in B.
    { x: 1838, y: 1502, r: 82 },
    // The starfish left of the middle: orange in A, red in B.
    { x: 986, y: 1536, r: 60 },
    // The shell at the bottom, right of the beach ball: orange in A, purple in B.
    { x: 1640, y: 1539, r: 60 },
  ],
}
