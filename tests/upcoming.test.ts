import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { describe, test } from 'node:test'
import { chapterById, chapterLevels, chapterOf, nextLevel } from '../src/levels/chapters.ts'
import { allLevels, levelById } from '../src/levels/index.ts'
import { isUpcoming, upcomingLevels } from '../src/levels/upcoming.ts'

describe('hidden levels drawn ahead of a release (levels/upcoming.ts)', () => {
  test('are outside every released list and order, yet found by id in their chapter', () => {
    const ids = new Set(allLevels.map((l) => l.id))
    for (const level of upcomingLevels) {
      assert.ok(!ids.has(level.id), `level ${level.id} is also released`)
      assert.ok(isUpcoming(level.id))
      assert.equal(levelById(level.id), level)
      assert.equal(chapterOf(level.id)?.id, level.chapter, `level ${level.id}: its id belongs in its chapter's ranges`)
      assert.ok(!chapterLevels(chapterById(level.chapter)!).includes(level))
      assert.equal(nextLevel(level), undefined)
    }
    assert.equal(new Set(upcomingLevels.map((l) => l.id)).size, upcomingLevels.length)
  })

  test('have their titles in every locale', () => {
    for (const file of readdirSync('src/i18n').filter((f) => f.endsWith('.json'))) {
      const t = JSON.parse(readFileSync(`src/i18n/${file}`, 'utf8'))
      for (const level of upcomingLevels) assert.ok(t.levelTitles[level.title], `${file} ${level.title}`)
    }
  })
})
