import type { LevelPictures } from '../../engine/types.ts'

// Level 116 ("neonStreet") redrawn as two pictures (public/levels/redesign/, Gemini's A at its full 2624×1632), the
// zones measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// plant in the pot on the window sill of the dark blue house is gone, so is one rung of the fire escape ladder, the
// wall fan's blades turn orange, the neon star white, the neon cup orange (its saucer stays cyan), the neon heart
// violet, the green neon arrow loses its head and the black cat on the dumpster is ginger. Gemini returned B at
// another size (2752×1536), the scene redrawn and shifted; it is scaled onto A and only these places are taken, each
// aligned on its own: the empty window, the fan inside its ring, the arrow's end and the ginger cat. The star, cup
// and heart are A's recoloured by hand (Gemini also turned the cup's saucer orange), and the rung, which Gemini left,
// is painted out by hand: the one under the lower balcony rail.
export const level116Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-116-a.webp',
  imageB: 'levels/redesign/level-116-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The plant in the small pot on the window sill of the dark blue house, only in A.
    { x: 1372, y: 313, r: 74 },
    // A rung of the fire escape ladder on the purple house, under the lower balcony rail, only in A.
    { x: 768, y: 507, r: 74 },
    // The blades of the round wall fan: grey in A, orange in B.
    { x: 1840, y: 454, r: 74 },
    // The neon star: yellow in A, white in B.
    { x: 360, y: 692, r: 81 },
    // The neon cup over its cyan saucer: cyan in A, orange in B.
    { x: 993, y: 697, r: 88 },
    // The neon heart: pink in A, violet in B.
    { x: 1574, y: 698, r: 74 },
    // The head of the green neon arrow, only in A.
    { x: 2160, y: 716, r: 74 },
    // The cat sitting on the green dumpster: black in A, ginger in B.
    { x: 2414, y: 1148, r: 78 },
  ],
}
