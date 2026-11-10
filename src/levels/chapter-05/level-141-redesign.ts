import type { LevelPictures } from '../../engine/types.ts'

// Level 141 ("orbitalStation") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the docked
// capsule's nose turns orange, an antenna mast stands on the main module, its third window goes, the beacon goes out,
// the upper right solar panel turns green, the light at the truss's right end blue, the gripper claw yellow, the
// astronaut's visor orange, the floating wrench red and the bolt gold. B is A with only these changes of Gemini's laid
// over it. Fixed by hand: Gemini left the visor almost gold, so A's visor is recoloured orange; its other changes (the
// astronaut's suit and chest badge redrawn) are left out.
export const level141Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-141-a.webp',
  imageB: 'levels/redesign/level-141-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The nose cone of the docked capsule at the left end of the truss: red in A, orange in B.
    { x: 266, y: 632, r: 73 },
    // The antenna mast with two cross bars on the main module, left of the grey top module, only in B.
    { x: 1163, y: 483, r: 79 },
    // The third of the four round lit windows of the main module, only in A.
    { x: 1356, y: 654, r: 73 },
    // The beacon on the short post on top of the main module: lit red in A, dark in B.
    { x: 1550, y: 512, r: 73 },
    // The right one of the two upper solar panels on the right: blue in A, green in B.
    { x: 1977, y: 493, r: 97 },
    // The light at the right end of the truss: green in A, blue in B.
    { x: 2284, y: 654, r: 73 },
    // The gripper claw of the robotic arm: grey in A, yellow in B.
    { x: 1651, y: 1030, r: 73 },
    // The visor of the astronaut on the tether: gold in A, orange in B.
    { x: 1976, y: 975, r: 73 },
    // The floating wrench at the left: silver in A, red in B.
    { x: 834, y: 962, r: 73 },
    // The small floating bolt at the bottom left: silver in A, gold in B.
    { x: 578, y: 1228, r: 73 },
  ],
}
