import { defineStore } from 'pinia'
import { computed, ref, watch, watchSyncEffect } from 'vue'
import { isLocale, setLocale, systemLocale, type Locale } from '../i18n/index.ts'
import { setMusicVolume, setSfxVolume, setSoftSounds } from '../services/audio.ts'
import { setHapticsEnabled } from '../services/haptics.ts'
import { loadJson, saveJson } from '../services/storage.ts'

const KEY = 'settings'

export type GameMode = 'normal' | 'calm'

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

  const effectiveLocale = computed(() => locale.value ?? systemLocale())
  const effectiveReduceMotion = computed(() => reduceMotion.value ?? systemReducedMotion())
  const calm = computed(() => mode.value === 'calm')

  // i18n and the services are plain modules: keep them in sync with the settings, immediately
  // (sync), so e.g. a volume preview played right after a change already uses the new value.
  watchSyncEffect(() => {
    setLocale(effectiveLocale.value)
    setMusicVolume(musicVolume.value)
    setSfxVolume(soundVolume.value)
    setSoftSounds(calm.value)
    setHapticsEnabled(vibration.value)
  })

  async function load() {
    const raw = ((await loadJson(KEY)) ?? {}) as Record<string, unknown>
    const bool = (v: unknown, fallback: boolean) => (typeof v === 'boolean' ? v : fallback)
    const storedLocale = raw.locale
    locale.value = isLocale(storedLocale) ? storedLocale : null
    reduceMotion.value = typeof raw.reduceMotion === 'boolean' ? raw.reduceMotion : null
    mode.value = raw.mode === 'calm' ? 'calm' : 'normal'
    musicVolume.value = parseVolume(raw.musicVolume, raw.music, DEFAULT_MUSIC_VOLUME)
    soundVolume.value = parseVolume(raw.soundVolume, raw.sound, DEFAULT_SOUND_VOLUME)
    vibration.value = bool(raw.vibration, true)
  }

  watch([locale, reduceMotion, mode, musicVolume, soundVolume, vibration], () =>
    saveJson(KEY, {
      locale: locale.value,
      reduceMotion: reduceMotion.value,
      mode: mode.value,
      musicVolume: musicVolume.value,
      soundVolume: soundVolume.value,
      vibration: vibration.value,
    }),
  )

  return { locale, reduceMotion, mode, musicVolume, soundVolume, vibration, calm, effectiveLocale, effectiveReduceMotion, load }
})
