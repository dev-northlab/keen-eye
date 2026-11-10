import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 63 ("reef") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the lowest fish of the
// school of three small yellow fish is gone, the lavender jellyfish above the pink one turns blue, the seaweed at the
// far bottom left red-brown, the right branch of the pink coral at the bottom left yellow, the turtle's shell light
// brown, the small treasure chest opens on gold coins, the orange starfish turns purple, the open clam loses its pearl
// and the octopus turns red. B is A with only these changes of Gemini's laid over it (the seaweed, the chest, the
// starfish, the octopus); it also turned two more seaweeds red-brown, reddened a coral, added a big blue jellyfish and
// a yellow coral (all left out) and left the rest undone, so five are done by hand on A's picture: the fish painted out
// with the water beside it, the jellyfish, the coral branch and the shell recoloured, and the pearl painted out with
// the clam around it.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The lowest of the three small yellow fish at the top left, only in A.
  { x: 668, y: 604, r: 60 },
  // The jellyfish above the pink one at the top right: lavender in A, blue in B.
  { x: 2210, y: 360, r: 72 },
  // The seaweed at the far bottom left: green in A, red-brown in B.
  { x: 142, y: 1373, r: 228 },
  // The right branch of the pink coral at the bottom left: pink in A, yellow in B.
  { x: 828, y: 1494, r: 60 },
  // The turtle's shell: green in A, light brown in B.
  { x: 1310, y: 1539, r: 60 },
  // The small treasure chest: closed in A, open on gold coins in B.
  { x: 1610, y: 1504, r: 101 },
  // The starfish on the sand on the left: orange in A, purple in B.
  { x: 1184, y: 1377, r: 60 },
  // The white pearl in the open clam, only in A.
  { x: 1903, y: 1337, r: 60 },
  // The octopus: purple in A, red in B.
  { x: 2229, y: 1346, r: 89 },
]

export const level063Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-063-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-063-b-<n>.webp).
  imageB: 'levels/redesign/level-063-a.avif',
  patchesB: zonePatches('levels/redesign/level-063-b', differences, viewBox),
  viewBox,
  differences,
}
