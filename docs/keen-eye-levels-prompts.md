# Keen Eye — промпты для уровней и картинок

## Промпт 1 — для Claude Code (структура миров и уровней)

```
Проект: игра «Keen Eye» (найди отличия), Vue 3, папка /home/develop/Desktop/Game.
Уровни 1–15 уже созданы (Ферма, 5 отличий). Нужно перестроить систему уровней в «миры».

1. Структура миров (по 20 уровней):
   - World 1 «Farm»        — уровни 1–20
   - World 2 «City»        — уровни 21–40
   - World 3 «Forest»      — уровни 41–60
   - World 4 «Sea / Beach» — уровни 61–80
   - World 5 «Space»       — уровни 81–100
   Сделай конфиг так, чтобы новый мир добавлялся одной записью
   (id, name, levelRange, theme colors, иконка, фон карты мира).

2. Кривая сложности (внутри каждого мира и между мирами):
   - 1–10:   5 отличий, крупные объекты, яркий контраст
   - 11–20:  6 отличий, средние объекты, меньше контраст
   - 21–40:  7 отличий, часть мелких деталей, изменения цвета оттенком
   - 41–60:  8 отличий, мелкие детали, отражения/тени
   - 61–100: 9–10 отличий, очень мелкие детали, «сгруппированные» сцены, анимированные отличия
   Вынеси параметры в difficulty-конфиг: differencesCount, minHitRadius, hintsAllowed, typesAllowed
   (missing_object, color_change, size_change, shape_change, position_shift, added_object, motion).

3. Формат уровня — JSON на каждый уровень:
   { id, worldId, imageA, imageB, differences: [{x, y, radius, type}], difficulty }
   Координаты в процентах (0–1), чтобы работало на любых экранах.
   Мигрируй существующие 15 уровней в этот формат, ничего не ломая.

4. Платный доступ: уровни 1–15 бесплатно, с 16 — после покупки
   (флаг в конфиге, без рекламы, офлайн).

5. Экран выбора: карта миров → сетка уровней мира, замки на закрытых,
   звёзды за прохождение, прогресс в localStorage.

6. Создай папки public/levels/<world>/<level>/ (a.webp, b.webp, level.json)
   и скрипт-валидатор, который проверяет: обе картинки есть, одинаковый размер,
   число отличий совпадает с difficulty.

7. Сделай простой редактор разметки (dev-страница): открываю картинку B,
   кликаю по отличиям, получаю готовый level.json.

Сначала покажи план изменений, потом реализуй.
```

## Промпт 2 — генерация картинок (на английском)

### Шаг А — исходная картинка

```
Cartoon illustration, flat 2D children's game style, bright clean colors, thick clean outlines,
no text, no watermark, square 1:1, high detail.
Scene: [FARM: red barn, cows, chickens, tractor, haystacks, fence, sunflowers, sunny sky]
Detail level: [LOW: few large objects | MEDIUM: many objects | HIGH: crowded scene with many small details]
Evenly filled composition, objects spread across the whole image.
```

### Шаг Б — вторая картинка (редактирование / inpainting)

```
Edit this image. Keep everything EXACTLY identical — same composition, style, colors, lighting.
Make only these [N] changes:
1. [remove the weathervane from the barn roof]
2. [change the color of the tractor from green to blue]
3. [add one extra chicken near the fence]
4. [make the sun smaller]
5. [remove one sunflower]
Do not change anything else.
```

## Идеи сцен по мирам

| Мир | Уровни | Сцены |
|---|---|---|
| Ферма | 1–20 | амбар, огород, курятник, пасека, мельница, ярмарка, сбор урожая, зимняя ферма |
| Город | 21–40 | улица с магазинами, кафе, парк, вокзал, стройка, рынок, ночной город, пробка |
| Лес | 41–60 | поляна, лагерь, река с бобрами, грибы, осенний лес, домик лесника |
| Море | 61–80 | пляж, порт, подводный риф, маяк, пиратский корабль |
| Космос | 81–100 | станция, планеты, лунная база, ракетодром |

## Совет

Генераторы часто «переделывают» картинку целиком во втором проходе. Надёжнее сгенерировать одну картинку, а отличия вносить точечным inpainting (или вручную в Krita/Photopea) — так отличий будет ровно столько, сколько нужно, и их легко разметить в редакторе из пункта 7.
