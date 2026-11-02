<script setup lang="ts">
import { useId } from 'vue'
import type { Avatar } from '../stores/duo.ts'

// Flat cartoon kid (head and shoulders) in a circle; the shirt takes the player's color.
defineProps<{ avatar: Avatar; color: string }>()
const clip = useId()
</script>

<template>
  <svg class="avatar" viewBox="0 0 100 100" aria-hidden="true">
    <clipPath :id="clip"><circle cx="50" cy="50" r="50" /></clipPath>
    <circle class="bg" cx="50" cy="50" r="50" />
    <g :clip-path="`url(#${clip})`">
      <template v-if="avatar === 'boy'">
        <path d="M12 104c2-17 14-26 38-26s36 9 38 26Z" :fill="color" />
        <path d="M42 66h16v14q-8 6-16 0Z" fill="#c27b4a" />
        <path d="M38 79q12 9 24 0" fill="none" stroke="#000" stroke-opacity="0.2" stroke-width="3" stroke-linecap="round" />
        <circle cx="26" cy="52" r="6.5" fill="#d9935f" />
        <circle cx="74" cy="52" r="6.5" fill="#d9935f" />
        <circle cx="26" cy="52" r="3" fill="#c27b4a" />
        <circle cx="74" cy="52" r="3" fill="#c27b4a" />
        <ellipse cx="50" cy="51" rx="24" ry="25" fill="#d9935f" />
        <path d="M24 50C21 26 34 16 51 16c18 0 28 11 26 33-3-8-8-12-14-13-4 5-12 7-20 5-6 3-12 3-15 1-2 3-3 5-4 8Z" fill="#1f1d24" />
        <path d="M38 22q10-3 20 0M60 24q8 3 11 10" fill="none" stroke="#4a4652" stroke-width="2.4" stroke-linecap="round" />
        <path d="M34 43q6-4 11-1M55 42q5-3 11 1" fill="none" stroke="#5a3218" stroke-width="2.2" stroke-linecap="round" />
        <ellipse cx="41" cy="53" rx="6.4" ry="7.4" fill="#fff" />
        <ellipse cx="59" cy="53" rx="6.4" ry="7.4" fill="#fff" />
        <circle cx="42" cy="54" r="4.4" fill="#1b1b1f" />
        <circle cx="58" cy="54" r="4.4" fill="#1b1b1f" />
        <circle cx="43.4" cy="52.4" r="1.6" fill="#fff" />
        <circle cx="59.4" cy="52.4" r="1.6" fill="#fff" />
        <path d="M48 60q2 2 4 0" fill="none" stroke="#a8653a" stroke-width="1.8" stroke-linecap="round" />
        <ellipse cx="32" cy="63" rx="5" ry="3.4" fill="#e07b45" fill-opacity="0.55" />
        <ellipse cx="68" cy="63" rx="5" ry="3.4" fill="#e07b45" fill-opacity="0.55" />
        <path d="M42 65q8 2 16 0q-1 9-8 9t-8-9Z" fill="#6e1d22" />
        <path d="M45.5 70.5q4.5-3 9 0q-2 3-4.5 3t-4.5-3Z" fill="#e86a7d" />
      </template>
      <template v-else>
        <path d="M12 104c2-17 14-26 38-26s36 9 38 26Z" :fill="color" />
        <path d="M42 66h16v14q-8 6-16 0Z" fill="#e0a77c" />
        <path d="M38 79q12 9 24 0" fill="none" stroke="#fff" stroke-opacity="0.55" stroke-width="3.4" stroke-linecap="round" />
        <circle cx="62" cy="17" r="11" fill="#6b3420" />
        <path d="M55 9q7-5 14 0" fill="none" stroke="#8a4a2c" stroke-width="2.2" stroke-linecap="round" />
        <path d="M51 24q10 4 20-2" fill="none" stroke="#f5c518" stroke-width="4" stroke-linecap="round" />
        <path d="M22 66C17 40 28 22 50 22s33 18 28 44l-6 1c2-12 0-22-6-28-8 6-22 8-32 5-4 6-6 13-5 22Z" fill="#6b3420" />
        <circle cx="26" cy="54" r="6" fill="#f2c39b" />
        <circle cx="74" cy="54" r="6" fill="#f2c39b" />
        <ellipse cx="50" cy="53" rx="23" ry="24" fill="#f2c39b" />
        <path d="M26 50c0-16 10-24 24-24 13 0 23 7 24 22-5-6-10-9-16-10-9 6-21 8-32 6-1 2 0 4 0 6Z" fill="#6b3420" />
        <path d="M30 37q8-6 18-6" fill="none" stroke="#8a4a2c" stroke-width="2.2" stroke-linecap="round" />
        <path d="M35 46q5-3 10 0M55 46q5-3 10 0" fill="none" stroke="#6b3420" stroke-width="2" stroke-linecap="round" />
        <ellipse cx="41" cy="55" rx="6.2" ry="7.2" fill="#fff" />
        <ellipse cx="59" cy="55" rx="6.2" ry="7.2" fill="#fff" />
        <circle cx="41.6" cy="56" r="4.3" fill="#1b1b1f" />
        <circle cx="58.4" cy="56" r="4.3" fill="#1b1b1f" />
        <circle cx="43" cy="54.4" r="1.6" fill="#fff" />
        <circle cx="59.8" cy="54.4" r="1.6" fill="#fff" />
        <path d="M48 62q2 2 4 0" fill="none" stroke="#c98f66" stroke-width="1.8" stroke-linecap="round" />
        <ellipse cx="32" cy="65" rx="5" ry="3.4" fill="#d9906a" fill-opacity="0.55" />
        <ellipse cx="68" cy="65" rx="5" ry="3.4" fill="#d9906a" fill-opacity="0.55" />
        <path d="M43 67q7 2 14 0q-1 8-7 8t-7-8Z" fill="#7a1f24" />
        <path d="M46 72q4-2.6 8 0q-2 2.6-4 2.6t-4-2.6Z" fill="#ef7a88" />
      </template>
    </g>
  </svg>
</template>

<style scoped>
.avatar {
  display: block;
}

.bg {
  fill: var(--soft-2);
}
</style>
