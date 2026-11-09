import type { Level } from '../../engine/types.ts'

// "Tiny boy" 1: the boy in the rose yard, pointing (public/levels/tiny-boy/, Gemini, 2752×1536). B is A with only the
// listed parts taken from Gemini's B (feathered masks): its B also dropped two more roses of the left bush and
// re-rendered the trunk, the flowers by the tree and his T-shirt print, all left as in A. Zones measured on the
// pixel difference.
const level: Level = {
  id: 701,
  chapter: 'tinyBoy',
  title: 'roseYard',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-701-a.webp',
  imageB: 'levels/tiny-boy/level-701-b.webp',
  viewBox: { w: 2752, h: 1536 },
  differences: [
    // The big orange rose low on the left bush, only in A.
    { x: 366, y: 1094, r: 100 },
    // The first T-shirt on the clothesline: pink in A, light green in B.
    { x: 1554, y: 434, r: 90 },
    // His pointing hand: one finger in A, two in B.
    { x: 1604, y: 884, r: 60 },
    // A butterfly on a red rose, only in B.
    { x: 1754, y: 514, r: 60 },
    // The bucket under the terrace: yellow in A, blue in B.
    { x: 2160, y: 736, r: 60 },
  ],
  parTimeSec: 60,
  multiplayerReady: false,
}

export default level
