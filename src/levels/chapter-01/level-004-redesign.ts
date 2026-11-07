import type { LevelPictures } from '../../engine/types.ts'

// Level 4 ("orchard") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel difference.
// Like the drawn scene: an apple, the birdhouse, the ladder and the crate's apples; a second wheelbarrow comes in B
// instead of the first one turning. The ladder's zone sits on its middle, clear of that wheelbarrow at its foot.
export const level004Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-004-a.webp',
  imageB: 'levels/redesign/level-004-b.webp',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // The top-left apple of the left tree, only in A.
    { x: 208, y: 296, r: 40 },
    // The ladder on the middle tree, only in A.
    { x: 752, y: 415, r: 105 },
    // The birdhouse on the right tree, only in A.
    { x: 1095, y: 445, r: 60 },
    // A second wheelbarrow, only in B.
    { x: 765, y: 605, r: 80 },
    // The apples in the crate: red in A, green in B.
    { x: 912, y: 655, r: 55 },
  ],
}
