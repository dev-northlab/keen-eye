import type { Level } from '../../engine/types.ts'

// Since the game's pictures became AVIF crf 26, the left side shows that game file; the WebP original it was
// compared from is kept in ~/Pictures/keen-eye/levels/redesign/.
// Picture format test: level 46's 3D picture A on both sides — the original (public/levels/redesign/, WebP q88, 2624 px
// wide) on the left, the same in AVIF at the same size (crf 32, made from that WebP with ffmpeg's libaom-av1,
// public/levels/test/) on the right, to compare on a phone (zoom in) and see how fast it opens. Nothing differs, so
// the one zone is level 46's first difference's place (the white smoke over the chimney, only in a): tap it to finish.
const level: Level = {
  id: 1010,
  chapter: 'test',
  title: 'rangerCabin',
  kind: 'image',
  imageA: 'levels/redesign/level-046-a.avif',
  imageB: 'levels/test/level-046-2624-crf32-a.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [{ x: 1534, y: 536, r: 215 }],
  parTimeSec: 60,
  multiplayerReady: false,
  testLabels: ['AVIF 2624 crf26 (game) · 214 KB', 'AVIF 2624 crf32 · 151 KB'],
}

export default level
