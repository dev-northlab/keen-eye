import type { Level } from '../../engine/types.ts'

// Picture size test: level 64's 3D picture A on both sides — the original (public/levels/redesign/, 2624 px wide,
// WebP q88) on the left, the same made smaller for the app's download size (1800 px wide, WebP q80, public/levels/test/)
// on the right, stretched over the same viewBox, to compare on a phone (zoom in). Nothing differs, so the one zone is
// level 64's first difference's place (the right gull of the three flying left of the lighthouse): tap it to finish.
const level: Level = {
  id: 1005,
  chapter: 'test',
  title: 'lighthouse',
  kind: 'image',
  imageA: 'levels/redesign/level-064-a.webp',
  imageB: 'levels/test/level-064-1800-q80-a.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [{ x: 852, y: 582, r: 60 }],
  parTimeSec: 60,
  multiplayerReady: false,
}

export default level
