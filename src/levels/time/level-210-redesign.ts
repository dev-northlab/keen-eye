import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 210 ("emergencyServices") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the street of
// the fire station, the police station and the hospital in summer, B the same street in winter with its six tiny
// differences; only one is a colour change. Gemini made the winter and every difference but the light bar, whose red
// light is made blue by hand. B is a whole picture: the seasons differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The small golden bell in the fire station's tower: there in A, an empty arch in B.
  { x: 835, y: 365, r: 79 },
  // The round blue lamp above the police station's door: there in A, gone in B.
  { x: 1350, y: 745, r: 79 },
  // The hose reel on the fire engine's side: there in A, gone in B.
  { x: 525, y: 1190, r: 79 },
  // The police car's light bar: a red and a blue light in A, two blue ones in B.
  { x: 1045, y: 1158, r: 79 },
  // The red cross on the ambulance's side: there in A, gone in B.
  { x: 1429, y: 1200, r: 79 },
  // The white star on the jeep's door: there in A, gone in B.
  { x: 1965, y: 1268, r: 79 },
]
// The natural changes of winter, in the drawn scene's order.
const traps: Trap[] = [
  // The trees at the right: green in summer, bare in winter.
  { x: 2440, y: 900, r: 160, hint: 'leaves' },
  // Icicles hanging from the hospital's roof edge.
  { x: 1880, y: 445, r: 70, hint: 'icicles' },
  // The snowman on the lawn.
  { x: 1510, y: 1510, r: 90, hint: 'snowman' },
  // The man: a sweater in summer, a winter coat in winter.
  { x: 2165, y: 1490, r: 100, hint: 'clothes' },
]

export const level210Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-210-a.avif',
  imageB: 'levels/redesign/level-210-b.avif',
  viewBox,
  differences,
  traps,
}
