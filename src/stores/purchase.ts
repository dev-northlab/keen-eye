import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CATEGORIES } from '../levels/chapters.ts'
import {
  fetchOwnership,
  fetchPrices,
  purchaseFullGame,
  resetStubStore,
  restorePurchases,
  sendTip,
  type PurchaseOutcome,
  type Tip,
} from '../services/purchases.ts'
import { loadJson, remove, saveJson } from '../services/storage.ts'

const KEY = 'purchase'
/** Levels 1–15 are free; the rest need the one-time purchase (spec, section 10). */
export const FREE_LEVELS = 15
/** The first levels of each category ("time", "memory") are free as well; a category may set its own ranges. */
export const FREE_CATEGORY_LEVELS = 3
/** "Time travel" eras are numbered from 601 (levels/time-travel); only the first one is free. */
export const FREE_TIME_TRAVEL_NUMBER = 601

/** Whether a level (by id, or a "time travel" era by its number) needs no purchase. */
export const isFreeLevel = (id: number) =>
  id <= FREE_LEVELS ||
  id === FREE_TIME_TRAVEL_NUMBER ||
  CATEGORIES.some(({ ranges: [[first]], free = [[first, first + FREE_CATEGORY_LEVELS - 1]] }) => free.some(([from, to]) => id >= from && id <= to))

/**
 * The full-game purchase, cached locally so the game works offline. The store
 * is the source of truth: its answer replaces the cache whenever it is reachable.
 */
export const usePurchaseStore = defineStore('purchase', () => {
  const fullGame = ref(false)
  const price = ref<string | null>(null)
  /** "Support us" tips the store offers, with their prices. */
  const tipPrices = ref<Partial<Record<Tip, string>>>({})
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
      const prices = await fetchPrices()
      price.value = prices.fullGame
      tipPrices.value = prices.tips
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

  /** A "support us" tip: it unlocks nothing, so only the outcome matters. */
  async function tip(id: Tip): Promise<PurchaseOutcome> {
    busy.value = true
    try {
      return await sendTip(id)
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
      const owned = await restorePurchases()
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

  return { fullGame, price, tipPrices, busy, dialogOpen, load, sync, buy, tip, restore, resetForDev }
})
