import type { LevelPictures } from '../../engine/types.ts'

// Level 70 ("submarine") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the tail of the big yellow
// fish at the top left turns red, a small green fish swims at the top right, the submarine's propeller turns red, the red
// light on top of the periscope is gone, so is the middle porthole of the three, the sea mine turns rusty red-brown, the
// squid purple, the turtle's shell light brown and the seaweed right of the bottle light green. B is A with only these
// changes of Gemini's laid over it (it did all nine; its redrawn urchin and driftwood are left out).
export const level070Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-070-a.avif',
  imageB: 'levels/redesign/level-070-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The tail of the big yellow fish at the top left: yellow in A, red in B.
    { x: 359, y: 382, r: 65 },
    // A small green fish at the top right, only in B.
    { x: 2416, y: 149, r: 60 },
    // The submarine's propeller: white in A, red in B.
    { x: 986, y: 818, r: 99 },
    // The small red light on top of the periscope, only in A.
    { x: 1370, y: 612, r: 60 },
    // The middle porthole of the three on the submarine, only in A.
    { x: 1282, y: 820, r: 60 },
    // The sea mine: dark in A, rusty red-brown in B.
    { x: 2094, y: 957, r: 60 },
    // The squid: pink in A, purple in B.
    { x: 2034, y: 1310, r: 77 },
    // The turtle's shell: green in A, light brown in B.
    { x: 468, y: 1548, r: 60 },
    // The seaweed at the bottom right of the bottle: dark green in A, light green in B.
    { x: 1845, y: 1464, r: 152 },
  ],
}
