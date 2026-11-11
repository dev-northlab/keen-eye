import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 213 ("harborEvening") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the harbour with
// the steamer on a sunny afternoon, B the same harbour in the evening with its seven differences; only one is a
// colour change. Gemini made the evening and the teal flag; it took both life rings off the cabin, so the right one is
// laid back from A (colours fitted to the evening). Made by hand: the funnel's red band darkened away, the warehouse's
// left window, the diagonal plank of the top crate and the anchor's cross bar taken away, and one small sailboat on
// the horizon (instead of the barrel's hoop and the bollard Gemini left: the barrel is too dark at night and a gull
// stands on the bollard). B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The flag on the tall pole: yellow in A, teal in B.
  { x: 1889, y: 384, r: 79 },
  // The steamer's funnel: a red band in A, all dark in B.
  { x: 2082, y: 650, r: 79 },
  // The left life ring on the cabin wall: there in A, gone in B.
  { x: 1950, y: 880, r: 70 },
  // The warehouse's left window: there in A, plain wall in B.
  { x: 946, y: 778, r: 90 },
  // The top crate of the stack: a diagonal plank on its front in A, plain boards in B.
  { x: 244, y: 928, r: 79 },
  // The anchor by the blue barrel: a cross bar in A, none in B.
  { x: 798, y: 1156, r: 79 },
  // A small sailboat on the horizon: there in A, gone in B.
  { x: 2454, y: 723, r: 79 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // The steamer's portholes, lit in the evening.
  { x: 2045, y: 785, r: 55, hint: 'lights' },
  // The street lamp's head, lit in the evening.
  { x: 70, y: 385, r: 70, hint: 'lights' },
  // The two seagulls at the top left, gone in the evening.
  { x: 300, y: 180, r: 120, hint: 'birds' },
  // Stars in the sky.
  { x: 900, y: 130, r: 120, hint: 'stars' },
  // The sun by day, the moon in the evening.
  { x: 2227, y: 212, r: 150, hint: 'moon' },
]

export const level213Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-213-a.avif',
  imageB: 'levels/redesign/level-213-b.avif',
  viewBox,
  differences,
  traps,
}
