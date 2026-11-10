import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 39 ("skatepark") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the bird on the wire
// turns from black to red, the pink graffiti blob blue, the skateboard under the skater in red green, the helmet of the
// child in purple from blue to yellow, the small rail on the right ramp from grey to red, the bench's seat from wood to
// blue, the right cone of the two from orange to blue. Touched up by hand: B is A with only these changes of Gemini's
// laid over it; Gemini also painted the long rail behind the ramp red (it stays grey, as in A).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The bird sitting on the wire: black in A, red in B.
  { x: 1642, y: 502, r: 60 },
  // The graffiti blob on the left of the wall: pink in A, blue in B.
  { x: 660, y: 864, r: 190 },
  // The small rail on the right ramp: grey in A, red in B.
  { x: 1840, y: 1248, r: 66 },
  // The helmet of the child in purple: blue in A, yellow in B.
  { x: 1972, y: 1338, r: 60 },
  // The skateboard under the skater in red: wooden in A, green in B.
  { x: 974, y: 1418, r: 66 },
  // The seat of the wooden bench: wooden in A, blue in B.
  { x: 2298, y: 1438, r: 110 },
  // The right one of the two traffic cones: orange in A, blue in B.
  { x: 498, y: 1558, r: 75 },
]

export const level039Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-039-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-039-b-<n>.webp).
  imageB: 'levels/redesign/level-039-a.avif',
  patchesB: zonePatches('levels/redesign/level-039-b', differences, viewBox),
  viewBox,
  differences,
}
