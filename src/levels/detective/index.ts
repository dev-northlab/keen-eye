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
import level516 from './level-516.ts'
import level517 from './level-517.ts'
import level518 from './level-518.ts'
import level519 from './level-519.ts'
import level520 from './level-520.ts'
import level521 from './level-521.ts'
import level522 from './level-522.ts'
import level523 from './level-523.ts'
import level524 from './level-524.ts'
import level525 from './level-525.ts'
import level526 from './level-526.ts'
import level527 from './level-527.ts'
import level528 from './level-528.ts'
import level529 from './level-529.ts'
import level530 from './level-530.ts'

export const detectiveLevels: Level[] = [level501, level502, level503, level504, level505, level506, level507, level508, level509, level510, level511, level512, level513, level514, level515, level516, level517, level518, level519, level520, level521, level522, level523, level524, level525, level526, level527, level528, level529, level530]

/** The scenes of a case, in play order. */
export const caseLevels = (caseId: string) => detectiveLevels.filter((l) => l.detective!.case === caseId)
