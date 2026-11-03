<script setup lang="ts">
// "Support the game" on the About screen: a few tips (store products that unlock nothing), shown only
// while the store offers them, so the web version has no such card.
import { computed, ref } from 'vue'
import { TIPS, type Tip } from '../services/purchases.ts'
import { usePurchaseStore } from '../stores/purchase.ts'

const HEART = 'M12 20.5s-8-4.9-8-11A4.6 4.6 0 0 1 12 6.8a4.6 4.6 0 0 1 8 2.7c0 6.1-8 11-8 11Z'

const purchase = usePurchaseStore()

/** The tips with a price from the store, one more heart for each bigger one. */
const tips = computed(() =>
  TIPS.flatMap((id, i) => {
    const price = purchase.tipPrices[id]
    return price ? [{ id, price, hearts: i + 1 }] : []
  }),
)
/** Result of the last tip, as an i18n key. */
const message = ref<'about.support.thanks' | 'purchase.error' | null>(null)

// The game may have started offline: ask the store again for the prices.
if (!tips.value.length) purchase.sync()

async function tip(id: Tip) {
  message.value = null
  const outcome = await purchase.tip(id)
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
        :disabled="purchase.busy"
        :aria-label="$t('about.support.tip', { price: t.price })"
        @click="tip(t.id)"
      >
        <span class="hearts" aria-hidden="true">
          <svg v-for="h in t.hearts" :key="h" viewBox="0 0 24 24"><path :d="HEART" /></svg>
        </span>
        <span class="price">{{ purchase.busy ? '…' : t.price }}</span>
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

.tip:disabled {
  opacity: 0.6;
}

.hearts {
  display: flex;
  height: 22px;
  align-items: center;
  color: #e8457a;
}

.hearts svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

/* Overlapping hearts. */
.hearts svg + svg {
  margin-inline-start: -5px;
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
