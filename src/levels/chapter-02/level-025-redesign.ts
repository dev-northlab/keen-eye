import type { LevelPictures } from '../../engine/types.ts'

// Level 25 ("construction") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// crane's hook turns red, the glazed window turns into an empty dark opening, the top brick of the pile is gone, the
// mixer's drum turns orange, the hard hat of the worker in orange turns red, the dump truck's cab turns green, the
// right cone of the two turns blue. Touched up by hand: B is A with only Gemini's hook laid over it. The upper row of
// openings has no glass in A, so the window that loses its glass is the glazed one on the right of the lower row
// (painted as an opening from its neighbour). Gemini put a red hat on top of the yellow one and drew a new truck (the
// yellow hat and the truck stay as in A), and left the brick, the drum and the cone as they were: the hat, the cab,
// the drum and the cone are recolored by hand, keeping their shading, and the brick painted out with the sand above.
export const level025Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-025-a.avif',
  imageB: 'levels/redesign/level-025-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The crane's hook: grey in A, red in B.
    { x: 2028, y: 594, r: 60 },
    // The window on the right of the lower row: glazed in A, an empty dark opening in B.
    { x: 1310, y: 1150, r: 130 },
    // The concrete mixer's drum: yellow in A, orange in B.
    { x: 1716, y: 1320, r: 72 },
    // The top brick of the pile, only in A.
    { x: 130, y: 1306, r: 60 },
    // The hard hat of the worker in orange: yellow in A, red in B.
    { x: 654, y: 1378, r: 60 },
    // The dump truck's cab: red in A, green in B.
    { x: 1924, y: 1534, r: 72 },
    // The right one of the two cones: orange in A, blue in B.
    { x: 1412, y: 1558, r: 60 },
  ],
}
