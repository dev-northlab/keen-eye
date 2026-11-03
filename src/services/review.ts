import { Capacitor } from '@capacitor/core'
import { InAppReview } from '@capacitor-community/in-app-review'
import { loadJson, saveJson } from './storage.ts'

// The store's own "rate this game" sheet (Google Play In-App Review, App Store SKStoreReviewController),
// asked for once after a good win. The store decides whether it actually shows (it has its own quota) and
// tells nothing back. Store rules: no question before it, no reward for a review.

const KEY = 'reviewAsked'
/** Completed levels before the request: by then the player has seen enough of the game to judge it. */
const AFTER_LEVELS = 8
/** Lets the result dialog's stars land before the sheet covers it. */
const DELAY_MS = 1500

let asked: boolean | undefined

/** Call after a good win (three stars, or any finish in calm mode) with the number of completed levels. */
export async function askForReview(completedLevels: number): Promise<void> {
  if (!Capacitor.isNativePlatform() || completedLevels < AFTER_LEVELS) return
  asked ??= (await loadJson(KEY)) === true
  if (asked) return
  asked = true
  await saveJson(KEY, true)
  setTimeout(() => InAppReview.requestReview().catch(() => {}), DELAY_MS)
}
