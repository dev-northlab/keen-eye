import { createI18n } from 'vue-i18n'
import en from './en.json'
import { LOCALES, type Locale } from './locales.ts'
import { resolveLocale } from './resolve.ts'

export { isLocale, LOCALES, type Locale } from './locales.ts'

// Only English (the fallback) is in the bundle; every other language is its own chunk, loaded when it is chosen —
// parsing all 32 at every launch would slow the start down for one of them.
type Messages = typeof en
const loaders = import.meta.glob<Messages>(['./*.json', '!./en.json'], { import: 'default' })

/** Languages written right to left. */
const RTL: ReadonlySet<Locale> = new Set(['ar'])

/** Language of the system (browser/device), or English when none of its languages is supported. */
export function systemLocale(): Locale {
  return resolveLocale(navigator.languages?.length ? navigator.languages : [navigator.language], LOCALES, 'en')
}

// The type lists every locale; only English is there at first, the rest come in by `setLocaleMessage`.
const messages = { en } as Record<Locale, Messages>
export const i18n = createI18n<[Messages], Locale, false>({ legacy: false, locale: 'en', fallbackLocale: 'en', messages })

/** The language last asked for, and the load of its messages (resolved when they are in). */
let wanted: Locale = 'en'
let ready: Promise<void> = Promise.resolve()

/** Switches the interface to `locale`, once its messages have loaded (at once when they already have). */
export function setLocale(locale: Locale): void {
  wanted = locale
  if (i18n.global.availableLocales.includes(locale)) {
    ready = Promise.resolve()
    apply(locale)
    return
  }
  ready = loaders[`./${locale}.json`]()
    .then((messages) => i18n.global.setLocaleMessage(locale, messages))
    // A language that failed to load stays on the one shown before.
    .then(
      () => {
        if (wanted === locale) apply(locale)
      },
      () => {},
    )
}

/** Resolves when the language last set by `setLocale` is shown: the app is mounted after it, so it opens in it. */
export const localeReady = (): Promise<void> => ready

function apply(locale: Locale): void {
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
  document.documentElement.dir = RTL.has(locale) ? 'rtl' : 'ltr'
}
