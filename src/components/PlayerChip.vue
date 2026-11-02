<script setup lang="ts">
import type { MatchPlayer } from '../engine/match.ts'

// A player in the match HUD: color, name, score; optionally their hint button.
defineProps<{
  player: MatchPlayer
  /** Blocked after a miss. */
  locked?: boolean
  /** Hot-seat: it is this player's turn. */
  active?: boolean
  /** Show the hint button (duel with hints). */
  hint?: boolean
  hintDisabled?: boolean
}>()
defineEmits<{ hint: [] }>()
</script>

<template>
  <div class="player" :class="{ locked, active }" :style="{ '--player': player.color }">
    <span class="dot" aria-hidden="true" />
    <span class="name">{{ player.name }}</span>
    <span class="score" :aria-label="$t('duo.score', { name: player.name, n: player.score })">{{ player.score }}</span>
    <button v-if="hint" class="hint secondary" :disabled="hintDisabled" :aria-label="$t('level.hint')" @click="$emit('hint')">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      {{ player.hints }}
    </button>
  </div>
</template>

<style scoped>
.player {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 4px 6px 4px 10px;
  border-radius: 999px;
  background: var(--soft-2);
  box-shadow: inset 0 0 0 2px var(--player);
  font-weight: 600;
  transition: opacity 0.2s;
}

.player.active {
  background: var(--player);
  color: #fff;
}

.player.locked {
  opacity: 0.5;
}

.dot {
  flex: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--player);
  box-shadow: 0 0 0 2px var(--panel);
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.score {
  min-width: 1.6em;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--panel);
  color: var(--fg);
  font-size: 18px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.hint {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 14px;
}

.hint svg {
  width: 18px;
  height: 18px;
}

.hint:disabled {
  opacity: 0.45;
  cursor: default;
}
</style>
