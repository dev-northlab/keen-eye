import type { Level } from '../../engine/types.ts'

// Since the game's pictures became AVIF crf 26, the left side shows that game file; the WebP original it was
// compared from is kept in ~/Pictures/keen-eye/levels/redesign/.
// Picture size test: level 46's 3D picture A on both sides — the original (public/levels/redesign/, 2624 px wide,
// WebP q88) on the left, the same made smaller for the app's download size (1800 px wide, WebP q80, public/levels/test/)
// on the right, stretched over the same viewBox, to compare on a phone (zoom in). Nothing differs, so the one zone is
// level 46's first difference's place (the white smoke over the chimney, only in a): tap it to finish.
const level: Level = {
  id: 1004,
  chapter: 'test',
  title: 'rangerCabin',
  kind: 'image',
  imageA: 'levels/redesign/level-046-a.avif',
  imageB: 'levels/test/level-046-1800-q80-a.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [{ x: 1534, y: 536, r: 215 }],
  parTimeSec: 60,
  multiplayerReady: false,
  testLabels: ['AVIF 2624 crf26 (game) · 214 KB', 'WebP 1800 q80 · 161 KB'],
}

export default level
