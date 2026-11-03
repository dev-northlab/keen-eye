<script setup lang="ts">
// Settings list: the Settings screen and the level's pause menu both show it.
import LanguageSelect from './LanguageSelect.vue'
import ModeSwitch from './ModeSwitch.vue'
import ThemeSwitch from './ThemeSwitch.vue'
import { playSfx } from '../services/audio.ts'
import { ref } from 'vue'
import { usePurchaseStore } from '../stores/purchase.ts'
import { useSettingsStore } from '../stores/settings.ts'

const settings = useSettingsStore()
const purchase = usePurchaseStore()

const percent = (v: number) => `${Math.round(v * 100)}%`

// TEMPORARY promo code for testing staging builds (see PROMO_CODE in stores/purchase.ts).
const promoCode = ref('')
const promoInvalid = ref(false)
async function applyPromo() {
  promoInvalid.value = !(await purchase.applyPromo(promoCode.value))
  if (!promoInvalid.value) promoCode.value = ''
}
</script>

<template>
  <main>
    <div class="row">
      <span id="language-label">{{ $t('settings.language') }}</span>
      <LanguageSelect labelledby="language-label" />
    </div>

    <div class="row column">
      <span>
        {{ $t('mode.label') }}
        <small>{{ $t('mode.calm') }}: {{ $t('mode.calmHint') }}</small>
      </span>
      <ModeSwitch />
    </div>

    <!-- One grid for both sliders: the label column fits the longest label of the current language. -->
    <div class="row volumes">
      <label for="music-volume">{{ $t('settings.music') }}</label>
      <input
        id="music-volume"
        v-model.number="settings.musicVolume"
        type="range"
        min="0"
        max="1"
        step="0.05"
      />
      <output for="music-volume">{{ percent(settings.musicVolume) }}</output>

      <label for="sound-volume">{{ $t('settings.sound') }}</label>
      <input
        id="sound-volume"
        v-model.number="settings.soundVolume"
        type="range"
        min="0"
        max="1"
        step="0.05"
        @change="playSfx('found')"
      />
      <output for="sound-volume">{{ percent(settings.soundVolume) }}</output>
    </div>

    <div class="row">
      <span>{{ $t('theme.label') }}</span>
      <ThemeSwitch />
    </div>

    <label class="row">
      <span>{{ $t('settings.vibration') }}</span>
      <input v-model="settings.vibration" type="checkbox" role="switch" />
    </label>

    <label class="row">
      <span>
        {{ $t('settings.reduceMotion') }}
        <small>{{ $t('settings.reduceMotionHint') }}</small>
      </span>
      <input
        type="checkbox"
        role="switch"
        :checked="settings.effectiveReduceMotion"
        @change="settings.reduceMotion = ($event.target as HTMLInputElement).checked"
      />
    </label>

    <button class="row link" @click="purchase.dialogOpen = true">
      <span>{{ $t('settings.fullGame') }}</span>
      <span class="muted">
        {{ purchase.owned ? $t('settings.fullGameOwned') : $t('settings.fullGameOpen') }} ›
      </span>
    </button>

    <div v-if="purchase.promo" class="row">
      <span>
        {{ $t('settings.promo') }}
        <small>{{ $t('settings.promoApplied') }}</small>
      </span>
      <button class="secondary" @click="purchase.resetPromo()">{{ $t('settings.promoReset') }}</button>
    </div>
    <form v-else class="row column" @submit.prevent="applyPromo">
      <label for="promo-code">{{ $t('settings.promo') }}</label>
      <div class="promo">
        <input
          id="promo-code"
          v-model="promoCode"
          inputmode="numeric"
          autocomplete="off"
          @input="promoInvalid = false"
        />
        <button type="submit" :disabled="!promoCode.trim()">{{ $t('settings.promoApply') }}</button>
      </div>
      <small v-if="promoInvalid" class="error" role="alert">{{ $t('settings.promoInvalid') }}</small>
    </form>
  </main>
</template>

<style scoped>
main {
  flex: 1;
  overflow-y: auto;
  /* A centered column on wide screens; the padding (not a margin) keeps the scrollbar at the window edge. */
  padding: 12px max(16px, (100% - var(--menu-width)) / 2) 24px;
  display: grid;
  /* Rows take their content height and the list scrolls; auto rows would shrink to fit the screen. */
  grid-auto-rows: max-content;
  gap: 10px;
}

.row {
  background: var(--panel);
  border-radius: 14px;
  padding: 14px 16px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 56px;
}

.row.volumes {
  display: grid;
  grid-template-columns: max-content 1fr 3em;
  justify-content: stretch;
  gap: 18px 12px;
}

.row.volumes input {
  min-width: 0;
  accent-color: var(--accent);
}

.row.volumes output {
  width: 3em;
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: var(--muted);
}

button.row.link {
  width: 100%;
  font: inherit;
  color: var(--fg);
  text-align: left;
  cursor: pointer;
}

.row.column {
  display: grid;
  justify-content: stretch;
}

.row small {
  display: block;
  font-size: 13px;
  color: var(--muted);
}

input[type='checkbox'] {
  width: 24px;
  height: 24px;
  accent-color: var(--accent);
}

.muted {
  color: var(--muted);
}

.promo {
  display: flex;
  gap: 8px;
}

.promo input {
  flex: 1;
  min-width: 0;
  font: inherit;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--fg);
}

.row .error {
  color: var(--danger-fg);
}
</style>
