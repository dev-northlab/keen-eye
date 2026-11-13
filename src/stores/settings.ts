import { defineStore } from 'pinia'
import { computed, ref, watch, watchSyncEffect } from 'vue'
import type { GameMode } from '../engine/rules.ts'
import { isLocale, setLocale, systemLocale, type Locale } from '../i18n/index.ts'
import { setMusicVolume, setSfxVolume, setSoftSounds } from '../services/audio.ts'
import { setHapticsEnabled } from '../services/haptics.ts'
import { setTheme, systemTheme, type Theme } from '../services/theme.ts'
import { isPictureStyle, type PictureStyle } from '../levels/picture-style.ts'
import { loadJson, saveJson } from '../services/storage.ts'

const KEY = 'settings'
// TEMPORARY, for testing staging builds: this code turns on developer mode (the Development tools in Settings).
// Remove DEVELOPER_CODE, `developer`/`enableDeveloper` and the code row in SettingsPanel before release.
const DEVELOPER_CODE = '6561'

export type { GameMode }
/** In the order of the settings switch. */
export const GAME_MODES: GameMode[] = ['calm', 'normal']

const DEFAULT_MUSIC_VOLUME = 0.45
const DEFAULT_SOUND_VOLUME = 0.7

/** Stored volume 0–1; older saves had on/off booleans (off → 0). */
function parseVolume(volume: unknown, legacyOn: unknown, fallback: number): number {
  if (typeof volume === 'number' && volume >= 0 && volume <= 1) return volume
  return legacyOn === false ? 0 : fallback
}

const systemReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Settings are changed by writing the fields directly (e.g. v-model); every change is saved. */
export const useSettingsStore = defineStore('settings', () => {
  /** null = follow the system. */
  const locale = ref<Locale | null>(null)
  /** null = follow the system "reduce motion" setting. */
  const reduceMotion = ref<boolean | null>(null)
  const mode = ref<GameMode>('normal')
  /** 0–1, 0 = off. */
  const musicVolume = ref(DEFAULT_MUSIC_VOLUME)
  const soundVolume = ref(DEFAULT_SOUND_VOLUME)
  const vibration = ref(true)
  /** Follows the system until the player picks one (then stored). */
  const theme = ref<Theme>(systemTheme())
  /**
   * Drawn scenes or the redesigned pictures of the levels that have them (levels/picture-style.ts). New players start
   * with the 3D pictures; a stored choice stays.
   */
  const pictureStyle = ref<PictureStyle>('redesign')
  /** Turned on by the testing code: Settings show the Development tools. */
  const developer = ref(false)
  /** Developer tools checkbox: levels get the "Show places" button (only in developer mode). */
  const devShowPlaces = ref(false)

  const effectiveLocale = computed(() => locale.value ?? systemLocale())
  const effectiveReduceMotion = computed(() => reduceMotion.value ?? systemReducedMotion())
  const calm = computed(() => mode.value === 'calm')
  const showPlaces = computed(() => developer.value && devShowPlaces.value)

  // i18n and the services are plain modules: keep them in sync with the settings, immediately
  // (sync), so e.g. a volume preview played right after a change already uses the new value.
  watchSyncEffect(() => {
    setLocale(effectiveLocale.value)
    setMusicVolume(musicVolume.value)
    setSfxVolume(soundVolume.value)
    setSoftSounds(calm.value)
    setHapticsEnabled(vibration.value)
    setTheme(theme.value)
  })

  async function load() {
    const raw = ((await loadJson(KEY)) ?? {}) as Record<string, unknown>
    const bool = (v: unknown, fallback: boolean) => (typeof v === 'boolean' ? v : fallback)
    const storedLocale = raw.locale
    locale.value = isLocale(storedLocale) ? storedLocale : null
    reduceMotion.value = typeof raw.reduceMotion === 'boolean' ? raw.reduceMotion : null
    mode.value = GAME_MODES.includes(raw.mode as GameMode) ? (raw.mode as GameMode) : 'normal'
    musicVolume.value = parseVolume(raw.musicVolume, raw.music, DEFAULT_MUSIC_VOLUME)
    soundVolume.value = parseVolume(raw.soundVolume, raw.sound, DEFAULT_SOUND_VOLUME)
    vibration.value = bool(raw.vibration, true)
    theme.value = raw.theme === 'light' || raw.theme === 'dark' ? raw.theme : systemTheme()
    pictureStyle.value = isPictureStyle(raw.pictureStyle) ? raw.pictureStyle : 'redesign'
    developer.value = raw.developer === true
    devShowPlaces.value = raw.devShowPlaces === true
  }

  /** True if the code is right; then developer mode stays on on this device. */
  function enableDeveloper(code: string): boolean {
    if (code.trim() !== DEVELOPER_CODE) return false
    developer.value = true
    return true
  }

  watch([locale, reduceMotion, mode, musicVolume, soundVolume, vibration, theme, pictureStyle, developer, devShowPlaces], () =>
    saveJson(KEY, {
      locale: locale.value,
      reduceMotion: reduceMotion.value,
      mode: mode.value,
      musicVolume: musicVolume.value,
      soundVolume: soundVolume.value,
      vibration: vibration.value,
      theme: theme.value,
      pictureStyle: pictureStyle.value,
      developer: developer.value,
      devShowPlaces: devShowPlaces.value,
    }),
  )

  return { locale, reduceMotion, mode, musicVolume, soundVolume, vibration, theme, pictureStyle, developer, devShowPlaces, showPlaces, calm, effectiveLocale, effectiveReduceMotion, load, enableDeveloper }
})
