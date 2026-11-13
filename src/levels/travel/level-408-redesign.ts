import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 408 ("baku") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on their
// pixel difference. Small parts only (docs/redesign-travel.md): a battlement tooth, a window slit of the Maiden Tower,
// the carpet's medallion, the gull on the lamp, the right oleander's flowers, the pomegranates, the mast's flag, the
// balloon. Gemini also relit the Maiden Tower and stripped both oleanders (the two zones would overlap, so only the
// right one is taken): B is A with only the listed changes of Gemini's laid over it. It kept the woman's shoulder bag,
// too tangled with her arm and clothes to paint away, so the yellow balloon in the sky goes instead, taken away by
// hand on A's picture (the sky filled smoothly).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // One battlement tooth on the wall right of the Maiden Tower: there in A, gone in B.
  { x: 1256, y: 968, r: 73 },
  // The lowest window slit on the left of the Maiden Tower: there in A, gone in B.
  { x: 592, y: 816, r: 73 },
  // The medallion in the middle of the carpet: blue in A, green in B.
  { x: 246, y: 1196, r: 73 },
  // The gull on top of the street lamp: there in A, gone in B.
  { x: 1444, y: 1009, r: 73 },
  // The yellow balloon in the sky: there in A, gone in B.
  { x: 1522, y: 734, r: 109 },
  // The pink flowers of the right oleander bush: there in A, a green bush in B.
  { x: 1214, y: 1204, r: 139 },
  // The pomegranates on the tree at the right: there in A, gone in B.
  { x: 2511, y: 1156, r: 127 },
  // The small flag on top of the sailboat's mast: there in A, gone in B.
  { x: 2114, y: 1333, r: 73 },
]

export const level408Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-408-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-408-b-<n>.webp).
  imageB: 'levels/redesign/level-408-a.avif',
  patchesB: zonePatches('levels/redesign/level-408-b', differences, viewBox),
  viewBox,
  differences,
}
