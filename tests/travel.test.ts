import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { describe, test } from 'node:test'
import { chapterOf, levelNumber, levelsScreen, nextLevel, TRAVEL_CHAPTER } from '../src/levels/chapters.ts'
import { difficultyOf } from '../src/levels/difficulty.ts'
import { allLevels, levelById } from '../src/levels/index.ts'
import { FLAGS } from '../src/levels/travel/flags.ts'
import { TRAVEL_REGIONS, travelLevels } from '../src/levels/travel/index.ts'

describe('"travel" mode (docs/world-travel-mode.md)', () => {
  test('15 levels from 401: 5, then 6, then 7 differences', () => {
    assert.deepEqual(travelLevels.map((l) => l.id), Array.from({ length: 15 }, (_, i) => 401 + i))
    travelLevels.forEach((level, i) => {
      assert.equal(level.chapter, TRAVEL_CHAPTER.id)
      assert.equal(chapterOf(level.id), TRAVEL_CHAPTER)
      assert.equal(levelById(level.id), level)
      assert.equal(levelNumber(level), i + 1)
      assert.equal(level.differences.length, [5, 6, 7][Math.floor(i / 5)], `level ${level.id}`)
      const [min, max] = difficultyOf(level.id).motion
      const motion = level.differences.filter((d) => d.motion).length
      assert.ok(motion >= min && motion <= max, `level ${level.id}`)
    })
  })

  test('only "travel" levels have a place', () => {
    for (const level of allLevels) assert.equal(!!level.travel, level.chapter === TRAVEL_CHAPTER.id, `level ${level.id}`)
  })

  test('every place has a flag, a region of 2–3 places and a position on the globe', () => {
    for (const { travel, id } of travelLevels) {
      assert.ok(FLAGS[travel!.country], `level ${id}`)
      assert.ok(Math.abs(travel!.lat) <= 90 && Math.abs(travel!.lon) <= 180, `level ${id}`)
    }
    for (const region of TRAVEL_REGIONS) {
      const n = travelLevels.filter((l) => l.travel!.region === region).length
      assert.ok(n >= 2 && n <= 3, region)
    }
  })

  test('"next" stays in the category and ends with it; the menu leads to the world map at the region', () => {
    assert.equal(nextLevel(travelLevels[0]), travelLevels[1])
    assert.equal(nextLevel(travelLevels.at(-1)!), undefined)
    assert.deepEqual(levelsScreen(travelLevels[3]), { name: 'travel', query: { region: 'asia' } })
    assert.deepEqual(levelsScreen(levelById(1)!), { name: 'chapter', params: { chapter: 'farm' } })
  })

  test('every name, country, region and fact exists in every interface language', () => {
    const dir = new URL('../src/i18n/', import.meta.url)
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
      const t = JSON.parse(readFileSync(new URL(file, dir), 'utf8'))
      assert.ok(t.chapters.travel, file)
      for (const key of ['task', 'rules', 'didYouKnow', 'passport', 'passportTitle', 'stamps', 'newStamp', 'notVisited'])
        assert.ok(t.worldTravel[key], `${file} ${key}`)
      for (const region of TRAVEL_REGIONS) assert.ok(t.worldTravel.regions[region], `${file} ${region}`)
      for (const level of travelLevels) {
        assert.ok(t.levelTitles[level.title], `${file} ${level.title}`)
        assert.ok(t.worldTravel.facts[level.title], `${file} fact ${level.title}`)
        assert.ok(t.worldTravel.countries[level.travel!.country], `${file} ${level.travel!.country}`)
      }
    }
  })
})
