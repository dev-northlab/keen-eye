import type { LevelPictures } from '../../engine/types.ts'

// Level 59 ("foggyMorning") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// orange sun turns pale yellow, a spider sits in the middle of the web, the left deer loses its antlers, the fog puff
// by the middle fir is gone, the man's hat turns red, his lantern goes out, the crow on the stump turns grey and a
// small red mushroom with white dots stands left of the brown one. B is A with only these changes of Gemini's laid
// over it (the sun, the spider, the hat, the lantern); it left the other four undone, so they are done by hand on A's
// picture: the antlers painted out with the fir needles beside them, the puff with the misty grass to its right (the
// long fog band in front of the fir was too big to repaint, so the puff beside it goes instead), the crow recoloured
// with its shading kept, the new mushroom made of the brown one, smaller and red.
export const level059Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-059-a.avif',
  imageB: 'levels/redesign/level-059-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The sun: deep orange in A, pale yellow in B.
    { x: 2099, y: 356, r: 121 },
    // A spider in the middle of the web, only in B.
    { x: 1240, y: 956, r: 60 },
    // The antlers of the deer on the left, only in A.
    { x: 382, y: 1123, r: 91 },
    // The white fog puff right of the middle fir, only in A.
    { x: 1608, y: 1234, r: 113 },
    // The hat of the man with the lantern: brown in A, red in B.
    { x: 1049, y: 1370, r: 71 },
    // The man's lantern: lit in A, dark in B.
    { x: 1190, y: 1414, r: 75 },
    // The crow on the tree stump: black in A, grey in B.
    { x: 1835, y: 1480, r: 60 },
    // A small red mushroom with white dots left of the brown one, only in B.
    { x: 735, y: 1588, r: 60 },
  ],
}
