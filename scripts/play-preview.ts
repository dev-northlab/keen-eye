// Play listing preview: npm run play-preview
// Writes store-screenshots/play-preview.html (open it in Chrome): a rough imitation of the Google Play app showing the
// listing of every language — the game's page (icon, title, screenshots, short and full description) and the lists
// it shows up in (search results, a "suggested" card with the feature graphic, a row of icons), optionally with a
// promo video in front of the screenshots. Reads assets/store/listing/ and the pictures of `npm run store-screenshots`;
// for the developer's own look only, never published (it imitates the store's look). Other games are grey placeholders.
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
.phone{width:412px;max-width:calc(100vw - 32px);height:860px;max-height:calc(100vh - 90px);margin:0 auto 24px;background:var(--panel);
  border:10px solid #202124;border-radius:36px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 50px #0003}
.status{height:24px;flex:none;display:flex;justify-content:space-between;align-items:center;padding:0 18px;font-size:12px;color:#444}
.screen{flex:1;overflow-y:auto;overflow-x:hidden;position:relative;scrollbar-width:none}
.screen::-webkit-scrollbar{display:none}
.ico{width:24px;height:24px;stroke:#444;fill:none;stroke-width:2;stroke-linecap:round;flex:none}
.bar{height:52px;display:flex;align-items:center;padding:0 16px;gap:20px}
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
.carousel{display:flex;gap:8px;padding:12px 20px;overflow-x:auto;scrollbar-width:none;scroll-snap-type:x mandatory;scroll-padding-inline:20px}
.carousel::-webkit-scrollbar{display:none}
.carousel>*{flex:none;scroll-snap-align:start;border-radius:8px;box-shadow:0 1px 2px #0002;cursor:zoom-in;position:relative}
.carousel img{height:236px;display:block;border-radius:8px}
.video img{height:236px}
.play{position:absolute;inset:0;margin:auto;width:56px;height:56px;border-radius:50%;background:#000a;display:grid;place-items:center}
.play::after{content:"";border-left:18px solid #fff;border-top:11px solid transparent;border-bottom:11px solid transparent;margin-left:5px}
.sec{padding:8px 20px 16px}
.sec h2{font-size:17px;font-weight:500;margin:10px 0;display:flex;justify-content:space-between;align-items:center;cursor:pointer}
.sec p{font-size:14px;line-height:20px;color:#444}
.chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.chips span{border:1px solid var(--line);border-radius:8px;padding:6px 12px;font-size:13px;color:#444}
.safe{border:1px solid var(--line);border-radius:8px;padding:12px 16px;font-size:13px;color:#444;line-height:22px}
.sheet{position:absolute;inset:0;background:#fff;z-index:2;display:none;flex-direction:column}
.sheet.open{display:flex}
.sheet .body{overflow-y:auto;padding:4px 20px 24px;font-size:14px;line-height:21px;white-space:pre-line;color:#333}
.viewer{position:fixed;inset:0;background:#000d;display:none;align-items:center;justify-content:center;z-index:9;cursor:zoom-out}
.viewer.open{display:flex}
.viewer img{max-height:94vh;max-width:94vw;border-radius:8px}
.search{margin:8px 16px;height:48px;border-radius:24px;background:#f1f3f4;display:flex;align-items:center;gap:12px;padding:0 16px;font-size:15px}
.tabs{display:flex;gap:8px;padding:6px 16px 4px;overflow:hidden}
.tabs span{border:1px solid var(--line);border-radius:8px;padding:5px 12px;font-size:13px;white-space:nowrap;color:#444}
.tabs span.on{background:#e6f4ea;border-color:#e6f4ea;color:#0d652d}
.row{display:flex;gap:14px;align-items:center;padding:10px 16px}
.row .t{flex:1;min-width:0}
.row .name{font-size:15px;line-height:20px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.row .meta{font-size:12px;color:var(--muted);margin-top:2px}
.ours .carousel{padding:4px 16px 12px;scroll-padding-inline:16px}
.ours .carousel img{height:180px}
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
.note{max-width:412px;margin:-12px auto 24px;font-size:12px;color:var(--muted);text-align:center;padding:0 16px}
</style></head><body>
<div class="controls">
  <button id="tPage" aria-pressed="true">Страница игры</button>
  <button id="tList" aria-pressed="false">В списках</button>
  <select id="lang" aria-label="Язык"></select>
  <label><input type="checkbox" id="video"> с видео</label>
</div>
<div class="phone"><div class="status"><span>9:41</span><span>▲ ▮ 100%</span></div><div class="screen" id="screen"></div></div>
<p class="note">Имитация для себя: оформление Play приблизительное. Оценка, размер, рейтинг 3+ и теги — предположения; у других игр вместо названий серые заглушки.</p>
<div class="viewer" id="viewer"><img alt=""></div>
<script>
const DATA = ${JSON.stringify(data)};
const SHOTS = ${JSON.stringify(shots)};
// Play's own words: Russian for ru/uk/bg, English otherwise (the store follows the phone's language).
const UI = {
  en: { install: 'Install', iap: 'In-app purchases', newApp: 'New', noReviews: 'No reviews yet', rated: 'Rated for 3+', about: 'About this game', updated: 'Updated on', safety: 'Data safety', noShare: 'No data shared with third parties', noCollect: 'No data collected', search: 'spot the difference', apps: 'Games', suggested: 'Suggested for you', puzzle: 'Puzzle games', size: 'MB', tags: ['Puzzle', 'Hidden object', 'Casual', 'Offline'] },
  ru: { install: 'Установить', iap: 'Есть платный контент', newApp: 'Новое', noReviews: 'Отзывов пока нет', rated: 'Для детей от 3 лет', about: 'Об игре', updated: 'Обновлено', safety: 'Безопасность данных', noShare: 'Данные не передаются третьим лицам', noCollect: 'Данные не собираются', search: 'найди отличия', apps: 'Игры', suggested: 'Рекомендуем', puzzle: 'Головоломки', size: 'МБ', tags: ['Головоломки', 'Поиск предметов', 'Казуальные', 'Офлайн'] },
}
UI.uk = UI.ru; UI.bg = UI.ru
const $ = (s) => document.querySelector(s)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const icon = (size) => '<img class="appicon" src="play-icon.png" width="' + size + '" height="' + size + '" alt="">'
const svg = { back: '<svg class="ico flip" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>', search: '<svg class="ico" viewBox="0 0 24 24"><circle cx="10" cy="10" r="6"/><path d="M15 15l5 5"/></svg>', more: '<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>', mic: '<svg class="ico" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>' }
let state = { view: 'page', lang: 'ru', video: false }
try { Object.assign(state, JSON.parse(localStorage.getItem('playPreview') || '{}')) } catch {}
if (!DATA[state.lang]) state.lang = 'en'

function carousel(lang, cls = '') {
  const items = SHOTS.map((f) => '<img src="play-phone/' + lang + '/' + f + '" alt="" loading="lazy">')
  if (state.video) items.unshift('<div class="video"><img src="feature-graphic/' + lang + '.png" alt=""><span class="play"></span></div>')
  return '<div class="carousel ' + cls + '">' + items.join('') + '</div>'
}
const stars = (ui) => '<span>' + ui.newApp + '</span>'
const skelRow = () => '<div class="row"><div class="skicon"></div><div class="t"><div class="skel" style="height:14px;width:70%"></div><div class="skel" style="height:10px;width:40%;margin-top:8px"></div><div class="skel" style="height:10px;width:30%;margin-top:6px"></div></div></div>'
const skelTile = () => '<div class="tile"><div class="skel" style="width:96px;height:96px;border-radius:22%"></div><div class="skel" style="height:11px;width:80%;margin-top:8px"></div><div class="skel" style="height:10px;width:40%;margin-top:6px"></div></div>'

function page(d, ui, lang) {
  const today = new Date().toLocaleDateString(lang === 'zh-Hant' ? 'zh-TW' : lang, { year: 'numeric', month: 'short', day: 'numeric' })
  return '<div class="bar">' + svg.back + '<span class="sp"></span>' + svg.search + svg.more + '</div>'
    + '<div class="head">' + icon(72) + '<div><h1>' + esc(d.title) + '</h1><div class="dev">NorthLab</div><div class="small">' + ui.iap + '</div></div></div>'
    + '<div class="stats"><div><b>' + ui.newApp + '</b>' + ui.noReviews + '</div><div><b>≈ 95 ' + ui.size + '</b>&nbsp;</div><div><b>3+</b>' + ui.rated + '</div></div>'
    + '<div class="install">' + ui.install + '</div>'
    + carousel(lang)
    + '<div class="sec"><h2 id="aboutBtn">' + ui.about + ' <span>→</span></h2><p>' + esc(d.short) + '</p>'
    + '<div class="chips">' + ui.tags.map((t) => '<span>' + t + '</span>').join('') + '</div>'
    + '<p class="small" style="margin-top:14px">' + ui.updated + ' ' + today + '</p></div>'
    + '<div class="sec"><h2>' + ui.safety + ' <span>→</span></h2><div class="safe">✓ ' + ui.noShare + '<br>✓ ' + ui.noCollect + '</div></div>'
    + '<div class="sheet" id="sheet"><div class="bar"><span id="closeSheet" style="cursor:pointer">' + svg.back + '</span><b style="font-weight:500">' + ui.about + '</b></div><div class="body">' + esc(d.description) + '</div></div>'
}

function list(d, ui, lang) {
  return '<div class="search">' + svg.back + '<span style="flex:1">' + ui.search + '</span>' + svg.mic + '</div>'
    + '<div class="tabs"><span class="on">' + ui.apps + '</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>'
    + '<div class="ours"><div class="row">' + icon(64) + '<div class="t"><div class="name">' + esc(d.title) + '</div><div class="meta">NorthLab</div><div class="meta">' + ui.newApp + ' · ≈ 95 ' + ui.size + ' · 3+</div></div><div class="install sm">' + ui.install + '</div></div>'
    + carousel(lang) + '</div>'
    + skelRow() + skelRow()
    + '<div class="h3">' + ui.suggested + ' <span>→</span></div>'
    + '<div class="big"><div class="fg"><img src="feature-graphic/' + lang + '.png" alt="">' + (state.video ? '<span class="play"></span>' : '') + '</div>'
    + '<div class="under">' + icon(40) + '<div class="t" style="flex:1;min-width:0"><div style="font-size:14px">' + esc(d.title) + '</div><div class="meta" style="font-size:12px;color:var(--muted)">NorthLab · ' + ui.newApp + '</div></div><div class="install sm">' + ui.install + '</div></div></div>'
    + skelRow()
    + '<div class="h3">' + ui.puzzle + ' <span>→</span></div>'
    + '<div class="tiles">' + skelTile() + '<div class="tile">' + icon(96) + '<div class="name">' + esc(d.title) + '</div><div class="meta">' + ui.newApp + '</div></div>' + skelTile() + skelTile() + '</div>'
    + skelRow() + skelRow()
}

function render() {
  const d = DATA[state.lang], ui = UI[state.lang] || UI.en
  const screen = $('#screen')
  screen.dir = state.lang === 'ar' ? 'rtl' : 'ltr'
  screen.innerHTML = state.view === 'page' ? page(d, ui, state.lang) : list(d, ui, state.lang)
  screen.scrollTop = 0
  $('#tPage').setAttribute('aria-pressed', state.view === 'page')
  $('#tList').setAttribute('aria-pressed', state.view === 'list')
  $('#lang').value = state.lang
  $('#video').checked = state.video
  try { localStorage.setItem('playPreview', JSON.stringify(state)) } catch {}
  const about = $('#aboutBtn'); if (about) about.onclick = () => $('#sheet').classList.add('open')
  const close = $('#closeSheet'); if (close) close.onclick = () => $('#sheet').classList.remove('open')
  for (const img of screen.querySelectorAll('.carousel img')) img.onclick = () => { $('#viewer img').src = img.src; $('#viewer').classList.add('open') }
}
$('#lang').innerHTML = Object.keys(DATA).map((l) => '<option value="' + l + '">' + l + ' — ' + esc(DATA[l].title) + '</option>').join('')
$('#tPage').onclick = () => { state.view = 'page'; render() }
$('#tList').onclick = () => { state.view = 'list'; render() }
$('#lang').onchange = (e) => { state.lang = e.target.value; render() }
$('#video').onchange = (e) => { state.video = e.target.checked; render() }
$('#viewer').onclick = () => $('#viewer').classList.remove('open')
document.head.insertAdjacentHTML('beforeend', '<style>[dir=rtl] .flip{transform:scaleX(-1)}</style>')
render()
</script></body></html>`
writeFileSync(`${OUT}/play-preview.html`, html)
console.log(`${OUT}/play-preview.html`, locales.length, 'languages,', shots.length, 'shots')
