<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ModalDialog from '../components/ModalDialog.vue'
import ModeSwitch from '../components/ModeSwitch.vue'
import PlayerAvatar from '../components/PlayerAvatar.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import SeasonSwitch from '../components/SeasonSwitch.vue'
import ThemeSwitch from '../components/ThemeSwitch.vue'
import { APP_NAME, CONTACT_EMAIL } from '../config/links.ts'
import { pushBackHandler } from '../services/backButton.ts'
import { PLAYER_COLORS } from '../stores/duo.ts'
import { useProgressStore } from '../stores/progress.ts'

const router = useRouter()
const progress = useProgressStore()

/** The open info dialog, if any. */
const dialog = ref<'privacy' | 'contact' | null>(null)
// Android back closes the dialog instead of leaving the app.
let removeBack = () => {}
watch(dialog, (open) => {
  removeBack()
  if (open) removeBack = pushBackHandler(() => (dialog.value = null))
})

const [emailUser, emailDomain] = CONTACT_EMAIL.split('@')
const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(APP_NAME)}`
/** True for a moment after the address was copied (for players without a mail app). */
const emailCopied = ref(false)
let copiedTimer = 0
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(CONTACT_EMAIL)
  } catch {
    return
  }
  emailCopied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = window.setTimeout(() => (emailCopied.value = false), 2000)
}
onBeforeUnmount(() => {
  removeBack()
  clearTimeout(copiedTimer)
})

function play() {
  const id = progress.continueLevelId
  router.push(id === undefined ? { name: 'worlds' } : { name: 'level', params: { id } })
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
      <svg class="chevron flip-rtl" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>
    <button class="entry" @click="router.push({ name: 'levels' })">
      <span class="badge levels" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /><path d="M9 4v14M15 6v14" stroke="currentColor" stroke-width="2" /></svg>
      </span>
      <span class="label">{{ $t('home.levels') }}</span>
      <svg class="chevron flip-rtl" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>
    <button class="entry" @click="router.push({ name: 'settings' })">
      <span class="badge settings" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M10.3 2.5h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9-2.6-.5v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" /><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="2" /></svg>
      </span>
      <span class="label">{{ $t('home.settings') }}</span>
      <svg class="chevron flip-rtl" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>

    <nav class="info-links">
      <button class="info-link" @click="router.push({ name: 'about' })">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M12 11v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
          <circle cx="12" cy="7.6" r="1.3" fill="currentColor" />
        </svg>
        {{ $t('info.about') }}
      </button>
      <button class="info-link" @click="dialog = 'privacy'">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l7 3v5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V6l7-3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
          <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ $t('info.privacy') }}
      </button>
      <button class="info-link" @click="dialog = 'contact'">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5.5" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M4 7.5l8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ $t('info.contact') }}
      </button>
    </nav>

    <ModalDialog v-if="dialog === 'privacy'" :title="$t('info.privacy')">
      <template #icon>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l7 3v5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V6l7-3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
          <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </template>
      <div class="info-body">
        <ul class="points">
          <li>
            <span class="point-icon">
              <!-- A cloud crossed out: nothing leaves the device. -->
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.5 18.5h9.8a3.7 3.7 0 0 0 1-7.3 6 6 0 0 0-9.9-3.5M5.6 9.6A4.5 4.5 0 0 0 7.5 18.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 4l16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            {{ $t('info.privacyPoints.noData') }}
          </li>
          <li>
            <span class="point-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" fill="none" stroke="currentColor" stroke-width="2" />
                <path d="M10.5 18h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            {{ $t('info.privacyPoints.onDevice') }}
          </li>
          <li>
            <span class="point-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2" />
                <path d="M4 4l16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            {{ $t('info.privacyPoints.noAds') }}
          </li>
        </ul>
        <button @click="dialog = null">{{ $t('common.close') }}</button>
      </div>
    </ModalDialog>

    <ModalDialog v-if="dialog === 'contact'" :title="$t('info.contact')">
      <template #icon>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5.5" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M4 7.5l8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </template>
      <div class="info-body">
        <p>{{ $t('info.contactText') }}</p>
        <div class="email-card">
          <svg class="at" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="2" />
            <path d="M15.6 12v1.4a2.5 2.5 0 0 0 5 0V12a8.6 8.6 0 1 0-3.4 6.9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <!-- A narrow screen wraps the address after the @, not inside a word. -->
          <span class="address">{{ emailUser }}@<wbr />{{ emailDomain }}</span>
          <button
            class="copy"
            :class="{ done: emailCopied }"
            :aria-label="emailCopied ? $t('info.emailCopied') : $t('info.copyEmail')"
            :title="emailCopied ? $t('info.emailCopied') : $t('info.copyEmail')"
            @click="copyEmail"
          >
            <svg v-if="emailCopied" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true">
              <rect x="8.5" y="8.5" width="11" height="11" rx="2.2" fill="none" stroke="currentColor" stroke-width="2" />
              <path d="M15.5 5.5v-.3a1.7 1.7 0 0 0-1.7-1.7H6.2a1.7 1.7 0 0 0-1.7 1.7v7.6a1.7 1.7 0 0 0 1.7 1.7h.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <p class="copied" :class="{ shown: emailCopied }" aria-live="polite">
          {{ emailCopied ? $t('info.emailCopied') : '' }}
        </p>
        <a class="write" :href="mailto">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 3.5L10.5 13.5M21 3.5l-6.5 17-4-7-7-4 17.5-6Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ $t('info.writeUs') }}
        </a>
        <button class="secondary" @click="dialog = null">{{ $t('common.close') }}</button>
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

.email-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 6px 6px 10px;
  border-radius: 14px;
  background: var(--soft-2);
  border: 1px solid var(--soft);
  text-align: start;
}

.email-card .at {
  flex: none;
  width: 20px;
  height: 20px;
  color: var(--accent);
}

.email-card .address {
  flex: 1;
  min-width: 0;
  font-size: 16px;
  font-weight: 700;
  overflow-wrap: anywhere;
  user-select: text;
}

.info-body .copy {
  flex: none;
  width: 44px;
  height: 44px;
  margin: 0;
  padding: 0;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: var(--panel);
  color: var(--accent);
  box-shadow: 0 1px 3px rgb(35 48 43 / 0.12);
  transition: background 0.2s, color 0.2s;
}

.info-body .copy.done {
  background: var(--accent);
  color: #fff;
}

.copy svg {
  width: 22px;
  height: 22px;
}

.info-body .copied {
  min-height: 1.2em;
  margin: -8px 0 -4px;
  font-size: 14px;
  color: var(--accent);
  opacity: 0;
  transition: opacity 0.2s;
}

.info-body .copied.shown {
  opacity: 1;
}

.write {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 4px;
  padding: 12px 20px;
  border-radius: 12px;
  background: var(--accent);
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
}

.write svg {
  width: 22px;
  height: 22px;
}

.info-body button {
  width: 100%;
  margin-top: 4px;
}

button {
  font-size: 18px;
}

.play {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px 14px 14px;
  border-radius: 20px;
  font-size: 22px;
  font-weight: 700;
  text-align: start;
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
  margin-inline-start: 3px;
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
  text-align: start;
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
