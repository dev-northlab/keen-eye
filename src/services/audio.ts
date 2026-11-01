import calmUrl from '../../assets/music/calm_level.mp3'
import levelUrl from '../../assets/music/level_background.mp3'
import completeUrl from '../../assets/music/level_compleated.mp3'
import menuUrl from '../../assets/music/main_menu.mp3'

// Music: looping mp3 tracks per screen. Sound effects: synthesized with Web Audio (no files).
// Browsers allow audio only after a user gesture, so playback is (re)started on the first touch/key.

export type Track = 'menu' | 'level' | 'calm' | 'complete'
export type Sfx = 'found' | 'miss' | 'hint' | 'star' | 'click'

const TRACKS: Record<Track, { url: string; loop: boolean }> = {
  menu: { url: menuUrl, loop: true },
  level: { url: levelUrl, loop: true },
  calm: { url: calmUrl, loop: true },
  complete: { url: completeUrl, loop: false },
}
/** Effect loudness at 100 % volume. */
const SFX_GAIN = 0.5
/** Calm mode: quieter, sine-only effects. */
const SOFT_GAIN = 0.22

/** Player-set volumes, 0–1 (0 = off). */
let musicVolume = 1
let sfxVolume = 1
let soft = false
let wanted: Track | null = null
let ctx: AudioContext | null = null
const player = new Audio()

export function setMusicVolume(volume: number): void {
  musicVolume = volume
  player.volume = volume
  syncMusic()
}

export function setSfxVolume(volume: number): void {
  sfxVolume = volume
}

export function setSoftSounds(on: boolean): void {
  soft = on
}

/** Track for the current screen; null = silence. Re-requesting the playing track keeps it going. */
export function playMusic(track: Track | null): void {
  if (track !== wanted) {
    wanted = track
    if (track) {
      player.src = TRACKS[track].url
      player.loop = TRACKS[track].loop
    }
  }
  syncMusic()
}

function syncMusic(): void {
  if (musicVolume === 0 || !wanted || document.hidden) {
    player.pause()
    return
  }
  // Rejected before the first user gesture (autoplay policy); unlock() retries.
  if (player.paused && !player.ended) player.play().catch(() => {})
}

function unlock(): void {
  // Created inside a gesture, so it starts in the 'running' state.
  audioContext()?.resume().catch(() => {})
  syncMusic()
}

// A touch grants audio permission on release (pointerup), a mouse or key on press.
for (const type of ['pointerdown', 'pointerup', 'keydown']) document.addEventListener(type, unlock, { capture: true })
// Silence in the background (home button, other tab); resume on return.
document.addEventListener('visibilitychange', () => {
  syncMusic()
  if (document.hidden) ctx?.suspend().catch(() => {})
  else ctx?.resume().catch(() => {})
})

function audioContext(): AudioContext | null {
  if (!ctx) {
    try {
      ctx = new AudioContext()
    } catch {
      return null
    }
  }
  return ctx
}

function tone(c: AudioContext, freq: number, start: number, dur: number, type: OscillatorType, volume: number): void {
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = soft ? 'sine' : type
  osc.frequency.value = freq
  const t = c.currentTime + start
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(volume, t + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(gain).connect(c.destination)
  osc.start(t)
  osc.stop(t + dur + 0.02)
}

/** `index` raises the pitch of consecutive stars. */
export function playSfx(name: Sfx, index = 0): void {
  if (sfxVolume === 0) return
  const c = audioContext()
  if (!c || c.state !== 'running') return
  const v = (soft ? SOFT_GAIN : SFX_GAIN) * sfxVolume
  switch (name) {
    case 'found':
      tone(c, 660, 0, 0.18, 'triangle', v)
      tone(c, 990, 0.09, 0.28, 'triangle', v)
      break
    case 'miss':
      tone(c, 200, 0, 0.16, 'square', v * 0.5)
      tone(c, 150, 0.1, 0.2, 'square', v * 0.5)
      break
    case 'hint':
      ;[880, 1175, 1568].forEach((f, i) => tone(c, f, i * 0.07, 0.3, 'triangle', v * 0.7))
      break
    case 'star':
      tone(c, 784 * 1.26 ** index, 0, 0.35, 'triangle', v)
      break
    case 'click':
      tone(c, 1200, 0, 0.05, 'sine', v * 0.4)
      break
  }
}
