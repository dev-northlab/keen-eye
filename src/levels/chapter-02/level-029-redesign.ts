import type { LevelPictures } from '../../engine/types.ts'

// Level 29 ("playground") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): a blue
// bird sits on the left tree, the swing's seat turns from red to blue, the bucket in the sandbox from blue to yellow,
// the seesaw's left handle from red to blue, the ball near the slide from blue-and-white to yellow-and-white, the
// shirt of the child near the bench from green to pink, the pinwheel's top blade from pink to blue. Touched up by hand:
// B is A with only Gemini's bird, seat, bucket and ball laid over it. Gemini also redrew the cup on the bench and some
// grass by the seesaw (those stay as in A), and left the handle, the shirt and the blade as they were: they are
// recolored by hand, keeping their shading.
export const level029Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-029-a.avif',
  imageB: 'levels/redesign/level-029-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // A small blue bird on top of the round tree on the left, only in B.
    { x: 194, y: 550, r: 66 },
    // The swing's seat: red in A, blue in B.
    { x: 662, y: 926, r: 60 },
    // The ball near the slide: blue and white in A, yellow and white in B.
    { x: 2100, y: 1050, r: 72 },
    // The pinwheel's top blade: pink in A, blue in B.
    { x: 2298, y: 1248, r: 60 },
    // The shirt of the child near the bench: green in A, pink in B.
    { x: 1738, y: 1358, r: 60 },
    // The bucket in the sandbox: blue in A, yellow in B.
    { x: 1178, y: 1398, r: 60 },
    // The seesaw's left handle: red in A, blue in B.
    { x: 338, y: 1482, r: 60 },
  ],
}
