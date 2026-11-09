import type { LevelPictures } from '../../engine/types.ts'

// Level 126 ("anthill") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): an ant on the soil
// goes, the ladybug turns yellow, a water drop hangs on a grass blade, the ant on the blade above the anthill turns
// red, the dandelion's seed head becomes a yellow flower, the caterpillar's head turns red, the clover loses its top
// leaf and a light grey pebble turns orange-brown. B is A with only these changes of Gemini's laid over it; A has no
// line of ants and a three-leaf clover, and Gemini only reshuffled the clover's leaves and took no ant away, so the
// third ant from the left on the soil and the clover's top leaf are painted out by hand with the soil and the blurred
// grass beside them.
export const level126Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-126-a.webp',
  imageB: 'levels/redesign/level-126-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The third ant from the left on the soil, only in A.
    { x: 984, y: 1430, r: 73 },
    // The ladybug: red in A, yellow in B.
    { x: 420, y: 722, r: 73 },
    // The water drop high on a grass blade, only in B.
    { x: 930, y: 516, r: 73 },
    // The ant on the blade above the anthill: black in A, red in B.
    { x: 1086, y: 858, r: 73 },
    // The dandelion: a white seed head in A, a yellow flower in B.
    { x: 2300, y: 516, r: 140 },
    // The caterpillar's head: green in A, red in B.
    { x: 1920, y: 990, r: 73 },
    // The clover's top leaf, only in A.
    { x: 198, y: 1340, r: 73 },
    // The pebble between the feather and the blue pebble: light grey in A, orange-brown in B.
    { x: 1692, y: 1590, r: 73 },
  ],
}
