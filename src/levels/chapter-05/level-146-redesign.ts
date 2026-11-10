import type { LevelPictures } from '../../engine/types.ts'

// Level 146 ("starNebula") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// constellation loses its top right star, the sparkle above the nebula turns pink, the spiral galaxy's arms blue, the
// pale star light blue, the bright star orange, a light blue sparkle shines above the rocket, the pulsar's beams turn
// pink, the ringed planet's ring silver, the small planet yellow and the ship's flame blue. B is A with only these
// changes of Gemini's laid over it. Fixed by hand: nothing to repaint; the removed star's glow is taken away with it,
// and Gemini's re-drawn constellation lines and nebula noise are left out.
export const level146Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-146-a.webp',
  imageB: 'levels/redesign/level-146-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The top right star of the constellation at the top left, only in A.
    { x: 590, y: 204, r: 73 },
    // The sparkle above the middle of the nebula: white in A, pink in B.
    { x: 1505, y: 492, r: 73 },
    // The arms of the spiral galaxy at the top right: purple in A, blue in B.
    { x: 2035, y: 358, r: 151 },
    // The pale yellow star above left of the bright star: pale yellow in A, light blue in B.
    { x: 981, y: 618, r: 73 },
    // The bright star in the middle of the nebula: yellow in A, orange in B.
    { x: 1309, y: 826, r: 73 },
    // A light blue sparkle at the left above the small white rocket, only in B.
    { x: 494, y: 924, r: 73 },
    // The two beams of the pulsar at the right: light blue in A, pink in B.
    { x: 2526, y: 805, r: 300 },
    // The ring of the orange ringed planet: gold in A, silver white in B.
    { x: 1706, y: 1186, r: 109 },
    // The small planet at the bottom left: green in A, yellow in B.
    { x: 785, y: 1313, r: 77 },
    // The engine flame of the small grey ship at the bottom right: orange in A, blue in B.
    { x: 2106, y: 1388, r: 94 },
  ],
}
