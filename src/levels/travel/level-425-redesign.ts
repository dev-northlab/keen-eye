import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 425 ("marrakesh") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the minaret's top copper ball, its arched window,
// a merlon, the stork, the yellow spice cone's colour, the lantern, the carpet's fringe, the tagine's knob, two oranges.
// Gemini's A came with black marker strokes round the window and the merlon: painted away with B's texture (B has
// neither and matches A there). It also redrew the palms, the bougainvillea, the carpet and the orange tree without
// taking any orange: B is A with only the listed changes of Gemini's laid over it, and the two oranges are taken off
// by hand on A's picture (leaves cloned from beside them).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The top copper ball of the three on the minaret's spike: there in A, gone in B.
  { x: 656, y: 64, r: 60 },
  // The small arched window in the minaret's carved niche: there in A, plain wall in B.
  { x: 648, y: 702, r: 60 },
  // A merlon on the right part of the city wall: there in A, a gap in B.
  { x: 2514, y: 828, r: 60 },
  // The white stork in its nest on the wall: there in A, gone in B (the nest stays).
  { x: 2066, y: 768, r: 77 },
  // The middle spice cone on the stall: yellow in A, red in B.
  { x: 1548, y: 1368, r: 69 },
  // The wrought-iron lantern under the stall's awning: there in A, gone in B.
  { x: 1803, y: 1301, r: 61 },
  // The fringe at the bottom of the hanging carpet: there in A, gone in B.
  { x: 2279, y: 1446, r: 115 },
  // The small knob on the right tagine's lid: there in A, gone in B.
  { x: 1014, y: 1479, r: 60 },
  // Two oranges on the orange tree: there in A, gone in B.
  { x: 332, y: 1254, r: 82 },
]

export const level425Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-425-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-425-b-<n>.webp).
  imageB: 'levels/redesign/level-425-a.avif',
  patchesB: zonePatches('levels/redesign/level-425-b', differences, viewBox),
  viewBox,
  differences,
}
