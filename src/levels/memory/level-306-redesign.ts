import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 306 ("memoryGarden") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the birdhouse gone with its pole, the scarecrow's shirt red, the right carrot
// gone. B is A with only these changes of Gemini's laid over it (its re-noised grass and flowers left out), whole: the
// birdhouse's pole runs far past its zone.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The blue birdhouse on its pole at the left: there in A, gone in B.
  { x: 330, y: 1100, r: 300 },
  // The scarecrow's shirt: blue in A, red in B.
  { x: 1086, y: 1156, r: 180 },
  // The right carrot of the carrot bed: there in A, gone in B.
  { x: 758, y: 1880, r: 160 },
]

export const level306Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-306-a.avif',
  imageB: 'levels/redesign/level-306-b.avif',
  viewBox,
  differences,
}
