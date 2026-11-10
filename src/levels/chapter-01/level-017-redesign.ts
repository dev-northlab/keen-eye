import type { LevelPictures } from '../../engine/types.ts'

// Level 17 ("winter") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel
// difference. The drawn scene's differences, smaller where they can be: the chimney smoke, which rises faster in the
// drawn scene, loses its topmost puff (pictures do not move); the left window goes dark; the tall pine loses only its
// snow cap instead of vanishing; the bird on the feeder, which hops in the drawn scene, turns yellow; the snowman's
// carrot nose and the sled's colour as drawn. Touched up by hand: GPT also redrew every pine with less snow and
// left a faded ghost of the nose, so B is A with only GPT's smoke, window, pine top, bird and sled seat laid over
// it, and the nose painted over with the face around it.
export const level017Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-017-a.avif',
  imageB: 'levels/redesign/level-017-b.avif',
  viewBox: { w: 1586, h: 992 },
  differences: [
    // The chimney smoke: three puffs in A, the topmost gone in B.
    { x: 750, y: 190, r: 52 },
    // The barn's left window: lit yellow in A, dark in B.
    { x: 692, y: 506, r: 59 },
    // The snow cap on the tall pine right of the barn, only in A.
    { x: 1210, y: 424, r: 48 },
    // The bird on the feeder: red in A, yellow in B.
    { x: 1436, y: 571, r: 48 },
    // The snowman's carrot nose, only in A.
    { x: 324, y: 803, r: 48 },
    // The sled's seat: red in A, blue in B.
    { x: 587, y: 900, r: 82 },
  ],
}
