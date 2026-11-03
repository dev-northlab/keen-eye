// Picking the interface language from the user's preferred languages. Free of imports, so tests can run it.

/** Language codes that name a supported locale under another code. */
const ALIASES: Record<string, string> = { no: 'nb', nn: 'nb', tl: 'fil', in: 'id' }

/** Traditional Chinese: the script tag, or a region that writes it. */
const TRADITIONAL_CHINESE = /^zh[-_](hant|tw|hk|mo)\b/i

/**
 * The first of `tags` (BCP 47, most preferred first) that is one of `locales`, or `fallback`. Only the
 * language part counts ("fil" is Filipino, not "fi" Finnish), except that Chinese picks its script.
 */
export function resolveLocale<L extends string>(tags: readonly string[], locales: readonly L[], fallback: L): L {
  const supported = (v: string): v is L => (locales as readonly string[]).includes(v)
  for (const tag of tags) {
    const lang = tag.split(/[-_]/)[0].toLowerCase()
    const locale = lang === 'zh' && TRADITIONAL_CHINESE.test(tag) ? 'zh-Hant' : (ALIASES[lang] ?? lang)
    if (supported(locale)) return locale
  }
  return fallback
}
