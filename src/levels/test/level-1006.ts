import type { Level } from '../../engine/types.ts'

// Since the game's pictures became AVIF crf 26, the left side shows that game file; the WebP original it was
// compared from is kept in ~/Pictures/keen-eye/levels/redesign/.
// Picture size test: level 21's 3D picture A on both sides — the original (public/levels/redesign/, 2624 px wide,
// WebP q88) on the left, the same made smaller for the app's download size (1600 px wide, WebP q72, public/levels/test/)
// on the right, stretched over the same viewBox, to compare on a phone (zoom in). Nothing differs, so the one zone is
// level 21's first difference's place (the middle stripe of the awning over the teal door): tap it to finish.
const level: Level = {
  id: 1006,
  chapter: 'test',
  title: 'shopStreet',
  kind: 'image',
  imageA: 'levels/redesign/level-021-a.avif',
  imageB: 'levels/test/level-021-1600-q72-a.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [{ x: 958, y: 952, r: 66 }],
  parTimeSec: 60,
  multiplayerReady: false,
  testLabels: ['AVIF 2624 crf26 (game) · 288 KB', 'WebP 1600 q72 · 141 KB'],
}

export default level
