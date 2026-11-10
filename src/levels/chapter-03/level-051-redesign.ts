import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 51 ("deerMeadow") redrawn as two pictures (public/levels/redesign/, Gemini's full 2612×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// middle bird of the flock is gone, the top of the round tree's crown turns orange, the yellow butterfly blue, the
// left deer's antlers white, the fawn beside it loses its white spots, the middle cattail its brown head, the small
// flower patch on the left turns purple and a grey rock lies at the bottom left. B is A with only these changes of
// Gemini's laid over it (the crown, the antlers, the butterfly, the flowers, the rock); it redrew the left bird and
// left the rest undone, so three are done by hand on A's picture: the bird painted out with the sky around it, the
// spots filled with the fawn's own coat beside them, the cattail head painted out with the rock behind it and the
// stem drawn on a little higher.
const viewBox = { w: 2612, h: 1632 }
const differences: Difference[] = [
  // The middle bird of the flock at the top left, only in A.
  { x: 508, y: 287, r: 60 },
  // The top of the round tree's crown in the middle: green in A, orange in B.
  { x: 1296, y: 614, r: 179 },
  // The butterfly: yellow in A, blue in B.
  { x: 1671, y: 1004, r: 79 },
  // The antlers of the deer on the left: brown in A, white in B.
  { x: 506, y: 850, r: 142 },
  // The white spots of the fawn next to the left deer, only in A.
  { x: 765, y: 1266, r: 60 },
  // The brown head of the middle cattail of the three on the right, only in A.
  { x: 2310, y: 1230, r: 82 },
  // The small flower patch on the left: pink in A, purple in B.
  { x: 580, y: 1422, r: 137 },
  // A grey rock at the bottom left, only in B.
  { x: 186, y: 1542, r: 136 },
]

export const level051Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-051-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-051-b-<n>.webp).
  imageB: 'levels/redesign/level-051-a.avif',
  patchesB: zonePatches('levels/redesign/level-051-b', differences, viewBox),
  viewBox,
  differences,
}
