import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 418 ("athens") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): a broken column inside the Parthenon, the owl,
// the flag, a door's colour, the bougainvillea's flowers, the geranium pot, the cat, the paper cup. Gemini made all
// eight but also redrew the hill's bushes and the pigeons: B is A with only the listed changes of Gemini's laid over it.
// Its bougainvillea lost every flower, down to beside the green door: only the upper part is taken, so the two zones
// stay apart (the lower flowers stay in bloom). The first try (redrawn colonnade, both doors recoloured, olives and an
// amphora handle never removed) was dropped and the pair generated again with other small changes.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The short broken column standing inside the Parthenon's colonnade: there in A, gone in B.
  { x: 1586, y: 506, r: 60 },
  // The little owl on the pediment: there in A, gone in B.
  { x: 1082, y: 222, r: 60 },
  // The Greek flag on its pole: there in A, gone in B (the pole stays).
  { x: 2149, y: 396, r: 64 },
  // The arched door right of the bougainvillea: blue in A, green in B.
  { x: 1746, y: 1340, r: 84 },
  // The pink flowers on the upper part of the bougainvillea: there in A, only green leaves in B.
  { x: 1555, y: 1070, r: 198 },
  // The pot of red geraniums by the left house's door, with its shadow: there in A, gone in B.
  { x: 760, y: 1382, r: 77 },
  // The white cat lying on the low wall, with its shadow: there in A, gone in B.
  { x: 158, y: 1498, r: 91 },
  // The white paper cup on the pavement, with its shadow: there in A, gone in B.
  { x: 2464, y: 1524, r: 60 },
]

export const level418Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-418-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-418-b-<n>.webp).
  imageB: 'levels/redesign/level-418-a.avif',
  patchesB: zonePatches('levels/redesign/level-418-b', differences, viewBox),
  viewBox,
  differences,
}
