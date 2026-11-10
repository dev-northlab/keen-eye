<script setup lang="ts">
/**
 * A game mode's banner (LevelMapView) or a "tiny boy" level's (TinyBoyView): a coloured gradient with a picture at
 * its end side (public/banners/), faded into the colour under the text. The parent sets the colours with
 * `--banner-from`, `--banner-mid`, `--banner-to`, `--banner-shadow` and `--banner-icon-bg` (sky blue by default).
 * Slots: `icon` fills the square at the start (an inline SVG, an <img> or a number), the default one the line
 * under the name, `end` sits at the end inside the button (the level ids, room for a key badge laid over it).
 * The picture is mirrored right to left, so what it shows on its right stays at the outer edge.
 */
defineProps<{ name: string; photo?: string; tag?: string; disabled?: boolean }>()
</script>

<template>
  <button class="banner" type="button" :disabled="disabled">
    <img v-if="photo" class="photo flip-rtl" :src="photo" alt="" />
    <span class="icon"><slot name="icon" /></span>
    <span class="text">
      <span v-if="tag" class="tag">{{ tag }}</span>
      <span class="name">{{ name }}</span>
      <span class="sub"><slot /></span>
    </span>
    <slot name="end" />
  </button>
</template>

<style scoped>
.banner {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 112px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 16px;
  text-align: start;
  border-radius: 20px;
  background: linear-gradient(
    120deg,
    var(--banner-from, #5aa9ff),
    var(--banner-mid, #3a86ff) 60%,
    var(--banner-to, #2563eb)
  );
  color: #fff;
  box-shadow: 0 8px 18px -8px var(--banner-shadow, rgb(30 80 200 / 0.6));
}

.banner:disabled {
  cursor: default;
}

.photo {
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  height: 100%;
  /* Full height at the end side; the picture's subject stands in its last third, so a narrow banner cuts its start. */
  width: auto;
  max-width: none;
  mask-image: linear-gradient(to right, transparent 12%, #000 62%);
  pointer-events: none;
}

.icon {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 16px;
  border: 3px solid rgb(255 255 255 / 0.9);
  background: var(--banner-icon-bg, #e3edff);
  color: var(--banner-to, #2563eb);
  font-size: 26px;
  font-weight: 700;
}

.icon :slotted(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.icon :slotted(svg) {
  width: 100%;
  height: 100%;
  padding: 3px;
}

.text {
  position: relative;
  flex: 1;
  display: grid;
  gap: 2px;
  min-width: 0;
}

.tag {
  justify-self: start;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  background: rgb(255 255 255 / 0.25);
}

.name {
  font-size: 22px;
  font-weight: 700;
  text-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
}

.sub {
  font-size: 14px;
  opacity: 0.95;
  text-shadow: 0 1px 3px rgb(0 0 0 / 0.45);
}
</style>
