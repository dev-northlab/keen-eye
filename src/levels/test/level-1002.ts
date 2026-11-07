import type { Level } from '../../engine/types.ts'

// Picture quality test: the same pond picture on both sides (public/levels/test/), Gemini's low resolution
// (1306×816, from its JPEG) as A and 2K (2048×1281) as B, both WebP q88, to compare on a phone. The low file is
// stretched over the 2K viewBox. Nothing differs, so the one zone is the rubber duck: tap it to finish.
const level: Level = {
  id: 1002,
  chapter: 'test',
  title: 'pond',
  kind: 'image',
  imageA: 'levels/test/pond-low.webp',
  imageB: 'levels/test/pond-2k.webp',
  viewBox: { w: 2048, h: 1281 },
  differences: [{ x: 640, y: 930, r: 110 }],
  parTimeSec: 60,
  multiplayerReady: false,
}

export default level
