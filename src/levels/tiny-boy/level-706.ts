import type { Level } from '../../engine/types.ts'

// "Tiny boy" 6: the boy in his toy buggy in the spring yard, toys all around (public/levels/tiny-boy/, Gemini,
// 2752×1536), seven differences. B is A with only the listed parts taken from Gemini's B (feathered masks); it also
// turned the wisteria arch and the lavender red and redrew the flower beds, all left as in A. Two it got wrong were done
// by hand: it left the wooden horse's tail (painted out with a smooth fill from the paving round it, the rump kept) and
// turned a bee into a yellow butterfly instead of the purple one (the bee stays, the purple butterfly turned yellow).
// Zones measured on the pixel difference.
const level: Level = {
  id: 706,
  chapter: 'tinyBoy',
  title: 'toyYard',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-706-a.webp',
  imageB: 'levels/tiny-boy/level-706-b.webp',
  viewBox: { w: 2752, h: 1536 },
  differences: [
    // The spinning top's tip: red in A, blue in B.
    { x: 1784, y: 1329, r: 60 },
    // The ladder on the toy fire truck's roof, only in A.
    { x: 2211, y: 1074, r: 118 },
    // The little robot's antenna, only in A.
    { x: 2426, y: 1068, r: 60 },
    // One ear of the teddy bear on the flower pot, only in A.
    { x: 170, y: 882, r: 95 },
    // The wooden horse's tail, only in A.
    { x: 2650, y: 1377, r: 60 },
    // The small toy car by the kite: red in A, orange in B.
    { x: 1653, y: 1299, r: 65 },
    // A butterfly by the roof: purple in A, yellow in B.
    { x: 1734, y: 412, r: 60 },
  ],
  parTimeSec: 75,
  multiplayerReady: true,
}

export default level
