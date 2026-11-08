import type { LevelPictures } from '../../engine/types.ts'

// Level 38 ("cinema") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the five bulbs in the
// middle of the marquee's red bar are off, the blue poster turns green, the lit window of the ticket booth is dark, the
// shirt of the person in yellow turns pink, the popcorn box from red-and-white to blue-and-white, the balloon of the
// person in purple from orange to green, the right pigeon of the two on the sidewalk from grey to white. Touched up by
// hand: B is A with only Gemini's poster, window, shirt and balloon laid over it. Gemini made the marquee's bar a new
// row of seven bulbs, mixed the popcorn box's stripes and drew a new, bigger pigeon, and also changed the light on the
// pavement under the booth (those stay as in A): the five bulbs are turned off, the box's red stripes and the pigeon
// recolored by hand, keeping their shading.
export const level038Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-038-a.webp',
  imageB: 'levels/redesign/level-038-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The five bulbs in the middle of the marquee's red bar: lit in A, off in B.
    { x: 1310, y: 592, r: 115 },
    // The poster on the left: blue in A, green in B.
    { x: 724, y: 878, r: 108 },
    // The balloon held by the person in purple: orange in A, green in B.
    { x: 1960, y: 886, r: 88 },
    // The window of the red ticket booth: lit in A, dark in B.
    { x: 262, y: 936, r: 115 },
    // The shirt of the person in yellow: yellow in A, pink in B.
    { x: 790, y: 1060, r: 72 },
    // The popcorn box: red and white in A, blue and white in B.
    { x: 998, y: 1150, r: 60 },
    // The right pigeon of the two on the sidewalk: grey in A, white in B.
    { x: 2300, y: 1154, r: 60 },
  ],
}
