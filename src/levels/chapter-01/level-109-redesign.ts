import type { LevelPictures } from '../../engine/types.ts'

// Level 109 ("creekMill") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. The drawn scene's differences, smaller where they can be: the duckling, which
// bobs faster in the drawn scene, turns white, and the jumping fish, which leaps on picture B only, turns silver-grey
// (pictures do not move); the left window's left shutter turns red; a cattail loses its head; a frog sits on a lily
// pad; the lowest lily pad turns brown instead of growing; the railing loses a post; the signpost's arrow turns green
// instead of tilting; the right flour sack's diamond turns blue instead of moving. Touched up by hand: B is A with
// only Gemini's shutter, cattail, frog, brown lily pad, post, arrow, fish and diamond laid over it. Gemini also turned
// the window's right shutter red, added a brown leaf on the water and a white duck, and cut the railing's top rail
// with the post (those stay as in A), and left the duckling yellow: it is painted white with its shading kept. The
// cattail that lost its head is the tall one in the middle of the group, not the leftmost one the prompt named.
export const level109Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-109-a.avif',
  imageB: 'levels/redesign/level-109-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The left shutter of the mill's left window: blue in A, red in B.
    { x: 499, y: 662, r: 73 },
    // The tall cattail in the middle of the group at the bottom left: its head only in A.
    { x: 118, y: 1270, r: 82 },
    // A frog on the lily pad right of the pink flower, only in B.
    { x: 859, y: 1474, r: 95 },
    // The lowest lily pad near the bank: green in A, brown in B.
    { x: 1120, y: 1542, r: 119 },
    // A post of the railing behind the bridge, only in A.
    { x: 1966, y: 1172, r: 73 },
    // The signpost's arrow board: wooden in A, green in B.
    { x: 1509, y: 1154, r: 102 },
    // The rightmost duckling: yellow in A, white in B.
    { x: 1864, y: 1499, r: 73 },
    // The fish jumping out of the water: orange in A, silver-grey in B.
    { x: 2400, y: 1456, r: 114 },
    // The diamond on the right flour sack: yellow in A, blue in B.
    { x: 478, y: 1294, r: 73 },
  ],
}
