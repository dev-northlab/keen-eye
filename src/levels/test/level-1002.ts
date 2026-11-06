import type { Level } from '../../engine/types.ts'

// Farm level 1 ("barnyard", chapter-01/level-001.ts) redrawn as two ready pictures (public/levels/test/), the
// zones measured on their pixel difference, in image pixels (viewBox = image size). The same differences as level 1,
// except the last: there the hen turns around, here a second hen appears.
const level: Level = {
  id: 1002,
  chapter: 'test',
  title: 'barnyard',
  kind: 'image',
  imageA: 'levels/test/farmyard-a.jpg',
  imageB: 'levels/test/farmyard-b.jpg',
  viewBox: { w: 1200, h: 896 },
  differences: [
    // The sun: yellow in A, orange in B.
    { x: 1051, y: 143, r: 72 },
    // The big cloud in the middle of the sky, only in A.
    { x: 600, y: 108, r: 110 },
    // The barn's right window, only in A.
    { x: 968, y: 452, r: 50 },
    // The haystack by the barn with its shadow, only in A.
    { x: 1095, y: 632, r: 110 },
    // A chicken by the fence on the left, only in B.
    { x: 255, y: 720, r: 60 },
  ],
  parTimeSec: 60,
  multiplayerReady: false,
}

export default level
