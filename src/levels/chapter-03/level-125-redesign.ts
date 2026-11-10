import type { LevelPictures } from '../../engine/types.ts'

// Level 125 ("foresterHouse") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the smoke
// turns dark grey, a red bird sits on the roof, the left shutter of the left window turns red, the right window loses
// its cross bars, the lantern by the door goes out, the woodpile loses a log, the axe's head turns red and the dog's
// tail white. B is A with only these changes of Gemini's laid over it; it also turned the right shutter red (left
// out), and left the window bars and the lantern's glow and redrew the axe, so these three are done by hand on A's
// picture: the bars painted over with the lit pane, the lantern's glass darkened, the axe's head recoloured.
export const level125Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-125-a.avif',
  imageB: 'levels/redesign/level-125-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The smoke above the chimney: white in A, dark grey in B.
    { x: 1330, y: 250, r: 160 },
    // The red bird on the roof, only in B.
    { x: 664, y: 556, r: 73 },
    // The left shutter of the left window: green in A, red in B.
    { x: 608, y: 924, r: 75 },
    // The cross bars of the right window, only in A.
    { x: 1280, y: 922, r: 73 },
    // The lantern by the door: lit in A, dark in B.
    { x: 856, y: 1004, r: 73 },
    // The third log of the woodpile's middle row, only in A.
    { x: 1764, y: 1160, r: 73 },
    // The axe's head: grey in A, red in B.
    { x: 2160, y: 1356, r: 73 },
    // The dog's tail: brown in A, white in B.
    { x: 1892, y: 1440, r: 73 },
  ],
}
