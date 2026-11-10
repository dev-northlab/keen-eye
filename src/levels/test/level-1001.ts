import type { Level } from '../../engine/types.ts'

// Picture quality test: the same winter picture on both sides (public/levels/test/), 1K (1312×821) as A and
// 2K (2560×1601) as B, both WebP q88, to compare on a phone (zoom in: snowflakes, boards, icicles). The 1K file is
// stretched over the 2K viewBox. Nothing differs, so the one zone is the snowman: tap it to finish.
const level: Level = {
  id: 1001,
  chapter: 'test',
  title: 'winter',
  kind: 'image',
  imageA: 'levels/test/winter-1k.webp',
  imageB: 'levels/test/winter-2k.webp',
  viewBox: { w: 2560, h: 1601 },
  differences: [{ x: 480, y: 1380, r: 150 }],
  parTimeSec: 60,
  multiplayerReady: false,
  testLabels: ['WebP 1K 1312×821 q88 · 159 KB', 'WebP 2K 2560×1601 q88 · 378 KB'],
}

export default level
