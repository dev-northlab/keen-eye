import type { Level } from '../../engine/types.ts'

// "Tiny boy" 3: the boy in his pushchair at the park with a juice box (public/levels/tiny-boy/, Gemini, 2752×1536),
// thirteen differences. Six are Gemini's own (B is A with only those parts taken from its B, feathered masks; its
// re-rendered butterflies and the toy plane's propeller are left as in A); seven small, hard ones are recoloured by
// hand, shading kept. Zones measured on the pixel difference.
const level: Level = {
  id: 703,
  chapter: 'tinyBoy',
  title: 'parkPushchair',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-703-a.avif',
  imageB: 'levels/tiny-boy/level-703-b.avif',
  viewBox: { w: 2752, h: 1536 },
  differences: [
    // The squirrel on the tree trunk, only in A.
    { x: 268, y: 452, r: 128 },
    // The ice cream cart's umbrella: red and white in A, yellow and white in B.
    { x: 2401, y: 478, r: 164 },
    // The balloon by the bench: rainbow in A, purple in B.
    { x: 1842, y: 646, r: 75 },
    // The right one of the two pigeons, only in A.
    { x: 1208, y: 858, r: 60 },
    // His drinking straw: white in A, pink in B.
    { x: 1384, y: 916, r: 80 },
    // The little robot's eyes: black in A, red in B.
    { x: 2328, y: 1300, r: 60 },
    // The ladybug on a leaf, bottom left: red in A, yellow in B.
    { x: 99, y: 1441, r: 60 },
    // The spinning top's handle: red in A, blue in B.
    { x: 759, y: 978, r: 60 },
    // The rubber duck's wheels: red in A, blue in B.
    { x: 1093, y: 1058, r: 80 },
    // One panel of the kite in the sky: orange in A, green in B.
    { x: 985, y: 165, r: 60 },
    // The small toy car by the sandbox: blue in A, green in B.
    { x: 2247, y: 903, r: 65 },
    // The flower on the green bin: cream in A, pink in B.
    { x: 2624, y: 813, r: 60 },
    // The ice cream on the cart: pink in A, mint in B.
    { x: 2304, y: 726, r: 60 },
  ],
  parTimeSec: 120,
  multiplayerReady: true,
}

export default level
