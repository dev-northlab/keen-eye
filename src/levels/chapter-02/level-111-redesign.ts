import type { LevelPictures } from '../../engine/types.ts'

// Level 111 ("rushHour") redrawn as two pictures (public/levels/redesign/, Gemini's full 2612×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the clock's hands
// turn red, the flag on the pink house from red-and-white to blue-and-white, the one-way sign's board from black to
// blue, the teal shirt under the yellow awning white, the walking man on the pedestrian signal from green to red, a
// white pigeon stands at the bottom left, the left of the two cones at the bottom right loses its white stripe.
// Touched up by hand: B is A with only Gemini's hands, flag, sign, shirt, pigeon and cone laid over it (Gemini drew the
// whole picture's textures anew, so only those places are taken). Gemini drew a new two-light signal box: the box
// stays as in A and its walking man is recolored red by hand. Instead of whitening the leftmost pigeon it added a
// white one left of the others, which stands as the difference.
export const level111Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-111-a.avif',
  imageB: 'levels/redesign/level-111-b.avif',
  viewBox: { w: 2612, h: 1632 },
  differences: [
    // The hands of the clock on top of the blue house: black in A, red in B.
    { x: 1198, y: 106, r: 74 },
    // The flag on the pink house's roof: red and white in A, blue and white in B.
    { x: 2376, y: 192, r: 85 },
    // The shirt of the man under the yellow-and-white awning: teal in A, white in B.
    { x: 1840, y: 958, r: 85 },
    // The board of the one-way sign: black in A, blue in B.
    { x: 676, y: 956, r: 75 },
    // The walking man on the pedestrian signal: green in A, red in B.
    { x: 1570, y: 1284, r: 74 },
    // A white pigeon at the bottom left, left of the other pigeons, only in B.
    { x: 210, y: 1564, r: 100 },
    // The left of the two cones at the bottom right: a white stripe in A, plain orange in B.
    { x: 2088, y: 1568, r: 74 },
  ],
}
