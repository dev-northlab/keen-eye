import type { Level } from '../../engine/types.ts'

// Picture size test: level 46's 3D picture A on both sides — the original (public/levels/redesign/, 2624 px wide,
// WebP q88) on the left, the same made smaller for the app's download size (1800 px wide, WebP q80, public/levels/test/)
// on the right, stretched over the same viewBox, to compare on a phone (zoom in). Nothing differs, so the one zone is
// level 46's first difference's place (the white smoke over the chimney, only in a): tap it to finish.
const level: Level = {
  id: 1004,
  chapter: 'test',
  title: 'rangerCabin',
  kind: 'image',
  imageA: 'levels/redesign/level-046-a.webp',
  imageB: 'levels/test/level-046-1800-q80-a.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [{ x: 1534, y: 536, r: 215 }],
  parTimeSec: 60,
  multiplayerReady: false,
  testLabels: ['WebP 2624 q88 · 500 KB', 'WebP 1800 q80 · 161 KB'],
}

export default level
