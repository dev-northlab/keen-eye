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
import level016 from './chapter-02/level-016.ts'
import level017 from './chapter-02/level-017.ts'
import level018 from './chapter-02/level-018.ts'
import level019 from './chapter-02/level-019.ts'
import level020 from './chapter-02/level-020.ts'
import level021 from './chapter-02/level-021.ts'
import level022 from './chapter-02/level-022.ts'
import level023 from './chapter-02/level-023.ts'
import level024 from './chapter-02/level-024.ts'
import level025 from './chapter-02/level-025.ts'
import level026 from './chapter-02/level-026.ts'
import level027 from './chapter-02/level-027.ts'
import level028 from './chapter-02/level-028.ts'
import level029 from './chapter-02/level-029.ts'
import level030 from './chapter-02/level-030.ts'
import level031 from './chapter-03/level-031.ts'
import level032 from './chapter-03/level-032.ts'
import level033 from './chapter-03/level-033.ts'
import level034 from './chapter-03/level-034.ts'
import level035 from './chapter-03/level-035.ts'
import level036 from './chapter-03/level-036.ts'
import level037 from './chapter-03/level-037.ts'
import level038 from './chapter-03/level-038.ts'
import level039 from './chapter-03/level-039.ts'
import level040 from './chapter-03/level-040.ts'
import level041 from './chapter-03/level-041.ts'
import level042 from './chapter-03/level-042.ts'
import level043 from './chapter-03/level-043.ts'
import level044 from './chapter-03/level-044.ts'
import level045 from './chapter-03/level-045.ts'
import level046 from './chapter-04/level-046.ts'
import level047 from './chapter-04/level-047.ts'
import level048 from './chapter-04/level-048.ts'
import level049 from './chapter-04/level-049.ts'
import level050 from './chapter-04/level-050.ts'
import level051 from './chapter-04/level-051.ts'
import level052 from './chapter-04/level-052.ts'
import level053 from './chapter-04/level-053.ts'
import level054 from './chapter-04/level-054.ts'
import level055 from './chapter-04/level-055.ts'
import level056 from './chapter-04/level-056.ts'
import level057 from './chapter-04/level-057.ts'
import level058 from './chapter-04/level-058.ts'
import level059 from './chapter-04/level-059.ts'
import level060 from './chapter-04/level-060.ts'

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
  level016,
  level017,
  level018,
  level019,
  level020,
  level021,
  level022,
  level023,
  level024,
  level025,
  level026,
  level027,
  level028,
  level029,
  level030,
  level031,
  level032,
  level033,
  level034,
  level035,
  level036,
  level037,
  level038,
  level039,
  level040,
  level041,
  level042,
  level043,
  level044,
  level045,
  level046,
  level047,
  level048,
  level049,
  level050,
  level051,
  level052,
  level053,
  level054,
  level055,
  level056,
  level057,
  level058,
  level059,
  level060,
]

export const levelById = (id: number): Level | undefined => levels.find((l) => l.id === id)
