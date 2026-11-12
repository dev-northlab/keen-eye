import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 225 ("armyCamp") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the army camp in a
// mountain valley in summer, B the same camp in winter with its nine tiny differences; only one is a colour change.
// Gemini made the winter, the flag without its stars and the blue cross; it left the rest. Made by hand: the hammer
// on the pegboard, the pot on the generator, the cabin door's knob, the truck's spare wheel, the jerry can left of the
// jeep, the armoured vehicle's hatch lid and the tank's antenna taken away. B is a whole picture: the seasons differ
// everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The stars on the blue flag: there in A, a plain flag in B.
  { x: 722, y: 617, r: 79 },
  // The hammer on the workshop's pegboard: there in A, gone in B.
  { x: 965, y: 830, r: 79 },
  // The cooking pot on the generator: there in A, gone in B.
  { x: 1452, y: 815, r: 79 },
  // The brass knob of the cabin's door: there in A, gone in B.
  { x: 2031, y: 912, r: 79 },
  // The spare wheel on the truck's back: there in A, gone in B.
  { x: 704, y: 1127, r: 79 },
  // The jerry can at the left of the jeep: there in A, gone in B.
  { x: 903, y: 1180, r: 79 },
  // The hatch lid on the armoured vehicle's roof: there in A, gone in B.
  { x: 1770, y: 1083, r: 79 },
  // The tank's radio antenna: there in A, gone in B.
  { x: 230, y: 1280, r: 79 },
  // The cross on the white helicopter: red in A, blue in B.
  { x: 1497, y: 1470, r: 79 },
]
// The natural changes of winter, in the drawn scene's order.
const traps: Trap[] = [
  // The round tree: green in summer, bare in winter.
  { x: 1755, y: 800, r: 110, hint: 'leaves' },
  // Smoke from the cabin's chimney.
  { x: 2310, y: 520, r: 90, hint: 'smoke' },
  // Icicles hanging from the cabin's roof.
  { x: 2150, y: 760, r: 60, hint: 'icicles' },
  // The pond, frozen in winter.
  { x: 2260, y: 1225, r: 100, hint: 'ice' },
  // The soldier: a uniform in summer, a coat and a fur hat in winter.
  { x: 820, y: 1460, r: 80, hint: 'clothes' },
  // The snowman.
  { x: 1870, y: 1270, r: 80, hint: 'snowman' },
]

export const level225Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-225-a.avif',
  imageB: 'levels/redesign/level-225-b.avif',
  viewBox,
  differences,
  traps,
}
