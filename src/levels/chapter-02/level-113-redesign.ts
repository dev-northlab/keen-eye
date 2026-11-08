import type { LevelPictures } from '../../engine/types.ts'

// Level 113 ("antennaRoofs") redrawn as two pictures (public/levels/redesign/, Gemini's full 2612×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the right
// chimney pot of the left chimney is gone, so is the top crossbar of the antenna by the grey cat, the arm in front of
// the satellite dish turns red, the solar panel's frame white, the smoke over the middle chimney is gone, the T-shirt
// on the clothesline turns from red to purple and the big pot with the sprout from terracotta to dark blue. B is A with
// only these changes of Gemini's laid over it. Gemini also took both pots off the middle chimney with the smoke (put
// back from A), turned the frames of the two skylights white and hung the solar panel on brackets (both left out).
export const level113Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-113-a.webp',
  imageB: 'levels/redesign/level-113-b.webp',
  viewBox: { w: 2612, h: 1632 },
  differences: [
    // The right chimney pot of the two on the left chimney, only in A.
    { x: 641, y: 432, r: 74 },
    // The top crossbar of the TV antenna by the grey cat, only in A.
    { x: 315, y: 420, r: 84 },
    // The small arm in front of the satellite dish: white in A, red in B.
    { x: 1419, y: 642, r: 81 },
    // The frame of the solar panel: grey in A, white in B.
    { x: 1955, y: 803, r: 150 },
    // The smoke over the middle chimney, only in A.
    { x: 1146, y: 770, r: 125 },
    // The T-shirt on the clothesline: red in A, purple in B.
    { x: 798, y: 1370, r: 74 },
    // The big pot with the small sprout: terracotta in A, dark blue in B.
    { x: 1920, y: 1511, r: 92 },
  ],
}
