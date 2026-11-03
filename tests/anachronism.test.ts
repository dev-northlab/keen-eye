import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { describe, test } from 'node:test'
import { AnachronismRound, localized, parseAnachronismLevel } from '../src/engine/anachronism.ts'
import type { AnachronismItem } from '../src/engine/types.ts'
import { allLevels } from '../src/levels/index.ts'
import { timeTravelLevelById, timeTravelLevels } from '../src/levels/time-travel/index.ts'

/** Center of an item's hitbox in percent. */
const center = (i: AnachronismItem) => (i.shape === 'circle' ? { x: i.x, y: i.y } : { x: i.x + i.w / 2, y: i.y + i.h / 2 })

const base = () => ({
  id: 'test',
  number: 999,
  mode: 'anachronism',
  world: 'time-travel',
  era: { en: 'Test' },
  image: 'test.svg',
  width: 800,
  height: 500,
  difficulty: 1,
  parTimeSec: 60,
  items: [
    { id: 'a', shape: 'circle', x: 20, y: 20, r: 5, label: { en: 'A' }, fact: { en: 'A fact.' } },
    { id: 'b', shape: 'rect', x: 60, y: 60, w: 10, h: 10, label: { en: 'B' }, fact: { en: 'B fact.' } },
  ],
})

describe('time travel levels', () => {
  test('egypt-01 is registered and loads', () => {
    const level = timeTravelLevelById('egypt-01')
    assert.ok(level)
    assert.equal(level.mode, 'anachronism')
    assert.equal(level.items.length, 5)
    assert.ok(level.items.every((i) => i.label.ru && i.fact.ru))
  })

  test('levels are registered in era order', () => {
    assert.deepEqual(
      timeTravelLevels.map((l) => l.id),
      ['egypt-01', 'rome-01', 'vikings-01', 'castle-01', 'pirates-01', 'wildwest-01', 'stoneage-01', 'japan-01', 'aztecs-01', 'china-01'],
    )
  })

  test('numbers follow the era order from 601, apart from the numbered levels', () => {
    assert.deepEqual(
      timeTravelLevels.map((l) => l.number),
      timeTravelLevels.map((_, i) => 601 + i),
    )
    const taken = new Set(allLevels.map((l) => l.id))
    assert.ok(timeTravelLevels.every((l) => !taken.has(l.number)))
  })

  test('every level completes once every item is found, and only then', () => {
    for (const level of timeTravelLevels) {
      const round = new AnachronismRound(level)
      assert.deepEqual(round.tap(1, 1), { kind: 'miss' }, level.id)
      level.items.forEach((item, index) => {
        const { x, y } = center(item)
        const last = index === level.items.length - 1
        assert.deepEqual(round.tap(x, y), { kind: 'found', index, complete: last }, `${level.id} ${item.id}`)
        assert.deepEqual(round.tap(x, y), { kind: 'repeat', index })
        assert.equal(round.foundCount, index + 1)
        assert.equal(round.complete, last)
      })
    }
  })

  test('every text exists in every interface language', () => {
    const locales = readdirSync(new URL('../src/i18n/', import.meta.url))
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.slice(0, -5))
    for (const level of timeTravelLevels) {
      for (const [name, t] of [['era', level.era], ...level.items.flatMap((i) => [[`${i.id}.label`, i.label], [`${i.id}.fact`, i.fact]] as const)] as const) {
        assert.deepEqual(locales.filter((l) => !t[l]), [], `${level.id} ${name}`)
      }
    }
  })

  test('animations match the data-anim groups of the picture, and odd items never move', () => {
    for (const level of timeTravelLevels) {
      const svg = readFileSync(new URL(`../public/${level.image}`, import.meta.url), 'utf8')
      const groups = [...svg.matchAll(/data-anim="([^"]+)"/g)].map((m) => m[1])
      assert.deepEqual(groups.toSorted(), level.animations.map((a) => a.key).toSorted(), level.id)
      // Walk the <g> tags: no item group may open inside an animated one.
      const open: boolean[] = []
      for (const [tag] of svg.matchAll(/<g\b[^>]*>|<\/g>/g)) {
        if (tag === '</g>') {
          open.pop()
          continue
        }
        const id = /\bid="([^"]+)"/.exec(tag)?.[1]
        const moving = open.includes(true)
        if (id && level.items.some((i) => i.id === id)) assert.ok(!moving, `${level.id}: item "${id}" moves`)
        open.push(tag.includes('data-anim='))
      }
    }
  })

  test('every registered level passes the checks', () => {
    for (const level of timeTravelLevels) assert.doesNotThrow(() => parseAnachronismLevel(level))
  })
})

describe('parseAnachronismLevel', () => {
  test('accepts a valid level; animations get their key as id', () => {
    assert.equal(parseAnachronismLevel(base()).items.length, 2)
    assert.deepEqual(parseAnachronismLevel(base()).animations, [])
    const level = parseAnachronismLevel({ ...base(), animations: [{ key: 'sun', type: 'bob', dx: 0, dy: 2, period: 3 }] })
    assert.equal(level.animations[0].id, 'sun')
  })

  const rejects = (change: (l: ReturnType<typeof base>) => void, message: RegExp) => {
    const level = base()
    change(level)
    assert.throws(() => parseAnachronismLevel(level), message)
  }

  test('rejects a missing number', () => rejects((l) => (l.number = 'one' as never), /number/))
  test('rejects another mode', () => rejects((l) => (l.mode = 'classic'), /mode/))
  test('rejects texts without English', () => rejects((l) => (l.items[0].fact = { ru: 'Факт' } as never), /"a".*en/))
  test('rejects a duplicate id', () => rejects((l) => (l.items[1].id = 'a'), /duplicate/))
  test('rejects an unknown shape', () => rejects((l) => (l.items[0].shape = 'star'), /shape/))
  test('rejects a circle leaving the picture', () => rejects((l) => (l.items[0].y = 5), /leaves/))
  test('rejects a rect leaving the picture', () => rejects((l) => (l.items[1].x = 95), /leaves/))
  test('rejects overlapping hitboxes', () => rejects((l) => Object.assign(l.items[1], { x: 22, y: 22 }), /overlap/))
  test('rejects an empty item list', () => rejects((l) => (l.items = []), /items/))
  test('rejects a missing size', () => rejects((l) => (l.width = 0), /width/))
  test('rejects an animation without a period', () =>
    rejects((l) => Object.assign(l, { animations: [{ key: 'sun', type: 'bob', dx: 1, dy: 1 }] }), /"sun".*period/))
  test('rejects an unknown animation type', () =>
    rejects((l) => Object.assign(l, { animations: [{ key: 'sun', type: 'spin', period: 2 }] }), /unknown animation/))
  test('rejects duplicate animation keys', () =>
    rejects(
      (l) =>
        Object.assign(l, {
          animations: [
            { key: 'a', type: 'bob', dx: 1, dy: 1, period: 2 },
            { key: 'a', type: 'bob', dx: 1, dy: 1, period: 2 },
          ],
        }),
      /duplicate animation/,
    ))
})

test('localized falls back to English', () => {
  assert.equal(localized({ en: 'Car', ru: 'Автомобиль' }, 'ru'), 'Автомобиль')
  assert.equal(localized({ en: 'Car', ru: 'Автомобиль' }, 'de'), 'Car')
})
