// "Tiny boy" (chapter `tinyBoy`, ids from 701): spot the difference in Gemini pictures of one little boy at home,
// `kind: 'image'` levels with their pictures in public/levels/tiny-boy/ and a photo for their banner on TinyBoyView,
// public/banners/tiny-boy-<id>.webp (a 1000×400 crop of picture A around the boy, on the right). Hidden until released
// (upcoming.ts).
import type { Level } from '../../engine/types.ts'
import level701 from './level-701.ts'
import level702 from './level-702.ts'

export const tinyBoyLevels: Level[] = [level701, level702]
