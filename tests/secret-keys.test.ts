import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { describe, test } from 'node:test'
import { chapterOf, KEY_CHAPTERS, levelsScreen, nextLevel, secretLevel, TREASURY_CHAPTER } from '../src/levels/chapters.ts'
import { difficultyOf } from '../src/levels/difficulty.ts'
import { allLevels, levelById, treasuryLevel } from '../src/levels/index.ts'

describe('hidden keys and the treasury (docs/hidden-item-feature.md)', () => {
  test('every world and category hides exactly one key; no other level does', () => {
    for (const chapter of KEY_CHAPTERS) {
      const holders = allLevels.filter((l) => l.chapter === chapter.id && l.secret)
      assert.equal(holders.length, 1, `chapter ${chapter.id}: ${holders.map((l) => l.id)}`)
      assert.equal(secretLevel(chapter), holders[0])
    }
    const keyChapters = new Set(KEY_CHAPTERS.map((c) => c.id))
    for (const level of allLevels) if (level.secret) assert.ok(keyChapters.has(level.chapter), `level ${level.id}`)
    assert.equal(treasuryLevel.secret, undefined)
  })

  test('the farm key is in the free levels (FREE_LEVELS = 15, stores/purchase.ts)', () => {
    assert.ok(secretLevel(KEY_CHAPTERS[0])!.id <= 15)
  })

  test('the key is on both pictures, on B only in "memory", and clear of the zones at rest', () => {
    for (const chapter of KEY_CHAPTERS) {
      const level = secretLevel(chapter)!
      const s = level.secret!
      assert.equal(s.on, level.memory ? 'b' : 'both', `level ${level.id}`)
      for (const [i, d] of level.differences.entries())
        assert.ok(Math.hypot(d.x - s.x, d.y - s.y) >= d.r + s.r, `level ${level.id}: key overlaps zone #${i}`)
      const markup = [level.build!(0).svg, level.build!(1).svg].map((svg) => svg.match(/<g data-secret=""[^>]*>/g)?.length ?? 0)
      assert.deepEqual(markup, s.on === 'b' ? [0, 1] : [1, 1], `level ${level.id}`)
    }
  })

  test('the treasury: its own chapter, 8–10 differences, back to the game modes, no next level', () => {
    assert.equal(levelById(treasuryLevel.id), treasuryLevel)
    assert.equal(chapterOf(treasuryLevel.id), TREASURY_CHAPTER)
    assert.equal(treasuryLevel.chapter, TREASURY_CHAPTER.id)
    const [min, max] = difficultyOf(treasuryLevel.id).differences
    assert.ok(min >= 8 && max <= 10 && treasuryLevel.differences.length >= min && treasuryLevel.differences.length <= max)
    assert.ok(treasuryLevel.differences.some((d) => d.motion))
    assert.deepEqual(levelsScreen(treasuryLevel), { name: 'levels' })
    assert.equal(nextLevel(treasuryLevel), undefined)
  })

  test('every locale names the treasury and has the key texts', () => {
    for (const file of readdirSync('src/i18n').filter((f) => f.endsWith('.json'))) {
      const t = JSON.parse(readFileSync(`src/i18n/${file}`, 'utf8'))
      for (const text of [
        t.chapters.treasury,
        t.levelTitles.treasury,
        t.secret?.found,
        t.secret?.keyFound,
        t.secret?.keyHidden,
        t.treasury?.tag,
        t.treasury?.locked,
        t.treasury?.congrats,
      ])
        assert.ok(typeof text === 'string' && text.length > 0, file)
      assert.match(t.secret.keys, /\{n\}.*\{total\}/, file)
    }
  })
})
