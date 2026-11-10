import type { LevelPictures } from '../../engine/types.ts'

// Level 107 ("hayloft") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. The drawn scene's differences, smaller where they can be: the owl's eyes turn
// yellow instead of its head turning, and the cat's tail turns white instead of swishing faster (pictures do not
// move); the sun turns orange instead of growing; the left swallow turns brown; the bottom row's left bale gets blue
// strings; the middle row's right bale loses one string instead of gaining one; the mouse on the top bale turns
// white instead of being gone; the wagon wheel loses one spoke instead of turning; the yarn ball turns blue instead
// of moving. Touched up by hand: B is A with only Gemini's sun, owl's eyes, mouse, wheel, cat's tail and yarn laid
// over it. Gemini also recoloured the other swallow and the middle row's left bale strings (those stay as in A), gave
// the brown swallow a smudge, coloured the bale's strings blue only in part and kept both strings of the middle row's
// right bale: the swallow and the strings are recoloured from A with their shading kept, and one string is painted
// over with the hay beside it.
export const level107Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-107-a.avif',
  imageB: 'levels/redesign/level-107-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The sun in the view through the barn door: yellow in A, orange in B.
    { x: 1452, y: 558, r: 160 },
    // The swallow left of the hanging rope: dark blue in A, brown in B.
    { x: 1183, y: 686, r: 73 },
    // The owl's eyes on the left beam: white in A, yellow in B.
    { x: 393, y: 287, r: 73 },
    // The left bale of the bottom row: red strings in A, blue in B.
    { x: 195, y: 1090, r: 73 },
    // The right bale of the middle row: two strings in A, one in B.
    { x: 644, y: 982, r: 88 },
    // The mouse on the top bale: grey in A, white in B.
    { x: 448, y: 766, r: 73 },
    // The wagon wheel on the right wall: one spoke fewer in B.
    { x: 1856, y: 775, r: 75 },
    // The tail of the cat on the haystack: orange in A, white in B.
    { x: 305, y: 1235, r: 100 },
    // The yarn ball on the floor: pink in A, blue in B.
    { x: 1028, y: 1566, r: 78 },
  ],
}
