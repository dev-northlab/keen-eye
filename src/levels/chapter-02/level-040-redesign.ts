import type { LevelPictures } from '../../engine/types.ts'

// Level 40 ("fireworks") redrawn as two pictures (public/levels/redesign/, Gemini's full 2612×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): a star appears at the
// top left, the moon turns from cream-white to pale orange, the small burst left of the middle is a big pink one, the
// second lantern from the right turns from red to blue, the balloon of the person in yellow from green to pink, the
// shirt of the person on the left from red to blue, the boat's light from yellow to green. B is A with only these
// changes of Gemini's laid over it. Gemini also turned the small burst right of the middle into a big green one: that
// decor is kept, laid on both pictures.
export const level040Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-040-a.webp',
  imageB: 'levels/redesign/level-040-b.webp',
  viewBox: { w: 2612, h: 1632 },
  differences: [
    // A small yellow star in the sky at the top left, only in B.
    { x: 1032, y: 66, r: 60 },
    // The full moon: cream-white in A, pale orange in B.
    { x: 2288, y: 230, r: 140 },
    // The firework left of the green burst: a small white spark in A, a big pink burst in B.
    { x: 1062, y: 380, r: 95 },
    // The second lantern from the right: red in A, blue in B.
    { x: 1822, y: 1058, r: 88 },
    // The balloon held by the person in yellow: green in A, pink in B.
    { x: 1238, y: 1216, r: 80 },
    // The shirt of the person on the left: red in A, blue in B.
    { x: 980, y: 1332, r: 72 },
    // The light on the small wooden boat: yellow in A, green in B.
    { x: 2052, y: 1460, r: 100 },
  ],
}
