import type { LevelPictures } from '../../engine/types.ts'

// Level 80 ("sea cave") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the leftmost
// stalactite is half as long, the second one is gone, the bat turns light brown, the water drop on the right stalactite
// is gone, the crystals on the left rock glow purple, the treasure chest is closed, the crab at the bottom left loses
// one leg, the boat's lantern shines green and the light blue fish right of the seaweed turns orange. B is A with only
// these changes laid over it. Fixed by hand: Gemini shortened the first stalactite by about a sixth, so A's own is
// squeezed to half its length and the cave behind it cloned in; its purple glow over the whole left wall is cut to the
// rock under the crystals; its chest lid floated above the gold, so the lid is lowered onto the chest and the cave
// wall behind it cloned from above. The list's pink crab is replaced, at the user's wish, by a missing leg of A's crab
// (the rock behind it cloned from up right).
export const level080Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-080-a.webp',
  imageB: 'levels/redesign/level-080-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The leftmost stalactite: long in A, half as long in B.
    { x: 530, y: 282, r: 168 },
    // The second stalactite from the left, only in A.
    { x: 805, y: 342, r: 90 },
    // The bat under the ceiling: black in A, light brown in B.
    { x: 1017, y: 355, r: 60 },
    // The water drop on the tip of the stalactite on the right, only in A.
    { x: 1836, y: 502, r: 60 },
    // The glowing crystals on the rock at the left: green in A, purple in B.
    { x: 389, y: 1214, r: 170 },
    // The treasure chest at the right: open with gold coins in A, closed in B.
    { x: 2253, y: 1344, r: 146 },
    // The outer right leg of the crab at the bottom left, only in A.
    { x: 253, y: 1559, r: 60 },
    // The light of the lantern on the small boat: yellow in A, green in B.
    { x: 1316, y: 1378, r: 60 },
    // The fish at the bottom, right of the seaweed: light blue in A, orange in B.
    { x: 974, y: 1534, r: 66 },
  ],
}
