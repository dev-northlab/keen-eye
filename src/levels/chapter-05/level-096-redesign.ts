import type { LevelPictures } from '../../engine/types.ts'

// Level 96 ("nebula") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the small sparkle
// at the top goes, the top left star turns light blue, the teal planet orange, the comet's tail peach pink, the pink
// jellyfish yellow, the satellite's left panel green, the lower saucer loses its dome, the small yellow star right of
// the white star goes and the whale's tail fin turns purple. B is A with only these changes of Gemini's laid over it.
// Fixed by hand: Gemini took away another yellow star (near the rocket) instead, so the right one is taken off A (its
// glow subtracted, its body covered with the sky beside it); it also took the upper saucer's dome, left out.
export const level096Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-096-a.webp',
  imageB: 'levels/redesign/level-096-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The smaller white sparkle at the top, right of the big one, only in A.
    { x: 1540, y: 226, r: 60 },
    // The star at the top left: yellow in A, light blue in B.
    { x: 332, y: 258, r: 60 },
    // The planet at the top right: teal in A, orange in B.
    { x: 2418, y: 216, r: 135 },
    // The comet's long tail at the bottom left: pale blue in A, peach pink in B.
    { x: 784, y: 1454, r: 220 },
    // The lower jellyfish: pink in A, yellow in B.
    { x: 2084, y: 572, r: 115 },
    // The left solar panel of the satellite: blue in A, green in B.
    { x: 280, y: 756, r: 60 },
    // The glass dome of the lower flying saucer, only in A.
    { x: 2320, y: 1381, r: 82 },
    // The small glowing yellow star right of the white star at the bottom, only in A.
    { x: 1834, y: 1534, r: 75 },
    // The whale's tail fin: blue in A, purple in B.
    { x: 650, y: 918, r: 73 },
  ],
}
