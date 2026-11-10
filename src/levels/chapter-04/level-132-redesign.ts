import type { LevelPictures } from '../../engine/types.ts'

// Level 132 ("pirateGalleon") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the right
// patch on the lower middle sail goes, the black flag gets a third stripe, the pennant on the right mast turns blue,
// the lookout's spyglass black, a seagull flies in front of the upper left sail, the fifth porthole of nine goes, the
// right barrel's hoops turn gold, the parrot's head green, the stern lantern goes out and the grey fish's tail turns
// yellow. B is A with only these changes of Gemini's laid over it. Fixed by hand: Gemini took out the sixth porthole,
// so its plain planks are moved onto the fifth; its lantern still glowed inside, so the glass is darkened; it left
// the grey fish as it was and turned the small yellow fish into a grey one with a yellow tail, so that is left out and
// A's grey fish gets the yellow tail.
export const level132Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-132-a.avif',
  imageB: 'levels/redesign/level-132-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The right one of the two patches on the lower middle sail, only in A.
    { x: 1356, y: 628, r: 73 },
    // The black flag on the left mast: two white stripes in A, three in B.
    { x: 904, y: 164, r: 73 },
    // The pennant on top of the right mast: red in A, blue in B.
    { x: 1888, y: 216, r: 84 },
    // The lookout's spyglass in the crow's nest: brass in A, black in B.
    { x: 1388, y: 140, r: 73 },
    // The seagull in front of the upper left sail, only in B.
    { x: 516, y: 628, r: 73 },
    // The fifth porthole of the nine on the hull, only in A.
    { x: 1176, y: 1092, r: 73 },
    // The hoops of the right barrel on deck: dark in A, gold in B.
    { x: 1520, y: 872, r: 73 },
    // The parrot's head on the cabin roof: red in A, green in B.
    { x: 2028, y: 640, r: 73 },
    // The lantern at the stern: lit in A, dark in B.
    { x: 2212, y: 856, r: 73 },
    // The tail fin of the grey fish by the bow: grey in A, yellow in B.
    { x: 272, y: 1256, r: 73 },
  ],
}
