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
  test('7 cases of 5 scenes from 501: 5, 6, 7, 8, 9, 10 clues per scene, then "The missing chickens" with 6, listed first', () => {
    assert.deepEqual(detectiveLevels.map((l) => l.id), Array.from({ length: 35 }, (_, i) => 501 + i))
    assert.deepEqual(CASES.map((c) => c.id), ['chickens', 'cake', 'cheese', 'vase', 'circus', 'train', 'lodge'])
    const plan: Record<string, [first: number, clues: number]> = {
      cake: [501, 5],
      cheese: [506, 6],
      vase: [511, 7],
      circus: [516, 8],
      train: [521, 9],
      lodge: [526, 10],
      chickens: [531, 6],
    }
    for (const c of CASES) {
      const [first, clues] = plan[c.id]
      const levels = caseLevels(c.id)
      assert.deepEqual(levels, detectiveLevels.filter((l) => l.id >= first && l.id < first + 5), c.id)
      for (const level of levels) {
        assert.equal(level.chapter, DETECTIVE_CHAPTER.id)
        assert.equal(chapterOf(level.id), DETECTIVE_CHAPTER)
        assert.equal(levelById(level.id), level)
        assert.equal(level.differences.length, clues, `level ${level.id}`)
        assert.equal(level.detective!.clues.length, level.differences.length, `level ${level.id}`)
        assert.equal(new Set(level.detective!.clues).size, level.detective!.clues.length, `level ${level.id}: a clue twice`)
      }
    }
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

  test('only "The missing chickens" is free, the others need the full game', () => {
    // isFreeLevel (stores/purchase.ts) frees the category's `free` ranges; a free case opens from the start (progress.isReached).
    const range = (id: string) => {
      const scenes = caseLevels(id)
      return [scenes[0].id, scenes[scenes.length - 1].id]
    }
    assert.deepEqual(DETECTIVE_CHAPTER.free, [range('chickens')])
  })

  test('"next" stays in the case; the menu leads to the case', () => {
    const scenes = caseLevels('cake')
    assert.equal(nextLevel(scenes[0]), scenes[1])
    assert.equal(nextLevel(scenes[4]), undefined)
    assert.deepEqual(levelsScreen(scenes[2]), { name: 'case', params: { case: 'cake' } })
  })

  test('a harder case names its culprit only where clues meet: none fits one suspect alone, two rule out each innocent', () => {
    for (const c of CASES.filter((c) => c.hard)) {
      for (const [clue, who] of Object.entries(c.fits)) assert.ok(who.length > 1, `${c.id} ${clue} fits only ${who}`)
      for (const s of c.suspects.filter((s) => s !== c.culprit)) {
        const out = Object.values(c.fits).filter((who) => !who.includes(s)).length
        assert.ok(out >= 2, `${c.id}: ${s} is ruled out by ${out} clue(s)`)
      }
    }
  })

  test('only the three harder cases (516–530) keep the misfit clue to themselves', () => {
    assert.deepEqual(
      CASES.filter((c) => c.hard).map((c) => caseLevels(c.id)[0].id),
      [516, 521, 526],
    )
  })

  test('every text exists in every interface language', () => {
    const dir = new URL('../src/i18n/', import.meta.url)
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
      const t = JSON.parse(readFileSync(new URL(file, dir), 'utf8'))
      assert.ok(t.chapters.detective, file)
      for (const key of ['task', 'rules', 'notebook', 'noClues', 'startWith', 'cluesWaiting', 'crossOutHelp', 'clues', 'scenes', 'suspectsTitle', 'whoDidIt', 'findAll', 'accuse', 'accuseSure', 'accuseYes', 'crossOut', 'crossOutHint', 'wrong', 'wrongHard', 'solved', 'solvedTitle', 'reward', 'newClue', 'cluesFound', 'solveCase', 'paid', 'unlock', 'nextCase'])
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
