import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 426 ("capeTown") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): part of the "tablecloth" cloud, the cable car,
// the blue house's parapet, a door's colour, the lighthouse's lantern dome, the yacht's flag, the gull, the buoy's top
// mark, the protea flower, a small balloon. Gemini made all ten listed changes but also recoloured two houses and
// redrew the bush: B is A with only the listed changes of Gemini's laid over it. Its cloud lay over the whole mountain,
// right above the cable car, so only its left part is taken (fading into the rest); and the left penguin it took
// stands too close to the protea for two zones, so a small balloon in the sky is taken away by hand in its place.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The left part of the "tablecloth" cloud on Table Mountain: there in A, gone in B (the cloud starts further right).
  { x: 732, y: 448, r: 262 },
  // The red cable car cabin on the slope: there in A, gone in B (its cable stays).
  { x: 1078, y: 570, r: 60 },
  // The white decorative parapet on the blue house's roof: there in A, gone in B.
  { x: 1344, y: 776, r: 107 },
  // The red house's front door: white in A, black in B.
  { x: 1104, y: 936, r: 60 },
  // The glass lantern dome on top of the lighthouse: there in A, gone in B (the railing stays).
  { x: 2416, y: 680, r: 83 },
  // The flag on top of the yacht's mast: there in A, gone in B.
  { x: 1685, y: 706, r: 60 },
  // The gull on top of the mooring post: there in A, gone in B.
  { x: 1991, y: 1150, r: 80 },
  // The round top mark on the red buoy: there in A, gone in B.
  { x: 1742, y: 1240, r: 60 },
  // The big pink protea flower: there in A, only its leaves in B.
  { x: 172, y: 1420, r: 188 },
  // A small yellow balloon high in the sky: there in A, gone in B.
  { x: 1570, y: 168, r: 60 },
]

export const level426Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-426-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-426-b-<n>.webp).
  imageB: 'levels/redesign/level-426-a.avif',
  patchesB: zonePatches('levels/redesign/level-426-b', differences, viewBox),
  viewBox,
  differences,
}
