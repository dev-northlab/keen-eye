import { createI18n } from 'vue-i18n'
import ar from './ar.json'
import bg from './bg.json'
import cs from './cs.json'
import da from './da.json'
import de from './de.json'
import el from './el.json'
import en from './en.json'
import es from './es.json'
import fi from './fi.json'
import fil from './fil.json'
import fr from './fr.json'
import hi from './hi.json'
import hu from './hu.json'
import hy from './hy.json'
import id from './id.json'
import it from './it.json'
import ja from './ja.json'
import ko from './ko.json'
import ms from './ms.json'
import nb from './nb.json'
import nl from './nl.json'
import pl from './pl.json'
import pt from './pt.json'
import ro from './ro.json'
import ru from './ru.json'
import sv from './sv.json'
import th from './th.json'
import tr from './tr.json'
import uk from './uk.json'
import vi from './vi.json'
import zh from './zh.json'
import zhHant from './zh-Hant.json'
import { resolveLocale } from './resolve.ts'

// Order = order in the language picker. Keys are BCP 47 tags (the `lang` attribute, texts of level JSON files).
const messages = {
  ru, en, hy, de, fr, es, it, pt, nl, pl, cs, ro, bg, uk, el, hu, sv, da, nb, fi, tr, ar, hi, id, ms, fil, vi, th, zh,
  'zh-Hant': zhHant, ja, ko,
}
export type Locale = keyof typeof messages
export const LOCALES = Object.keys(messages) as Locale[]

export const isLocale = (v: unknown): v is Locale => typeof v === 'string' && v in messages

/** Languages written right to left. */
const RTL: ReadonlySet<Locale> = new Set(['ar'])

/** Language of the system (browser/device), or English when none of its languages is supported. */
export function systemLocale(): Locale {
  return resolveLocale(navigator.languages?.length ? navigator.languages : [navigator.language], LOCALES, 'en')
}

export const i18n = createI18n({ legacy: false, locale: systemLocale(), fallbackLocale: 'en', messages })

export function setLocale(locale: Locale): void {
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
  document.documentElement.dir = RTL.has(locale) ? 'rtl' : 'ltr'
}
