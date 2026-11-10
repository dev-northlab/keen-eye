import type { LevelPictures } from '../../engine/types.ts'

// Level 112 ("cornerCafe") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// hanging basket's flowers turn from pink to white, the cup on the round cafe sign from white to red, the middle
// croissant in the bakery window is a chocolate one, a pigeon sits on the right awning, the right cup on the table of
// the man in yellow turns light blue, the backrest of the right chair at the middle table turns red, and the steam over
// the cups on the right table is gone. B is A with only these changes of Gemini's laid over it (Gemini drew the whole
// picture's textures anew, so only those places are taken). Gemini took the steam off both cups of the right table:
// they make one difference.
export const level112Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-112-a.avif',
  imageB: 'levels/redesign/level-112-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The flowers of the hanging basket under the second window: pink in A, white in B.
    { x: 992, y: 494, r: 115 },
    // The cup on the round cafe sign at the right corner: white in A, red in B.
    { x: 2386, y: 618, r: 74 },
    // A grey pigeon on the left part of the right awning, only in B.
    { x: 1560, y: 662, r: 74 },
    // The middle croissant of the three in the bakery window: golden in A, chocolate in B.
    { x: 598, y: 948, r: 74 },
    // The steam over the cups on the right table, only in A.
    { x: 2100, y: 1368, r: 110 },
    // The backrest of the right chair at the middle table: wicker brown in A, red in B.
    { x: 1526, y: 1414, r: 74 },
    // The right cup on the table of the man in yellow: white in A, light blue in B.
    { x: 626, y: 1390, r: 74 },
  ],
}
