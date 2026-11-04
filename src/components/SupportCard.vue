<script setup lang="ts">
// "Support the game" on the About screen: a few tips (store products that unlock nothing), shown only
// while the store offers them, so the web version has no such card.
import { computed, ref } from 'vue'
import { TIPS, type Tip } from '../services/purchases.ts'
import { usePurchaseStore } from '../stores/purchase.ts'
import { useSettingsStore } from '../stores/settings.ts'

const HEART = 'M12 20.5s-8-4.9-8-11A4.6 4.6 0 0 1 12 6.8a4.6 4.6 0 0 1 8 2.7c0 6.1-8 11-8 11Z'

const purchase = usePurchaseStore()
const settings = useSettingsStore()

/** The tips with a price from the store. */
const tips = computed(() =>
  TIPS.flatMap((id) => {
    const price = purchase.tipPrices[id]
    return price ? [{ id, price }] : []
  }),
)
/** Result of the last tip, as an i18n key. */
const message = ref<'about.support.thanks' | 'purchase.error' | null>(null)
/** The tip whose purchase sheet is open. */
const pending = ref<Tip | null>(null)

// The game may have started offline: ask the store again for the prices.
if (!tips.value.length) purchase.sync()

async function tip(id: Tip) {
  message.value = null
  pending.value = id
  const outcome = await purchase.tip(id).finally(() => (pending.value = null))
  // A cancelled purchase sheet needs no message.
  if (outcome === 'purchased') message.value = 'about.support.thanks'
  else if (outcome === 'error') message.value = 'purchase.error'
}
</script>

<template>
  <section v-if="tips.length" class="support">
    <span class="support-icon">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="HEART" /></svg>
    </span>
    <h2>{{ $t('about.support.title') }}</h2>
    <p>{{ $t('about.support.text') }}</p>

    <div class="tips">
      <button
        v-for="t in tips"
        :key="t.id"
        class="tip"
        :class="{ pending: pending === t.id, still: settings.effectiveReduceMotion }"
        :disabled="purchase.busy"
        :aria-label="$t('about.support.tip', { price: t.price })"
        @click="tip(t.id)"
      >
        <!-- A coffee, a cupcake and a gift, from the smallest tip to the biggest -->
        <svg class="tip-icon" viewBox="0 0 24 24" aria-hidden="true">
          <g v-if="t.id === 'tip_small'">
            <path d="M9 2.5c-1 1.2 1 2.3 0 3.5M13 2.5c-1 1.2 1 2.3 0 3.5" fill="none" stroke="#b9c4c0" stroke-width="1.5" stroke-linecap="round" />
            <path d="M17 10.5h1.2a2.6 2.6 0 0 1 0 5.2H16.5" fill="none" stroke="#e0914a" stroke-width="2" />
            <path d="M4 9h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6Z" fill="#f2a65a" />
            <rect x="3" y="8" width="15" height="2.4" rx="1.2" fill="#e0914a" />
            <path d="M10.5 16.6s-2.2-1.3-2.2-3a1.2 1.2 0 0 1 2.2-.7 1.2 1.2 0 0 1 2.2.7c0 1.7-2.2 3-2.2 3Z" fill="#fff" />
            <rect x="2.5" y="20.4" width="17" height="1.8" rx="0.9" fill="#c7d2ce" />
          </g>
          <g v-else-if="t.id === 'tip_medium'">
            <path d="M6 13h12l-1.6 8.5H7.6Z" fill="#6cc3d5" />
            <path d="M9.4 13.5l.6 7.5M12 13.5v7.5M14.6 13.5l-.6 7.5" stroke="#4aa9bd" stroke-width="1.2" />
            <path d="M5 14a3 3 0 0 1 1-6 4 4 0 0 1 6-3 4 4 0 0 1 6 3 3 3 0 0 1 1 6Z" fill="#f9c6d6" />
            <path d="M7.5 10.5c1.5.8 3 .8 4.5 0s3-.8 4.5 0" fill="none" stroke="#f3a3bd" stroke-width="1.2" stroke-linecap="round" />
            <circle cx="12" cy="3.6" r="1.9" fill="#e8457a" />
          </g>
          <g v-else>
            <path d="M12 8c-1.5-3-5.5-3.8-5.5-1.3C6.5 8 10 8 12 8Zm0 0c1.5-3 5.5-3.8 5.5-1.3C17.5 8 14 8 12 8Z" fill="#f5c84c" />
            <rect x="4" y="11" width="16" height="10.5" rx="1.5" fill="#8a7fd6" />
            <rect x="3" y="7.8" width="18" height="4.2" rx="1.2" fill="#a79cf0" />
            <rect x="10.8" y="7.8" width="2.4" height="13.7" fill="#f5c84c" />
          </g>
        </svg>
        <span class="price">{{ t.price }}</span>
      </button>
    </div>

    <p v-if="message" class="message" :class="{ error: message === 'purchase.error' }" role="status">{{ $t(message) }}</p>
    <p v-else class="note">{{ $t('about.support.note') }}</p>
  </section>
</template>

<style scoped>
.support {
  background: var(--panel);
  border-radius: 20px;
  padding: 16px 18px;
  text-align: center;
  box-shadow: 0 6px 16px rgb(35 48 43 / 0.12);
  display: grid;
  justify-items: center;
  gap: 10px;
}

.support-icon {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--soft-2);
  color: #e8457a;
}

.support-icon svg {
  width: 30px;
  height: 30px;
  fill: currentColor;
}

h2 {
  margin: 0;
  font-size: 18px;
}

p {
  margin: 0;
  line-height: 1.4;
}

.tips {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 4px;
}

.tip {
  display: grid;
  justify-items: center;
  gap: 4px;
  padding: 10px 4px;
  border-radius: 16px;
  background: var(--soft-2);
  color: var(--fg);
  font-weight: 800;
  box-shadow: inset 0 -3px 0 rgb(0 0 0 / 0.08);
  transition: transform 0.12s ease;
}

.tip:active:not(:disabled) {
  transform: scale(0.96);
}

.tip:disabled:not(.pending) {
  opacity: 0.6;
}

.tip-icon {
  width: 32px;
  height: 32px;
  transform-origin: 50% 90%;
}

/* While its purchase sheet is open, the tip's icon hops and wiggles. */
.pending .tip-icon {
  animation: hop 1s ease-in-out infinite;
}

/* "Reduce motion": a slow fade instead. */
.pending.still .tip-icon {
  animation: fade 1.6s ease-in-out infinite;
}

@keyframes hop {
  0%,
  60%,
  100% {
    transform: none;
  }
  15% {
    transform: translateY(-4px) rotate(-8deg);
  }
  30% {
    transform: translateY(-4px) rotate(8deg);
  }
  45% {
    transform: translateY(0) scale(1.06, 0.94);
  }
}

@keyframes fade {
  50% {
    opacity: 0.4;
  }
}

.price {
  font-size: 16px;
  font-variant-numeric: tabular-nums;
}

.note {
  font-size: 13px;
  color: var(--muted);
}

.message {
  font-weight: 700;
  color: var(--accent);
}

.message.error {
  color: var(--danger-fg);
}
</style>
