import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 411 ("rio") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on their
// pixel difference. Small parts only (docs/redesign-travel.md): the cable car cabin, the sailboat's flag, a coconut,
// the umbrella's stripes, the football, the toucan, the hang glider, the sandcastle's top tower. Gemini also redrew the
// mountains' slopes, the palms and the wave pavement: B is A with only the listed changes of Gemini's laid over it. It
// kept the sandcastle's top tower: taken away by hand on A's picture (the sand cloned from just left of it, the
// castle's lower terrace kept).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The small cable car cabin on the line to Sugarloaf: there in A, gone in B.
  { x: 1834, y: 800, r: 70 },
  // The small flag on top of the sailboat's mast: there in A, gone in B.
  { x: 1094, y: 1010, r: 66 },
  // One of the three coconuts of the left palm: there in A, gone in B.
  { x: 338, y: 1142, r: 66 },
  // The stripes of the beach umbrella: red in A, blue in B.
  { x: 754, y: 1296, r: 126 },
  // The football on the sand: there in A, gone in B.
  { x: 1232, y: 1438, r: 66 },
  // The toucan on the wooden post: there in A, gone in B.
  { x: 2164, y: 1326, r: 89 },
  // The hang glider over the bay: there in A, gone in B.
  { x: 1541, y: 592, r: 112 },
  // The sandcastle's top tower with its flag: there in A, gone in B.
  { x: 1641, y: 1357, r: 66 },
]

export const level411Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-411-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-411-b-<n>.webp).
  imageB: 'levels/redesign/level-411-a.avif',
  patchesB: zonePatches('levels/redesign/level-411-b', differences, viewBox),
  viewBox,
  differences,
}
