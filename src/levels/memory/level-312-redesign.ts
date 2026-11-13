import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 312 ("memoryClassroom") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the chalk house erased from the blackboard, the wall clock's rim red, the yellow
// top book gone from the stack on the cabinet, a red apple new on the desk. Gemini also redrew the chalk sun and the
// plant's leaves a little: left out, B is A with its four changes laid over it, one cut-out per zone.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The chalk house on the blackboard: there in A, gone in B.
  { x: 1085, y: 391, r: 175 },
  // The big wall clock: a blue rim in A, a red one in B.
  { x: 1524, y: 944, r: 155 },
  // The yellow top book of the stack on the cabinet: there in A, gone in B.
  { x: 610, y: 1040, r: 175 },
  // The red apple on the desk: not in A, there in B.
  { x: 1154, y: 1744, r: 105 },
]

export const level312Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-312-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-312-b-<n>.webp).
  imageB: 'levels/redesign/level-312-a.avif',
  patchesB: zonePatches('levels/redesign/level-312-b', differences, viewBox),
  viewBox,
  differences,
}
