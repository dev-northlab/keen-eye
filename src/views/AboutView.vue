<script setup lang="ts">
import BackButton from '../components/BackButton.vue'
import FeaturesCard from '../components/FeaturesCard.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import ShareButton from '../components/ShareButton.vue'
import ShareLinks from '../components/ShareLinks.vue'
import { useShare } from '../composables/useShare.ts'
import { APP_NAME, getStoreLink } from '../config/links.ts'

const { openLink } = useShare()
const version = __APP_VERSION__
const icon = `${import.meta.env.BASE_URL}favicon.svg`
</script>

<template>
  <div class="screen">
    <ScreenBackdrop theme="meadow" />
    <main>
      <section class="card title">
        <img :src="icon" alt="" width="88" height="88" />
        <h1>{{ APP_NAME }}</h1>
        <p>{{ $t('info.aboutText') }}</p>
        <p class="muted">{{ $t('info.version', { v: version }) }}</p>
      </section>

      <FeaturesCard />

      <ShareButton class="share">{{ $t('about.shareGame') }}</ShareButton>

      <section class="card">
        <h2>{{ $t('about.social') }}</h2>
        <ShareLinks />
      </section>

      <button class="rate" @click="openLink(getStoreLink())">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17l-5.7 3.1 1.2-6.3-4.6-4.4 6.3-.8Z" fill="#ffc933" stroke="#e8a400" stroke-width="1.4" stroke-linejoin="round" /></svg>
        {{ $t('about.rate') }}
      </button>
    </main>
    <BackButton />
  </div>
</template>

<style scoped>
.screen {
  /* Own stacking context: the backdrop (z-index -1) stays behind the content. */
  position: relative;
  isolation: isolate;
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  overflow-y: auto;
  /* A centered column on wide screens; the padding (not a margin) keeps the scrollbar at the window edge. */
  padding: 16px max(16px, (100% - var(--menu-width)) / 2) 24px;
  display: grid;
  grid-auto-rows: max-content;
  gap: 12px;
  justify-items: stretch;
}

.card {
  background: var(--panel);
  border-radius: 20px;
  padding: 16px 18px;
  text-align: center;
  box-shadow: 0 6px 16px rgb(35 48 43 / 0.12);
}

.card h2 {
  margin: 0 0 14px;
  font-size: 18px;
}

.title {
  display: grid;
  justify-items: center;
  gap: 6px;
}

.title img {
  border-radius: 22px;
  box-shadow: 0 6px 14px rgb(35 48 43 / 0.2);
}

.title h1 {
  margin: 6px 0 0;
  font-size: 32px;
}

.title p {
  margin: 0;
  line-height: 1.45;
}

.title .muted {
  color: var(--muted);
  font-size: 14px;
}

.share {
  font-size: 18px;
}

.rate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 700;
  box-shadow:
    0 8px 18px rgb(35 48 43 / 0.2),
    inset 0 -4px 0 rgb(0 0 0 / 0.12);
  transition: transform 0.12s ease;
}

.rate:active {
  transform: scale(0.97);
}

.rate svg {
  width: 24px;
  height: 24px;
}
</style>
