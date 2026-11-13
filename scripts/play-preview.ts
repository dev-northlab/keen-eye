// Play listing preview: npm run play-preview
// Writes store-screenshots/play-preview.html (open it in Chrome): a rough imitation of the Google Play app showing the
// listing of every language — the game's page (icon, title, screenshots, short and full description, app info, data
// safety, support) and the lists it shows up in (search results, a "suggested" card with the feature graphic, a row of
// icons), optionally with a promo video in front of the screenshots. Reads assets/store/listing/, the pictures of
// `npm run store-screenshots`, the app version and minimum Android from the Gradle files and the prices of the store
// stub; for the developer's own look only, never published (it imitates the store's look). Other games are grey
// placeholders. Scrolls by wheel, finger or mouse drag; screenshots open full size and page through.
import { copyFileSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'

const LISTING = 'assets/store/listing'
const OUT = 'store-screenshots'
const read = (l: string, f: string) => readFileSync(`${LISTING}/${l}/${f}`, 'utf8').trim()
const locales = readdirSync(LISTING, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort()
const data = Object.fromEntries(
  locales.map((l) => [l, { title: read(l, 'title.txt'), short: read(l, 'short-description.txt'), description: read(l, 'description.txt') }]),
)
if (!existsSync(`${OUT}/play-phone/en`)) throw new Error('No screenshots yet: run npm run store-screenshots first')
const shots = readdirSync(`${OUT}/play-phone/en`).filter((f) => f.endsWith('.png')).sort()
copyFileSync('assets/store/icon-512.png', `${OUT}/play-icon.png`)

/** The facts of the "About this game" sheet, from the project itself so they stay current. */
const match = (file: string, re: RegExp) => readFileSync(file, 'utf8').match(re)?.[1] ?? '?'
const ANDROID_OF_SDK: Record<string, string> = { '23': '6.0', '24': '7.0', '25': '7.1', '26': '8.0', '27': '8.1', '28': '9', '29': '10', '30': '11' }
const minSdk = match('android/variables.gradle', /minSdkVersion\s*=\s*(\d+)/)
const prices = [...readFileSync('src/services/purchases.ts', 'utf8').matchAll(/'\$(\d+\.\d\d)'/g)].map((m) => Number(m[1])).sort((a, b) => a - b)
const info = {
  version: match('android/app/build.gradle', /versionName\s+"([^"]+)"/),
  android: `${ANDROID_OF_SDK[minSdk] ?? `API ${minSdk}`}`,
  prices: prices.length ? `$${prices[0].toFixed(2)} – $${prices[prices.length - 1].toFixed(2)}` : '?',
  privacy: 'https://dev-northlab.github.io/keen-eye-privacy/',
}

const html = `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Play preview</title>
<style>
:root{--bg:#eef1f4;--panel:#fff;--ink:#1f1f1f;--muted:#5f6368;--line:#dadce0;--green:#01875f;--skel:#e8eaed}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);font-family:Roboto,"Noto Sans",system-ui,sans-serif;color:var(--ink);min-height:100vh}
.controls{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;padding:16px}
.controls button,.controls select,.controls label{font:inherit;font-size:14px;border:1px solid var(--line);background:#fff;border-radius:999px;padding:8px 16px;cursor:pointer;color:var(--ink)}
.controls button[aria-pressed=true]{background:var(--ink);color:#fff;border-color:var(--ink)}
.controls label{display:flex;gap:6px;align-items:center}
.phone{width:412px;max-width:calc(100vw - 32px);height:860px;max-height:calc(100vh - 110px);min-height:520px;margin:0 auto 8px;background:var(--panel);
  border:10px solid #202124;border-radius:36px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 50px #0003;position:relative}
.status{height:24px;flex:none;display:flex;justify-content:space-between;align-items:center;padding:0 18px;font-size:12px;color:#444}
.scroll{overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:#bdc1c6 transparent}
.screen{flex:1;position:relative}
.drag{cursor:grab;user-select:none}
.drag.dragging{cursor:grabbing}
.drag img{-webkit-user-drag:none}
.ico{width:24px;height:24px;stroke:#444;fill:none;stroke-width:2;stroke-linecap:round;flex:none}
.bar{height:52px;display:flex;align-items:center;padding:0 16px;gap:20px;flex:none}
.bar .sp{flex:1}
.head{display:flex;gap:18px;padding:4px 20px 0}
.appicon{border-radius:22%;box-shadow:0 1px 3px #0003;display:block;flex:none}
h1{font-size:22px;font-weight:500;line-height:28px}
.dev{color:var(--green);font-weight:500;font-size:14px;margin-top:4px}
.small{color:var(--muted);font-size:12px;margin-top:2px}
.stats{display:flex;padding:18px 8px 6px;text-align:center;font-size:12px;color:var(--muted)}
.stats>div{flex:1;padding:0 4px}
.stats>div+div{border-inline-start:1px solid var(--line)}
.stats b{display:block;color:var(--ink);font-size:14px;font-weight:500;margin-bottom:2px}
.install{margin:12px 20px;background:var(--green);color:#fff;text-align:center;border-radius:8px;height:40px;line-height:40px;font-weight:500;font-size:14px}
.install.sm{margin:0;height:32px;line-height:32px;padding:0 16px;font-size:13px;border-radius:16px;flex:none}
.strip{position:relative}
.carousel{display:flex;gap:8px;padding:12px 20px;overflow-x:auto;scroll-padding-inline:20px;scrollbar-width:none}
.carousel::-webkit-scrollbar{display:none}
.carousel>*{flex:none;border-radius:8px;box-shadow:0 1px 2px #0002;position:relative}
.carousel img{height:236px;display:block;border-radius:8px;cursor:zoom-in}
.ours .carousel{padding:4px 16px 12px;scroll-padding-inline:16px}
.ours .carousel img{height:180px}
.arrow{position:absolute;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:50%;border:0;background:#fffe;box-shadow:0 1px 4px #0004;
  display:grid;place-items:center;cursor:pointer;z-index:1}
.arrow.prev{inset-inline-start:6px}.arrow.next{inset-inline-end:6px}
.arrow[hidden]{display:none}
.arrow svg{width:20px;height:20px;stroke:#333;fill:none;stroke-width:2.4;stroke-linecap:round}
.play{position:absolute;inset:0;margin:auto;width:56px;height:56px;border-radius:50%;background:#000a;display:grid;place-items:center;pointer-events:none}
.play::after{content:"";border-left:18px solid #fff;border-top:11px solid transparent;border-bottom:11px solid transparent;margin-left:5px}
.sec{padding:8px 20px 16px}
.sec h2{font-size:17px;font-weight:500;margin:10px 0;display:flex;justify-content:space-between;align-items:center}
.sec h2.link{cursor:pointer}
.sec p{font-size:14px;line-height:20px;color:#444}
.chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.chips span{border:1px solid var(--line);border-radius:8px;padding:6px 12px;font-size:13px;color:#444}
.safe{border:1px solid var(--line);border-radius:8px;padding:12px 16px;font-size:13px;color:#444;line-height:22px}
.support div{display:flex;gap:14px;align-items:center;padding:8px 0;font-size:14px}
.support small{display:block;color:var(--muted);font-size:12px;word-break:break-all}
.sheet{position:absolute;inset:24px 0 0;background:#fff;z-index:2;display:none;flex-direction:column}
.sheet.open{display:flex}
.sheet .body{flex:1;padding:4px 20px 24px;font-size:14px;line-height:21px;color:#333}
.sheet .text{white-space:pre-line}
.sheet h3{font-size:16px;font-weight:500;margin:22px 0 10px}
.facts div{display:flex;justify-content:space-between;gap:12px;padding:7px 0;font-size:14px}
.facts span:first-child{color:var(--muted)}
.facts span:last-child{text-align:end}
.viewer{position:fixed;inset:0;background:#000e;display:none;align-items:center;justify-content:center;z-index:9}
.viewer.open{display:flex}
.viewer img{max-height:90vh;max-width:80vw;border-radius:8px}
.viewer button{position:absolute;border:0;background:#fff2;color:#fff;border-radius:50%;width:52px;height:52px;font-size:26px;cursor:pointer}
.viewer .vprev{left:24px}.viewer .vnext{right:24px}.viewer .vclose{top:18px;right:24px;font-size:22px}
.viewer .count{position:absolute;bottom:18px;color:#fffc;font-size:14px}
.search{margin:8px 16px;height:48px;border-radius:24px;background:#f1f3f4;display:flex;align-items:center;gap:12px;padding:0 16px;font-size:15px}
.tabs{display:flex;gap:8px;padding:6px 16px 4px;overflow:hidden}
.tabs span{border:1px solid var(--line);border-radius:8px;padding:5px 12px;font-size:13px;white-space:nowrap;color:#444}
.tabs span.on{background:#e6f4ea;border-color:#e6f4ea;color:#0d652d}
.row{display:flex;gap:14px;align-items:center;padding:10px 16px}
.row .t{flex:1;min-width:0}
.row .name{font-size:15px;line-height:20px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.row .meta{font-size:12px;color:var(--muted);margin-top:2px}
.skel{background:var(--skel);border-radius:4px}
.skicon{width:64px;height:64px;border-radius:14px;background:var(--skel);flex:none}
.h3{font-size:17px;font-weight:500;padding:18px 16px 10px;display:flex;justify-content:space-between}
.big{margin:0 16px 4px}
.big .fg{position:relative}
.big .fg img{width:100%;border-radius:12px;display:block}
.big .under{display:flex;gap:12px;align-items:center;padding:10px 0}
.tiles{display:flex;gap:12px;padding:0 16px 8px;overflow-x:auto;scrollbar-width:none}
.tiles::-webkit-scrollbar{display:none}
.tile{width:96px;flex:none}
.tile .name{font-size:13px;line-height:17px;margin-top:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.tile .meta{font-size:12px;color:var(--muted)}
.note{max-width:460px;margin:0 auto 24px;font-size:12px;color:var(--muted);text-align:center;padding:0 16px}
[dir=rtl] .flip{transform:scaleX(-1)}
</style></head><body>
<div class="controls">
  <button id="tPage" aria-pressed="true">Страница игры</button>
  <button id="tList" aria-pressed="false">В списках</button>
  <select id="lang" aria-label="Язык"></select>
  <label><input type="checkbox" id="video"> с видео</label>
</div>
<div class="phone"><div class="status"><span>9:41</span><span>▲ ▮ 100%</span></div><div class="screen scroll drag" id="screen"></div><div class="sheet" id="sheet"></div></div>
<p class="note">Прокрутка — колесом, пальцем или перетаскиванием мышью; ‹ › листают скриншоты, клик открывает их крупно (← → в просмотре).
«Об игре →» открывает полное описание и данные о приложении. Имитация для себя: оформление Play приблизительное, оценка, размер, 3+ и теги — предположения.</p>
<div class="viewer" id="viewer"><img alt=""><button class="vprev" aria-label="prev">‹</button><button class="vnext" aria-label="next">›</button><button class="vclose" aria-label="close">✕</button><span class="count"></span></div>
<script>
const DATA = ${JSON.stringify(data)};
const SHOTS = ${JSON.stringify(shots)};
const INFO = ${JSON.stringify(info)};
// Play's own words: Russian for ru/uk/bg, English otherwise (the store follows the phone's language).
const UI = {
  en: { install: 'Install', iap: 'In-app purchases', newApp: 'New', noReviews: 'No reviews yet', rated: 'Rated for 3+', about: 'About this game', updated: 'Updated on', safety: 'Data safety', noShare: 'No data shared with third parties', noCollect: 'No data collected', search: 'spot the difference', apps: 'Games', suggested: 'Suggested for you', puzzle: 'Puzzle games', size: 'MB', tags: ['Puzzle', 'Hidden object', 'Casual', 'Offline'],
    appInfo: 'App info', version: 'Version', requires: 'Requires Android', andUp: 'and up', iapItems: 'In-app purchases', perItem: 'per item', rating: 'Content rating', released: 'Released on', offered: 'Offered by', downloads: 'Downloads', support: 'App support', email: 'Support email', privacy: 'Privacy policy', safetyNote: 'Safety starts with understanding how developers collect and share your data.' },
  ru: { install: 'Установить', iap: 'Есть платный контент', newApp: 'Новое', noReviews: 'Отзывов пока нет', rated: 'Для детей от 3 лет', about: 'Об игре', updated: 'Обновлено', safety: 'Безопасность данных', noShare: 'Данные не передаются третьим лицам', noCollect: 'Данные не собираются', search: 'найди отличия', apps: 'Игры', suggested: 'Рекомендуем', puzzle: 'Головоломки', size: 'МБ', tags: ['Головоломки', 'Поиск предметов', 'Казуальные', 'Офлайн'],
    appInfo: 'Об этом приложении', version: 'Версия', requires: 'Требуемая версия Android', andUp: 'или более поздняя', iapItems: 'Платный контент', perItem: 'за единицу', rating: 'Возрастные ограничения', released: 'Дата выпуска', offered: 'Продавец', downloads: 'Скачивания', support: 'Поддержка приложения', email: 'Адрес эл. почты', privacy: 'Политика конфиденциальности', safetyNote: 'Чтобы обеспечить безопасность данных, важно знать, как разработчики собирают их и передают третьим лицам.' },
}
UI.uk = UI.ru; UI.bg = UI.ru
const $ = (s) => document.querySelector(s)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const icon = (size) => '<img class="appicon" src="play-icon.png" width="' + size + '" height="' + size + '" alt="">'
const svg = { back: '<svg class="ico flip" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>', search: '<svg class="ico" viewBox="0 0 24 24"><circle cx="10" cy="10" r="6"/><path d="M15 15l5 5"/></svg>', more: '<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>', mic: '<svg class="ico" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>', mail: '<svg class="ico" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>', shield: '<svg class="ico" viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>' }
const chevron = (d) => '<svg viewBox="0 0 24 24"><path d="' + (d < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7') + '"/></svg>'
let state = { view: 'page', lang: 'ru', video: false }
try { Object.assign(state, JSON.parse(localStorage.getItem('playPreview') || '{}')) } catch {}
if (!DATA[state.lang]) state.lang = 'en'

const shotUrls = (lang) => SHOTS.map((f) => 'play-phone/' + lang + '/' + f)
function carousel(lang) {
  const items = shotUrls(lang).map((u, i) => '<img src="' + u + '" data-i="' + i + '" alt="" draggable="false">')
  if (state.video) items.unshift('<div><img src="feature-graphic/' + lang + '.png" alt="" draggable="false" style="cursor:default"><span class="play"></span></div>')
  return '<div class="strip"><button class="arrow prev" hidden>' + chevron(-1) + '</button><div class="carousel drag">' + items.join('') + '</div><button class="arrow next">' + chevron(1) + '</button></div>'
}
const skelRow = () => '<div class="row"><div class="skicon"></div><div class="t"><div class="skel" style="height:14px;width:70%"></div><div class="skel" style="height:10px;width:40%;margin-top:8px"></div><div class="skel" style="height:10px;width:30%;margin-top:6px"></div></div></div>'
const skelTile = () => '<div class="tile"><div class="skel" style="width:96px;height:96px;border-radius:22%"></div><div class="skel" style="height:11px;width:80%;margin-top:8px"></div><div class="skel" style="height:10px;width:40%;margin-top:6px"></div></div>'
const date = (lang) => new Date().toLocaleDateString(lang === 'zh-Hant' ? 'zh-TW' : lang === 'fil' ? 'en' : lang, { year: 'numeric', month: 'short', day: 'numeric' })

function page(d, ui, lang) {
  return '<div class="bar">' + svg.back + '<span class="sp"></span>' + svg.search + svg.more + '</div>'
    + '<div class="head">' + icon(72) + '<div><h1>' + esc(d.title) + '</h1><div class="dev">NorthLab</div><div class="small">' + ui.iap + '</div></div></div>'
    + '<div class="stats"><div><b>' + ui.newApp + '</b>' + ui.noReviews + '</div><div><b>≈ 95 ' + ui.size + '</b>&nbsp;</div><div><b>3+</b>' + ui.rated + '</div></div>'
    + '<div class="install">' + ui.install + '</div>'
    + carousel(lang)
    + '<div class="sec"><h2 class="link" data-open="about">' + ui.about + ' <span class="flip">→</span></h2><p>' + esc(d.short) + '</p>'
    + '<div class="chips">' + ui.tags.map((t) => '<span>' + t + '</span>').join('') + '</div>'
    + '<p class="small" style="margin-top:14px">' + ui.updated + ' ' + date(lang) + '</p></div>'
    + '<div class="sec"><h2>' + ui.safety + ' <span class="flip">→</span></h2><p class="small" style="margin-bottom:12px">' + ui.safetyNote + '</p><div class="safe">✓ ' + ui.noShare + '<br>✓ ' + ui.noCollect + '</div></div>'
    + '<div class="sec support"><h2>' + ui.support + '</h2><div>' + svg.mail + '<span>' + ui.email + '<small>dev.northlab@gmail.com</small></span></div><div>' + svg.shield + '<span>' + ui.privacy + '<small>' + INFO.privacy + '</small></span></div></div>'
    + '<div style="height:24px"></div>'
}

/** The full "About this game" sheet over the page. */
function about(d, ui, lang) {
  const facts = [[ui.version, INFO.version], [ui.updated, date(lang)], [ui.downloads, '—'], [ui.requires, INFO.android + ' ' + ui.andUp], [ui.iapItems, INFO.prices + ' ' + ui.perItem], [ui.rating, '3+'], [ui.released, date(lang)], [ui.offered, 'NorthLab']]
  return '<div class="bar"><span data-close style="cursor:pointer">' + svg.back + '</span>' + icon(32) + '<div><div style="font-weight:500">' + esc(d.title) + '</div><div class="small" style="margin:0">' + ui.about + '</div></div></div>'
    + '<div class="body scroll"><div class="text">' + esc(d.description) + '</div><h3>' + ui.appInfo + '</h3><div class="facts">'
    + facts.map(([k, v]) => '<div><span>' + k + '</span><span>' + esc(v) + '</span></div>').join('') + '</div></div>'
}

function list(d, ui, lang) {
  return '<div class="search">' + svg.back + '<span style="flex:1">' + ui.search + '</span>' + svg.mic + '</div>'
    + '<div class="tabs"><span class="on">' + ui.apps + '</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>'
    + '<div class="ours"><div class="row">' + icon(64) + '<div class="t"><div class="name">' + esc(d.title) + '</div><div class="meta">NorthLab</div><div class="meta">' + ui.newApp + ' · ≈ 95 ' + ui.size + ' · 3+</div></div><div class="install sm">' + ui.install + '</div></div>'
    + carousel(lang) + '</div>'
    + skelRow() + skelRow()
    + '<div class="h3">' + ui.suggested + ' <span class="flip">→</span></div>'
    + '<div class="big"><div class="fg"><img src="feature-graphic/' + lang + '.png" alt="" draggable="false">' + (state.video ? '<span class="play"></span>' : '') + '</div>'
    + '<div class="under">' + icon(40) + '<div class="t" style="flex:1;min-width:0"><div style="font-size:14px">' + esc(d.title) + '</div><div class="small" style="margin:0">NorthLab · ' + ui.newApp + '</div></div><div class="install sm">' + ui.install + '</div></div></div>'
    + skelRow()
    + '<div class="h3">' + ui.puzzle + ' <span class="flip">→</span></div>'
    + '<div class="tiles drag">' + skelTile() + '<div class="tile">' + icon(96) + '<div class="name">' + esc(d.title) + '</div><div class="meta">' + ui.newApp + '</div></div>' + skelTile() + skelTile() + skelTile() + '</div>'
    + skelRow() + skelRow()
}

// Mouse drag scrolls like a finger (touch and pen scroll natively); a drag never counts as a click.
let dragged = false
function dragScroll(el, axis) {
  el.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || e.target.closest('button')) return
    const start = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop }
    dragged = false
    const move = (m) => {
      const dx = m.clientX - start.x, dy = m.clientY - start.y
      if (Math.abs(axis === 'x' ? dx : dy) > 4) { dragged = true; el.classList.add('dragging') }
      if (axis === 'x') el.scrollLeft = start.left - dx; else el.scrollTop = start.top - dy
    }
    const up = () => { el.classList.remove('dragging'); removeEventListener('pointermove', move); removeEventListener('pointerup', up) }
    addEventListener('pointermove', move); addEventListener('pointerup', up)
    // Stops the parent's drag: a sideways drag on the screenshots must not scroll the page too.
    e.stopPropagation()
  })
}

function wireStrip(strip) {
  const row = strip.querySelector('.carousel'), prev = strip.querySelector('.prev'), next = strip.querySelector('.next')
  const update = () => {
    const left = Math.abs(row.scrollLeft)
    prev.hidden = left < 4
    next.hidden = left > row.scrollWidth - row.clientWidth - 4
  }
  const step = (dir) => row.scrollBy({ left: dir * row.clientWidth * 0.8 * (getComputedStyle(row).direction === 'rtl' ? -1 : 1), behavior: 'smooth' })
  prev.onclick = () => step(-1)
  next.onclick = () => step(1)
  row.addEventListener('scroll', update)
  dragScroll(row, 'x')
  update()
}

let viewing = { urls: [], i: 0 }
function show(i) {
  viewing.i = (i + viewing.urls.length) % viewing.urls.length
  $('#viewer img').src = viewing.urls[viewing.i]
  $('#viewer .count').textContent = (viewing.i + 1) + ' / ' + viewing.urls.length
  $('#viewer').classList.add('open')
}
const closeViewer = () => $('#viewer').classList.remove('open')

function render() {
  const d = DATA[state.lang], ui = UI[state.lang] || UI.en
  const screen = $('#screen')
  screen.dir = state.lang === 'ar' ? 'rtl' : 'ltr'
  screen.innerHTML = state.view === 'page' ? page(d, ui, state.lang) : list(d, ui, state.lang)
  screen.scrollTop = 0
  const sheet = $('#sheet')
  sheet.dir = screen.dir
  sheet.classList.remove('open')
  sheet.innerHTML = state.view === 'page' ? about(d, ui, state.lang) : ''
  $('#tPage').setAttribute('aria-pressed', state.view === 'page')
  $('#tList').setAttribute('aria-pressed', state.view === 'list')
  $('#lang').value = state.lang
  $('#video').checked = state.video
  try { localStorage.setItem('playPreview', JSON.stringify(state)) } catch {}
  screen.querySelectorAll('.strip').forEach(wireStrip)
  screen.querySelectorAll('.tiles').forEach((t) => dragScroll(t, 'x'))
  const sheetBody = sheet.querySelector('.body')
  if (sheetBody) dragScroll(sheetBody, 'y')
  viewing.urls = shotUrls(state.lang)
}

const screen = $('#screen')
dragScroll(screen, 'y')
screen.addEventListener('click', (e) => {
  if (dragged) { dragged = false; return }
  const img = e.target.closest('img[data-i]')
  if (img) return show(Number(img.dataset.i))
  if (e.target.closest('[data-open=about]')) { $('#sheet').classList.add('open'); $('#sheet .body').scrollTop = 0 }
})
$('#sheet').addEventListener('click', (e) => {
  if (e.target.closest('[data-close]')) $('#sheet').classList.remove('open')
})
$('#lang').innerHTML = Object.keys(DATA).map((l) => '<option value="' + l + '">' + l + ' — ' + esc(DATA[l].title) + '</option>').join('')
$('#tPage').onclick = () => { state.view = 'page'; render() }
$('#tList').onclick = () => { state.view = 'list'; render() }
$('#lang').onchange = (e) => { state.lang = e.target.value; render() }
$('#video').onchange = (e) => { state.video = e.target.checked; render() }
$('#viewer .vprev').onclick = () => show(viewing.i - 1)
$('#viewer .vnext').onclick = () => show(viewing.i + 1)
$('#viewer .vclose').onclick = closeViewer
$('#viewer').onclick = (e) => { if (e.target.id === 'viewer') closeViewer() }
addEventListener('keydown', (e) => {
  if (!$('#viewer').classList.contains('open')) return
  if (e.key === 'ArrowLeft') show(viewing.i - 1)
  else if (e.key === 'ArrowRight') show(viewing.i + 1)
  else if (e.key === 'Escape') closeViewer()
})
render()
</script></body></html>`
writeFileSync(`${OUT}/play-preview.html`, html)
console.log(`${OUT}/play-preview.html`, locales.length, 'languages,', shots.length, 'shots')
