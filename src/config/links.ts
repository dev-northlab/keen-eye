import { Capacitor } from '@capacitor/core'
import { siFacebook, siTelegram, siVk, siWhatsapp, siX, type SimpleIcon } from 'simple-icons'

export const APP_NAME = 'Keen Eye'

/** Where players write to us (the "Contact us" dialog on the home screen). */
export const CONTACT_EMAIL = 'dev.northlab@gmail.com'

/** Store pages; `ios` stays null until the game is in the App Store. */
export const STORE_LINKS: { android: string; ios: string | null } = {
  android: 'https://play.google.com/store/apps/details?id=com.northlab.keeneye',
  ios: null,
}

/** A site to share the game on: its logo and the page that posts a link from the visitor's own account. */
export interface ShareTarget {
  name: string
  icon: Pick<SimpleIcon, 'path' | 'hex'>
  url: (link: string, text: string) => string
}

const q = encodeURIComponent

// simple-icons no longer ships the LinkedIn logo; this is a plain "in" mark.
const linkedin = {
  hex: '0A66C2',
  path: 'M3.5 9h3.6v11.5H3.5ZM5.3 3.1a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM9.5 9h3.4v1.6c.6-1.1 2-1.9 3.8-1.9 3.3 0 4.3 2 4.3 5.2v6.6h-3.6v-5.9c0-1.5-.3-2.8-2-2.8s-2.3 1.2-2.3 2.8v5.9H9.5Z',
}

export const SHARE_TARGETS: ShareTarget[] = [
  { name: 'Facebook', icon: siFacebook, url: (link) => `https://www.facebook.com/sharer/sharer.php?u=${q(link)}` },
  { name: 'X', icon: siX, url: (link, text) => `https://twitter.com/intent/tweet?text=${q(text)}&url=${q(link)}` },
  { name: 'LinkedIn', icon: linkedin, url: (link) => `https://www.linkedin.com/sharing/share-offsite/?url=${q(link)}` },
  { name: 'WhatsApp', icon: siWhatsapp, url: (link, text) => `https://wa.me/?text=${q(`${text} ${link}`)}` },
  { name: 'Telegram', icon: siTelegram, url: (link, text) => `https://t.me/share/url?url=${q(link)}&text=${q(text)}` },
  { name: 'VK', icon: siVk, url: (link, text) => `https://vk.com/share.php?url=${q(link)}&title=${q(text)}` },
]

/** The store page for this device: the App Store on iOS once the game is there, Google Play otherwise. */
export function getStoreLink(): string {
  return Capacitor.getPlatform() === 'ios' && STORE_LINKS.ios ? STORE_LINKS.ios : STORE_LINKS.android
}
