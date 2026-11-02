// Portraits of the "detective" suspects: markup inside a 64×64 viewBox, a colored disc behind each face.

const disc = (color: string) => `<circle cx="32" cy="32" r="32" fill="${color}"/>`
const eyes = (y: number, dx = 8, color = '#2b2b38') => `<circle cx="${32 - dx}" cy="${y}" r="3" fill="${color}"/><circle cx="${32 + dx}" cy="${y}" r="3" fill="${color}"/>`
const smile = (y: number) => `<path d="M26 ${y}q6 5 12 0" stroke="#7a3b2a" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
/** Round human face. */
const face = (skin: string) => `<circle cx="32" cy="36" r="17" fill="${skin}"/><circle cx="15" cy="37" r="4" fill="${skin}"/><circle cx="49" cy="37" r="4" fill="${skin}"/>`
const shoulders = (color: string) => `<path d="M10 64Q12 50 32 50Q52 50 54 64Z" fill="${color}"/>`

export const SUSPECT_ART: Record<string, string> = {
  cat:
    disc('#ffe0b2') +
    `<path d="M14 30L16 8L30 20ZM50 30L48 8L34 20Z" fill="#f2994a"/><circle cx="32" cy="36" r="20" fill="#f2994a"/>` +
    `<path d="M20 26l6 4M44 26l-6 4" stroke="#d9772a" stroke-width="3" stroke-linecap="round"/>` +
    eyes(34, 8, '#2f7d55') +
    `<path d="M29 41h6l-3 3Z" fill="#e8457a"/><path d="M14 42h10M14 46l10 -2M50 42H40M50 46l-10 -2" stroke="#fff" stroke-width="1.6"/>`,
  cook:
    disc('#e3edff') +
    shoulders('#fff') +
    face('#f2c9a0') +
    `<path d="M16 22Q12 8 24 10Q32 0 40 10Q52 8 48 22Z" fill="#fff"/><rect x="18" y="18" width="28" height="6" fill="#e1e5ea"/>` +
    eyes(34) +
    `<path d="M22 42q5 -4 10 0q5 -4 10 0" stroke="#5e3b1a" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  neighbour:
    disc('#e1f2e6') +
    shoulders('#5b8db8') +
    face('#e8b88c') +
    `<path d="M14 26Q16 12 32 12Q48 12 50 26Z" fill="#3f9b6b"/><rect x="10" y="24" width="44" height="5" rx="2" fill="#2f7d55"/>` +
    `<circle cx="24" cy="35" r="5" fill="none" stroke="#2b2b38" stroke-width="2"/><circle cx="40" cy="35" r="5" fill="none" stroke="#2b2b38" stroke-width="2"/><path d="M29 35h6" stroke="#2b2b38" stroke-width="2"/>` +
    smile(43),
  dog:
    disc('#fff3c4') +
    `<circle cx="32" cy="34" r="20" fill="#b5835a"/><path d="M12 22Q6 40 16 46Q20 34 20 24ZM52 22Q58 40 48 46Q44 34 44 24Z" fill="#7a5233"/>` +
    `<ellipse cx="32" cy="44" rx="11" ry="8" fill="#e8d2b4"/>` +
    eyes(32) +
    `<ellipse cx="32" cy="40" rx="4" ry="3" fill="#2b2b38"/><path d="M30 48q2 7 5 0" fill="#e8457a"/>`,
  mouse:
    disc('#ffe6ee') +
    `<circle cx="16" cy="18" r="11" fill="#9aa3ad"/><circle cx="48" cy="18" r="11" fill="#9aa3ad"/><circle cx="16" cy="18" r="6" fill="#f2a7bd"/><circle cx="48" cy="18" r="6" fill="#f2a7bd"/>` +
    `<ellipse cx="32" cy="38" rx="17" ry="18" fill="#b8bcc4"/>` +
    eyes(34, 7) +
    `<circle cx="32" cy="44" r="3" fill="#e8457a"/><path d="M18 44h8M18 48l8 -2M46 44h-8M46 48l-8 -2" stroke="#6b6f80" stroke-width="1.4"/>`,
  shopkeeper:
    disc('#fff3dd') +
    shoulders('#f5ecd8') +
    `<path d="M26 50l6 6l6 -6" fill="#e5484d"/>` +
    face('#f2c9a0') +
    `<path d="M16 32Q16 18 24 18M48 32Q48 18 40 18" stroke="#8a8f99" stroke-width="4" fill="none" stroke-linecap="round"/>` +
    eyes(33) +
    `<path d="M22 41q5 -5 10 -1q5 -4 10 1q-10 4 -20 0Z" fill="#8a8f99"/>`,
  crow:
    disc('#dfe8f5') +
    `<path d="M14 44Q10 20 32 16Q50 16 52 34Q52 50 32 56Q18 56 14 44Z" fill="#2b2b38"/>` +
    `<path d="M24 12q6 -6 8 4M30 10q8 -6 6 6" stroke="#2b2b38" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<circle cx="38" cy="30" r="5" fill="#fff"/><circle cx="39" cy="30" r="2.5" fill="#2b2b38"/>` +
    `<path d="M44 34L62 40L44 44Z" fill="#e0b030"/>`,
  paperboy:
    disc('#e8f4ff') +
    shoulders('#e05a47') +
    face('#f2c9a0') +
    `<path d="M14 28Q14 14 32 14Q48 14 50 26L58 30H14Z" fill="#7a5233"/>` +
    `<g fill="#d9774a"><circle cx="22" cy="40" r="1.4"/><circle cx="25" cy="42" r="1.4"/><circle cx="42" cy="40" r="1.4"/><circle cx="39" cy="42" r="1.4"/></g>` +
    eyes(35) +
    smile(44),
  keeper:
    disc('#ece6ff') +
    shoulders('#3b4f7a') +
    face('#f0c4a0') +
    `<path d="M14 26Q16 12 32 12Q48 12 50 26Z" fill="#3b4f7a"/><path d="M12 26H52L46 32H18Z" fill="#2b2b38"/><circle cx="32" cy="18" r="3" fill="#f2c14e"/>` +
    eyes(37) +
    `<path d="M20 44q6 -5 12 -1q6 -4 12 1q-12 6 -24 0Z" fill="#fff"/>`,
  tourist:
    disc('#fff3c4') +
    shoulders('#f28fb1') +
    `<path d="M24 50L20 64M40 50L44 64" stroke="#2b2b38" stroke-width="2"/>` +
    face('#e8b88c') +
    `<path d="M12 26Q14 10 32 10Q50 10 52 26Z" fill="#f2b632"/><path d="M6 26H58" stroke="#d9952a" stroke-width="5" stroke-linecap="round"/>` +
    `<rect x="19" y="31" width="11" height="8" rx="3" fill="#2b2b38"/><rect x="34" y="31" width="11" height="8" rx="3" fill="#2b2b38"/><path d="M30 34h4" stroke="#2b2b38" stroke-width="2"/>` +
    smile(44),
  parrot:
    disc('#e1f2e6') +
    `<path d="M14 54Q10 24 30 14Q50 10 52 30Q54 48 40 56Z" fill="#3fbf5f"/><path d="M26 16q2 -10 10 -10q-2 6 2 8" fill="#e5484d"/>` +
    `<circle cx="36" cy="30" r="7" fill="#fff"/><circle cx="37" cy="30" r="3" fill="#2b2b38"/>` +
    `<path d="M44 34Q60 32 56 48Q52 40 44 42Z" fill="#f2b632"/>`,
  cleaner:
    disc('#ffe6ee') +
    shoulders('#5b8db8') +
    face('#c98a5e') +
    `<path d="M14 32Q14 14 32 14Q50 14 50 32Q44 22 32 22Q20 22 14 32Z" fill="#e5484d"/><path d="M48 24l10 -4l-2 10Z" fill="#e5484d"/>` +
    `<g fill="#fff"><circle cx="24" cy="20" r="1.6"/><circle cx="34" cy="18" r="1.6"/><circle cx="42" cy="22" r="1.6"/></g>` +
    eyes(35) +
    smile(44),
}
