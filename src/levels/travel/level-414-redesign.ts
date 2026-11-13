import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 414 ("sydney") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): a climber on the bridge's arch, the cockatoo's
// crest, the ferry's funnel, the white yacht's jib, the kookaburra, two gulls, the buoy's light. Gemini also redrew the
// water and the trees on the shore: B is A with only the listed changes of Gemini's laid over it. It shrank the funnel
// instead of taking it away (kept: a smaller funnel is a fair change), and kept the Opera's smallest shell, the buoy's
// light and the yellow yacht's stern flag: the buoy's light is taken away by hand on A's picture (the water cloned from
// beside it); the shell (too tangled with the others) and the flag (the ripples behind it would not fill cleanly) are
// swapped for two gulls in the sky, taken away by hand (the sky filled smoothly).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The right one of the climbers on top of the bridge's arch: there in A, gone in B.
  { x: 1992, y: 514, r: 66 },
  // The yellow crest of the cockatoo on the left pylon: there in A, gone in B.
  { x: 1408, y: 604, r: 66 },
  // The ferry's funnel: tall in A, a small stub in B.
  { x: 950, y: 1257, r: 66 },
  // The front sail (jib) of the white yacht: white in A, red in B.
  { x: 1797, y: 1164, r: 94 },
  // The kookaburra on the wooden post at the bottom left: there in A, gone in B.
  { x: 160, y: 1405, r: 79 },
  // A gull flying above the Opera House: there in A, gone in B.
  { x: 1082, y: 448, r: 66 },
  // The light on top of the red buoy: there in A, gone in B.
  { x: 1488, y: 1126, r: 66 },
  // A gull flying high at the top: there in A, gone in B.
  { x: 1517, y: 206, r: 66 },
]

export const level414Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-414-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-414-b-<n>.webp).
  imageB: 'levels/redesign/level-414-a.avif',
  patchesB: zonePatches('levels/redesign/level-414-b', differences, viewBox),
  viewBox,
  differences,
}
