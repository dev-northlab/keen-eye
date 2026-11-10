import type { LevelPictures } from '../../engine/types.ts'

// Level 127 ("snowyWoods") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the top
// puff of the cabin's smoke goes, the bird feeder's roof turns blue, the breast of the bullfinch on the rowan yellow,
// an icicle under the log goes, the back of the bullfinch on the log turns brown, the stump by the stream loses its
// snow cap, the rabbit on the frozen stream turns light brown, a paw print goes and a pine cone joins the two at the
// bottom left. B is A with only these changes of Gemini's laid over it (it took the rightmost icicle, not the fourth
// from the right); it also turned the small rabbit brown (left out), drew a new brown bird on the log instead of
// recolouring the bullfinch and left the paw prints, so the bullfinch's back is recoloured and the rightmost print
// painted out with the snow beside it by hand.
export const level127Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-127-a.avif',
  imageB: 'levels/redesign/level-127-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The top puff of smoke above the far cabin, only in A.
    { x: 2135, y: 470, r: 85 },
    // The roof of the bird feeder: red in A, blue in B.
    { x: 672, y: 708, r: 80 },
    // The breast of the bullfinch on the rowan bush: red in A, yellow in B.
    { x: 1580, y: 932, r: 73 },
    // The rightmost icicle under the log, only in A.
    { x: 1214, y: 1350, r: 73 },
    // The back of the bullfinch on the log: grey in A, brown in B.
    { x: 852, y: 1236, r: 73 },
    // The snow cap on the stump by the stream, only in A.
    { x: 1312, y: 1520, r: 90 },
    // The rabbit on the frozen stream: white in A, light brown in B.
    { x: 1812, y: 1488, r: 80 },
    // The rightmost paw print in the snow, only in A.
    { x: 2562, y: 1597, r: 73 },
    // The third pine cone at the bottom left, only in B.
    { x: 532, y: 1544, r: 73 },
  ],
}
