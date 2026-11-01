// The only module that talks to the app store about the one-time "unlock all levels" purchase.
//
// Development stub: in `npm run dev` purchases succeed after a short delay and are remembered
// under a separate key that plays the role of the store's server, so "Restore purchases" can be
// tried after clearing the local cache. In a production build the stub sells nothing — a real
// store integration (RevenueCat) replaces the bodies of these functions before release.

export type PurchaseOutcome = 'purchased' | 'cancelled' | 'error'

const STUB_STORE_KEY = 'stubStore.fullGame'
const STUB_DELAY_MS = 600

const stubAvailable = import.meta.env.DEV
const delay = () => new Promise((r) => setTimeout(r, STUB_DELAY_MS))

function stubOwned(): boolean {
  try {
    return localStorage.getItem(STUB_STORE_KEY) === 'true'
  } catch {
    return false
  }
}

/** Localized price from the store, or null when the store is unavailable. */
export async function fetchPrice(): Promise<string | null> {
  return stubAvailable ? '$1.99' : null
}

/** Opens the store's purchase sheet. */
export async function purchaseFullGame(): Promise<PurchaseOutcome> {
  if (!stubAvailable) return 'error'
  await delay()
  localStorage.setItem(STUB_STORE_KEY, 'true')
  return 'purchased'
}

/** Asks the store for past purchases: true if the full game was bought, null when the store can't be reached. */
export async function fetchOwnership(): Promise<boolean | null> {
  if (!stubAvailable) return null
  await delay()
  return stubOwned()
}

/** Development only: forget the purchase on the "store" side too. */
export function resetStubStore(): void {
  localStorage.removeItem(STUB_STORE_KEY)
}
