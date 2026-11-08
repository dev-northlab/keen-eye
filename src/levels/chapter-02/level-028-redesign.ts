import type { LevelPictures } from '../../engine/types.ts'

// Level 28 ("trafficJam") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// traffic light turns from red to green, the red shirt on the sidewalk turns green, the red car at the far left gets
// dark windows, the bus's route board turns from yellow to pink, the pink car's roof turns white, the exhaust cloud
// behind the grey-green car is gone, the bicycle's frame turns from green to red. Touched up by hand: B is A with only
// Gemini's traffic light, pink car and bicycle laid over it. Gemini added a man in a green shirt and a red car with
// dark windows instead of changing the man and the car: they are kept as decor, laid on both pictures. It put a pink
// box on the bus's roof (it stays as in A) and kept the shirt, the car's windows, the board and the exhaust cloud:
// the shirt, the windows and the board are recolored by hand, keeping their shading, and the cloud painted out.
export const level028Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-028-a.webp',
  imageB: 'levels/redesign/level-028-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The traffic light: red on in A, green on in B.
    { x: 2298, y: 786, r: 95 },
    // The shirt of the man on the sidewalk: red in A, green in B.
    { x: 656, y: 864, r: 70 },
    // The route board on the teal bus: yellow in A, pink in B.
    { x: 1180, y: 1108, r: 62 },
    // The windows of the red car at the far left of the upper lane: light in A, dark in B.
    { x: 286, y: 1198, r: 60 },
    // The bicycle's frame: green in A, red in B.
    { x: 1834, y: 1434, r: 80 },
    // The pink car's roof: pink in A, white in B.
    { x: 1008, y: 1440, r: 100 },
    // The exhaust cloud behind the grey-green car, only in A.
    { x: 416, y: 1512, r: 60 },
  ],
}
