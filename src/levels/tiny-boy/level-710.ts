import type { Level } from '../../engine/types.ts'

// "Tiny boy" 10: the boy driving a bumper car at the fair (public/levels/tiny-boy/, Gemini, 2752×1536), seven
// differences, all Gemini's. B is A with only those parts taken from its B (feathered masks); it also turned the blue
// pennant red and the other toy in a car into a bunny, both left as in A. Zones measured on the pixel difference.
const level: Level = {
  id: 710,
  chapter: 'tinyBoy',
  title: 'bumperCars',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-710-a.avif',
  imageB: 'levels/tiny-boy/level-710-b.avif',
  viewBox: { w: 2752, h: 1536 },
  differences: [
    // A traffic cone on the track behind his car, only in B.
    { x: 1921, y: 900, r: 91 },
    // A chrome badge on the bonnet and the right headlight, only in B.
    { x: 1792, y: 1052, r: 106 },
    // His steering wheel: red in A, black in B.
    { x: 1464, y: 909, r: 128 },
    // The balloon at the top: green in A, blue and pink in B.
    { x: 558, y: 64, r: 69 },
    // A rocket drawn on the leftmost fence panel, only in B.
    { x: 41, y: 716, r: 89 },
    // A yellow star drawn on the fence above the teddy bear, only in B.
    { x: 452, y: 768, r: 60 },
    // The toy in the green and pink car: no ears in A, bunny ears in B.
    { x: 2283, y: 742, r: 75 },
  ],
  parTimeSec: 90,
  multiplayerReady: true,
}

export default level
