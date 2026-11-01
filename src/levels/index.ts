import type { Level } from '../engine/types.ts'
import level001 from './chapter-01/level-001.ts'
import level002 from './chapter-01/level-002.ts'
import level003 from './chapter-01/level-003.ts'
import level004 from './chapter-01/level-004.ts'

export const levels: Level[] = [level001, level002, level003, level004]

export const levelById = (id: number): Level | undefined => levels.find((l) => l.id === id)
