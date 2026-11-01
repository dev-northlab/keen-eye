import type { Level } from '../engine/types.ts'
import level001 from './chapter-01/level-001.ts'
import level002 from './chapter-01/level-002.ts'
import level003 from './chapter-01/level-003.ts'
import level004 from './chapter-01/level-004.ts'
import level005 from './chapter-01/level-005.ts'
import level006 from './chapter-01/level-006.ts'
import level007 from './chapter-01/level-007.ts'
import level008 from './chapter-01/level-008.ts'
import level009 from './chapter-01/level-009.ts'
import level010 from './chapter-01/level-010.ts'
import level011 from './chapter-01/level-011.ts'
import level012 from './chapter-01/level-012.ts'
import level013 from './chapter-01/level-013.ts'
import level014 from './chapter-01/level-014.ts'
import level015 from './chapter-01/level-015.ts'

export const levels: Level[] = [
  level001,
  level002,
  level003,
  level004,
  level005,
  level006,
  level007,
  level008,
  level009,
  level010,
  level011,
  level012,
  level013,
  level014,
  level015,
]

export const levelById = (id: number): Level | undefined => levels.find((l) => l.id === id)
