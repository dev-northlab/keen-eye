import type { Level } from '../../engine/types.ts'

// A cozy study with a fireplace and a spiral staircase: two ready pictures (public/levels/test/), the zones
// measured on their pixel difference, in image pixels (viewBox = image size).
const level: Level = {
  id: 1001,
  chapter: 'test',
  title: 'cozyStudy',
  kind: 'image',
  imageA: 'levels/test/study-a.webp',
  imageB: 'levels/test/study-b.webp',
  viewBox: { w: 1200, h: 896 },
  differences: [
    // The armchair: brown leather in A, green buttoned in B.
    { x: 488, y: 555, r: 135 },
    // A spider on the window frame, only in B.
    { x: 443, y: 262, r: 40 },
    // A candle on the staircase step, only in B.
    { x: 1020, y: 597, r: 60 },
  ],
  parTimeSec: 60,
  multiplayerReady: false,
}

export default level
