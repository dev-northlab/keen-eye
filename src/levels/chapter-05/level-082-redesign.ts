import type { LevelPictures } from '../../engine/types.ts'

// Level 82 ("moonBase") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): a sparkle in the sky
// goes, a small green island shows on the Earth, the satellite's left solar panel turns red, the dish antenna loses its
// red tip, the left potted tree in the big dome its crown, the small dome's glass turns pink, the flag blue, the lower
// astronaut's visor light blue, the rover's stripe red, and a crater on the ground goes. B is A with only Gemini's
// island, panel, tree, dome, flag, visor and stripe laid over it. Fixed by hand: Gemini also took away the top right
// sparkle and darkened the sky round the third one, so only the third is painted out, with A's star field; it only made
// the dish's tip smaller, so the tip and its red glow are painted out with the ground and sky behind, the rod kept; it
// reshaped the crater instead of removing it, so A's crater is covered with the ground beside it. Its re-noised ground,
// pebbles and solar panel are left out.
export const level082Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-082-a.avif',
  imageB: 'levels/redesign/level-082-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The third of the four white sparkles in the sky, only in A.
    { x: 1641, y: 192, r: 75 },
    // A small green island on the Earth, below the big continent, only in B.
    { x: 2040, y: 408, r: 60 },
    // The left solar panel of the big satellite: blue in A, red in B.
    { x: 896, y: 393, r: 60 },
    // The red tip on top of the dish antenna at the left, only in A.
    { x: 262, y: 892, r: 60 },
    // The round green crown of the left potted tree in the big dome, only in A.
    { x: 566, y: 975, r: 65 },
    // The glass of the small dome: clear in A, pink in B.
    { x: 1050, y: 1020, r: 140 },
    // The flag: red in A, blue in B.
    { x: 1421, y: 939, r: 60 },
    // The visor of the lower astronaut, right of the flag: yellow in A, light blue in B.
    { x: 1551, y: 1238, r: 60 },
    // The stripe on top of the rover: blue in A, red in B.
    { x: 1802, y: 1154, r: 60 },
    // The crater on the ground below the lower astronaut, only in A.
    { x: 1546, y: 1515, r: 115 },
  ],
}
