<script setup lang="ts">
import { ref } from 'vue'
import ModalDialog from './ModalDialog.vue'
import { allLevels } from '../levels/index.ts'
import { timeTravelLevels } from '../levels/time-travel/index.ts'
import { useBackButton } from '../services/backButton.ts'
import { isFreeLevel, usePurchaseStore } from '../stores/purchase.ts'

const purchase = usePurchaseStore()

const paidLevels =
  allLevels.filter((l) => !isFreeLevel(l.id)).length + timeTravelLevels.filter((l) => !isFreeLevel(l.number)).length
/** Result of the last action, as an i18n key under `purchase.`. */
const message = ref<'success' | 'restored' | 'none' | 'error' | null>(null)

const close = () => (purchase.dialogOpen = false)
useBackButton(close)

// The game may have started offline: ask the store again for the price.
if (!purchase.price) purchase.sync()

async function buy() {
  message.value = null
  const outcome = await purchase.buy()
  // A cancelled purchase sheet needs no message.
  if (outcome === 'purchased') message.value = 'success'
  else if (outcome === 'error') message.value = 'error'
}

async function restore() {
  message.value = null
  message.value = await purchase.restore()
}
</script>

<template>
  <ModalDialog :title="$t('purchase.title')">
    <template #icon>
      <svg class="crown" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.5 8l4.3 3.6L12 5l4.2 6.6L20.5 8l-1.8 10H5.3Z" fill="#ffc933" stroke="#e8a400" stroke-width="1.5" stroke-linejoin="round" />
        <path d="M5.5 20.5h13" stroke="#e8a400" stroke-width="1.8" stroke-linecap="round" />
      </svg>
    </template>

    <div class="body">
      <!-- Right after a purchase or restore its own message says it. -->
      <p v-if="purchase.fullGame && !message">{{ $t('purchase.fullGame') }}</p>

      <template v-if="!purchase.fullGame">
        <p class="tagline">{{ $t('purchase.tagline') }}</p>
        <ul class="points">
          <li>
            <span class="point-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" fill="none" stroke="currentColor" stroke-width="2" />
                <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" fill="none" stroke="currentColor" stroke-width="2" />
                <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" fill="none" stroke="currentColor" stroke-width="2" />
                <path d="M17 14v6M14 17h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            {{ paidLevels > 0 ? $t('purchase.allLevels', { n: paidLevels }) : $t('purchase.allLevelsNone') }}
          </li>
          <li>
            <span class="point-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.5 20.5l7-12 4 6.5 2.5-3.5 5.5 9Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                <path d="M9.5 8.5V3.5l4 1.5-4 1.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            {{ $t('purchase.harder') }}
          </li>
          <li>
            <span class="point-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2" />
                <path d="M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            {{ $t('purchase.noAds') }}
          </li>
          <li>
            <span class="point-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 12c-2-2.6-3.6-4-5.5-4a4 4 0 0 0 0 8c1.9 0 3.5-1.4 5.5-4Zm0 0c2 2.6 3.6 4 5.5 4a4 4 0 0 0 0-8c-1.9 0-3.5 1.4-5.5 4Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
              </svg>
            </span>
            {{ $t('purchase.once') }}
          </li>
        </ul>

        <button class="buy" :disabled="purchase.busy || !purchase.price" @click="buy">
          <template v-if="purchase.busy">{{ $t('purchase.wait') }}</template>
          <template v-else-if="purchase.price">{{ $t('purchase.buy', { price: purchase.price }) }}</template>
          <template v-else>{{ $t('purchase.unavailable') }}</template>
        </button>
      </template>

      <p v-if="message" class="message" :class="message" role="status">{{ $t(`purchase.${message}`) }}</p>

      <button class="secondary" @click="close">{{ $t('common.close') }}</button>
      <button v-if="!purchase.fullGame" class="restore" :disabled="purchase.busy" @click="restore">
        {{ $t('purchase.restore') }}
      </button>
    </div>
  </ModalDialog>
</template>

<style scoped>
.crown {
  transform: translateY(-1px);
}

.body {
  display: grid;
  gap: 12px;
}

.body p {
  margin: 0;
  line-height: 1.45;
}

.body .tagline {
  margin-top: -4px;
  color: var(--muted);
  font-size: 17px;
}

button {
  width: 100%;
}

button:disabled {
  opacity: 0.6;
  cursor: default;
}

.buy {
  padding: 15px;
  font-size: 19px;
  font-weight: 700;
  box-shadow: inset 0 -3px 0 rgb(0 0 0 / 0.12);
}

.restore {
  padding: 4px;
  background: none;
  color: var(--muted);
  font-size: 15px;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.message {
  padding: 10px 14px;
  border-radius: 12px;
  background: var(--ok-bg);
}

.message.none,
.message.error {
  background: var(--danger-bg);
}
</style>
