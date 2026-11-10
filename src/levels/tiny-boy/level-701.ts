import type { Level } from '../../engine/types.ts'

// "Tiny boy" 1: his first birthday with a big teddy bear and the cake (public/levels/tiny-boy/, Gemini, 2752×1536),
// eight differences. Five were asked of Gemini; B is A with only those parts taken from its B (feathered masks). It
// took both of the bear's ears away (its right ear is A's again) and redrew the shirt's top button by the bow tie
// (A's again); with the chocolate curls it also took the chocolate drips off the cake, all inside that zone. The
// other three are small and hard to see, done by hand: a garland bulb switched off, the toy dinosaur's spikes recoloured,
// the small gift's ribbon recoloured. Zones measured on the pixel difference.
const level: Level = {
  id: 701,
  chapter: 'tinyBoy',
  title: 'firstBirthday',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-701-a.webp',
  imageB: 'levels/tiny-boy/level-701-b.webp',
  viewBox: { w: 2752, h: 1536 },
  differences: [
    // The boy's bow tie: beige in A, red in B.
    { x: 911, y: 671, r: 88 },
    // The teddy bear's checkered bow: beige in A, light blue in B.
    { x: 1762, y: 519, r: 140 },
    // The chocolate curls (and drips) on the cake, only in A.
    { x: 1950, y: 1165, r: 330 },
    // The bear's left ear, only in A.
    { x: 1371, y: 125, r: 140 },
    // The blanket on the armchair: mint in A, pink in B.
    { x: 2183, y: 332, r: 125 },
    // A garland bulb at the top left: lit in A, off in B.
    { x: 620, y: 160, r: 60 },
    // The toy dinosaur's spikes: green in A, purple in B.
    { x: 600, y: 1003, r: 95 },
    // The small gift's ribbon and bow: salmon in A, green in B.
    { x: 1327, y: 1277, r: 75 },
  ],
  parTimeSec: 80,
  multiplayerReady: true,
}

export default level
