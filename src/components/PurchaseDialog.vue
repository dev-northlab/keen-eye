<script setup lang="ts">
import { ref } from 'vue'
import ModalDialog from './ModalDialog.vue'
import { allLevels } from '../levels/index.ts'
import { timeTravelLevels } from '../levels/time-travel/index.ts'
import { useBackButton } from '../services/backButton.ts'
import { isFreeLevel, usePurchaseStore } from '../stores/purchase.ts'
import { useSettingsStore } from '../stores/settings.ts'

const purchase = usePurchaseStore()
const still = useSettingsStore().effectiveReduceMotion

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
    <!-- A golden crown badge over turning rays, with twinkling stars round it. -->
    <template #icon>
      <span class="badge" :class="{ still }">
        <svg class="rays" viewBox="0 0 100 100" aria-hidden="true">
          <path
            v-for="i in 12"
            :key="i"
            d="M50 50 47 2h6Z"
            fill="#ffd23f"
            :fill-opacity="i % 2 ? 0.55 : 0.3"
            :transform="`rotate(${i * 30} 50 50)`"
          />
        </svg>
        <span class="coin">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3.5 8.5l4.3 3.6L12 5.5l4.2 6.6L20.5 8.5l-1.8 9.5H5.3Z" fill="#fff" />
            <path d="M5.5 20.3h13" stroke="#fff" stroke-width="2" stroke-linecap="round" />
            <circle cx="12" cy="5" r="1.4" fill="#fff" /><circle cx="3.4" cy="8" r="1.2" fill="#fff" /><circle cx="20.6" cy="8" r="1.2" fill="#fff" />
          </svg>
        </span>
        <svg v-for="n in 3" :key="n" class="spark" :class="`s${n}`" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 1l2.6 7.4L22 11l-7.4 2.6L12 21l-2.6-7.4L2 11l7.4-2.6Z" />
        </svg>
      </span>
    </template>

    <div class="body">
      <!-- Right after a purchase or restore its own message says it. -->
      <p v-if="purchase.fullGame && !message" class="owned">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#3ec46d" />
          <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ $t('purchase.owned') }}
      </p>

      <template v-if="!purchase.fullGame">
        <p class="tagline">{{ $t('purchase.tagline') }}</p>
        <ul class="points">
          <li>
            <span class="point-icon" style="--c: #3a86ff">
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
            <span class="point-icon" style="--c: #e5484d">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.5 20.5l7-12 4 6.5 2.5-3.5 5.5 9Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                <path d="M9.5 8.5V3.5l4 1.5-4 1.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            {{ $t('purchase.harder') }}
          </li>
          <li>
            <span class="point-icon" style="--c: #9b6bff">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2" />
                <path d="M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            {{ $t('purchase.noAds') }}
          </li>
          <li>
            <span class="point-icon" style="--c: #3ec46d">
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

      <button class="secondary close" @click="close">{{ $t('common.close') }}</button>
      <button v-if="!purchase.fullGame" class="restore" :disabled="purchase.busy" @click="restore">
        {{ $t('purchase.restore') }}
      </button>
    </div>
  </ModalDialog>
</template>

<style scoped>
/* The badge: ModalDialog's round icon place, here a golden coin with a crown over turning rays and twinkling stars. */
.badge {
  position: relative;
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
}

:deep(.card > .icon) {
  width: 96px;
  height: 96px;
  margin-bottom: 8px;
  background: none;
  overflow: visible;
}

/* `.badge` in front: ModalDialog sizes every svg of its icon place, these keep their own size. */
.badge .rays {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 136px;
  height: 136px;
  translate: -50% -50%;
  /* The rays fade out before they reach the title. */
  mask-image: radial-gradient(circle, #000 45%, transparent 70%);
  animation: turn 14s linear infinite;
}

.coin {
  position: relative;
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff3b0, #ffc531 45%, #e09a00);
  box-shadow:
    inset 0 -4px 0 rgb(0 0 0 / 0.12),
    inset 0 3px 0 rgb(255 255 255 / 0.5),
    0 0 0 4px #fff,
    0 0 0 7px #ffd23f,
    0 10px 20px -6px rgb(160 100 0 / 0.6);
  animation: pop 0.5s cubic-bezier(0.3, 1.6, 0.5, 1) both;
}

.badge .coin svg {
  width: 44px;
  height: 44px;
  filter: drop-shadow(0 2px 0 rgb(160 100 0 / 0.6));
}

.badge .spark {
  position: absolute;
  fill: #ffc531;
  stroke: #fff;
  stroke-width: 1.5;
  animation: twinkle 1.6s ease-in-out infinite;
}

.badge .s1 {
  top: -6px;
  left: -16px;
  width: 20px;
  height: 20px;
}

.badge .s2 {
  top: 6px;
  right: -18px;
  width: 15px;
  height: 15px;
  animation-delay: 0.5s;
}

.badge .s3 {
  bottom: -2px;
  left: -10px;
  width: 13px;
  height: 13px;
  animation-delay: 1s;
}

.badge.still .rays,
.badge.still .coin,
.badge.still .spark {
  animation: none;
}

@keyframes turn {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pop {
  from {
    transform: scale(0.4);
  }
  to {
    transform: scale(1);
  }
}

@keyframes twinkle {
  0%,
  100% {
    transform: scale(0.75) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.15) rotate(20deg);
    opacity: 1;
  }
}

/* "The full game is unlocked": a green note with a tick. */
.body .owned {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 16px;
  background: var(--ok-bg);
  text-align: start;
  font-weight: 600;
}

.owned svg {
  flex: none;
  width: 28px;
  height: 28px;
}

/* The points: a glossy tile in each one's colour (`--c`) with a white glyph, like the settings' icons. */
.points li .point-icon {
  border-radius: 11px;
  background: linear-gradient(160deg, color-mix(in srgb, var(--c) 65%, #fff), var(--c) 55%, color-mix(in srgb, var(--c) 85%, #000));
  color: #fff;
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.5),
    0 3px 0 color-mix(in srgb, var(--c) 60%, #000);
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

 /* Candy buttons with a depth they sink into when pressed: "Buy" gold, "Close" soft. */
.buy,
.close {
  border-radius: 999px;
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;
}

.buy {
  padding: 15px;
  font-size: 19px;
  font-weight: 800;
  background: linear-gradient(180deg, #ffe066, #ffc531 55%, #f2a900);
  color: #5a3b00;
  text-shadow: 0 1px 0 rgb(255 255 255 / 0.5);
  box-shadow:
    inset 0 2px 0 rgb(255 255 255 / 0.6),
    0 5px 0 #b07a00,
    0 10px 16px -6px rgb(160 100 0 / 0.55);
}

.buy:not(:disabled):active {
  transform: translateY(4px);
  box-shadow:
    inset 0 2px 0 rgb(255 255 255 / 0.6),
    0 1px 0 #b07a00;
}

.close {
  padding: 12px;
  font-weight: 700;
  box-shadow:
    inset 0 2px 0 rgb(255 255 255 / 0.4),
    0 4px 0 var(--line);
}

.close:active {
  transform: translateY(3px);
  box-shadow: 0 1px 0 var(--line);
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
