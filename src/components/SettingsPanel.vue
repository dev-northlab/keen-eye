<script setup lang="ts">
// Settings list: the Settings screen and the level's pause menu both show it.
import DevToolsDialog from './DevToolsDialog.vue'
import LanguageSelect from './LanguageSelect.vue'
import ModeSwitch from './ModeSwitch.vue'
import ResetProgressDialog from './ResetProgressDialog.vue'
import ThemeSwitch from './ThemeSwitch.vue'
import { playSfx } from '../services/audio.ts'
import { ref } from 'vue'
import { usePurchaseStore } from '../stores/purchase.ts'
import { useSettingsStore } from '../stores/settings.ts'

const settings = useSettingsStore()
const purchase = usePurchaseStore()

const percent = (v: number) => `${Math.round(v * 100)}%`

// TEMPORARY code for testing staging builds: turns on developer mode (see DEVELOPER_CODE in stores/settings.ts).
// Applied as soon as the typed code is right; there is no submit button.
const developerCode = ref('')
function onDeveloperCode() {
  if (settings.enableDeveloper(developerCode.value)) developerCode.value = ''
}
const devToolsOpen = ref(false)
const resetOpen = ref(false)
</script>

<template>
  <main>
    <div class="row">
      <span class="lead"><span class="ico" style="--c: #2fa8ff" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="#fff" stroke-width="2"/><path d="M3.5 12h17M12 3.5c-3 3-3 14 0 17M12 3.5c3 3 3 14 0 17" fill="none" stroke="#fff" stroke-width="1.8"/></svg></span><span id="language-label">{{ $t('settings.language') }}</span></span>
      <LanguageSelect labelledby="language-label" />
    </div>

    <div class="row column">
      <span class="lead">
        <span class="ico" style="--c: #3ec46d" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7Z" fill="#fff"/></svg></span>
        <span>
          {{ $t('mode.label') }}
          <!-- What the chosen mode means; changes with the switch below. -->
          <small aria-live="polite">{{ $t(`mode.${settings.mode}Hint`) }}</small>
        </span>
      </span>
      <ModeSwitch />
    </div>

    <!-- One grid for both sliders: the label column fits the longest label of the current language. -->
    <div class="row volumes">
      <label class="lead" for="music-volume"><span class="ico" style="--c: #ff6bb5" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 17V6l10-2v11" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><circle cx="6.5" cy="17" r="2.8" fill="#fff"/><circle cx="16.5" cy="15" r="2.8" fill="#fff"/></svg></span>{{ $t('settings.music') }}</label>
      <input
        id="music-volume"
        v-model.number="settings.musicVolume"
        type="range"
        min="0"
        max="1"
        step="0.05"
        :style="{ '--p': percent(settings.musicVolume) }"
      />
      <output for="music-volume">{{ percent(settings.musicVolume) }}</output>

      <label class="lead" for="sound-volume"><span class="ico" style="--c: #ff9f1c" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" fill="#fff"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg></span>{{ $t('settings.sound') }}</label>
      <input
        id="sound-volume"
        v-model.number="settings.soundVolume"
        type="range"
        min="0"
        max="1"
        step="0.05"
        :style="{ '--p': percent(settings.soundVolume) }"
        @change="playSfx('found')"
      />
      <output for="sound-volume">{{ percent(settings.soundVolume) }}</output>
    </div>

    <div class="row">
      <span class="lead"><span class="ico" style="--c: #9b6bff" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15.5 4.5A8 8 0 1 0 19.5 16a6.5 6.5 0 0 1-4-11.5Z" fill="#fff"/></svg></span>{{ $t('theme.label') }}</span>
      <ThemeSwitch />
    </div>

    <label class="row">
      <span class="lead"><span class="ico" style="--c: #1fb5a5" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="8" y="3.5" width="8" height="17" rx="2" fill="#fff"/><path d="M4.5 8v8M19.5 8v8M2 10.5v3M22 10.5v3" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg></span>{{ $t('settings.vibration') }}</span>
      <input v-model="settings.vibration" type="checkbox" role="switch" />
    </label>

    <label class="row">
      <span class="lead">
        <span class="ico" style="--c: #5a8dee" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 13c2.5-4 5.5-4 8 0s5.5 4 8 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M5 18h14" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-opacity="0.7"/></svg></span>
        <span>
          {{ $t('settings.reduceMotion') }}
          <small>{{ $t('settings.reduceMotionHint') }}</small>
        </span>
      </span>
      <input
        type="checkbox"
        role="switch"
        :checked="settings.effectiveReduceMotion"
        @change="settings.reduceMotion = ($event.target as HTMLInputElement).checked"
      />
    </label>

    <button class="row link" @click="purchase.dialogOpen = true">
      <span class="lead"><span class="ico" style="--c: #ffc531" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 8l4 3.5L12 5l4 6.5L20 8l-1.5 10h-13Z" fill="#fff"/></svg></span>{{ $t('settings.fullGame') }}</span>
      <span class="muted">
        {{ purchase.fullGame ? $t('settings.fullGameOwned') : $t('settings.fullGameOpen') }} <span class="flip-rtl">›</span>
      </span>
    </button>

    <button class="row link" @click="resetOpen = true">
      <span class="lead danger"><span class="ico" style="--c: #ff5a5f" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12a7 7 0 1 0 2.1-5M5 4v4h4" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>{{ $t('settings.resetProgress') }}</span>
      <span class="muted flip-rtl">›</span>
    </button>

    <button v-if="settings.developer" class="row link" @click="devToolsOpen = true">
      <span class="lead"><span class="ico" style="--c: #8a94a6" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14.5 5.5a4 4 0 0 0-5 5L4 16l4 4 5.5-5.5a4 4 0 0 0 5-5L16 12l-4-4Z" fill="#fff"/></svg></span>{{ $t('settings.dev') }}</span>
      <span class="muted flip-rtl">›</span>
    </button>
    <label v-else class="row">
      <span class="lead"><span class="ico" style="--c: #8a94a6" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14.5 5.5a4 4 0 0 0-5 5L4 16l4 4 5.5-5.5a4 4 0 0 0 5-5L16 12l-4-4Z" fill="#fff"/></svg></span>{{ $t('settings.developer') }}</span>
      <input
        v-model="developerCode"
        class="code"
        inputmode="numeric"
        autocomplete="off"
        @input="onDeveloperCode"
      />
    </label>

    <ResetProgressDialog v-if="resetOpen" @close="resetOpen = false" />
    <DevToolsDialog v-if="settings.developer && devToolsOpen" @close="devToolsOpen = false" />
  </main>
</template>

<style scoped>
main {
  flex: 1;
  overflow-y: auto;
  /* A centered column on wide screens; the padding (not a margin) keeps the scrollbar at the window edge. */
  padding: 12px max(16px, (100% - var(--menu-width)) / 2) 24px;
  display: grid;
  /* One column no wider than the screen: a row's content (an input's own width) never adds a sideways scroll. */
  grid-template-columns: minmax(0, 1fr);
  /* Rows take their content height and the list scrolls; auto rows would shrink to fit the screen. */
  grid-auto-rows: max-content;
  gap: 10px;
}

.row {
  background: var(--panel);
  border-radius: 18px;
  padding: 12px 16px;
  box-shadow: 0 4px 14px -8px rgb(0 0 0 / 0.35);
}

/* A row's label after its icon: a glossy rounded tile in the row's own colour (`--c`) with a white glyph. */
.lead {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.ico {
  flex: none;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: linear-gradient(160deg, color-mix(in srgb, var(--c) 65%, #fff), var(--c) 55%, color-mix(in srgb, var(--c) 85%, #000));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.5),
    0 3px 0 color-mix(in srgb, var(--c) 60%, #000),
    0 6px 10px -4px rgb(0 0 0 / 0.35);
}

.ico svg {
  width: 22px;
  height: 22px;
  filter: drop-shadow(0 1px 0 rgb(0 0 0 / 0.2));
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

/* Volume sliders: a thick track filled up to the value (`--p`) in the accent colour, a big round knob. */
.row.volumes input {
  min-width: 0;
  height: 28px;
  margin: 0;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.row.volumes input::-webkit-slider-runnable-track {
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(to right, var(--accent) var(--p), var(--soft) var(--p));
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.2);
}

.row.volumes input::-moz-range-track {
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(to right, var(--accent) var(--p), var(--soft) var(--p));
}

.row.volumes input::-webkit-slider-thumb {
  appearance: none;
  width: 26px;
  height: 26px;
  margin-top: -8px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--accent);
  box-shadow: 0 3px 6px rgb(0 0 0 / 0.3);
}

.row.volumes input::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--accent);
  box-shadow: 0 3px 6px rgb(0 0 0 / 0.3);
}

[dir='rtl'] .row.volumes input::-webkit-slider-runnable-track {
  background: linear-gradient(to left, var(--accent) var(--p), var(--soft) var(--p));
}

.row.volumes output {
  width: 3em;
  text-align: end;
  font-variant-numeric: tabular-nums;
  color: var(--muted);
}

button.row.link {
  width: 100%;
  font: inherit;
  color: var(--fg);
  text-align: start;
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

/* On/off rows: a round toggle switch instead of a checkbox. */
input[type='checkbox'] {
  flex: none;
  position: relative;
  width: 52px;
  height: 30px;
  margin: 0;
  appearance: none;
  border-radius: 999px;
  background: var(--soft);
  box-shadow: inset 0 2px 4px rgb(0 0 0 / 0.18);
  cursor: pointer;
  transition: background 0.2s ease;
}

input[type='checkbox']::after {
  content: '';
  position: absolute;
  top: 3px;
  inset-inline-start: 3px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.3);
  transition: inset-inline-start 0.2s ease;
}

input[type='checkbox']:checked {
  background: var(--accent);
}

input[type='checkbox']:checked::after {
  inset-inline-start: 25px;
}

input[type='checkbox']:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--accent) 45%, transparent);
  outline-offset: 2px;
}

.muted {
  color: var(--muted);
}

.danger {
  color: var(--mode-hard);
}

input.code {
  width: 7em;
  min-width: 0;
  font: inherit;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--fg);
}

</style>
