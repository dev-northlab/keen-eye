import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 226 ("oldTownSquare") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the old-town
// square on a sunny afternoon, B the same square at night with its ten tiny differences; only one is a colour change.
// Gemini made the night, the terracotta house's lower right window, the door's window, the round window under the
// clock, the bread on the sign and the bench's backrest gone, and the teal door. Made by hand: one flower of the
// window box and the vase on the café table taken away, and the pigeon on the cobbles left of the fountain (instead of
// the one on the fountain's rim, which Gemini kept and which sits on its curve). Also by hand: the pigeon on the
// cobbles by the café. B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The terracotta house's lower right window: there in A, plain wall in B.
  { x: 418, y: 852, r: 85 },
  // The window box: three pink flowers in A, two in B.
  { x: 157, y: 716, r: 79 },
  // The small window in the yellow house's blue door: there in A, a plain door in B.
  { x: 850, y: 870, r: 79 },
  // The round window below the clock: there in A, plain wall in B.
  { x: 1311, y: 572, r: 79 },
  // The loaf of bread on the hanging sign: there in A, a plain sign in B.
  { x: 1110, y: 762, r: 79 },
  // The lilac house's door: yellow in A, teal in B.
  { x: 2310, y: 908, r: 85 },
  // The pigeon on the cobbles left of the fountain: there in A, gone in B.
  { x: 730, y: 1158, r: 79 },
  // The vase with a flower on the café table: there in A, gone in B.
  { x: 1766, y: 1420, r: 79 },
  // The backrest of the bench at the lower left: there in A, only the seat in B.
  { x: 560, y: 1475, r: 110 },
  // The pigeon on the cobbles by the café: there in A, gone in B.
  { x: 1975, y: 1222, r: 79 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // The clock: ten past ten by day, twenty to nine at night.
  { x: 1311, y: 357, r: 90, hint: 'clock' },
  // The yellow house's upper left window, lit at night.
  { x: 670, y: 580, r: 70, hint: 'lights' },
  // The lilac house's right window, lit at night.
  { x: 2475, y: 680, r: 70, hint: 'lights' },
  // The left street lamp, lit at night.
  { x: 982, y: 1195, r: 60, hint: 'lights' },
  // The right street lamp, lit at night.
  { x: 2296, y: 1195, r: 60, hint: 'lights' },
  // Stars in the sky.
  { x: 1600, y: 90, r: 80, hint: 'stars' },
  // The sun by day, the moon at night.
  { x: 260, y: 196, r: 130, hint: 'moon' },
]

export const level226Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-226-a.avif',
  imageB: 'levels/redesign/level-226-b.avif',
  viewBox,
  differences,
  traps,
}
