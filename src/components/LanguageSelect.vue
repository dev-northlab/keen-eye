<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { LOCALES, type Locale } from '../i18n/index.ts'
import { LANGUAGES } from '../i18n/languages.ts'
import LanguageIcon from './LanguageIcon.vue'
import { pushBackHandler } from '../services/backButton.ts'
import { useSettingsStore } from '../stores/settings.ts'

// Language picker: a button showing the current choice that opens a scrollable list
// (a native <select> looks out of place and does not scale to many languages nicely).
// Closes on choice, outside tap, Escape and the Android back button.

const props = defineProps<{ labelledby?: string }>()
const settings = useSettingsStore()

/** `null` = follow the system language. */
const OPTIONS: (Locale | null)[] = [null, ...LOCALES]

const open = ref(false)
const root = ref<HTMLElement>()
const trigger = ref<HTMLButtonElement>()
const list = ref<HTMLUListElement>()

const options = () => [...(list.value?.querySelectorAll<HTMLElement>('[role="option"]') ?? [])]

function close(refocus = false) {
  open.value = false
  if (refocus) trigger.value?.focus()
}

function choose(locale: Locale | null) {
  settings.locale = locale
  close(true)
}

function onOutside(e: PointerEvent) {
  if (!root.value?.contains(e.target as Node)) close()
}

let removeBack = () => {}
watch(open, async (isOpen) => {
  removeBack()
  if (!isOpen) {
    document.removeEventListener('pointerdown', onOutside)
    return
  }
  removeBack = pushBackHandler(() => close(true))
  document.addEventListener('pointerdown', onOutside)
  await nextTick()
  const selected = options().find((o) => o.getAttribute('aria-selected') === 'true')
  selected?.scrollIntoView({ block: 'nearest' })
  selected?.focus()
})

onBeforeUnmount(() => {
  removeBack()
  document.removeEventListener('pointerdown', onOutside)
})

function onListKey(e: KeyboardEvent) {
  const items = options()
  const i = items.indexOf(document.activeElement as HTMLElement)
  const move: Record<string, number | undefined> = {
    ArrowDown: Math.min(i + 1, items.length - 1),
    ArrowUp: Math.max(i - 1, 0),
    Home: 0,
    End: items.length - 1,
  }
  const target = move[e.key]
  if (target !== undefined) {
    e.preventDefault()
    items[target]?.focus()
  } else if (e.key === 'Escape') {
    e.preventDefault()
    close(true)
  } else if (e.key === 'Tab') {
    close()
  }
}

function onTriggerKey(e: KeyboardEvent) {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    open.value = true
  }
}

const name = (l: Locale | null) => (l === null ? null : LANGUAGES[l].name)
</script>

<template>
  <div ref="root" class="language-select" :class="{ open }">
    <button
      ref="trigger"
      class="trigger"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-labelledby="props.labelledby"
      @click="open = !open"
      @keydown="onTriggerKey"
    >
      <LanguageIcon :locale="settings.locale" />
      <span class="value" :lang="settings.locale ?? undefined">
        {{ name(settings.locale) ?? $t('settings.systemLanguage') }}
      </span>
      <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <Transition name="pop">
      <ul v-if="open" ref="list" class="list" role="listbox" :aria-labelledby="props.labelledby" @keydown="onListKey">
        <li
          v-for="l in OPTIONS"
          :key="l ?? 'system'"
          role="option"
          tabindex="-1"
          :aria-selected="settings.locale === l"
          :lang="l ?? undefined"
          @click="choose(l)"
          @keydown.enter.prevent="choose(l)"
          @keydown.space.prevent="choose(l)"
        >
          <LanguageIcon :locale="l" />
          <span class="option-name">{{ name(l) ?? $t('settings.systemLanguage') }}</span>
          <svg v-if="settings.locale === l" class="check" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.language-select {
  position: relative;
  /* Above the settings rows that follow, so the open list covers them. */
  z-index: 5;
  /* May shrink in the settings row; a long name is cut with an ellipsis. */
  min-width: 0;
}

.trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  padding: 8px 10px 8px 12px;
  border-radius: 12px;
  background: var(--soft-2);
  color: var(--fg);
  box-shadow: inset 0 0 0 2px var(--soft);
  transition: box-shadow 0.15s ease;
}

.trigger:hover,
.open .trigger {
  box-shadow: inset 0 0 0 2px var(--accent);
}

.value {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chevron {
  flex: none;
  width: 18px;
  height: 18px;
  color: var(--muted);
  transition: transform 0.2s ease;
}

.open .chevron {
  transform: rotate(180deg);
}

.list {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: max(100%, 200px);
  /* Many languages: the list scrolls instead of growing past the screen. */
  max-height: min(320px, 50vh);
  overflow-y: auto;
  margin: 0;
  padding: 6px;
  list-style: none;
  background: var(--panel);
  border-radius: 14px;
  box-shadow:
    0 10px 28px rgb(35 48 43 / 0.22),
    0 0 0 1px rgb(35 48 43 / 0.06);
  transform-origin: top right;
}

li {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 10px 12px;
  border-radius: 10px;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
}

li:hover,
li:focus-visible {
  background: var(--soft-2);
}

.option-name {
  flex: 1;
}

li[aria-selected='true'] {
  color: var(--accent);
  font-weight: 600;
}

.check {
  flex: none;
  width: 20px;
  height: 20px;
}

.pop-enter-active,
.pop-leave-active {
  transition:
    opacity 0.12s ease,
    transform 0.12s ease;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(-4px);
}

</style>
