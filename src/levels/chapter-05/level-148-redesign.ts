import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 148 ("alienBazaar") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the parked
// saucer's lights turn red, the second lantern orange, the pink lantern white, the sign loses its triangle, the left
// stall loses a spiky fruit, the yellow crystal turns red, the third jar's liquid purple, the light blue alien's
// antennae yellow, the yellow alien gets a third eye, and an orange alien pet sits on the ground. B is A with only
// these changes of Gemini's laid over it. Fixed by hand: Gemini moved the sign's circle to the middle, so on A the
// triangle is filled with the board; it turned the yellow crystal green and the green one red, so A's yellow crystal is
// recoloured red; it added a fourth, purple jar instead, so A's third jar's liquid is recoloured purple; its darkened
// fruits, the redrawn robot and the other shoppers are left out.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The three lights of the parked purple saucer on the hill: green in A, red in B.
  { x: 2360, y: 430, r: 85 },
  // The second lantern from the left on the string: light blue in A, orange in B.
  { x: 982, y: 475, r: 128 },
  // The lantern above the right side of the middle stall: pink in A, white in B.
  { x: 1690, y: 478, r: 107 },
  // The white triangle on the green sign board above the middle stall, only in A.
  { x: 1334, y: 488, r: 73 },
  // The top left orange spiky fruit on the left stall's counter, only in A.
  { x: 266, y: 886, r: 73 },
  // The crystal right of the robot vendor: yellow in A, red in B.
  { x: 1442, y: 914, r: 73 },
  // The liquid in the third jar from the left on the right stall: yellow in A, purple in B.
  { x: 2028, y: 931, r: 73 },
  // The two antennae of the light blue alien at the bottom left: light blue in A, yellow in B.
  { x: 590, y: 1418, r: 73 },
  // A third eye between the two eyes of the yellow alien at the bottom right, only in B.
  { x: 1967, y: 1362, r: 73 },
  // A small round orange alien pet between the pink and the green alien, only in B.
  { x: 1326, y: 1492, r: 77 },
]

export const level148Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-148-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-148-b-<n>.webp).
  imageB: 'levels/redesign/level-148-a.avif',
  patchesB: zonePatches('levels/redesign/level-148-b', differences, viewBox),
  viewBox,
  differences,
}
