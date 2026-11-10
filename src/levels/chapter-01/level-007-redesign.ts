import type { LevelPictures } from '../../engine/types.ts'

// Level 7 ("apiary") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel difference.
// The same differences as the drawn scene, except the jar: its lid is gone, not the whole jar. Gemini also took away
// other clouds and left the hat white; B got those clouds back from A and its hat painted yellow by hand.
export const level007Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-007-a.avif',
  imageB: 'levels/redesign/level-007-b.avif',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // The small cloud on the left, only in A.
    { x: 403, y: 137, r: 60 },
    // The third honey jar: a cloth lid in A, open in B.
    { x: 286, y: 551, r: 42 },
    // The middle hive: yellow in A, blue in B.
    { x: 847, y: 536, r: 82 },
    // The beekeeper's hat on the post: white in A, yellow in B.
    { x: 1175, y: 474, r: 58 },
    // A bee on the grass by the table, only in B.
    { x: 355, y: 667, r: 44 },
  ],
  // The farm's golden key on the table, by the first jar: cut out of the pictures (painted away there, the jar behind
  // it taken from the next jar) into its own image, so a tap takes it off like a drawn scene's key.
  secret: {
    x: 155,
    y: 578,
    r: 34,
    on: 'both',
    image: { href: 'levels/redesign/level-007-key.webp', x: 119, y: 562, w: 74, h: 31 },
  },
}
