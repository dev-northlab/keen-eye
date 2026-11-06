import type { Level } from '../engine/types.ts'
import { detectiveLevels } from './detective/index.ts'
import { memoryLevels } from './memory/index.ts'
import { timeLevels } from './time/index.ts'
import { travelLevels } from './travel/index.ts'
import { upcomingLevels } from './upcoming.ts'
import treasuryLevel from './treasury/level-900.ts'
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
import level016 from './chapter-01/level-016.ts'
import level017 from './chapter-01/level-017.ts'
import level018 from './chapter-01/level-018.ts'
import level019 from './chapter-01/level-019.ts'
import level020 from './chapter-01/level-020.ts'
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
import level031 from './chapter-02/level-031.ts'
import level032 from './chapter-02/level-032.ts'
import level033 from './chapter-02/level-033.ts'
import level034 from './chapter-02/level-034.ts'
import level035 from './chapter-02/level-035.ts'
import level036 from './chapter-02/level-036.ts'
import level037 from './chapter-02/level-037.ts'
import level038 from './chapter-02/level-038.ts'
import level039 from './chapter-02/level-039.ts'
import level040 from './chapter-02/level-040.ts'
import level041 from './chapter-03/level-041.ts'
import level042 from './chapter-03/level-042.ts'
import level043 from './chapter-03/level-043.ts'
import level044 from './chapter-03/level-044.ts'
import level045 from './chapter-03/level-045.ts'
import level046 from './chapter-03/level-046.ts'
import level047 from './chapter-03/level-047.ts'
import level048 from './chapter-03/level-048.ts'
import level049 from './chapter-03/level-049.ts'
import level050 from './chapter-03/level-050.ts'
import level051 from './chapter-03/level-051.ts'
import level052 from './chapter-03/level-052.ts'
import level053 from './chapter-03/level-053.ts'
import level054 from './chapter-03/level-054.ts'
import level055 from './chapter-03/level-055.ts'
import level056 from './chapter-03/level-056.ts'
import level057 from './chapter-03/level-057.ts'
import level058 from './chapter-03/level-058.ts'
import level059 from './chapter-03/level-059.ts'
import level060 from './chapter-03/level-060.ts'
import level061 from './chapter-04/level-061.ts'
import level062 from './chapter-04/level-062.ts'
import level063 from './chapter-04/level-063.ts'
import level064 from './chapter-04/level-064.ts'
import level065 from './chapter-04/level-065.ts'
import level066 from './chapter-04/level-066.ts'
import level067 from './chapter-04/level-067.ts'
import level068 from './chapter-04/level-068.ts'
import level069 from './chapter-04/level-069.ts'
import level070 from './chapter-04/level-070.ts'
import level071 from './chapter-04/level-071.ts'
import level072 from './chapter-04/level-072.ts'
import level073 from './chapter-04/level-073.ts'
import level074 from './chapter-04/level-074.ts'
import level075 from './chapter-04/level-075.ts'
import level076 from './chapter-04/level-076.ts'
import level077 from './chapter-04/level-077.ts'
import level078 from './chapter-04/level-078.ts'
import level079 from './chapter-04/level-079.ts'
import level080 from './chapter-04/level-080.ts'
import level081 from './chapter-05/level-081.ts'
import level082 from './chapter-05/level-082.ts'
import level083 from './chapter-05/level-083.ts'
import level084 from './chapter-05/level-084.ts'
import level085 from './chapter-05/level-085.ts'
import level086 from './chapter-05/level-086.ts'
import level087 from './chapter-05/level-087.ts'
import level088 from './chapter-05/level-088.ts'
import level089 from './chapter-05/level-089.ts'
import level090 from './chapter-05/level-090.ts'
import level091 from './chapter-05/level-091.ts'
import level092 from './chapter-05/level-092.ts'
import level093 from './chapter-05/level-093.ts'
import level094 from './chapter-05/level-094.ts'
import level095 from './chapter-05/level-095.ts'
import level096 from './chapter-05/level-096.ts'
import level097 from './chapter-05/level-097.ts'
import level098 from './chapter-05/level-098.ts'
import level099 from './chapter-05/level-099.ts'
import level100 from './chapter-05/level-100.ts'
import level101 from './chapter-01/level-101.ts'
import level102 from './chapter-01/level-102.ts'
import level103 from './chapter-01/level-103.ts'
import level104 from './chapter-01/level-104.ts'
import level105 from './chapter-01/level-105.ts'
import level106 from './chapter-01/level-106.ts'
import level107 from './chapter-01/level-107.ts'
import level108 from './chapter-01/level-108.ts'
import level109 from './chapter-01/level-109.ts'
import level110 from './chapter-01/level-110.ts'
import level111 from './chapter-02/level-111.ts'
import level112 from './chapter-02/level-112.ts'
import level113 from './chapter-02/level-113.ts'
import level114 from './chapter-02/level-114.ts'
import level115 from './chapter-02/level-115.ts'
import level116 from './chapter-02/level-116.ts'
import level117 from './chapter-02/level-117.ts'
import level118 from './chapter-02/level-118.ts'
import level119 from './chapter-02/level-119.ts'
import level120 from './chapter-02/level-120.ts'
import level121 from './chapter-03/level-121.ts'
import level122 from './chapter-03/level-122.ts'
import level123 from './chapter-03/level-123.ts'
import level124 from './chapter-03/level-124.ts'
import level125 from './chapter-03/level-125.ts'
import level126 from './chapter-03/level-126.ts'
import level127 from './chapter-03/level-127.ts'
import level128 from './chapter-03/level-128.ts'
import level129 from './chapter-03/level-129.ts'
import level130 from './chapter-03/level-130.ts'
import level131 from './chapter-04/level-131.ts'
import level132 from './chapter-04/level-132.ts'
import level133 from './chapter-04/level-133.ts'
import level134 from './chapter-04/level-134.ts'
import level135 from './chapter-04/level-135.ts'
import level136 from './chapter-04/level-136.ts'
import level137 from './chapter-04/level-137.ts'
import level138 from './chapter-04/level-138.ts'
import level139 from './chapter-04/level-139.ts'
import level140 from './chapter-04/level-140.ts'
import level141 from './chapter-05/level-141.ts'
import level142 from './chapter-05/level-142.ts'
import level143 from './chapter-05/level-143.ts'
import level144 from './chapter-05/level-144.ts'
import level145 from './chapter-05/level-145.ts'
import level146 from './chapter-05/level-146.ts'
import level147 from './chapter-05/level-147.ts'
import level148 from './chapter-05/level-148.ts'
import level149 from './chapter-05/level-149.ts'
import level150 from './chapter-05/level-150.ts'

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
  level061,
  level062,
  level063,
  level064,
  level065,
  level066,
  level067,
  level068,
  level069,
  level070,
  level071,
  level072,
  level073,
  level074,
  level075,
  level076,
  level077,
  level078,
  level079,
  level080,
  level081,
  level082,
  level083,
  level084,
  level085,
  level086,
  level087,
  level088,
  level089,
  level090,
  level091,
  level092,
  level093,
  level094,
  level095,
  level096,
  level097,
  level098,
  level099,
  level100,
  level101,
  level102,
  level103,
  level104,
  level105,
  level106,
  level107,
  level108,
  level109,
  level110,
  level111,
  level112,
  level113,
  level114,
  level115,
  level116,
  level117,
  level118,
  level119,
  level120,
  level121,
  level122,
  level123,
  level124,
  level125,
  level126,
  level127,
  level128,
  level129,
  level130,
  level131,
  level132,
  level133,
  level134,
  level135,
  level136,
  level137,
  level138,
  level139,
  level140,
  level141,
  level142,
  level143,
  level144,
  level145,
  level146,
  level147,
  level148,
  level149,
  level150,
]

/**
 * Every numbered level: the worlds (`levels`), the categories "time" (ids from 201), "memory" (from 301),
 * "travel" (from 401) and "detective" (from 501), and the bonus "treasury" (900).
 */
export const allLevels: Level[] = [...levels, ...timeLevels, ...memoryLevels, ...travelLevels, ...detectiveLevels, treasuryLevel]

export { treasuryLevel }

/** Any level by id, the hidden ones of `upcoming.ts` included (the router and progress keep those to developer mode). */
export const levelById = (id: number): Level | undefined =>
  allLevels.find((l) => l.id === id) ?? upcomingLevels.find((l) => l.id === id)
