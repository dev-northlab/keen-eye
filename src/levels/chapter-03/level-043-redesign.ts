import type { LevelPictures } from '../../engine/types.ts'

// Level 43 ("beavers") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the dragonfly above
// the lodge turns red, the heron's beak black, the right log on top of the lodge is gone, the beaver on the left of the
// lodge is light brown, a leafy sprout grows on the floating log, the left lily flower turns yellow, an orange fish
// jumps out of the river and the middle cattail on the right loses its head. B is A with only these changes of
// Gemini's laid over it. Gemini's A has a second dragonfly (Gemini turned both red: the upper one stays blue); it left
// the beaver and the log: the beaver's fur is lightened by hand, and the log is painted out with the grass above it,
// the stick that went in under its end now ending in a rounded tip.
export const level043Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-043-a.avif',
  imageB: 'levels/redesign/level-043-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The lower dragonfly, above the lodge: blue in A, red in B.
    { x: 984, y: 967, r: 74 },
    // The long beak of the grey heron: orange in A, black in B.
    { x: 535, y: 865, r: 74 },
    // The right log of the two on top of the beaver lodge, only in A.
    { x: 1440, y: 1027, r: 80 },
    // The beaver on the left of the lodge: dark brown in A, light brown in B.
    { x: 819, y: 1158, r: 79 },
    // A small leafy sprout on the floating log, only in B.
    { x: 1862, y: 1323, r: 83 },
    // The flower on the left lily pad: pink in A, yellow in B.
    { x: 392, y: 1452, r: 74 },
    // A small orange fish jumping above the water, only in B.
    { x: 881, y: 1328, r: 78 },
    // The brown head of the middle cattail of the three on the right, only in A.
    { x: 2523, y: 1251, r: 74 },
  ],
}
