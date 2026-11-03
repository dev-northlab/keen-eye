// The only module that talks to the app store about the one-time "unlock all levels" purchase.
//
// On Android and iOS it goes straight to Google Play Billing and StoreKit through
// capacitor-plugin-cdv-purchase, with no receipt server: the store's own receipts on the device
// say whether the game is owned, and stores/purchase.ts caches the answer for offline play.
//
// Development stub: in `npm run dev` in the browser purchases succeed after a short delay and are
// remembered under a separate key that plays the role of the store's server, so "Restore
// purchases" can be tried after clearing the local cache. A production web build sells nothing.

import { Capacitor } from '@capacitor/core'

export type PurchaseOutcome = 'purchased' | 'cancelled' | 'error'

/** Product id of the purchase, the same in Google Play Console and App Store Connect. */
const FULL_GAME = 'full_game'
/** How long a finished purchase sheet may take to show up as owned; longer means the payment is pending. */
const APPROVAL_WAIT_MS = 10_000

const STUB_STORE_KEY = 'stubStore.fullGame'
const STUB_DELAY_MS = 600

const native = Capacitor.isNativePlatform()
const stubAvailable = import.meta.env.DEV && !native
const delay = (ms = STUB_DELAY_MS) => new Promise((r) => setTimeout(r, ms))

function stubOwned(): boolean {
  try {
    return localStorage.getItem(STUB_STORE_KEY) === 'true'
  } catch {
    return false
  }
}

type Cdv = typeof import('capacitor-plugin-cdv-purchase')

interface Connection {
  cdv: Cdv
  /** Whether everything loaded at start (billing service, product, receipts); if not, "not owned" may be wrong. */
  complete: boolean
}

let connection: Promise<Connection | null> | undefined

/** Connects to the device's store once (null in the browser or when billing is unavailable). */
function connect(): Promise<Connection | null> {
  if (!native) return Promise.resolve(null)
  connection ??= (async () => {
    // Loaded on demand: the web build never runs it.
    const cdv = await import('capacitor-plugin-cdv-purchase')
    const { store, ProductType, Platform, ErrorCode } = cdv
    const platform = Capacitor.getPlatform() === 'ios' ? Platform.APPLE_APPSTORE : Platform.GOOGLE_PLAY
    store.register({ id: FULL_GAME, type: ProductType.NON_CONSUMABLE, platform })
    // No receipt server, so an approved payment is final. Finishing acknowledges it: Google Play
    // refunds purchases that are not acknowledged within three days.
    store.when().approved((transaction) => transaction.finish())
    // A product missing at start (offline) is reloaded when the purchase dialog asks for the price again.
    store.minTimeBetweenUpdates = 10_000
    const errors = await store.initialize([platform])
    if (errors.some((e) => e.code === ErrorCode.SETUP)) return null
    return { cdv, complete: errors.length === 0 }
  })().catch(() => null)
  return connection
}

/** Localized price from the store, or null when the store is unavailable. */
export async function fetchPrice(): Promise<string | null> {
  if (stubAvailable) return '$1.49'
  const store = (await connect())?.cdv.store
  if (!store) return null
  if (!store.get(FULL_GAME)) await store.update()
  return store.get(FULL_GAME)?.pricing?.price ?? null
}

/** Resolves true as soon as the store lists the full game as owned, false after `ms`. */
async function becomesOwned(cdv: Cdv, ms: number): Promise<boolean> {
  for (const end = Date.now() + ms; Date.now() < end; await delay(250)) {
    if (cdv.store.owned(FULL_GAME)) return true
  }
  return cdv.store.owned(FULL_GAME)
}

/** Opens the store's purchase sheet. */
export async function purchaseFullGame(): Promise<PurchaseOutcome> {
  if (stubAvailable) {
    await delay()
    localStorage.setItem(STUB_STORE_KEY, 'true')
    return 'purchased'
  }
  const cdv = (await connect())?.cdv
  const offer = cdv?.store.get(FULL_GAME)?.getOffer()
  if (!cdv || !offer) return 'error'
  const error = await offer.order()
  if (error) return error.code === cdv.ErrorCode.PAYMENT_CANCELLED ? 'cancelled' : 'error'
  // A payment still pending (cash, Ask to Buy) is not an error: the next start's sync() unlocks the game.
  return (await becomesOwned(cdv, APPROVAL_WAIT_MS)) ? 'purchased' : 'cancelled'
}

/** Asks the store for past purchases: true if the full game was bought, null when the store can't be reached. */
export async function fetchOwnership(): Promise<boolean | null> {
  if (stubAvailable) {
    await delay()
    return stubOwned()
  }
  const conn = await connect()
  if (!conn) return null
  if (conn.cdv.store.owned(FULL_GAME)) return true
  // Never take a bought game away because some part of the store didn't answer.
  return conn.complete ? false : null
}

/** "Restore purchases": makes the store reload the player's purchases, then reports them like fetchOwnership. */
export async function restorePurchases(): Promise<boolean | null> {
  if (stubAvailable) return fetchOwnership()
  const cdv = (await connect())?.cdv
  if (!cdv) return null
  if (await cdv.store.restorePurchases()) return null
  return cdv.store.owned(FULL_GAME)
}

/** Development only: forget the purchase on the "store" side too. */
export function resetStubStore(): void {
  localStorage.removeItem(STUB_STORE_KEY)
}
