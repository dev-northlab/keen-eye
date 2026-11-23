// "Cartoons" (chapter `cartoon`, ids from 801; docs/cartoon-mode.md): short funny stories that loop, told by a camera,
// with differences that stay all along and differences that are events of the story. Drawn SVG scenes (`svgLevel`
// with `cartoon`), played by LevelView on the cartoon board (engine/cartoon.ts).
// A new cartoon may wait in upcoming.ts while it is drawn (developer mode only, at its place in the grid). The titles
// of 803–810 and 813 are still English in every locale: translating them is left for later.
import type { Level } from '../../engine/types.ts'
import level801 from './level-801.ts'
import level802 from './level-802.ts'
import level803 from './level-803.ts'
import level804 from './level-804.ts'
import level805 from './level-805.ts'
import level806 from './level-806.ts'
import level807 from './level-807.ts'
import level808 from './level-808.ts'
import level809 from './level-809.ts'
import level810 from './level-810.ts'
import level811 from './level-811.ts'
import level812 from './level-812.ts'
import level813 from './level-813.ts'

export const cartoonLevels: Level[] = [level801, level802, level803, level804, level805, level806, level807, level808, level809, level810, level811, level812, level813]
