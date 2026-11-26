import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'
import { Directory, Filesystem } from '@capacitor/filesystem'
import { Share } from '@capacitor/share'
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { APP_NAME, getStoreLink } from '../config/links.ts'

const COPIED_MS = 2000
/** The picture sent with the link: level 1's two 3D pictures side by side, no text (`public/share.jpg`). */
const SHARE_PICTURE = 'share.jpg'

/**
 * The share picture as a file in the app's cache (the share sheet takes files only), or null if it could not be
 * written: then the link goes alone.
 */
async function sharePictureFile(): Promise<string | null> {
  if (!Capacitor.isNativePlatform()) return null
  try {
    const blob = await (await fetch(`${import.meta.env.BASE_URL}${SHARE_PICTURE}`)).blob()
    const data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result).split(',')[1])
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(blob)
    })
    const { uri } = await Filesystem.writeFile({ path: SHARE_PICTURE, data, directory: Directory.Cache })
    return uri
  } catch {
    return null
  }
}

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
    const picture = await sharePictureFile()
    try {
      // With a picture, messengers send it with the text and the link as its caption.
      await Share.share({
        title: APP_NAME,
        text,
        url,
        files: picture ? [picture] : undefined,
        dialogTitle: t('share.dialogTitle'),
      })
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
