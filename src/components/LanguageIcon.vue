<script setup lang="ts">
import type { Locale } from '../i18n/index.ts'
import { LANGUAGES } from '../i18n/languages.ts'

// Icon next to a language name: a globe for "system language" (`null`), the language's flag otherwise.
// Decorative: the name is always shown beside it.

defineProps<{ locale: Locale | null }>()
</script>

<template>
  <span v-if="locale === null" class="icon" aria-hidden="true">
    <svg class="globe" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8" />
      <path
        d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linejoin="round"
      />
    </svg>
  </span>
  <!-- Every flag is shown cropped to 3:2, whatever its own proportions. -->
  <span v-else class="icon flag" aria-hidden="true">
    <svg :viewBox="LANGUAGES[locale].flag.viewBox" preserveAspectRatio="xMidYMid slice" v-html="LANGUAGES[locale].flag.svg" />
  </span>
</template>

<style scoped>
.icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 24px;
  height: 16px;
}

.flag {
  overflow: hidden;
  border-radius: 3px;
  /* A thin edge so white stripes stay visible on white. */
  box-shadow: 0 0 0 1px rgb(35 48 43 / 0.15);
}

.flag svg {
  display: block;
  width: 100%;
  height: 100%;
}

.globe {
  width: 20px;
  height: 20px;
  color: var(--accent);
}
</style>
