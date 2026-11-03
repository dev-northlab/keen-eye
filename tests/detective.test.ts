import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { describe, test } from 'node:test'
import { chapterOf, DETECTIVE_CHAPTER, levelsScreen, nextLevel } from '../src/levels/chapters.ts'
import { CASES, misfit } from '../src/levels/detective/cases.ts'
import { caseLevels, detectiveLevels } from '../src/levels/detective/index.ts'
import { SUSPECT_ART } from '../src/levels/detective/suspects.ts'
import { allLevels, levelById } from '../src/levels/index.ts'

const cluesOf = (caseId: string) => caseLevels(caseId).flatMap((l) => l.detective!.clues)

describe('"detective" mode (docs/detective-mode.md)', () => {
  test('6 cases of 5 scenes from 501: 5, 6, 7, 8, 9, then 10 clues per scene', () => {
    assert.deepEqual(detectiveLevels.map((l) => l.id), Array.from({ length: 30 }, (_, i) => 501 + i))
    assert.deepEqual(CASES.map((c) => c.id), ['cake', 'cheese', 'vase', 'circus', 'train', 'lodge'])
    CASES.forEach((c, i) => {
      const levels = caseLevels(c.id)
      assert.deepEqual(levels, detectiveLevels.slice(i * 5, i * 5 + 5), c.id)
      for (const level of levels) {
        assert.equal(level.chapter, DETECTIVE_CHAPTER.id)
        assert.equal(chapterOf(level.id), DETECTIVE_CHAPTER)
        assert.equal(levelById(level.id), level)
        assert.equal(level.differences.length, 5 + i, `level ${level.id}`)
        assert.equal(level.detective!.clues.length, level.differences.length, `level ${level.id}`)
        assert.equal(new Set(level.detective!.clues).size, level.detective!.clues.length, `level ${level.id}: a clue twice`)
      }
    })
  })

  test('only "detective" levels have a case', () => {
    for (const level of allLevels) assert.equal(!!level.detective, level.chapter === DETECTIVE_CHAPTER.id, `level ${level.id}`)
  })

  test('the clues point at exactly one suspect, the culprit; each suspect fits some of them', () => {
    for (const c of CASES) {
      const clues = cluesOf(c.id)
      assert.deepEqual(new Set(clues), new Set(Object.keys(c.fits)), `${c.id}: every clue of the scenes is described, and only those`)
      for (const [clue, who] of Object.entries(c.fits)) for (const s of who) assert.ok(c.suspects.includes(s), `${c.id} ${clue}: ${s}`)
      assert.ok(c.suspects.includes(c.culprit))
      const fitAll = c.suspects.filter((s) => misfit(c, s, clues) === undefined)
      assert.deepEqual(fitAll, [c.culprit], c.id)
      for (const s of c.suspects) assert.ok(clues.some((clue) => c.fits[clue].includes(s)), `${c.id}: ${s} fits no clue`)
      for (const s of c.suspects) assert.ok(SUSPECT_ART[s], `portrait of ${s}`)
    }
  })

  test('the first case is free, the others need the full game', () => {
    // isFreeLevel (stores/purchase.ts) frees the first `freeLevels` levels of a category.
    const [first] = caseLevels(CASES[0].id)
    assert.equal(first.id, DETECTIVE_CHAPTER.ranges[0][0])
    assert.equal(DETECTIVE_CHAPTER.freeLevels, caseLevels(CASES[0].id).length)
  })

  test('"next" stays in the case; the menu leads to the case', () => {
    const [cake] = CASES
    const scenes = caseLevels(cake.id)
    assert.equal(nextLevel(scenes[0]), scenes[1])
    assert.equal(nextLevel(scenes[4]), undefined)
    assert.deepEqual(levelsScreen(scenes[2]), { name: 'case', params: { case: 'cake' } })
  })

  test('every text exists in every interface language', () => {
    const dir = new URL('../src/i18n/', import.meta.url)
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
      const t = JSON.parse(readFileSync(new URL(file, dir), 'utf8'))
      assert.ok(t.chapters.detective, file)
      for (const key of ['task', 'rules', 'notebook', 'noClues', 'clues', 'scenes', 'suspectsTitle', 'whoDidIt', 'findAll', 'accuse', 'wrong', 'solved', 'solvedTitle', 'reward', 'newClue', 'solveCase', 'paid', 'unlock', 'nextCase'])
        assert.ok(typeof t.detective[key] === 'string', `${file} detective.${key}`)
      for (const key of ['new', 'progress', 'solved', 'locked']) assert.ok(t.detective.status[key], `${file} status.${key}`)
      for (const c of CASES) {
        for (const key of ['title', 'intro', 'ending']) assert.ok(t.detective.cases[c.id]?.[key], `${file} ${c.id}.${key}`)
        for (const s of c.suspects) assert.ok(t.detective.suspects[s], `${file} suspect ${s}`)
        for (const clue of cluesOf(c.id)) assert.ok(t.detective.clueTexts[clue], `${file} clue ${clue}`)
      }
      for (const level of detectiveLevels) assert.ok(t.levelTitles[level.title], `${file} ${level.title}`)
    }
  })
})
