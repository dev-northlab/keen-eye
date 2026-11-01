<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ModalDialog from '../components/ModalDialog.vue'
import ModeSwitch from '../components/ModeSwitch.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import { pushBackHandler } from '../services/backButton.ts'
import { useProgressStore } from '../stores/progress.ts'

const router = useRouter()
const progress = useProgressStore()
const isDev = import.meta.env.DEV
const version = __APP_VERSION__

/** The open info dialog (About / Privacy policy), if any. */
const info = ref<'about' | 'privacy' | null>(null)
// Android back closes the dialog instead of leaving the app.
let removeBack = () => {}
watch(info, (open) => {
  removeBack()
  if (open) removeBack = pushBackHandler(() => (info.value = null))
})
onBeforeUnmount(() => removeBack())

function play() {
  const id = progress.continueLevelId
  router.push(id === undefined ? { name: 'levels' } : { name: 'level', params: { id } })
}
</script>

<template>
  <main class="home">
    <ScreenBackdrop theme="meadow" />
    <h1>Keen Eye</h1>
    <p class="stars">★ {{ $t('home.stars', { n: progress.totalStars }) }}</p>
    <button class="play" @click="play">
      {{ $t('home.play') }}
      <small>
        {{
          progress.continueLevelId === undefined
            ? $t('home.allDone')
            : progress.needsPurchase(progress.continueLevelId)
              ? $t('home.needsPurchase', { n: progress.continueLevelId })
              : $t('home.continueLevel', { n: progress.continueLevelId })
        }}
      </small>
    </button>
    <ModeSwitch class="mode" />
    <button class="secondary" @click="router.push({ name: 'levels' })">{{ $t('home.levels') }}</button>
    <button class="secondary" @click="router.push({ name: 'settings' })">{{ $t('home.settings') }}</button>
    <label v-if="isDev" class="dev">
      <input v-model="progress.devOpenAll" type="checkbox" />
      {{ $t('home.devOpenAll') }}
    </label>

    <nav class="info-links">
      <button class="info-link" @click="info = 'about'">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M12 11v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
          <circle cx="12" cy="7.6" r="1.3" fill="currentColor" />
        </svg>
        {{ $t('info.about') }}
      </button>
      <button class="info-link" @click="info = 'privacy'">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l7 3v5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V6l7-3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
          <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ $t('info.privacy') }}
      </button>
    </nav>

    <ModalDialog v-if="info" :title="$t(`info.${info}`)">
      <div class="info-body">
        <template v-if="info === 'about'">
          <p>{{ $t('info.aboutText') }}</p>
          <p class="muted">{{ $t('info.version', { v: version }) }}</p>
        </template>
        <p v-else>{{ $t('info.privacyText') }}</p>
        <button @click="info = null">{{ $t('common.close') }}</button>
      </div>
    </ModalDialog>
  </main>
</template>

<style scoped>
.home {
  /* Own stacking context: the backdrop (z-index -1) stays behind the menu. */
  position: relative;
  isolation: isolate;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px 16px;
}

h1 {
  font-size: 44px;
  margin: 0;
}

.stars {
  margin: 0 0 16px;
  color: #b58500;
  font-weight: 600;
}

button,
.mode {
  width: min(100%, 280px);
}

.info-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.info-link {
  width: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.75);
  color: #4d5a55;
  font-size: 15px;
  box-shadow: 0 2px 6px rgb(35 48 43 / 0.08);
}

.info-link:hover {
  background: var(--panel);
  color: var(--fg);
}

.info-link svg {
  flex: none;
  width: 18px;
  height: 18px;
  color: var(--accent);
}

.info-body {
  display: grid;
  gap: 12px;
}

.info-body p {
  margin: 0;
  line-height: 1.45;
}

.info-body .muted {
  color: #6b766f;
  font-size: 14px;
}

.info-body button {
  width: 100%;
  margin-top: 4px;
}

button {
  font-size: 18px;
}

.dev {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b766f;
}

.dev input {
  width: 22px;
  height: 22px;
  accent-color: var(--accent);
}

.play {
  display: grid;
  gap: 2px;
  padding: 16px 20px;
  font-size: 22px;
  font-weight: 600;
}

.play small {
  font-size: 14px;
  font-weight: 400;
  opacity: 0.85;
}
</style>
