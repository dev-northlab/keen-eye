import type { Level } from '../../engine/types.ts'

// Picture size test: level 21's 3D picture A on both sides — the original (public/levels/redesign/, 2624 px wide,
// WebP q88) on the left, the same made smaller for the app's download size (1800 px wide, WebP q80, public/levels/test/)
// on the right, stretched over the same viewBox, to compare on a phone (zoom in). Nothing differs, so the one zone is
// level 21's first difference's place (the middle stripe of the awning over the teal door): tap it to finish.
const level: Level = {
  id: 1003,
  chapter: 'test',
  title: 'shopStreet',
  kind: 'image',
  imageA: 'levels/redesign/level-021-a.webp',
  imageB: 'levels/test/level-021-1800-q80-a.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [{ x: 958, y: 952, r: 66 }],
  parTimeSec: 60,
  multiplayerReady: false,
  testLabels: ['WebP 2624 q88 · 855 KB', 'WebP 1800 q80 · 229 KB'],
}

export default level
