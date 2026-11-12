import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 302 ("memoryFarmyard") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: a big cloud new in the middle of the sky, the barn door's panels yellow (the
// white X-frame stays), the big white hen at the bottom right gone. B is A with only these changes of Gemini's laid
// over it (it also redrew a few flowers and the sunflower's leaf: left out). Gemini drew the cow with one eye: its
// left eye is a copy of the right one, by hand on both pictures.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The big cloud in the middle of the sky: not in A, there in B.
  { x: 940, y: 384, r: 250 },
  // The panels of the barn door: white in A, yellow in B.
  { x: 476, y: 1470, r: 175 },
  // The big white hen at the bottom right: there in A, gone in B.
  { x: 1440, y: 2320, r: 300 },
]

export const level302Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-302-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-302-b-<n>.webp).
  imageB: 'levels/redesign/level-302-a.avif',
  patchesB: zonePatches('levels/redesign/level-302-b', differences, viewBox),
  viewBox,
  differences,
}
