import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CATEGORIES } from '../levels/chapters.ts'
import { fetchOwnership, fetchPrice, purchaseFullGame, resetStubStore, type PurchaseOutcome } from '../services/purchases.ts'
import { loadJson, remove, saveJson } from '../services/storage.ts'

const KEY = 'purchase'
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
  const price = ref<string | null>(null)
  const busy = ref(false)
  /** Whether the full-game dialog is open (mounted once in App.vue, opened from any screen). */
  const dialogOpen = ref(false)
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

  /** Developer tools: forget the purchase locally and on the stub store. */
  async function resetForDev(alsoStore: boolean) {
    version++
    fullGame.value = false
    await remove(KEY)
    if (alsoStore) resetStubStore()
  }

  return { fullGame, price, busy, dialogOpen, load, sync, buy, restore, resetForDev }
})
