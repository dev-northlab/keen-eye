import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 218 ("railwayEvening") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the country
// station on a sunny afternoon, B the same station in the evening with its eight tiny differences; only one is a
// colour change. Gemini made the evening and the red station sign; it took away both pigeons on the canopy, so the
// front one is laid back from A (colours fitted to the evening), and the flocks in the sky, laid back the same way.
// Made by hand: the right flower pot on the sill, the doormat, the board's lower line, the suitcase's handle and the
// carriage's yellow plate taken away, and the pigeon on the platform (instead of the newspaper on the bench, which
// lies where the bench's back meets its seat). B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The right flower pot on the rightmost window's sill: there in A, gone in B.
  { x: 1017, y: 745, r: 79 },
  // The doormat in front of the station door: there in A, gone in B.
  { x: 632, y: 1226, r: 95 },
  // The yellow timetable board: two white lines in A, one in B.
  { x: 335, y: 918, r: 79 },
  // The station sign under the canopy: blue in A, red in B.
  { x: 1402, y: 803, r: 130 },
  // The pigeons on the canopy roof: two in A, one in B.
  { x: 1660, y: 565, r: 79 },
  // The pigeon on the platform: there in A, gone in B.
  { x: 1462, y: 1390, r: 79 },
  // The red suitcase's carrying handle: there in A, gone in B.
  { x: 1757, y: 1150, r: 79 },
  // The small yellow plate on the second carriage: there in A, gone in B.
  { x: 2112, y: 1063, r: 79 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // The station clock: nine o'clock by day, a quarter to seven in the evening.
  { x: 624, y: 400, r: 70, hint: 'clock' },
  // The station house's two left windows, lit in the evening.
  { x: 232, y: 645, r: 90, hint: 'lights' },
  // The lamp hanging from the canopy, lit in the evening.
  { x: 1640, y: 822, r: 45, hint: 'lights' },
  // The locomotive's headlight, lit in the evening.
  { x: 2465, y: 1030, r: 50, hint: 'lights' },
  // Stars in the sky.
  { x: 1250, y: 150, r: 90, hint: 'stars' },
  // The sun by day, the moon in the evening.
  { x: 2296, y: 256, r: 140, hint: 'moon' },
]

export const level218Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-218-a.avif',
  imageB: 'levels/redesign/level-218-b.avif',
  viewBox,
  differences,
  traps,
}
