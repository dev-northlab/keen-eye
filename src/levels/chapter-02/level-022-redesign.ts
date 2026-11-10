import type { LevelPictures } from '../../engine/types.ts'

// Level 22 ("cafe") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the cup on the hanging
// sign turns red, the menu board's frame turns blue, the red parasol gets white panels, the steam over the middle cup
// is gone, the cup on the right table turns yellow, the black cat turns ginger, the big plant's pot turns blue. Touched
// up by hand: B is A with only Gemini's sign cup, parasol, right cup, cat and pot laid over it. Gemini drew a new
// menu board (another shape, with chalk writing, over the skateboard) and kept the steam (those stay as in A): the
// board's own frame is recolored blue by hand, and the steam painted out with the wall beside it.
export const level022Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-022-a.avif',
  imageB: 'levels/redesign/level-022-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The cup on the brown hanging sign over the windows: white in A, red in B.
    { x: 1316, y: 842, r: 60 },
    // The parasol over the left table: all red in A, red and white in B.
    { x: 654, y: 920, r: 200 },
    // The cat on the right window box: black in A, ginger in B.
    { x: 2148, y: 1024, r: 66 },
    // The frame of the menu board on the left: brown in A, blue in B.
    { x: 294, y: 1062, r: 100 },
    // The steam over the cup on the middle table, only in A.
    { x: 1188, y: 1124, r: 60 },
    // The cup on the right table: blue in A, yellow in B.
    { x: 1704, y: 1176, r: 60 },
    // The pot of the big plant on the right: terracotta in A, blue in B.
    { x: 2400, y: 1206, r: 70 },
  ],
}
