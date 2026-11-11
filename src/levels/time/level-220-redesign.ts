import type { Difference, LevelPictures, Trap } from '../../engine/types.ts'

// Level 220 ("militaryBase") as two pictures (public/levels/redesign/, Gemini's full 2624×1632): A the airfield base
// on a sunny afternoon, B the same base at night with its eight tiny differences, none of them a colour change. Gemini
// made the night and the differences but the helicopter's tail rotor, which is taken away by hand (the fin behind it
// filled in); its blue toolbox is made red again (laid back from A, colours fitted to the night) and the left pine
// under the moon made shorter instead (its top slid down onto the sky and the woods behind it), and the
// barrel of the left tank made a little longer than Gemini drew it. The flock at the top left is taken off A by hand
// (wanted); B's three seagulls in the middle of the sky are taken away instead, so the night keeps its birds' change.
// B is a whole picture: the moments differ everywhere.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The grey wrench on the hangar's pegboard: there in A, gone in B.
  { x: 650, y: 775, r: 79 },
  // The antenna mast with its red light on the control tower: there in A, gone in B.
  { x: 1080, y: 190, r: 79 },
  // The arm with the small red ball in front of the radar dish: there in A, gone in B.
  { x: 1375, y: 665, r: 79 },
  // The green jerry cans: three in A, two in B.
  { x: 1140, y: 1215, r: 79 },
  // The red star on the parked jet's tail fin: there in A, gone in B.
  { x: 1870, y: 1075, r: 79 },
  // The left tank's gun barrel: long in A, shorter in B.
  { x: 735, y: 1366, r: 79 },
  // The left pine under the moon: taller in A, its top cut lower in B.
  { x: 2420, y: 455, r: 79 },
  // The tail rotor of the helicopter on the pad: there in A, gone in B.
  { x: 1745, y: 1395, r: 79 },
]
// The natural changes between the two moments, in the drawn scene's order.
const traps: Trap[] = [
  // The control tower's upper small window, lit at night.
  { x: 1015, y: 580, r: 50, hint: 'lights' },
  // The barracks' left window, lit at night.
  { x: 1945, y: 800, r: 70, hint: 'lights' },
  // The street lamp's head, lit at night.
  { x: 1790, y: 650, r: 50, hint: 'lights' },
  // The three seagulls in the middle of the sky, gone at night.
  { x: 1520, y: 170, r: 90, hint: 'birds' },
  // Stars in the sky.
  { x: 1300, y: 110, r: 90, hint: 'stars' },
  // The sun by day, the moon at night.
  { x: 2360, y: 225, r: 150, hint: 'moon' },
]

export const level220Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-220-a.avif',
  imageB: 'levels/redesign/level-220-b.avif',
  viewBox,
  differences,
  traps,
}
