<script setup lang="ts">
import ModeSwitch from '../components/ModeSwitch.vue'
import ScreenHeader from '../components/ScreenHeader.vue'
import { isLocale, LOCALES } from '../i18n/index.ts'
import { playSfx } from '../services/audio.ts'
import { useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progress.ts'
import { usePurchaseStore } from '../stores/purchase.ts'
import { useSettingsStore } from '../stores/settings.ts'

const settings = useSettingsStore()
const progress = useProgressStore()
const purchase = usePurchaseStore()
const router = useRouter()

/** Language names are shown in their own language. */
const LANGUAGE_NAMES: Record<string, string> = { ru: 'Русский', en: 'English', hy: 'Հայերեն' }

const isDev = import.meta.env.DEV
const percent = (v: number) => `${Math.round(v * 100)}%`
const version = __APP_VERSION__

function onLanguage(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  settings.locale = isLocale(value) ? value : null
}
</script>

<template>
  <div class="screen">
    <ScreenHeader :title="$t('settings.title')" />
    <main>
      <label class="row">
        <span>{{ $t('settings.language') }}</span>
        <select :value="settings.locale ?? ''" @change="onLanguage">
          <option value="">{{ $t('settings.systemLanguage') }}</option>
          <option v-for="l in LOCALES" :key="l" :value="l">{{ LANGUAGE_NAMES[l] }}</option>
        </select>
      </label>

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

      <button class="row link" @click="router.push({ name: 'purchase' })">
        <span>{{ $t('settings.fullGame') }}</span>
        <span class="muted">
          {{ purchase.fullGame ? $t('settings.fullGameOwned') : $t('settings.fullGameOpen') }} ›
        </span>
      </button>

      <details>
        <summary>{{ $t('settings.about') }}</summary>
        <p>{{ $t('settings.aboutText') }}</p>
        <p class="muted">{{ $t('settings.version', { v: version }) }}</p>
      </details>

      <details>
        <summary>{{ $t('settings.privacy') }}</summary>
        <p>{{ $t('settings.privacyText') }}</p>
      </details>

      <section v-if="isDev" class="dev">
        <h2>{{ $t('settings.dev') }}</h2>
        <button class="secondary" @click="progress.unlockAll()">{{ $t('settings.unlockAll') }}</button>
        <button class="secondary" @click="purchase.resetForDev(false)">{{ $t('settings.resetPurchaseCache') }}</button>
        <button class="secondary" @click="purchase.resetForDev(true)">{{ $t('settings.resetPurchaseStore') }}</button>
        <button class="secondary" @click="progress.reset()">{{ $t('settings.resetProgress') }}</button>
      </section>
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
  padding: 12px 16px 24px;
  display: grid;
  /* Rows take their content height and the list scrolls; auto rows would shrink to fit the screen. */
  grid-auto-rows: max-content;
  gap: 10px;
}

.row,
details {
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
  color: #6b766f;
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
  color: #6b766f;
}

select {
  font: inherit;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid #cfd8d3;
  background: #fff;
}

input[type='checkbox'] {
  width: 24px;
  height: 24px;
  accent-color: var(--accent);
}

summary {
  cursor: pointer;
  font-weight: 600;
}

.muted {
  color: #6b766f;
}

.dev {
  display: grid;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #c4ccc7;
}

.dev h2 {
  font-size: 15px;
  margin: 0;
  color: #6b766f;
}
</style>
