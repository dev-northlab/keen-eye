import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 100 ("starFestival") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the pale
// star by the yellow balloon goes, the big left firework turns white, the right one green, one pennant of the left
// string pink, one bulb on the arch red, one square of the disco ball purple, the dancing alien loses its antennae, the
// stage astronaut's visor turns pink, the left balloon light blue and the right one purple. B is A with only these
// changes of Gemini's laid over it. Fixed by hand: Gemini reddened a pennant of the right string, so the seventh of
// the left string is recoloured pink on A, like its pink neighbours; it shuffled many squares of the disco ball, so
// only A's middle pink square is turned purple; its other changes (the star at the top right, the robots' eyes) are left out.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The pale yellow star near the right edge, above right of the yellow balloon, only in A.
  { x: 2476, y: 815, r: 60 },
  // The big firework at the left: yellow in A, white in B.
  { x: 495, y: 512, r: 290 },
  // The firework at the right: light blue in A, green in B.
  { x: 2086, y: 582, r: 256 },
  // The seventh pennant from the left on the left string: light blue in A, pink in B.
  { x: 710, y: 155, r: 60 },
  // The second bulb right of the light blue bulb at the top of the arch: yellow in A, red in B.
  { x: 1607, y: 584, r: 60 },
  // One square in the middle of the disco ball: pink in A, purple in B.
  { x: 1309, y: 718, r: 60 },
  // The two antennae of the green alien dancing on the stage, only in A.
  { x: 1317, y: 955, r: 60 },
  // The visor of the astronaut on the stage: yellow in A, pink in B.
  { x: 1594, y: 978, r: 60 },
  // The balloon at the left: pink in A, light blue in B.
  { x: 281, y: 1118, r: 92 },
  // The balloon at the right: yellow in A, purple in B.
  { x: 2317, y: 1034, r: 87 },
]

export const level100Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-100-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-100-b-<n>.webp).
  imageB: 'levels/redesign/level-100-a.avif',
  patchesB: zonePatches('levels/redesign/level-100-b', differences, viewBox),
  viewBox,
  differences,
}
