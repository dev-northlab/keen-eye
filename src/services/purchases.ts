// The only module that talks to the app store: the one-time "unlock all levels" purchase and the
// "support us" tips (consumables: they unlock nothing and can be bought again).
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

// Product ids, the same in Google Play Console and App Store Connect.
const FULL_GAME = 'full_game'
/** Tips from the smallest to the biggest; their prices are set in the stores. */
export const TIPS = ['tip_small', 'tip_medium', 'tip_large'] as const
export type Tip = (typeof TIPS)[number]
type ProductId = typeof FULL_GAME | Tip
const PRODUCTS: ProductId[] = [FULL_GAME, ...TIPS]

/** How long a finished purchase sheet may take to show up as owned; longer means the payment is pending. */
const APPROVAL_WAIT_MS = 10_000

const STUB_STORE_KEY = 'stubStore.fullGame'
const STUB_DELAY_MS = 600
const STUB_PRICES: Record<ProductId, string> = { full_game: '$1.49', tip_small: '$0.99', tip_medium: '$2.99', tip_large: '$4.99' }

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
/** Products whose payment went through in this session (reported by the store's `approved`). */
const approved = new Set<string>()

/** Connects to the device's store once (null in the browser or when billing is unavailable). */
function connect(): Promise<Connection | null> {
  if (!native) return Promise.resolve(null)
  connection ??= (async () => {
    // Loaded on demand: the web build never runs it.
    const cdv = await import('capacitor-plugin-cdv-purchase')
    const { store, ProductType, Platform, ErrorCode } = cdv
    const platform = Capacitor.getPlatform() === 'ios' ? Platform.APPLE_APPSTORE : Platform.GOOGLE_PLAY
    store.register([
      { id: FULL_GAME, type: ProductType.NON_CONSUMABLE, platform },
      ...TIPS.map((id) => ({ id, type: ProductType.CONSUMABLE, platform })),
    ])
    // No receipt server, so an approved payment is final. Finishing acknowledges the full game
    // (Google Play refunds purchases not acknowledged within three days) and consumes a tip.
    store.when().approved((transaction) => {
      for (const p of transaction.products) approved.add(p.id)
      return transaction.finish()
    })
    // Products missing at start (offline) are reloaded when a dialog or screen asks for prices again.
    store.minTimeBetweenUpdates = 10_000
    const errors = await store.initialize([platform])
    if (errors.some((e) => e.code === ErrorCode.SETUP)) return null
    return { cdv, complete: errors.length === 0 }
  })().catch(() => null)
  return connection
}

export interface Prices {
  /** Localized price of the full game, or null when the store is unavailable. */
  fullGame: string | null
  /** Localized prices of the tips the store offers (none when it is unavailable). */
  tips: Partial<Record<Tip, string>>
}

/** Localized prices from the store. */
export async function fetchPrices(): Promise<Prices> {
  const store = stubAvailable ? null : (await connect())?.cdv.store
  if (store && PRODUCTS.some((id) => !store.get(id))) await store.update()
  const price = (id: ProductId) => (stubAvailable ? STUB_PRICES[id] : store?.get(id)?.pricing?.price)
  return {
    fullGame: price(FULL_GAME) ?? null,
    tips: Object.fromEntries(TIPS.flatMap((id) => (price(id) ? [[id, price(id)]] : []))),
  }
}

/** Resolves true as soon as the store approves the payment for `id`, false after `ms`. */
async function becomesApproved(id: ProductId, ms: number): Promise<boolean> {
  for (const end = Date.now() + ms; Date.now() < end; await delay(250)) {
    if (approved.has(id)) return true
  }
  return approved.has(id)
}

/** Opens the store's purchase sheet for a product. */
async function order(id: ProductId): Promise<PurchaseOutcome> {
  const cdv = (await connect())?.cdv
  const offer = cdv?.store.get(id)?.getOffer()
  if (!cdv || !offer) return 'error'
  approved.delete(id)
  const error = await offer.order()
  if (error) return error.code === cdv.ErrorCode.PAYMENT_CANCELLED ? 'cancelled' : 'error'
  // A payment still pending (cash, Ask to Buy) is not an error: the store approves it on a later start
  // (then sync() unlocks the full game; a late tip is only consumed).
  return (await becomesApproved(id, APPROVAL_WAIT_MS)) ? 'purchased' : 'cancelled'
}

/** Opens the store's purchase sheet for the full game. */
export async function purchaseFullGame(): Promise<PurchaseOutcome> {
  if (!stubAvailable) return order(FULL_GAME)
  await delay()
  localStorage.setItem(STUB_STORE_KEY, 'true')
  return 'purchased'
}

/** Opens the store's purchase sheet for a tip. */
export async function sendTip(tip: Tip): Promise<PurchaseOutcome> {
  if (!stubAvailable) return order(tip)
  await delay()
  return 'purchased'
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
