import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 409 ("tbilisi") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the right tower's window slits, the stork, a bunch
// of grapes, the small balcony, the middle churchkhela strings, the cap, the oars, the lantern on the bath dome. Gemini
// also redrew the trees, the grass and the houses and recoloured the big balcony too (left out): B is A with only the
// listed changes of Gemini's laid over it. It kept the lantern on the middle dome: taken away by hand on A's picture,
// the grass behind cloned from just left of it. The golden key (Gemini drew it lying on the baths' ledge, in both
// pictures) is cut out as its own image and painted out of both pictures (the dome's brick from beside it, the stone
// wall from above).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The two window slits of the right fortress tower: there in A, gone in B.
  { x: 862, y: 548, r: 73 },
  // The stork in the nest on the left tower: there in A, an empty nest in B.
  { x: 367, y: 408, r: 73 },
  // The bunch of purple grapes on the vine: there in A, gone in B.
  { x: 1170, y: 944, r: 73 },
  // The carved balcony of the small house at the right: blue in A, green in B.
  { x: 2404, y: 1174, r: 125 },
  // The middle pair of churchkhela strings at the stall: there in A, gone in B.
  { x: 1082, y: 1188, r: 73 },
  // The cap of the man in red: there in A, gone in B.
  { x: 1270, y: 1125, r: 73 },
  // The two oars of the yellow boat: there in A, gone in B.
  { x: 2058, y: 1463, r: 237 },
  // The little lantern on top of the middle bath dome: there in A, gone in B.
  { x: 721, y: 1176, r: 73 },
]

export const level409Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-409-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-409-b-<n>.webp).
  imageB: 'levels/redesign/level-409-a.avif',
  patchesB: zonePatches('levels/redesign/level-409-b', differences, viewBox),
  viewBox,
  differences,
  secret: {
    x: 840,
    y: 1284,
    r: 40,
    on: 'both',
    image: { href: 'levels/redesign/level-409-key.webp', x: 808, y: 1269, w: 63, h: 31 },
  },
}
