import { Browser } from '@capacitor/browser'
import { Share } from '@capacitor/share'
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { APP_NAME, getStoreLink } from '../config/links.ts'

const COPIED_MS = 2000

/** Sharing the game's store link and opening outside links. */
export function useShare() {
  const { t } = useI18n()
  /** True for a moment after the link was copied instead of shared (a browser without a share sheet). */
  const copied = ref(false)
  let timer = 0
  onBeforeUnmount(() => clearTimeout(timer))

  async function shareApp(text = t('share.text')): Promise<void> {
    const url = getStoreLink()
    if (!(await Share.canShare()).value) {
      try {
        await navigator.clipboard.writeText(url)
      } catch {
        return
      }
      copied.value = true
      clearTimeout(timer)
      timer = window.setTimeout(() => (copied.value = false), COPIED_MS)
      return
    }
    try {
      await Share.share({ title: APP_NAME, text, url, dialogTitle: t('share.dialogTitle') })
    } catch {
      // The share sheet was closed: nothing to report.
    }
  }

  /** Opens a page in the system browser; offline the browser shows its own page, so errors are ignored. */
  async function openLink(url: string): Promise<void> {
    try {
      await Browser.open({ url })
    } catch {
      // Nothing to show: the browser could not be opened.
    }
  }

  return { shareApp, openLink, copied }
}
