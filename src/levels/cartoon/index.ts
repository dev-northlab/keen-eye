// "Cartoons" (chapter `cartoon`, ids from 801; docs/cartoon-mode.md): short funny stories that loop, told by a camera,
// with differences that stay all along and differences that are events of the story. Drawn SVG scenes (`svgLevel`
// with `cartoon`), played by LevelView on the cartoon board (engine/cartoon.ts).
import type { Level } from '../../engine/types.ts'
import level801 from './level-801.ts'
import level802 from './level-802.ts'

export const cartoonLevels: Level[] = [level801, level802]
