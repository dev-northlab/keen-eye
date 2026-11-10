import { Capacitor, registerPlugin } from '@capacitor/core'
import { Haptics, ImpactStyle } from '@capacitor/haptics'

// A soft tick on a find and on a miss, like other games: the phone's own touch feedback, not a buzz of the motor.
// Android: the app's SoftHaptics plugin (android/…/SoftHapticsPlugin.java) — a tick at a strength the game sets
// (the haptic engine's tick primitive at 60 %, or a short low-amplitude pulse), one for a find and two for a miss. iOS: the light impact of the
// system's haptic engine for both. Browsers and devices without vibration just ignore it.

interface SoftHapticsPlugin {
  tick(options: { kind: 'found' | 'miss' }): Promise<void>
}

const SoftHaptics = registerPlugin<SoftHapticsPlugin>('SoftHaptics')
const android = Capacitor.getPlatform() === 'android'

let enabled = true

export function setHapticsEnabled(on: boolean): void {
  enabled = on
}

const ignore = () => {}

export function vibrateFound(): void {
  if (!enabled) return
  if (android) SoftHaptics.tick({ kind: 'found' }).catch(ignore)
  else Haptics.impact({ style: ImpactStyle.Light }).catch(ignore)
}

export function vibrateMiss(): void {
  if (!enabled) return
  if (android) SoftHaptics.tick({ kind: 'miss' }).catch(ignore)
  else Haptics.impact({ style: ImpactStyle.Light }).catch(ignore)
}
