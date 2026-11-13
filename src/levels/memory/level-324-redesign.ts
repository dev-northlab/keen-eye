import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 324 ("memoryLab") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the middle jar on the shelf blue, the microscope gone, the yellow flask gone, a
// green apple new on the bench, the red stool gone. Gemini made other changes than asked (and a fifth one only when
// asked again), all big and one recolour still. The microscope stands taller than its zone (kept small to stay clear of
// the flask's), so a cut-out would clip it: B is its own picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The middle of the three jars on the shelf: pink in A, blue in B.
  { x: 1015, y: 957, r: 102 },
  // The microscope at the left of the bench: there in A, gone in B.
  { x: 222, y: 1405, r: 112 },
  // The flask with yellow liquid: there in A, gone in B.
  { x: 447, y: 1505, r: 102 },
  // The green apple on the bench between the green and the blue flask: not in A, there in B.
  { x: 757, y: 1565, r: 102 },
  // The red stool on the floor: there in A, gone in B.
  { x: 679, y: 2268, r: 140 },
]

export const level324Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-324-a.avif',
  imageB: 'levels/redesign/level-324-b.avif',
  viewBox,
  differences,
  // The "memory" world's golden key on the shelf, its blade behind the yellow jar and its ring out: cut out of B into its
  // own image and painted away on both pictures (the tile, its grout and the shelf's edge), shown on B only.
  secret: {
    x: 1325,
    y: 988,
    r: 45,
    on: 'b',
    image: { href: 'levels/redesign/level-324-key.webp', x: 1279, y: 965, w: 79, h: 48 },
  },
}
