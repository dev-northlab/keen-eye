import type { LevelPictures } from '../../engine/types.ts'

// Level 123 ("woodlandLake") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the right
// duckling turns brown, a silver fish leaps out of the lake, the bigger water lily turns white, the life ring on the
// jetty post blue, the oar's blade blue, a shore rock moss green, the campfire's flame halves and the heron's beak
// turns black. B is A with only these changes of Gemini's laid over it; it also whitened the second lily, turned a
// plant into a mossy rock and painted the oar's handle tip blue (all left out), and left the flame as it was, so the
// flame is shrunk by hand: squashed to half its height over its own background.
export const level123Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-123-a.avif',
  imageB: 'levels/redesign/level-123-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The right duckling: yellow-green in A, brown in B.
    { x: 1540, y: 1100, r: 73 },
    // The silver fish leaping out of the lake, only in B.
    { x: 1884, y: 1004, r: 73 },
    // The bigger water lily: pink in A, white in B.
    { x: 1476, y: 1344, r: 73 },
    // The life ring on the jetty post: red in A, blue in B.
    { x: 588, y: 1204, r: 73 },
    // The blade of the oar in the rowboat: wood in A, blue in B.
    { x: 1132, y: 1308, r: 73 },
    // A rock on the shore: grey in A, moss green in B.
    { x: 716, y: 1572, r: 73 },
    // The campfire's flame: tall in A, half as tall in B.
    { x: 1968, y: 1418, r: 73 },
    // The heron's beak: yellow in A, black in B.
    { x: 2204, y: 1072, r: 73 },
  ],
}
