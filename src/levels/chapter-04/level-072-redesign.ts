import type { LevelPictures } from '../../engine/types.ts'

// Level 72 ("whale") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the lower of the two
// gulls by the sun is gone, the flag on the sailboat's mast turns blue, the whale's spout is shorter, its tail fluke dark
// navy, the light spot in front of its eye is gone, a second pale curved line runs under the one on its head, the yellow
// fish at the bottom left turns red, the pink fish's tail yellow, the bigger green fish purple and a small orange fish
// swims in the bottom left corner. B is A with only these changes laid over it. Fixed by hand: Gemini redrew the eye
// bigger with a white and added a mouth line, so A's eye stays and the spot is covered with A's own skin; it also drew
// a new, bigger fluke, so A's own fluke is painted navy instead; its spout is about three quarters, not half, of A's.
export const level072Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-072-a.webp',
  imageB: 'levels/redesign/level-072-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The lower of the two gulls next to the sun, only in A.
    { x: 1966, y: 416, r: 60 },
    // The small flag on top of the sailboat's mast: red in A, blue in B.
    { x: 2259, y: 555, r: 60 },
    // The whale's water spout: tall in A, shorter in B.
    { x: 1131, y: 974, r: 115 },
    // The whale's tail fluke: blue in A, dark navy in B.
    { x: 1705, y: 1164, r: 95 },
    // The light round spot in front of the whale's eye, only in A.
    { x: 978, y: 1163, r: 60 },
    // A second pale curved line under the one on the whale's head, only in B.
    { x: 1219, y: 1181, r: 102 },
    // The fish at the bottom left, right of the blue fish: yellow in A, red in B.
    { x: 650, y: 1452, r: 97 },
    // The tail of the pink fish at the bottom right: pink in A, yellow in B.
    { x: 1916, y: 1501, r: 72 },
    // The bigger fish at the left: green in A, purple in B.
    { x: 330, y: 1339, r: 103 },
    // A small orange fish in the bottom left corner, only in B.
    { x: 144, y: 1551, r: 60 },
  ],
}
