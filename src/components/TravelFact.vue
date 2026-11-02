<script setup lang="ts">
import type { Level } from '../engine/types.ts'
import { FLAGS } from '../levels/travel/flags.ts'

// "Did you know?" of a "travel" place (docs/world-travel-mode.md): flag, place, country and its fact.
// Shown in the result dialog after the level (with `newStamp` on the first visit) and in the passport.

defineProps<{ level: Level; newStamp?: boolean }>()
</script>

<template>
  <div class="travel-fact">
    <p class="place">
      <svg class="flag" viewBox="0 0 30 20" aria-hidden="true" v-html="FLAGS[level.travel!.country]" />
      <span>
        <strong>{{ $t(`levelTitles.${level.title}`) }}</strong>
        <span class="country">{{ $t(`worldTravel.countries.${level.travel!.country}`) }}</span>
      </span>
    </p>
    <p class="label">{{ $t('worldTravel.didYouKnow') }}</p>
    <p class="text">{{ $t(`worldTravel.facts.${level.title}`) }}</p>
    <p v-if="newStamp" class="stamp">{{ $t('worldTravel.newStamp') }}</p>
  </div>
</template>

<style scoped>
.travel-fact {
  margin: 4px 0 16px;
  padding: 12px 14px;
  border-radius: 14px;
  background: var(--soft-2);
  text-align: left;
}

p {
  margin: 0;
}

.place {
  display: flex;
  align-items: center;
  gap: 10px;
}

.place > span {
  display: grid;
}

.flag {
  flex: none;
  width: 36px;
  height: 24px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px var(--line);
}

strong {
  font-size: 17px;
}

.country {
  font-size: 13px;
  color: var(--muted);
}

.label {
  margin-top: 10px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #1f9bb5;
}

.text {
  margin-top: 2px;
  font-size: 15px;
  line-height: 1.4;
}

.stamp {
  width: fit-content;
  margin-top: 10px;
  padding: 3px 12px;
  border: 2px dashed #e5484d;
  border-radius: 999px;
  color: #e5484d;
  font-size: 13px;
  font-weight: 700;
  rotate: -2deg;
}
</style>
