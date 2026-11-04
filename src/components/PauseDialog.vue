<script setup lang="ts">
import ModalDialog from './ModalDialog.vue'

defineEmits<{ resume: []; restart: []; levels: []; settings: []; exit: [] }>()
</script>

<template>
  <ModalDialog :title="$t('pause.title')">
    <!-- Each action with a round icon badge, like the menu entries of the home screen. -->
    <div class="actions">
      <button class="action" @click="$emit('resume')">
        <span class="badge resume" aria-hidden="true">
          <svg class="flip-rtl" viewBox="0 0 24 24"><path d="M9 6.5v11l9-5.5Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>
        </span>
        <span class="label">{{ $t('pause.resume') }}</span>
      </button>
      <button class="action secondary" @click="$emit('restart')">
        <span class="badge restart" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 3.5v4h4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </span>
        <span class="label">{{ $t('pause.restart') }}</span>
      </button>
      <button class="action secondary" @click="$emit('levels')">
        <span class="badge levels" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /><path d="M9 4v14M15 6v14" stroke="currentColor" stroke-width="2" /></svg>
        </span>
        <span class="label">{{ $t('home.levels') }}</span>
      </button>
      <button class="action secondary" @click="$emit('settings')">
        <span class="badge settings" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M10.3 2.5h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9-2.6-.5v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" /><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="2" /></svg>
        </span>
        <span class="label">{{ $t('settings.title') }}</span>
      </button>
      <button class="action secondary" @click="$emit('exit')">
        <span class="badge exit" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M4 11 12 4l8 7M6.5 9v10.5h4V14h3v5.5h4V9" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </span>
        <span class="label">{{ $t('pause.exit') }}</span>
      </button>
    </div>
  </ModalDialog>
</template>

<style scoped>
.actions {
  display: grid;
  gap: 8px;
}

.action {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 56px;
  padding: 7px 16px 7px 8px;
  border-radius: 16px;
  font-weight: 600;
  text-align: start;
  transition: transform 0.1s;
}

.action:active {
  transform: scale(0.97);
}

.label {
  flex: 1;
}

.badge {
  flex: none;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
}

.badge svg {
  width: 22px;
  height: 22px;
}

.badge.resume {
  background: color-mix(in srgb, #fff 24%, transparent);
}

.badge.restart {
  background: var(--mode-calm);
}

.badge.levels {
  background: var(--hint);
}

.badge.settings {
  background: var(--muted);
}

.badge.exit {
  background: var(--mode-hard);
}
</style>
