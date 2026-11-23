// "Cartoons" (chapter `cartoon`, ids from 801; docs/cartoon-mode.md): short funny stories that loop, told by a camera,
// with differences that stay all along and differences that are events of the story. Drawn SVG scenes (`svgLevel`
// with `cartoon`), played by LevelView on the cartoon board (engine/cartoon.ts).
// While the category is being drawn, new cartoons wait in upcoming.ts (developer mode only, at their place in the
// grid; their titles in English everywhere): once it is finished they come here, with the store texts and the
// titles in every language.
import type { Level } from '../../engine/types.ts'
import level801 from './level-801.ts'
import level802 from './level-802.ts'
import level811 from './level-811.ts'
import level812 from './level-812.ts'

export const cartoonLevels: Level[] = [level801, level802, level811, level812]
