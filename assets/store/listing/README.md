# Store listing texts

One folder per interface language (`src/i18n/<locale>.json`). Copy each file into the matching field.
`npm test` (`tests/store-listing.test.ts`) checks the limits and that the numbers of levels, languages and countries
in the texts match the game. When a level, mode or language is added, update every description.

| File | Google Play Console (Store presence → Main store listing) | App Store Connect (App Information / version page) | Limit |
|---|---|---|---:|
| `title.txt` | App name | Name | 30 |
| `short-description.txt` | Short description | — | 80 |
| `description.txt` | Full description | Description | 4000 |
| `ios-subtitle.txt` | — | Subtitle | 30 |
| `ios-keywords.txt` | — | Keywords (comma separated, no spaces) | 100 |
| `screenshots.txt` | captions of the screenshots, one line per shot (`npm run store-screenshots`) | same | 45 |

App Store Connect has no Armenian, Bulgarian or Filipino, so `hy`, `bg` and `fil` have only the Google Play files.

Screenshots are rendered, not stored: `npm run store-screenshots` writes `store-screenshots/` — `play-phone/` (Phone
screenshots), `ios-iphone-6.9/` (iPhone 6.9" display), `ios-ipad-13/` (iPad 13" display; also fine as Play
10-inch tablet screenshots) and `feature-graphic/` (Play feature graphic), one folder or file per language.
`npm run play-preview` then writes `store-screenshots/play-preview.html`: how the texts and pictures of every language
would look in the Play app (the game's page and the lists it shows up in).

## Language codes

| Folder | Google Play | App Store Connect |
|---|---|---|
| `en` | en-US (also en-GB, en-AU, en-CA, en-IN) | English (U.S.), also (U.K.), (Australia), (Canada) |
| `ru` | ru-RU | Russian |
| `hy` | hy-AM | — |
| `de` | de-DE | German |
| `fr` | fr-FR (also fr-CA) | French, French (Canada) |
| `es` | es-ES, es-419, es-US | Spanish (Spain), Spanish (Mexico) |
| `it` | it-IT | Italian |
| `pt` | pt-BR (also pt-PT) | Portuguese (Brazil), Portuguese (Portugal) |
| `nl` | nl-NL | Dutch |
| `pl` | pl-PL | Polish |
| `cs` | cs-CZ | Czech |
| `ro` | ro | Romanian |
| `bg` | bg | — |
| `uk` | uk | Ukrainian |
| `el` | el-GR | Greek |
| `hu` | hu-HU | Hungarian |
| `sv` | sv-SE | Swedish |
| `da` | da-DK | Danish |
| `nb` | no-NO | Norwegian |
| `fi` | fi-FI | Finnish |
| `tr` | tr-TR | Turkish |
| `ar` | ar | Arabic |
| `hi` | hi-IN | Hindi |
| `id` | id | Indonesian |
| `ms` | ms (also ms-MY) | Malay |
| `fil` | fil | — |
| `vi` | vi | Vietnamese |
| `th` | th | Thai |
| `zh` | zh-CN | Chinese (Simplified) |
| `zh-Hant` | zh-TW (also zh-HK) | Chinese (Traditional) |
| `ja` | ja-JP | Japanese |
| `ko` | ko-KR | Korean |

`pt` is written in Brazilian Portuguese and `es` in neutral Spanish; they still read well in Portugal and Spain.

## Store rules kept here

- Titles name the game and what it is — no "free", "best", "#1", prices or emoji (Google Play metadata policy).
- Keywords don't repeat words of the name or subtitle (App Store indexes them already) and name no other apps.
- The description promises only what the game has; no reviews or rankings are quoted.
