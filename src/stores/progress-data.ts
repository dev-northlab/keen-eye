// Stored progress is untrusted: these parsers keep only well-formed records of known levels. Free of
// browser and Vue APIs, so that the unit tests can run them.
import type { Stars } from '../engine/types.ts'
import { KEY_CHAPTERS } from '../levels/chapters.ts'
import { caseById } from '../levels/detective/cases.ts'
import { timeTravelLevelById } from '../levels/time-travel/index.ts'

export interface LevelRecord {
  /** 0 = completed only in calm mode (no stars). */
  stars: Stars | 0
  /** null until completed in normal mode (calm mode has no timer). */
  bestTimeSec: number | null
}

/** Keeps only well-formed records with ids passing `isId`: storage content is not trusted. */
function parseRecords(raw: unknown, isId: (id: string) => boolean): Record<string, LevelRecord> {
  const out: Record<string, LevelRecord> = {}
  if (typeof raw !== 'object' || raw === null) return out
  for (const [id, rec] of Object.entries(raw)) {
    const { stars, bestTimeSec } = (rec ?? {}) as Partial<LevelRecord>
    if (!isId(id) || ![0, 1, 2, 3].includes(stars as number)) continue
    if (bestTimeSec !== null && !(typeof bestTimeSec === 'number' && bestTimeSec >= 0)) continue
    out[id] = { stars: stars as LevelRecord['stars'], bestTimeSec }
  }
  return out
}

export const parseLevels = (raw: unknown): Record<number, LevelRecord> => parseRecords(raw, (id) => Number.isInteger(Number(id)))

export const parseTimeTravel = (raw: unknown) => parseRecords(raw, (id) => timeTravelLevelById(id) !== undefined)

/** "Detective" cases solved, by id: only known cases, each once. */
export const parseCases = (raw: unknown): string[] =>
  Array.isArray(raw) ? [...new Set(raw.filter((id): id is string => typeof id === 'string' && caseById(id) !== undefined))] : []

/** Hidden keys found (docs/hidden-item-feature.md), by chapter id: only chapters that hide one, each once. */
export const parseKeys = (raw: unknown): string[] =>
  Array.isArray(raw)
    ? [...new Set(raw.filter((id): id is string => typeof id === 'string' && KEY_CHAPTERS.some((c) => c.id === id)))]
    : []

