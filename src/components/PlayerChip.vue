<script setup lang="ts">
import type { MatchPlayer } from '../engine/match.ts'
import type { Avatar } from '../stores/duo.ts'
import PlayerAvatar from './PlayerAvatar.vue'

// A player in the match HUD: character, name, score; optionally their hint button.
defineProps<{
  player: MatchPlayer
  avatar: Avatar
  /** Blocked after a miss. */
  locked?: boolean
  /** Hot-seat: it is this player's turn. */
  active?: boolean
  /** Show the hint button (duel with hints). */
  hint?: boolean
  hintDisabled?: boolean
  /** Reduce motion: no shake and pulse. */
  still?: boolean
}>()
defineEmits<{ hint: [] }>()
</script>

<template>
  <div class="player" :class="{ locked, active, still }" :style="{ '--player': player.color }">
    <svg v-if="locked" class="lock" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" fill="none" stroke="currentColor" stroke-width="2.6" />
      <rect x="5" y="10" width="14" height="11" rx="2.5" fill="currentColor" />
    </svg>
    <PlayerAvatar v-else class="face" :avatar="avatar" :color="player.color" />
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
}

.player.active {
  background: var(--player);
  color: #fff;
}

/* Locked after a miss: a shake, then a pulsing padlock in place of the character. */
.player.locked {
  background: var(--danger-bg);
  color: var(--danger-fg);
  animation: shake 0.45s ease-in-out;
}

.lock {
  flex: none;
  width: 30px;
  height: 18px;
  animation: pulse 0.6s ease-in-out infinite alternate;
}

.player.still,
.player.still .lock {
  animation: none;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-5px);
  }
  40% {
    transform: translateX(5px);
  }
  60% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(3px);
  }
}

@keyframes pulse {
  to {
    transform: scale(1.25);
  }
}

.face {
  flex: none;
  width: 30px;
  height: 30px;
  margin-left: -6px;
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
