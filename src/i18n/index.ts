import { createI18n } from 'vue-i18n'
import bg from './bg.json'
import cs from './cs.json'
import de from './de.json'
import el from './el.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import hi from './hi.json'
import hu from './hu.json'
import hy from './hy.json'
import it from './it.json'
import ja from './ja.json'
import ko from './ko.json'
import nl from './nl.json'
import pl from './pl.json'
import pt from './pt.json'
import ro from './ro.json'
import ru from './ru.json'
import tr from './tr.json'
import uk from './uk.json'
import zh from './zh.json'

// Order = order in the language picker.
const messages = { ru, en, hy, de, fr, es, it, pt, nl, pl, cs, ro, bg, uk, el, hu, tr, hi, zh, ja, ko }
export type Locale = keyof typeof messages
export const LOCALES = Object.keys(messages) as Locale[]

export const isLocale = (v: unknown): v is Locale => typeof v === 'string' && v in messages

/** Language of the system (browser/device), or English when it is not supported. */
export function systemLocale(): Locale {
  const lang = navigator.language.slice(0, 2)
  return isLocale(lang) ? lang : 'en'
}

export const i18n = createI18n({ legacy: false, locale: systemLocale(), fallbackLocale: 'en', messages })

export function setLocale(locale: Locale): void {
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
}
