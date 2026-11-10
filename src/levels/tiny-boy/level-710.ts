import type { Level } from '../../engine/types.ts'

// "Tiny boy" 10: the boy by the slide of his backyard playground (public/levels/tiny-boy/, Gemini, 2400×1792), ten
// differences. Five were asked of Gemini; B is A with only those parts taken from its B (feathered masks), where it
// also re-rendered his eyes, the flower beds and the ring ropes, all left as in A. It took the left swing seat away
// with its ropes (the ropes are A's again, only the seat is gone) and turned the right ring yellow instead of taking it
// away (painted out by hand, row by row from the wood around it). The other five are small recolourings done by hand,
// shading kept. Zones measured on the pixel difference.
const level: Level = {
  id: 710,
  chapter: 'tinyBoy',
  title: 'backyardPlayground',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-710-a.avif',
  imageB: 'levels/tiny-boy/level-710-b.avif',
  viewBox: { w: 2400, h: 1792 },
  differences: [
    // The roof of the playground tower: blue in A, red in B.
    { x: 1234, y: 60, r: 330 },
    // The left swing seat, only in A (its ropes stay).
    { x: 612, y: 952, r: 95 },
    // The snowmobile by the house: blue in A, yellow in B.
    { x: 2160, y: 450, r: 180 },
    // A red ball on the grass by the slide, only in B.
    { x: 1052, y: 1295, r: 75 },
    // The right gymnastic ring, only in A.
    { x: 1545, y: 622, r: 60 },
    // His T-shirt sleeve: blue in A, green in B.
    { x: 1317, y: 847, r: 60 },
    // A rung of the rope ladder: yellow in A, red in B.
    { x: 1690, y: 664, r: 60 },
    // His shoes: white in A, red in B.
    { x: 1347, y: 1197, r: 65 },
    // A big petunia in front: white in A, yellow in B.
    { x: 1600, y: 1703, r: 60 },
    // A small flower by the wall behind the swings: red in A, blue in B.
    { x: 880, y: 772, r: 60 },
  ],
  parTimeSec: 90,
  multiplayerReady: true,
}

export default level
