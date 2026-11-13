import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 317 ("memoryBakery") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the right hanging lamp gone with its cord, the rightmost loaf gone from the bread
// shelf, a pink cupcake new in the glass case, the big cake's cream pink. Gemini also redrew the cookies in the jars a
// little, and its wall came out a shade lighter: laid over A, the cut-outs showed the lamp's outline and cut the gone
// loaf's shadow, so B is its own picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The right one of the three hanging lamps, with its cord: there in A, gone in B.
  { x: 1355, y: 152, r: 160 },
  // The rightmost loaf on the bread shelf: there in A, gone in B.
  { x: 657, y: 647, r: 110 },
  // The cupcake with pink frosting and a cherry in the glass case: not in A, there in B.
  { x: 1306, y: 1365, r: 102 },
  // The big two-tier cake on the little table: white cream in A, pink in B.
  { x: 1291, y: 2192, r: 235 },
]

export const level317Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-317-a.avif',
  imageB: 'levels/redesign/level-317-b.avif',
  viewBox,
  differences,
}
