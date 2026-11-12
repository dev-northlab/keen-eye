import type { Level } from '../../engine/types.ts'

// "Tiny boy" 12: the boy sitting in the autumn leaves under a big tree (public/levels/tiny-boy/, Gemini, cut to 16:9
// from its 1792×2400 portrait picture, rows 620–1628), eight differences. Four are Gemini's; B is A with only those
// parts taken from its B (feathered masks). Its other ones (the birdhouse, the ladybird, falling leaves) fell outside
// the frame; two of them were brought back inside by hand: its biggest falling leaf moved down into the haze on the
// right, and A's ladybird set on a pale leaf at the bottom left. The truck and the squirrel are recoloured by hand,
// shading kept, one white dot on each of the two mushrooms at the bottom edge is filled with its cap, and the upper
// pine cone by the mushroom is covered with the leaves beside it. Zones measured on the pixel difference.
const level: Level = {
  id: 712,
  chapter: 'tinyBoy',
  title: 'autumnLeaves',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-712-a.avif',
  imageB: 'levels/tiny-boy/level-712-b.avif',
  viewBox: { w: 1792, h: 1008 },
  differences: [
    // The basket of apples by the tree: in A; a big orange mushroom in its place in B.
    { x: 1530, y: 664, r: 176 },
    // The stripes of his jumper: red in A, black in B.
    { x: 884, y: 540, r: 117 },
    // The toy truck: red-brown in A, blue in B.
    { x: 1204, y: 886, r: 102 },
    // The squirrel at the foot of the tree: red in A, grey in B.
    { x: 820, y: 124, r: 91 },
    // A falling leaf in the haze on the right, only in B.
    { x: 1610, y: 88, r: 67 },
    // A ladybird on a pale leaf at the bottom left, only in B.
    { x: 296, y: 896, r: 60 },
    // The upper pine cone by the mushroom, only in A.
    { x: 1285, y: 652, r: 61 },
    // One white dot on each of the two mushrooms at the bottom edge, only in A (one zone: the mushrooms touch).
    { x: 1332, y: 994, r: 60 },
  ],
  parTimeSec: 90,
  multiplayerReady: true,
}

export default level
