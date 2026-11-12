import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 222 ("atTheAirport") as two pictures (public/levels/redesign/, Gemini's full 2752×1536): A the airport on a
// sunny afternoon, B the same airport at night with its nine tiny differences; only one is a colour change. Gemini
// made the night, the hangar without its pennant, the fin without its logo, the blue engine band, the blue suitcase
// gone from the cart and the follow-me car without its sign. Made by hand: the middle flag on the terminal, the tug's
// beacon and the red suitcase's tag taken away, and a sparrow on the apron (instead of the stairs' handrail, which
// Gemini kept). B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2752, h: 1536 }
const differences: Difference[] = [
  // The middle red flag on the terminal's roof: there in A, a bare pole in B.
  { x: 662, y: 345, r: 83 },
  // The blue pennant on the hangar's roof: there in A, a bare pole in B.
  { x: 2380, y: 575, r: 83 },
  // The round yellow logo on the airliner's tail fin: there in A, gone in B.
  { x: 2320, y: 884, r: 83 },
  // The band on the airliner's engine: red in A, blue in B.
  { x: 1630, y: 1150, r: 83 },
  // The orange beacon on the baggage tug's roof: there in A, gone in B.
  { x: 345, y: 1140, r: 83 },
  // The blue suitcase on the first cart: there in A, gone in B.
  { x: 790, y: 1350, r: 83 },
  // The white tag on the red suitcase: there in A, gone in B.
  { x: 960, y: 1330, r: 83 },
  // The checkered sign on the follow-me car's roof: there in A, gone in B.
  { x: 1444, y: 1216, r: 83 },
  // The right sparrow on the apron: there in A, gone in B.
  { x: 1040, y: 1166, r: 83 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // The terminal's glass facade, lit at night.
  { x: 400, y: 650, r: 90, hint: 'lights' },
  // The control tower's lower small window, lit at night.
  { x: 1380, y: 594, r: 50, hint: 'lights' },
  // The street lamp's head, lit at night.
  { x: 1820, y: 566, r: 60, hint: 'lights' },
  // Stars in the sky.
  { x: 250, y: 90, r: 80, hint: 'stars' },
  // The sun by day, the moon at night.
  { x: 2550, y: 180, r: 130, hint: 'moon' },
]

export const level222Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-222-a.avif',
  imageB: 'levels/redesign/level-222-b.avif',
  viewBox,
  differences,
  traps,
}
