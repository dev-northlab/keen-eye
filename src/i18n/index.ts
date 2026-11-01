import { createI18n } from 'vue-i18n'
import en from './en.json'
import hy from './hy.json'
import ru from './ru.json'

const messages = { ru, en, hy }
type Locale = keyof typeof messages

const system = navigator.language.slice(0, 2)
const locale: Locale = system in messages ? (system as Locale) : 'en'

export const i18n = createI18n({ legacy: false, locale, fallbackLocale: 'en', messages })
