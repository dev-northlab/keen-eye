import type { Level } from '../../engine/types.ts'

// "Tiny boy" 14: the boy running along a sunny street past a red house, a ball rolling ahead of him
// (public/levels/tiny-boy/, Gemini, 2752×1536), seven differences. Six are Gemini's; B is A with only those parts taken
// from its B (feathered masks). Its B also turned the yellow gate green and changed the flowers of the window boxes,
// left as in A; the bird it took off the wire left a faint ghost, painted over with the sky of its row. The window box
// is removed by hand (Gemini kept it): the siding rebuilt from the wall beside it, the window's lower panes continued
// and closed with its top frame mirrored. The cat on the wall, the last of the list, has no tail to take in A: dropped.
// Zones measured on the pixel difference.
const level: Level = {
  id: 714,
  chapter: 'tinyBoy',
  title: 'sunnyStreet',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-714-a.avif',
  imageB: 'levels/tiny-boy/level-714-b.avif',
  viewBox: { w: 2752, h: 1536 },
  differences: [
    // The monster truck on his sweatshirt: red in A, blue in B.
    { x: 1438, y: 956, r: 73 },
    // The ball in front of him: red in A, yellow in B.
    { x: 1233, y: 1275, r: 101 },
    // The two small sunflowers by the mailbox, only in A.
    { x: 1914, y: 813, r: 99 },
    // The window box under the left window of the red house, only in A.
    { x: 1736, y: 660, r: 98 },
    // The kite in the sky: blue, green, red and yellow in A, purple and pink in B.
    { x: 884, y: 234, r: 132 },
    // The blue bird on the wire, only in A.
    { x: 1484, y: 293, r: 60 },
    // The gate on the left: blue in A, green in B.
    { x: 168, y: 714, r: 200 },
  ],
  parTimeSec: 90,
  multiplayerReady: true,
}

export default level
