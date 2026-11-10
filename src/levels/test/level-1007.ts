import type { Level } from '../../engine/types.ts'

// Picture format test: level 21's 3D picture A on both sides — the original (public/levels/redesign/, WebP q88, 2624 px
// wide) on the left, the same in AVIF at the same size (crf 26, made from that WebP with ffmpeg's libaom-av1,
// public/levels/test/) on the right, to compare on a phone (zoom in) and see how fast it opens. Nothing differs, so
// the one zone is level 21's first difference's place (the middle stripe of the awning over the teal door): tap it to finish.
const level: Level = {
  id: 1007,
  chapter: 'test',
  title: 'shopStreet',
  kind: 'image',
  imageA: 'levels/redesign/level-021-a.webp',
  imageB: 'levels/test/level-021-2624-crf26-a.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [{ x: 958, y: 952, r: 66 }],
  parTimeSec: 60,
  multiplayerReady: false,
  testLabels: ['WebP 2624 q88 · 855 KB', 'AVIF 2624 crf26 · 288 KB'],
}

export default level
