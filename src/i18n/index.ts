import { createI18n } from 'vue-i18n'
import en from './en.json'
import hy from './hy.json'
import ru from './ru.json'

const messages = { ru, en, hy }
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
