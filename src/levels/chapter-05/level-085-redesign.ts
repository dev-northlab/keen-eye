import type { LevelPictures } from '../../engine/types.ts'

// Level 85 ("marsRover") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the smaller moon
// goes, the sun turns light blue, the drone's body orange, the stone arch loses its top (two pillars stay), a crater
// goes, the rock at the bottom left turns dark grey, the lander loses its antenna, the dust devil turns reddish brown,
// the astronaut's suit yellow and the rover's stripe red. B is A with only Gemini's sun, drone, pillars, ground,
// rock, lander roof, dust devil, suit and stripe laid over it. Fixed by hand: Gemini kept the smaller moon, so it is
// painted out with the hazy sky beside it. Its other small changes (an asteroid, the wrench, pebbles) are left out.
export const level085Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-085-a.webp',
  imageB: 'levels/redesign/level-085-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The smaller pale moon at the top left, right of the bigger one, only in A.
    { x: 664, y: 156, r: 60 },
    // The small sun at the top right: white in A, light blue in B.
    { x: 2226, y: 260, r: 75 },
    // The body of the hovering drone: grey in A, orange in B.
    { x: 820, y: 587, r: 65 },
    // The curved top of the stone arch at the right, only in A (B has two separate pillars).
    { x: 2045, y: 830, r: 125 },
    // The crater on the ground at the bottom right, only in A.
    { x: 1948, y: 1537, r: 150 },
    // The rock at the bottom left: red-brown in A, dark grey in B.
    { x: 540, y: 1495, r: 125 },
    // The antenna with the red tip on top of the lander, only in A.
    { x: 365, y: 825, r: 60 },
    // The dust devil at the right: pale in A, reddish brown in B.
    { x: 2285, y: 1020, r: 160 },
    // The astronaut's suit: white in A, yellow in B.
    { x: 990, y: 1232, r: 90 },
    // The stripe on top of the rover: blue in A, red in B.
    { x: 1275, y: 1291, r: 62 },
  ],
}
