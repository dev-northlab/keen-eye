import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 413 ("safari") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the starling, the giraffe's horns, a tusk, the
// oxpecker, the zebra's tail tuft, a weaver nest, the spare wheel's cover, the termite mound's chimney. Gemini also
// redrew the acacias and the grass, took away both tusks and recoloured both spare wheel covers: B is A with only the
// listed changes of Gemini's laid over it — the right tusk (the left one is by the termite mound, their zones would
// overlap) and the green cover. It reshaped the whole termite mound: instead its tall chimney with the bird on it is
// taken away by hand on A's picture (the grass cloned from beside it, the mound's top rounded off).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The blue and orange starling on the left acacia's crown: there in A, gone in B.
  { x: 710, y: 221, r: 85 },
  // The giraffe's two horns: there in A, gone in B.
  { x: 708, y: 528, r: 66 },
  // The elephant's right tusk: there in A, gone in B.
  { x: 1326, y: 1292, r: 66 },
  // The oxpecker on the elephant's back: there in A, gone in B.
  { x: 1562, y: 1088, r: 67 },
  // The black tuft at the end of the left zebra's tail: there in A, gone in B.
  { x: 1828, y: 1276, r: 66 },
  // The left one of the two weaver nests in the right acacia: there in A, gone in B.
  { x: 2228, y: 852, r: 76 },
  // The cover of the right spare wheel on the jeep: green in A, orange in B.
  { x: 242, y: 1390, r: 66 },
  // The termite mound's tall chimney with the bird on it: there in A, gone in B.
  { x: 1165, y: 1350, r: 98 },
]

export const level413Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-413-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-413-b-<n>.webp).
  imageB: 'levels/redesign/level-413-a.avif',
  patchesB: zonePatches('levels/redesign/level-413-b', differences, viewBox),
  viewBox,
  differences,
}
