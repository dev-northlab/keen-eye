import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { CATEGORIES } from '../levels/chapters.ts'
import { fetchOwnership, fetchPrice, purchaseFullGame, resetStubStore, type PurchaseOutcome } from '../services/purchases.ts'
import { loadJson, remove, saveJson } from '../services/storage.ts'

const KEY = 'purchase'
// TEMPORARY, for testing staging builds: this code unlocks the full game without a purchase.
// Remove PROMO_KEY, PROMO_CODE, `promo`/`applyPromo`/`resetPromo` and the promo row in SettingsPanel before release.
const PROMO_KEY = 'promo'
const PROMO_CODE = '6561'
/** Levels 1–15 are free; the rest need the one-time purchase (spec, section 10). */
export const FREE_LEVELS = 15
/** The first levels of each category ("time", "memory") are free as well; a category may set its own count. */
export const FREE_CATEGORY_LEVELS = 3

export const isFreeLevel = (id: number) =>
  id <= FREE_LEVELS ||
  CATEGORIES.some(({ ranges: [[first]], freeLevels = FREE_CATEGORY_LEVELS }) => id >= first && id < first + freeLevels)

/**
 * The full-game purchase, cached locally so the game works offline. The store
 * is the source of truth: its answer replaces the cache whenever it is reachable.
 */
export const usePurchaseStore = defineStore('purchase', () => {
  const fullGame = ref(false)
  /** Unlocked by the temporary testing promo code; kept apart so a store sync never clears it. */
  const promo = ref(false)
  /** Whether the paid levels are open: bought, or unlocked by the promo code. */
  const owned = computed(() => fullGame.value || promo.value)
  const price = ref<string | null>(null)
  const busy = ref(false)
  /** Bumped on every change, so a slow background sync can't undo a newer purchase. */
  let version = 0

  async function setFullGame(value: boolean) {
    version++
    fullGame.value = value
    await saveJson(KEY, { fullGame: value })
  }

  async function load() {
    const raw = (await loadJson(KEY)) as { fullGame?: unknown } | undefined
    fullGame.value = raw?.fullGame === true
    promo.value = (await loadJson(PROMO_KEY)) === true
  }

  /** True if the code is right; then the full game stays unlocked on this device. */
  async function applyPromo(code: string): Promise<boolean> {
    if (code.trim() !== PROMO_CODE) return false
    promo.value = true
    await saveJson(PROMO_KEY, true)
    return true
  }

  /** Takes the promo code back: the paid levels need the purchase again. */
  async function resetPromo() {
    promo.value = false
    await remove(PROMO_KEY)
  }

  /** Background check on start: refresh the price and the cached purchase (unless offline). */
  async function sync() {
    try {
      price.value = await fetchPrice()
      const seen = version
      const owned = await fetchOwnership()
      if (owned !== null && seen === version && owned !== fullGame.value) await setFullGame(owned)
    } catch {
      // Store unreachable: keep the cached state.
    }
  }

  async function buy(): Promise<PurchaseOutcome> {
    busy.value = true
    try {
      const outcome = await purchaseFullGame()
      if (outcome === 'purchased') await setFullGame(true)
      return outcome
    } catch {
      return 'error'
    } finally {
      busy.value = false
    }
  }

  /** 'restored', 'none' (store has no purchase) or 'error' (store unreachable). */
  async function restore(): Promise<'restored' | 'none' | 'error'> {
    busy.value = true
    try {
      const owned = await fetchOwnership()
      if (owned === null) return 'error'
      await setFullGame(owned)
      return owned ? 'restored' : 'none'
    } catch {
      return 'error'
    } finally {
      busy.value = false
    }
  }

  /** Development only: forget the purchase locally and on the stub store. */
  async function resetForDev(alsoStore: boolean) {
    version++
    fullGame.value = false
    await remove(KEY)
    await resetPromo()
    if (alsoStore) resetStubStore()
  }

  return { fullGame, promo, owned, price, busy, load, sync, buy, restore, applyPromo, resetPromo, resetForDev }
})
