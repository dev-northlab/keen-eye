<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { winnerOf, type MatchState } from '../engine/match.ts'
import ModalDialog from './ModalDialog.vue'

const props = defineProps<{ state: MatchState; time: string }>()
defineEmits<{ rematch: []; other: []; menu: [] }>()
const { t } = useI18n()

const winner = computed(() => winnerOf(props.state))
const allFound = computed(() => props.state.found.length === props.state.total)

const title = computed(() => {
  if (props.state.mode === 'coop') return allFound.value ? t('duo.coopDone') : t('duo.timeUp')
  return winner.value ? t('duo.winner', { name: props.state.players[winner.value - 1].name }) : t('duo.draw')
})
</script>

<template>
  <ModalDialog :title="title">
    <p v-if="state.mode === 'coop'">{{ $t('duo.together', { found: state.found.length, total: state.total }) }} · {{ $t('level.time', { t: time }) }}</p>
    <ul class="scores">
      <li v-for="p in state.players" :key="p.id" :class="{ won: winner === p.id }" :style="{ '--player': p.color }">
        <span class="dot" aria-hidden="true" />
        <span class="name">{{ p.name }}</span>
        <span class="score">{{ p.score }}</span>
      </li>
    </ul>
    <div class="actions">
      <button @click="$emit('rematch')">{{ $t('duo.rematch') }}</button>
      <button class="secondary" @click="$emit('other')">{{ $t('duo.otherLevel') }}</button>
      <button class="secondary" @click="$emit('menu')">{{ $t('level.menu') }}</button>
    </div>
  </ModalDialog>
</template>

<style scoped>
p {
  margin: 0 0 12px;
}

.scores {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: grid;
  gap: 8px;
}

.scores li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 14px;
  background: var(--soft-2);
  font-weight: 600;
}

.scores li.won {
  box-shadow: inset 0 0 0 3px var(--player);
}

.dot {
  flex: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--player);
}

.name {
  flex: 1;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.score {
  font-size: 22px;
  font-variant-numeric: tabular-nums;
}

.actions {
  display: grid;
  gap: 8px;
}
</style>
