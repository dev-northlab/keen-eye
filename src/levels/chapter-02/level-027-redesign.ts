import type { LevelPictures } from '../../engine/types.ts'

// Level 27 ("nightCity") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the full moon
// turns into a crescent, a star appears left of the three stars at the top right, a lit window of the right house
// goes dark, the neon sign turns from pink to cyan, the left street lamp is off, the blue car's roof sign turns from
// yellow to red, the taxi's roof sign is gone. Touched up by hand: B is A with only Gemini's moon, star, window, neon
// sign, lamp and roof sign laid over it. Gemini added a second star further left: that decor is kept, laid on both
// pictures. It kept the taxi's sign: the sign is painted out with the road beside it.
export const level027Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-027-a.avif',
  imageB: 'levels/redesign/level-027-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The moon: full in A, a thin crescent in B.
    { x: 398, y: 194, r: 140 },
    // A small star left of the three stars at the top right, only in B.
    { x: 1838, y: 154, r: 60 },
    // The window at the right edge of the right house, second row: lit in A, dark in B.
    { x: 2494, y: 652, r: 70 },
    // The neon bar sign on the middle house: pink in A, cyan in B.
    { x: 1516, y: 814, r: 190 },
    // The left street lamp: lit in A, off in B.
    { x: 850, y: 788, r: 65 },
    // The sign on the blue car's roof: yellow in A, red in B.
    { x: 532, y: 1306, r: 60 },
    // The black sign on the taxi's roof, only in A.
    { x: 1838, y: 1398, r: 60 },
  ],
  // The city's golden key on the sidewalk by the woman in purple: cut out of the pictures (the tiles beside it laid
  // over its place) into its own image, so a tap takes it off like a drawn scene's key.
  secret: {
    x: 949,
    y: 1136,
    r: 40,
    on: 'both',
    image: { href: 'levels/redesign/level-027-key.webp', x: 920, y: 1122, w: 58, h: 28 },
  },
}
