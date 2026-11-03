import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { describe, test } from 'node:test'
import { resolveLocale } from '../src/i18n/resolve.ts'

const dir = new URL('../src/i18n/', import.meta.url)
const locales = readdirSync(dir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.slice(0, -5))

/** Every string's path in a locale file ("a.b.c"). */
function keys(o: object, prefix = ''): string[] {
  return Object.entries(o).flatMap(([k, v]) => (typeof v === 'object' ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]))
}

describe('interface languages', () => {
  test('every locale has exactly the keys of English, and only non-empty strings', () => {
    const read = (l: string) => JSON.parse(readFileSync(new URL(`${l}.json`, dir), 'utf8'))
    const en = keys(read('en')).sort()
    for (const l of locales) {
      const messages = read(l)
      assert.deepEqual(keys(messages).sort(), en, l)
      for (const k of en) {
        const v = k.split('.').reduce((o, p) => o[p], messages)
        assert.ok(typeof v === 'string' && v.trim() !== '', `${l} ${k}`)
      }
    }
  })

  test('the system language picks a locale by its language part', () => {
    const pick = (...tags: string[]) => resolveLocale(tags, locales, 'en')
    assert.equal(pick('fil-PH'), 'fil')
    assert.equal(pick('fi-FI'), 'fi')
    assert.equal(pick('tl'), 'fil')
    assert.equal(pick('nb-NO'), 'nb')
    assert.equal(pick('no'), 'nb')
    assert.equal(pick('nn-NO'), 'nb')
    assert.equal(pick('in-ID'), 'id')
    assert.equal(pick('ar-EG'), 'ar')
    assert.equal(pick('pt-PT'), 'pt')
    assert.equal(pick('de_AT'), 'de')
  })

  test('Chinese picks its script', () => {
    const pick = (tag: string) => resolveLocale([tag], locales, 'en')
    for (const tag of ['zh', 'zh-CN', 'zh-SG', 'zh-Hans-CN']) assert.equal(pick(tag), 'zh', tag)
    for (const tag of ['zh-TW', 'zh-HK', 'zh-MO', 'zh-Hant', 'zh-Hant-HK', 'zh_TW']) assert.equal(pick(tag), 'zh-Hant', tag)
  })

  test('the first supported preferred language wins, English when none is', () => {
    assert.equal(resolveLocale(['xx', 'sv-SE', 'de'], locales, 'en'), 'sv')
    assert.equal(resolveLocale(['xx-YY', 'qq'], locales, 'en'), 'en')
    assert.equal(resolveLocale([], locales, 'en'), 'en')
  })
})
