<script setup lang="ts">
// Clues of a "detective" scene (docs/detective-mode.md): in the result dialog after the scene and,
// scene by scene, in the case's notebook (CaseView). `clues` are keys of detective.clueTexts.

defineProps<{ clues: string[]; title?: string }>()
</script>

<template>
  <div class="clue-list">
    <p v-if="title" class="title">{{ title }}</p>
    <ul>
      <li v-for="clue in clues" :key="clue">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="2.6" />
          <path d="M14.5 14.5L20 20" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
        {{ $t(`detective.clueTexts.${clue}`) }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.clue-list {
  padding: 10px 14px;
  border-radius: 14px;
  background: var(--soft-2);
  text-align: start;
}

.title {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--muted);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 6px;
}

li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 15px;
  line-height: 1.35;
}

svg {
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  color: #a8743f;
}
</style>
