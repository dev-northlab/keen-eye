import type { Level } from '../../engine/types.ts'

// "Tiny boy" 9: the boy drawing on his tablet among his toys in the living room (public/levels/tiny-boy/, Gemini,
// 2752×1536), seven small differences. Only the pig is Gemini's (it turned both pigs of the puzzle white; the other
// one is A's again). The rest it got wrong (both stripes off one sock, the whole stacking toy and xylophone recoloured,
// the beak, crayon and ear left as they were) and were done by hand: the outer stripe of his right sock filled with the
// sock's colour round it (keeping its own knit), the lowest green ring and the green xylophone bar recoloured, the
// duck's beak recoloured inside its outline, the red crayon and its shadow painted out (a smooth fill from the carpet
// plus the carpet's texture), and the teddy bear's left ear filled with the sofa fabric beside it. Zones measured on the
// pixel difference.
const level: Level = {
  id: 709,
  chapter: 'tinyBoy',
  title: 'livingRoomToys',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-709-a.webp',
  imageB: 'levels/tiny-boy/level-709-b.webp',
  viewBox: { w: 2752, h: 1536 },
  differences: [
    // One blue stripe on his right sock, only in A.
    { x: 1278, y: 1142, r: 60 },
    // The pig in the middle of the farm puzzle: pink in A, white in B.
    { x: 699, y: 1103, r: 60 },
    // The lowest green ring of the stacking toy: green in A, orange in B.
    { x: 224, y: 1291, r: 95 },
    // A xylophone bar: green in A, pink in B.
    { x: 650, y: 1358, r: 62 },
    // The rubber duck's beak: orange in A, yellow in B.
    { x: 2118, y: 1091, r: 60 },
    // The red crayon on the carpet, only in A.
    { x: 1293, y: 1284, r: 70 },
    // The left ear of the teddy bear on the sofa, only in A.
    { x: 2365, y: 479, r: 60 },
  ],
  parTimeSec: 90,
  multiplayerReady: true,
}

export default level
