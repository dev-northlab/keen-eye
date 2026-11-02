// "Travel" (docs/world-travel-mode.md): a recognizable place per level, its fact after the win.
// Numbered levels from 401 with chapter 'travel' (`TRAVEL_CHAPTER` in ../chapters.ts), played by
// LevelView and listed on the world map (TravelView), grouped by region.
import type { Level, TravelRegion } from '../../engine/types.ts'
import level401 from './level-401.ts'
import level402 from './level-402.ts'
import level403 from './level-403.ts'
import level404 from './level-404.ts'
import level405 from './level-405.ts'
import level406 from './level-406.ts'
import level407 from './level-407.ts'
import level408 from './level-408.ts'
import level409 from './level-409.ts'
import level410 from './level-410.ts'
import level411 from './level-411.ts'
import level412 from './level-412.ts'
import level413 from './level-413.ts'
import level414 from './level-414.ts'
import level415 from './level-415.ts'
import level416 from './level-416.ts'
import level417 from './level-417.ts'
import level418 from './level-418.ts'
import level419 from './level-419.ts'
import level420 from './level-420.ts'
import level421 from './level-421.ts'
import level422 from './level-422.ts'
import level423 from './level-423.ts'
import level424 from './level-424.ts'
import level425 from './level-425.ts'
import level426 from './level-426.ts'
import level427 from './level-427.ts'
import level428 from './level-428.ts'
import level429 from './level-429.ts'
import level430 from './level-430.ts'
import level431 from './level-431.ts'
import level432 from './level-432.ts'

export const travelLevels: Level[] = [level401, level402, level403, level404, level405, level406, level407, level408, level409, level410, level411, level412, level413, level414, level415, level416, level417, level418, level419, level420, level421, level422, level423, level424, level425, level426, level427, level428, level429, level430, level431, level432]

/** Regions in the order of the world map's tabs. */
export const TRAVEL_REGIONS: TravelRegion[] = ['europe', 'asia', 'caucasus', 'americas', 'africa', 'oceania']
