<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ModalDialog from '../components/ModalDialog.vue'
import ModeSwitch from '../components/ModeSwitch.vue'
import PlayerAvatar from '../components/PlayerAvatar.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import SeasonSwitch from '../components/SeasonSwitch.vue'
import ThemeSwitch from '../components/ThemeSwitch.vue'
import { pushBackHandler } from '../services/backButton.ts'
import { PLAYER_COLORS } from '../stores/duo.ts'
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
    <div class="corner">
      <SeasonSwitch />
      <ThemeSwitch />
    </div>
    <h1>Keen Eye</h1>
    <p class="stars">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17l-5.7 3.1 1.2-6.3-4.6-4.4 6.3-.8Z" fill="#ffc933" stroke="#e8a400" stroke-width="1.4" stroke-linejoin="round" /></svg>
      {{ $t('home.stars', { n: progress.totalStars }) }}
    </p>
    <button class="play" @click="play">
      <span class="play-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M9 6.5v11l9-5.5Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>
      </span>
      <span class="text">
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
      </span>
    </button>
    <ModeSwitch class="mode" />
    <!-- Menu entries: a raised pill with an icon on the left and a chevron on the right. -->
    <button class="entry" @click="router.push({ name: 'duo' })">
      <span class="pair" aria-hidden="true">
        <PlayerAvatar avatar="boy" :color="PLAYER_COLORS[0].value" />
        <PlayerAvatar avatar="girl" :color="PLAYER_COLORS[1].value" />
      </span>
      <span class="label">{{ $t('home.duo') }}</span>
      <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>
    <button class="entry" @click="router.push({ name: 'levels' })">
      <span class="badge levels" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /><path d="M9 4v14M15 6v14" stroke="currentColor" stroke-width="2" /></svg>
      </span>
      <span class="label">{{ $t('home.levels') }}</span>
      <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>
    <button class="entry" @click="router.push({ name: 'settings' })">
      <span class="badge settings" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M10.3 2.5h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9-2.6-.5v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" /><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="2" /></svg>
      </span>
      <span class="label">{{ $t('home.settings') }}</span>
      <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>
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
  /* A soft halo keeps the title readable over the sky and clouds. */
  text-shadow: 0 2px 0 var(--glass), 0 0 18px var(--glass);
}

.stars {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 12px;
  padding: 5px 14px 5px 8px;
  border-radius: 999px;
  background: var(--gold-bg);
  color: var(--gold-fg);
  font-weight: 700;
  box-shadow: 0 3px 10px rgb(35 48 43 / 0.12);
}

.stars svg {
  width: 22px;
  height: 22px;
}

button,
.mode {
  width: min(100%, var(--menu-width));
}

/* Season and day/night switches: top left, away from the sun (top right) and the centered menu. */
.corner {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
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
  background: var(--glass);
  color: var(--muted);
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
  color: var(--muted);
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
  color: var(--muted);
}

.dev input {
  width: 22px;
  height: 22px;
  accent-color: var(--accent);
}

.play {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px 14px 14px;
  border-radius: 20px;
  font-size: 22px;
  font-weight: 700;
  text-align: left;
  box-shadow:
    0 8px 18px rgb(35 48 43 / 0.2),
    inset 0 -4px 0 rgb(0 0 0 / 0.12);
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease;
}

.play-icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #fff;
  color: var(--accent);
}

.play-icon svg {
  width: 30px;
  height: 30px;
  margin-left: 3px;
}

.play .text {
  display: grid;
  gap: 2px;
}

.play small {
  font-size: 14px;
  font-weight: 400;
  opacity: 0.9;
}

.play:active,
.entry:active {
  transform: scale(0.97);
}

/* Menu entries, in the style of the back button and the level toolbar. */
.entry {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 60px;
  padding: 8px 14px 8px 10px;
  border-radius: 18px;
  background: var(--panel);
  color: var(--fg);
  font-weight: 600;
  text-align: left;
  box-shadow:
    0 6px 16px rgb(35 48 43 / 0.14),
    inset 0 0 0 2px var(--soft);
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease;
}

.entry:hover {
  box-shadow:
    0 8px 20px rgb(35 48 43 / 0.18),
    inset 0 0 0 2px var(--accent);
}

.entry .label {
  flex: 1;
}

.badge {
  flex: none;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: #fff;
}

.badge svg {
  width: 24px;
  height: 24px;
}

.badge.levels {
  background: var(--hint);
}

.badge.settings {
  background: var(--muted);
}

/* Two players: the two characters, overlapping. */
.pair {
  flex: none;
  display: flex;
  width: 42px;
}

.pair svg {
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--panel);
}

.pair svg + svg {
  margin: 10px 0 0 -10px;
}

.chevron {
  flex: none;
  width: 20px;
  height: 20px;
  color: var(--faint);
}
</style>
