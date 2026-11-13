import { Capacitor, registerPlugin } from '@capacitor/core'
import { Haptics, ImpactStyle } from '@capacitor/haptics'

// A soft tick on a find and on a miss, like other games: the phone's own touch feedback, not a buzz of the motor; and
// a calmer one on every button press. Android: the app's SoftHaptics plugin (android/…/SoftHapticsPlugin.java) — a
// tick at a strength the game sets (the haptic engine's tick primitive at 60 %, or a short low-amplitude pulse), one
// for a find and two for a miss; a button press the low tick primitive at 50 % (or a weaker tick or pulse, nothing on
// phones that cannot set it low). iOS: the light impact of the system's haptic engine for a find and a miss, the
// selection tick (the lightest) for a button. Browsers and devices without vibration just ignore it.

interface SoftHapticsPlugin {
  tick(options: { kind: 'found' | 'miss' | 'tap' }): Promise<void>
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

/** A button press: the calmest tick. */
export function vibrateTap(): void {
  if (!enabled) return
  if (android) SoftHaptics.tick({ kind: 'tap' }).catch(ignore)
  else Haptics.selectionChanged().catch(ignore)
}
