<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ScreenHeader from '../components/ScreenHeader.vue'
import { levels } from '../levels/index.ts'
import { useProgressStore } from '../stores/progress.ts'
import { isFreeLevel, usePurchaseStore } from '../stores/purchase.ts'

const router = useRouter()
const purchase = usePurchaseStore()
const progress = useProgressStore()

const paidLevels = levels.filter((l) => !isFreeLevel(l.id)).length
/** Result of the last action, as an i18n key under `purchase.`. */
const message = ref<'success' | 'restored' | 'none' | 'error' | null>(null)

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

function play() {
  const id = progress.continueLevelId
  router.push(id === undefined ? { name: 'levels' } : { name: 'level', params: { id } })
}
</script>

<template>
  <div class="screen">
    <ScreenHeader :title="$t('purchase.title')" />
    <main>
      <section v-if="purchase.fullGame" class="card owned">
        <p class="big" aria-hidden="true">★</p>
        <p>{{ $t('purchase.owned') }}</p>
        <button @click="play">{{ $t('purchase.play') }}</button>
      </section>

      <template v-else>
        <section class="card">
          <h2>{{ $t('purchase.what') }}</h2>
          <ul>
            <li>{{ paidLevels > 0 ? $t('purchase.allLevels', { n: paidLevels }) : $t('purchase.allLevelsNone') }}</li>
            <li>{{ $t('purchase.noAds') }}</li>
            <li>{{ $t('purchase.once') }}</li>
          </ul>
        </section>
        <button class="buy" :disabled="purchase.busy || !purchase.price" @click="buy">
          <template v-if="purchase.busy">{{ $t('purchase.wait') }}</template>
          <template v-else-if="purchase.price">{{ $t('purchase.buy', { price: purchase.price }) }}</template>
          <template v-else>{{ $t('purchase.unavailable') }}</template>
        </button>
      </template>

      <p v-if="message" class="message" :class="message" role="status">{{ $t(`purchase.${message}`) }}</p>

      <button class="secondary" :disabled="purchase.busy" @click="restore">{{ $t('purchase.restore') }}</button>
    </main>
  </div>
</template>

<style scoped>
.screen {
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: grid;
  grid-auto-rows: max-content;
  gap: 12px;
  justify-items: stretch;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
}

.card {
  background: var(--panel);
  border-radius: 16px;
  padding: 16px 18px;
}

.card h2 {
  margin: 0 0 8px;
  font-size: 18px;
}

ul {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 6px;
}

.owned {
  text-align: center;
  display: grid;
  gap: 8px;
}

.big {
  font-size: 48px;
  margin: 0;
  color: #f5b301;
}

.buy {
  padding: 16px;
  font-size: 20px;
  font-weight: 600;
}

button:disabled {
  opacity: 0.6;
  cursor: default;
}

.message {
  margin: 0;
  padding: 10px 14px;
  border-radius: 12px;
  background: #e3f4ea;
  text-align: center;
}

.message.none,
.message.error {
  background: #fdecea;
}
</style>
