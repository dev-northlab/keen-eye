import { onMounted } from 'vue'
import { preloadPictures } from '../engine/render.ts'
import type { Level } from '../engine/types.ts'
import { styledLevel } from '../levels/picture-style.ts'
import { useProgressStore } from '../stores/progress.ts'
import { useSettingsStore } from '../stores/settings.ts'

/**
 * Readies the pictures of the levels a list screen leads to (`preloadPictures`, engine/render.ts), in the picture
 * style the player picked: the likely one — the first playable level not won yet — as the screen opens, and any
 * playable one as a finger touches its tile (returned, for `pointerdown`), so the level opens with its pictures
 * decoded. One level at a time: a whole chapter's decoded pictures (~20 MB a level) would not fit a phone's memory.
 */
export function usePicturePreload(levels: () => Level[]) {
  const progress = useProgressStore()
  const settings = useSettingsStore()
  const ready = (level: Level) => {
    if (progress.isUnlocked(level.id)) preloadPictures(styledLevel(level, settings.pictureStyle))
  }
  onMounted(() => {
    const likely = levels().find((l) => progress.isUnlocked(l.id) && !progress.isCompleted(l.id))
    if (likely) ready(likely)
  })
  return ready
}
