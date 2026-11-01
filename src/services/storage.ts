import { Preferences } from '@capacitor/preferences'

// On device: native key-value storage; in the browser the plugin uses localStorage.

/** Stored JSON, or undefined when missing or unreadable. Callers must validate the shape. */
export async function loadJson(key: string): Promise<unknown> {
  const { value } = await Preferences.get({ key })
  if (value === null) return undefined
  try {
    return JSON.parse(value)
  } catch {
    return undefined
  }
}

export async function saveJson(key: string, data: unknown): Promise<void> {
  await Preferences.set({ key, value: JSON.stringify(data) })
}

export async function remove(key: string): Promise<void> {
  await Preferences.remove({ key })
}
