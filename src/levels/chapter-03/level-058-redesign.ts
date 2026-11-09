import type { LevelPictures } from '../../engine/types.ts'

// Level 58 ("beeTree") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the two leaves on
// the twig at the end of the left branch turn yellow, a small red bird sits on the end of the right branch, the honey
// cap over the hollow is gone, the honeycomb above the hollow loses its middle cell, the drop under the small
// honeycomb is gone, one of the three bees right of the trunk is gone, the bear's ears turn black and the pink flower
// at the bottom left purple. B is A with only these changes of Gemini's laid over it (the leaves, the bird, the cap,
// the cell); it also redrew the honey running out of the hollow and the small honeycomb, and gave the bear big new
// ears (all left out), so four are done by hand on A's picture: the drop painted out with the bark beside it, the bee
// with the sky around it, the ears and the flower recoloured with their shading kept.
export const level058Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-058-a.webp',
  imageB: 'levels/redesign/level-058-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The two leaves on the twig at the end of the left branch: green in A, yellow in B.
    { x: 838, y: 460, r: 60 },
    // A small red bird on the end of the right branch, only in B.
    { x: 1858, y: 536, r: 60 },
    // The yellow honey cap over the dark hollow, only in A.
    { x: 1308, y: 920, r: 71 },
    // The middle cell of the honeycomb above the hollow, only in A.
    { x: 1298, y: 736, r: 68 },
    // The honey drop under the small honeycomb below the hollow, only in A.
    { x: 1378, y: 1146, r: 60 },
    // The right bee of the three right of the trunk, only in A.
    { x: 1709, y: 828, r: 60 },
    // The brown bear's ears: brown in A, black in B.
    { x: 1846, y: 1390, r: 60 },
    // The flower at the bottom left: pink in A, purple in B.
    { x: 722, y: 1524, r: 60 },
  ],
}
