<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SHARE_TARGETS, getStoreLink } from '../config/links.ts'
import { useShare } from '../composables/useShare.ts'

// Round brand buttons with a caption: each opens the site's share page with the game's store link,
// posted from the player's own account. Logos are inline SVG paths (no network).
const props = defineProps<{ text?: string }>()
const { t } = useI18n()
const { openLink } = useShare()

const share = (target: (typeof SHARE_TARGETS)[number]) =>
  openLink(target.url(getStoreLink(), props.text ?? t('share.text')))
</script>

<template>
  <ul class="share-links">
    <li v-for="target in SHARE_TARGETS" :key="target.name">
      <button
        :aria-label="$t('share.on', { name: target.name })"
        :style="{ background: `#${target.icon.hex}` }"
        @click="share(target)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="target.icon.path" fill="#fff" /></svg>
      </button>
      <span aria-hidden="true">{{ target.name }}</span>
    </li>
  </ul>
</template>

<style scoped>
.share-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  justify-items: center;
  gap: 6px;
}

button {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  padding: 0;
  border-radius: 50%;
  box-shadow:
    0 4px 10px rgb(35 48 43 / 0.2),
    inset 0 -3px 0 rgb(0 0 0 / 0.15),
    0 0 0 3px var(--panel);
  transition: transform 0.12s ease;
}

button:active {
  transform: scale(0.92);
}

svg {
  width: 28px;
  height: 28px;
}

span {
  font-size: 13px;
  color: var(--muted);
}
</style>
