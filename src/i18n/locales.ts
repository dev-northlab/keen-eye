// The interface languages. Free of imports, so tests can check the list against the locale files.

/** Order = order in the language picker. BCP 47 tags (the `lang` attribute, texts of level JSON files), each the name
 *  of its `<tag>.json`. */
export const LOCALES = [
  'ru', 'en', 'hy', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'cs', 'ro', 'bg', 'uk', 'el', 'hu', 'sv', 'da', 'nb', 'fi',
  'tr', 'ar', 'hi', 'id', 'ms', 'fil', 'vi', 'th', 'zh', 'zh-Hant', 'ja', 'ko',
] as const

export type Locale = (typeof LOCALES)[number]

export const isLocale = (v: unknown): v is Locale => typeof v === 'string' && (LOCALES as readonly string[]).includes(v)
