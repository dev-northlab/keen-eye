// Levels drawn ahead of a release and hidden from players: no tile, not counted, outside the level order and
// the duels, a direct link lands home. Developer mode shows them at their place in the chapter's grid, marked
// as hidden (ChapterView), and plays them.
// Their ids are already in their chapter's `ranges` (chapters.ts; `chapterSize` leaves them out) and in
// `difficulty.ts`, and `check-levels` / `preview-levels` take them like the others.
// To release a level, move it from this list into its chapter's list (`levels` in index.ts or the category's
// index.ts) and update the store texts (assets/store/listing, `npm test` checks the level count).
import type { Level } from '../engine/types.ts'
import level151 from './chapter-01/level-151.ts'
import level152 from './chapter-01/level-152.ts'
import level153 from './chapter-01/level-153.ts'
import level154 from './chapter-01/level-154.ts'
import level155 from './chapter-01/level-155.ts'
import level156 from './chapter-01/level-156.ts'
import level157 from './chapter-01/level-157.ts'
import level158 from './chapter-01/level-158.ts'
import level159 from './chapter-01/level-159.ts'
import level160 from './chapter-01/level-160.ts'
import level161 from './chapter-02/level-161.ts'
import level162 from './chapter-02/level-162.ts'
import level163 from './chapter-02/level-163.ts'
import level164 from './chapter-02/level-164.ts'
import level165 from './chapter-02/level-165.ts'
import level166 from './chapter-02/level-166.ts'
import level167 from './chapter-02/level-167.ts'
import level168 from './chapter-02/level-168.ts'
import level169 from './chapter-02/level-169.ts'
import level170 from './chapter-02/level-170.ts'

export const upcomingLevels: Level[] = [level151, level152, level153, level154, level155, level156, level157, level158, level159, level160, level161, level162, level163, level164, level165, level166, level167, level168, level169, level170]

export const isUpcoming = (id: number) => upcomingLevels.some((l) => l.id === id)
