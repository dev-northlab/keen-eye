import type { LevelPictures } from '../../engine/types.ts'

// Level 21 ("shopStreet") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// awning's middle red stripe turns blue, the yellow sign board's right part turns red, the middle flower of the red
// window box turns yellow, the held pink balloon turns orange, the dog's ear turns black, the yellow car's roof turns
// white, the bicycle's saddle turns blue. Touched up by hand: B is A with only Gemini's stripe, sign board and balloon
// laid over it. Gemini also put flower pots behind many windows of three houses and a box of yellow flowers under a
// window of the yellow house (instead of recoloring the middle red flower): that decor is kept, laid on both pictures.
// It took the pink balloon out of the sky (it stays, as in A) and left the dog's ear, the car's roof and the saddle as
// they were: the flower, the ear, the roof and the saddle are recolored by hand, keeping their shading.
export const level021Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-021-a.avif',
  imageB: 'levels/redesign/level-021-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The middle stripe of the awning over the teal door: red in A, blue in B.
    { x: 958, y: 952, r: 66 },
    // The sign board on the blue house: all yellow in A, its right part red in B.
    { x: 2240, y: 816, r: 115 },
    // The middle flower of the red window box on the yellow house: red in A, yellow in B.
    { x: 264, y: 924, r: 60 },
    // The balloon held by the man in the blue shirt: pink in A, orange in B.
    { x: 1432, y: 866, r: 70 },
    // The brown dog's ear: brown in A, black in B.
    { x: 2134, y: 1038, r: 60 },
    // The yellow car's roof: yellow in A, white in B.
    { x: 664, y: 1328, r: 64 },
    // The red bicycle's saddle: black in A, blue in B.
    { x: 1816, y: 1440, r: 60 },
  ],
}
