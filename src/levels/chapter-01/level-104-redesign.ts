import type { LevelPictures } from '../../engine/types.ts'

// Level 104 ("beeYard") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. The drawn scene's differences, smaller where they can be: the windsock, which
// flaps faster in the drawn scene, gets blue stripes, and the bee above the blue hive, which hovers faster, turns red
// (pictures do not move); the beekeeper's veil turns light blue; the jar's lid turns blue; the dipper is gone instead
// of leaning; the bee on the left daisy as drawn; the right daisy turns pink instead of growing; the smoker turns
// red instead of moving. Touched up by hand: Gemini's A had no beekeeper, its B added him, so both pictures got B's
// beekeeper, A with a dark grey veil; B is that A with only Gemini's windsock, veil, lid, daisy and smoker laid over
// it. Gemini left the bee yellow, the dipper and the bee on the daisy in place and redrew the grass: the bee is
// recoloured red with its shading kept, the dipper painted over with the hive, bench and lid beside it, and the bee
// on the daisy with the grass beside it and the right daisy's top petals.
export const level104Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-104-a.webp',
  imageB: 'levels/redesign/level-104-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The windsock's stripes: orange in A, blue in B.
    { x: 2489, y: 487, r: 80 },
    // The bee above the blue hive: yellow in A, red in B.
    { x: 1109, y: 937, r: 73 },
    // The beekeeper's mesh veil: dark grey in A, light blue in B.
    { x: 2245, y: 778, r: 92 },
    // The leftmost honey jar's lid: red in A, blue in B.
    { x: 367, y: 1280, r: 73 },
    // The wooden dipper in the rightmost honey jar, only in A.
    { x: 690, y: 1236, r: 73 },
    // The bee on the left daisy, only in A.
    { x: 998, y: 1465, r: 73 },
    // The right daisy's petals: white in A, pink in B.
    { x: 1379, y: 1514, r: 73 },
    // The bee smoker's bellows: grey in A, red in B.
    { x: 2393, y: 1383, r: 92 },
  ],
}
