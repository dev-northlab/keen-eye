import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 419 ("prague") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the tower's golden ball, the chimney on the red
// roof, two statues of Charles Bridge, the swan, the rowing boat's colour, the tram's pantograph, the cathedral
// spire's finial. Gemini also took the tall brick chimney away, moved the ducks and redrew trees, houses and the
// clock's dials: B is A with only the listed changes of Gemini's laid over it. It kept the clock's golden sun hand
// and the cathedral's gilded finial: the finial is painted away by hand on A's picture (a fill of sky), and the
// second statue Gemini took from the bridge stands in for the sun hand.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The golden ball on top of the Old Town Hall tower: there in A, gone in B.
  { x: 264, y: 156, r: 60 },
  // The small brick chimney on the red roof: there in A, gone in B.
  { x: 826, y: 670, r: 60 },
  // The dark statue on its pedestal, left of the lamp on Charles Bridge: there in A, gone in B.
  { x: 2046, y: 692, r: 84 },
  // The dark statue right of the lamp: there in A, gone in B.
  { x: 2221, y: 710, r: 62 },
  // The white swan on the river, with its reflection: there in A, gone in B.
  { x: 1092, y: 1148, r: 110 },
  // The small rowing boat: blue in A, green in B.
  { x: 1972, y: 1154, r: 116 },
  // The pantograph on the tram's roof: there in A, gone in B.
  { x: 1382, y: 1261, r: 106 },
  // The gilded finial on the cathedral's green spire: there in A, gone in B.
  { x: 1986, y: 104, r: 60 },
]

export const level419Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-419-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-419-b-<n>.webp).
  imageB: 'levels/redesign/level-419-a.avif',
  patchesB: zonePatches('levels/redesign/level-419-b', differences, viewBox),
  viewBox,
  differences,
}
