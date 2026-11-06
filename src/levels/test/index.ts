// "Test" levels (chapter `test`, ids from 1001): picture pairs tried out before they become real levels.
// Developer mode only: they sit with the hidden levels of `upcoming.ts` and are never released from there.
import type { Level } from '../../engine/types.ts'
import level1001 from './level-1001.ts'

export const testLevels: Level[] = [level1001]
