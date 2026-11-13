<script setup lang="ts">
// Coloured, glossy icons of the home screen's round buttons (settings, the info pages) and of the exit dialog's exit,
// in the style of the HUD's game icons: a gradient body with a darker rim, a white shine at the top left and a soft
// shadow.
defineProps<{ name: 'settings' | 'about' | 'privacy' | 'contact' | 'exit' }>()
</script>

<template>
  <svg class="menu-icon" viewBox="0 0 48 48" aria-hidden="true">
    <defs>
      <linearGradient :id="`ke-menu-${name}`" x1="0" y1="0" x2="0" y2="1">
        <template v-if="name === 'settings'">
          <stop offset="0" stop-color="#c9adff" />
          <stop offset="1" stop-color="#7448e0" />
        </template>
        <template v-else-if="name === 'about'">
          <stop offset="0" stop-color="#6cc8ff" />
          <stop offset="1" stop-color="#1f74d6" />
        </template>
        <template v-else-if="name === 'exit'">
          <stop offset="0" stop-color="#ff8f8a" />
          <stop offset="1" stop-color="#d9342b" />
        </template>
        <template v-else-if="name === 'privacy'">
          <stop offset="0" stop-color="#6fe39b" />
          <stop offset="1" stop-color="#1c9a52" />
        </template>
        <template v-else>
          <stop offset="0" stop-color="#ffd970" />
          <stop offset="1" stop-color="#f29b14" />
        </template>
      </linearGradient>
    </defs>

    <!-- Settings: a violet gear with a hub. -->
    <g v-if="name === 'settings'">
      <path
        d="M38.5 18.5L43.6 20L43.6 28L38.5 29.5L38.1 30.4L40.7 35.1L35.1 40.7L30.4 38.1L29.5 38.5L28 43.6L20 43.6L18.5 38.5L17.6 38.1L12.9 40.7L7.3 35.1L9.9 30.4L9.5 29.5L4.4 28L4.4 20L9.5 18.5L9.9 17.6L7.3 12.9L12.9 7.3L17.6 9.9L18.5 9.5L20 4.4L28 4.4L29.5 9.5L30.4 9.9L35.1 7.3L40.7 12.9L38.1 17.6Z"
        :fill="`url(#ke-menu-${name})`"
        stroke="#5532b5"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <circle cx="24" cy="24" r="7.5" fill="#f4efff" stroke="#5532b5" stroke-width="1.6" />
      <circle cx="24" cy="24" r="3.2" fill="#7448e0" />
      <ellipse cx="15" cy="13.5" rx="4.5" ry="2.2" fill="#fff" fill-opacity="0.55" transform="rotate(-40 15 13.5)" />
    </g>

    <!-- About: a blue ball with a white "i". -->
    <g v-else-if="name === 'about'">
      <circle cx="24" cy="24" r="19" :fill="`url(#ke-menu-${name})`" stroke="#1862b8" stroke-width="1.6" />
      <circle cx="24" cy="14.5" r="3.2" fill="#fff" />
      <rect x="20.8" y="20.5" width="6.4" height="15" rx="3.2" fill="#fff" />
      <ellipse cx="14.5" cy="13" rx="5" ry="2.4" fill="#fff" fill-opacity="0.5" transform="rotate(-40 14.5 13)" />
    </g>

    <!-- Privacy: a green shield with a white tick. -->
    <g v-else-if="name === 'privacy'">
      <path
        d="M24 4.5l16 6v11.5c0 10.4-6.8 18.4-16 21.5C14.8 40.4 8 32.4 8 22V10.5Z"
        :fill="`url(#ke-menu-${name})`"
        stroke="#16804a"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <path d="M16.5 23.5l5.2 5.2 10-10.2" fill="none" stroke="#fff" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round" />
      <ellipse cx="15.5" cy="13.5" rx="4" ry="2" fill="#fff" fill-opacity="0.5" transform="rotate(-30 15.5 13.5)" />
    </g>

    <!-- Exit: a red ball with a white power sign (no direction, so the same right to left). -->
    <g v-else-if="name === 'exit'">
      <circle cx="24" cy="24" r="19" :fill="`url(#ke-menu-${name})`" stroke="#b3241d" stroke-width="1.6" />
      <path d="M17.5 16.5a10 10 0 1 0 13 0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" />
      <path d="M24 12v11" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" />
      <ellipse cx="14.5" cy="13" rx="5" ry="2.4" fill="#fff" fill-opacity="0.5" transform="rotate(-40 14.5 13)" />
    </g>

    <!-- Contact: a yellow envelope. -->
    <g v-else>
      <rect x="4.5" y="10" width="39" height="28" rx="5" :fill="`url(#ke-menu-${name})`" stroke="#cf7d0c" stroke-width="1.6" />
      <path d="M6.5 13.5L24 26.5L41.5 13.5" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M7 35l11-10M41 35L30 25" fill="none" stroke="#cf7d0c" stroke-width="1.8" stroke-linecap="round" stroke-opacity="0.7" />
      <ellipse cx="12" cy="14.5" rx="3.6" ry="1.6" fill="#fff" fill-opacity="0.55" transform="rotate(-20 12 14.5)" />
    </g>
  </svg>
</template>

<style scoped>
.menu-icon {
  display: block;
  width: 34px;
  height: 34px;
  filter: drop-shadow(0 2px 1.5px rgb(0 0 0 / 0.22));
}
</style>
