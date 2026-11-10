import type { Level } from '../../engine/types.ts'

// Picture format test: level 64's 3D picture A on both sides — the original (public/levels/redesign/, WebP q88, 2624 px
// wide) on the left, the same in AVIF at the same size (crf 26, made from that WebP with ffmpeg's libaom-av1,
// public/levels/test/) on the right, to compare on a phone (zoom in) and see how fast it opens. Nothing differs, so
// the one zone is level 64's first difference's place (the right gull of the three flying left of the lighthouse): tap it to finish.
const level: Level = {
  id: 1011,
  chapter: 'test',
  title: 'lighthouse',
  kind: 'image',
  imageA: 'levels/redesign/level-064-a.webp',
  imageB: 'levels/test/level-064-2624-crf26-a.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [{ x: 852, y: 582, r: 60 }],
  parTimeSec: 60,
  multiplayerReady: false,
  testLabels: ['WebP 2624 q88 · 432 KB', 'AVIF 2624 crf26 · 156 KB'],
}

export default level
