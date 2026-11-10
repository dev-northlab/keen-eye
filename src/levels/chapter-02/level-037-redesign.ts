import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 37 ("tramLine") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): a black cat sits on
// a window sill of the lilac house, the pharmacy sign turns from green to blue, the round sign on the post from yellow
// to blue, the shirt of the man in front of the brown door from blue to orange, the running dog's tail from brown to
// white, the tram's route board from yellow to green, and the tram's door is open. B is A with only these changes of
// Gemini's laid over it.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // A small black cat on a window sill of the lilac house, only in B.
  { x: 1012, y: 746, r: 60 },
  // The pharmacy sign: green in A, blue in B.
  { x: 486, y: 854, r: 66 },
  // The round sign on the post: yellow in A, blue in B.
  { x: 1246, y: 926, r: 62 },
  // The shirt of the man in front of the brown door: blue in A, orange in B.
  { x: 1512, y: 1008, r: 82 },
  // The running dog's tail: brown in A, white in B.
  { x: 1768, y: 1050, r: 60 },
  // The route board on the tram's roof: yellow in A, green in B.
  { x: 980, y: 1328, r: 62 },
  // The tram's door: white and shut in A, open (dark) in B.
  { x: 1100, y: 1424, r: 84 },
]

export const level037Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-037-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-037-b-<n>.webp).
  imageB: 'levels/redesign/level-037-a.avif',
  patchesB: zonePatches('levels/redesign/level-037-b', differences, viewBox),
  viewBox,
  differences,
}
