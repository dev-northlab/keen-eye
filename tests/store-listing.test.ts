import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { describe, test } from 'node:test'
import { allLevels } from '../src/levels/index.ts'
import { timeTravelLevels } from '../src/levels/time-travel/index.ts'
import { travelLevels } from '../src/levels/travel/index.ts'

// Store pages (assets/store/listing/README.md): one folder per interface language, Google Play fields for all of them,
// App Store fields for the languages App Store Connect offers.

const dir = new URL('../assets/store/listing/', import.meta.url)
const locales = readdirSync(new URL('../src/i18n/', import.meta.url))
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.slice(0, -5))
  .sort()

/** Interface languages App Store Connect has no localization for. */
const NO_APP_STORE = ['bg', 'fil', 'hy']

const path = (locale: string, file: string) => new URL(`${locale}/${file}`, dir)
const read = (locale: string, file: string) => readFileSync(path(locale, file), 'utf8').trim()

/** Store limits in characters. */
const LIMITS = {
  'title.txt': 30,
  'short-description.txt': 80,
  'description.txt': 4000,
  'ios-subtitle.txt': 30,
  'ios-keywords.txt': 100,
}

describe('store listing', () => {
  test('one folder per interface language', () => {
    const folders = readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort()
    assert.deepEqual(folders, locales)
  })

  test('every field fits its store limit, App Store fields only where App Store Connect has the language', () => {
    for (const locale of locales) {
      const ios = !NO_APP_STORE.includes(locale)
      for (const [file, max] of Object.entries(LIMITS)) {
        if (file.startsWith('ios-') && !ios) {
          assert.ok(!existsSync(path(locale, file)), `${locale}/${file}`)
          continue
        }
        const text = read(locale, file)
        assert.ok(text.length > 0 && [...text].length <= max, `${locale}/${file}: ${[...text].length} > ${max}`)
      }
      assert.ok(read(locale, 'title.txt').startsWith('Keen Eye'), locale)
    }
  })

  test('keywords are comma separated without spaces around the commas or repeats', () => {
    for (const locale of locales.filter((l) => !NO_APP_STORE.includes(l))) {
      const words = read(locale, 'ios-keywords.txt').split(',')
      assert.ok(words.every((w) => w !== '' && w.trim() === w), locale)
      assert.equal(new Set(words).size, words.length, locale)
    }
  })

  test('keywords repeat no word of the name or subtitle (the App Store indexes those already)', () => {
    const tokens = (text: string) => text.toLowerCase().split(/[\s,:：]+/u).filter(Boolean)
    for (const locale of locales.filter((l) => !NO_APP_STORE.includes(l))) {
      const named = new Set(tokens(`${read(locale, 'title.txt')} ${read(locale, 'ios-subtitle.txt')}`))
      assert.deepEqual(tokens(read(locale, 'ios-keywords.txt')).filter((w) => named.has(w)), [], locale)
    }
  })

  test('descriptions name the current numbers of levels, languages and countries', () => {
    const levels = String(allLevels.length + timeTravelLevels.length)
    const numbers = [levels, String(locales.length), String(travelLevels.length)]
    for (const locale of locales) {
      const text = read(locale, 'description.txt')
      assert.deepEqual(numbers.filter((n) => !text.includes(n)), [], locale)
      assert.ok(read(locale, 'short-description.txt').includes(levels), locale)
    }
  })
})
