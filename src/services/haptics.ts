import { Haptics, ImpactStyle } from '@capacitor/haptics'

// Short vibration on a find, double on a miss. Devices/browsers without vibration just ignore it.

let enabled = true

export function setHapticsEnabled(on: boolean): void {
  enabled = on
}

const ignore = () => {}

export function vibrateFound(): void {
  if (enabled) Haptics.impact({ style: ImpactStyle.Light }).catch(ignore)
}

export function vibrateMiss(): void {
  if (!enabled) return
  Haptics.vibrate({ duration: 40 }).catch(ignore)
  setTimeout(() => Haptics.vibrate({ duration: 40 }).catch(ignore), 110)
}
