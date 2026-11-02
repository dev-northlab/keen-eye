// "Find the odd one out" levels (docs/anachronism-mode.md): JSON data checked when loaded. They
// are kept apart from the numbered spot-the-difference levels of `../index.ts`.
import { parseAnachronismLevel } from '../../engine/anachronism.ts'
import type { AnachronismLevel } from '../../engine/types.ts'
import castle01 from './castle-01.json' with { type: 'json' }
import egypt01 from './egypt-01.json' with { type: 'json' }
import pirates01 from './pirates-01.json' with { type: 'json' }
import rome01 from './rome-01.json' with { type: 'json' }
import stoneage01 from './stoneage-01.json' with { type: 'json' }
import vikings01 from './vikings-01.json' with { type: 'json' }
import wildwest01 from './wildwest-01.json' with { type: 'json' }

export const timeTravelLevels: AnachronismLevel[] = [egypt01, rome01, vikings01, castle01, pirates01, wildwest01, stoneage01].map(parseAnachronismLevel)

export const timeTravelLevelById = (id: string): AnachronismLevel | undefined => timeTravelLevels.find((l) => l.id === id)
