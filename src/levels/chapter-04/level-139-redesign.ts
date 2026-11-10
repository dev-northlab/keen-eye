import type { LevelPictures } from '../../engine/types.ts'

// Level 139 ("underwaterCave") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the fourth
// stalactite from the right is half as long, the upper glowing spot on the right wall glows pink, the diver's fins turn
// yellow and the flashlight red, the top bubble above the diver goes, so do the octopus's curled-up arm, a dot in the
// middle of the right starfish, and the clam's pearl is smaller; a red crab sits on the seabed and the lobster's tail
// turns dark blue. B is A with only Gemini's spot, flashlight, octopus, crab and lobster laid over it (its octopus has
// a long arm stretched out where A's curled one was). Fixed by hand: Gemini shortened the first and third stalactites
// instead, so A's fourth is squeezed to half its length (its drop moved up, the cave wall cloned in below); it turned a
// second spot pink (left out); its fins were redrawn smaller with a blue tip left, so A's fins are recoloured; it kept
// the top bubble, so it is painted out with the water; it kept the pearl as it was, so A's pearl is shrunk to two
// thirds on the same spot (the clam's shell, opening and inside carried across behind it); its starfish lost all its
// dots, so only the left one of the two dots in the middle of A's star is covered with the star's skin.
export const level139Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-139-a.avif',
  imageB: 'levels/redesign/level-139-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The fourth stalactite from the right: long in A, half as long in B.
    { x: 1770, y: 150, r: 150 },
    // The upper glowing spot on the right cave wall: green in A, pink in B.
    { x: 2364, y: 300, r: 73 },
    // The diver's fins: blue in A, yellow in B.
    { x: 1252, y: 784, r: 73 },
    // The diver's flashlight: grey in A, red in B.
    { x: 1524, y: 744, r: 73 },
    // The top one of the three bubbles above the diver, only in A.
    { x: 1368, y: 548, r: 73 },
    // The octopus's arm on the right: curled up in A, stretched out in B.
    { x: 444, y: 1040, r: 104 },
    // The left one of the two white dots in the middle of the right starfish, only in A.
    { x: 846, y: 1530, r: 73 },
    // The pearl in the open clam: big in A, smaller in B.
    { x: 1124, y: 1536, r: 73 },
    // The red crab between the scallop shell and the sea urchin, only in B.
    { x: 1604, y: 1540, r: 80 },
    // The lobster's tail: red in A, dark blue in B.
    { x: 2156, y: 1452, r: 128 },
  ],
}
