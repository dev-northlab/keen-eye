// "Detective" (docs/detective-mode.md): cases of five scenes, each difference a clue. Numbered levels
// from 501 with chapter 'detective' (`DETECTIVE_CHAPTER` in ../chapters.ts), played by LevelView and
// listed by case (DetectiveView, CaseView); the cases themselves are in cases.ts.
import type { Level } from '../../engine/types.ts'
import level501 from './level-501.ts'
import level502 from './level-502.ts'
import level503 from './level-503.ts'
import level504 from './level-504.ts'
import level505 from './level-505.ts'
import level506 from './level-506.ts'
import level507 from './level-507.ts'
import level508 from './level-508.ts'
import level509 from './level-509.ts'
import level510 from './level-510.ts'
import level511 from './level-511.ts'
import level512 from './level-512.ts'
import level513 from './level-513.ts'
import level514 from './level-514.ts'
import level515 from './level-515.ts'

export const detectiveLevels: Level[] = [level501, level502, level503, level504, level505, level506, level507, level508, level509, level510, level511, level512, level513, level514, level515]

/** The scenes of a case, in play order. */
export const caseLevels = (caseId: string) => detectiveLevels.filter((l) => l.detective!.case === caseId)
