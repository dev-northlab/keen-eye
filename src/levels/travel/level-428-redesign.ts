import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 428 ("mexicoCity") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the dome's lantern, the angel's wreath, the
// trajinera's arch board colour, the life ring, the cactus flower, the bow tie, the braid on a sombrero's brim, two
// papel picado flags, a small balloon. Gemini also redrew the plants, the water and the boat: B is A with only the
// listed changes of Gemini's laid over it. A had no tassels on the sombrero: Gemini thinned its wide gold braid
// instead, taken as that change. It kept the hummingbird (a second try left a smear of it), so a small balloon in the
// sky is taken away by hand in its place (a fill of sky).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The ornate lantern on top of the palace's dome: there in A, gone in B.
  { x: 684, y: 219, r: 80 },
  // The golden wreath in the angel's raised hand: there in A, gone in B.
  { x: 2311, y: 156, r: 60 },
  // The arch board on top of the trajinera: yellow in A, blue in B.
  { x: 1690, y: 978, r: 115 },
  // The life ring floating on the canal: there in A, gone in B.
  { x: 1984, y: 1328, r: 72 },
  // The pink flower on top of the cactus: there in A, gone in B.
  { x: 216, y: 1182, r: 60 },
  // The right mariachi's red bow tie: there in A, gone in B.
  { x: 1048, y: 1114, r: 60 },
  // The wide gold lattice braid on the left mariachi's sombrero brim: there in A, a thin one in B.
  { x: 854, y: 1023, r: 95 },
  // The yellow papel picado flag, second from the left: there in A, gone in B.
  { x: 279, y: 222, r: 132 },
  // The blue papel picado flag on the far right: there in A, gone in B.
  { x: 1220, y: 74, r: 101 },
  // A small yellow balloon in the sky: there in A, gone in B.
  { x: 1731, y: 430, r: 60 },
]

export const level428Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-428-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-428-b-<n>.webp).
  imageB: 'levels/redesign/level-428-a.avif',
  patchesB: zonePatches('levels/redesign/level-428-b', differences, viewBox),
  viewBox,
  differences,
}
