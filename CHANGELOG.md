# CHANGELOG

Format: SemVer (MAJOR.MINOR.PATCH). Intrările mai vechi sunt copiate din README (secțiunea „History / Changelog”), neschimbate.

## 2.1.1 — 2026-10-28 (anterior: 2.1.0)

Stare: stabil
Offline: complet (un singur fișier; cele trei aplicații se lansează din linkuri)

Tura 3 a recenziei (revizor astrofizician): discrepanțele 1D ↔ 2D rezolvate cu surse citabile.
- `docs/DISCREPANTE.md` (generat de `tools/compare-catalogs.mjs`): toate cele 8 distanțe și semnul z al Andromedei sunt rezolvate; fiecare cu ≥ 2 surse pentru z (Wikipedia, ESA/Hubble, arXiv, Chandra) și derivare scrisă: d = lb = lookback(z), ΛCDM plat Planck 2018 (H0 = 67,4; Ωm = 0,315). Valoarea păstrată este cea din 1D; 2D a fost aliniat. IC 4296: distanța din z este cu ~8–10 % peste distanțele SBF independente (documentat). Un audit z ↔ lookback listează, ca observații NEverificate și necorectate, alte intrări cu abatere > 3 %.
- Identificare: „Perseus (BCG IC 310)” → „IC 310 (Perseus)” în copia din hub (IC 310 nu este BCG; aceea este NGC 1275, intrare separată). Un eventual favorit salvat sub numele vechi nu se mai potrivește.
- Semnul z al Andromedei: −0,001 (M31 spre albastru, −301 km/s), verificat în 1D și 2D.
- Test nou `tests/catalog-consistency.test.mjs` (valorile corectate, coerența 1D ↔ 2D ↔ hub, documentul la zi, ≥ 2 surse pe rând; sărit explicit dacă lipsesc depozitele vecine). `tests/versions.test.mjs` trece (etichete 1D 2.1.1 · 2D 6.2.1 · 3D 2.1.1).
- NU s-a făcut: unificarea cataloagelor într-un fișier comun (acum posibilă fără a alege între valori, dar nu e în această tură).
- Versiune 2.1.1 în `index.html`, `sw.js`, `app.json`, `UO_APPS`; README (8 limbi); CSP rehash (`fixcsp`), `info`, `check --lax`.

---

## 2.1.0 — 2026-10-27 (anterior: 2.0.1)

Stare: stabil
Offline: complet (un singur fișier; cele trei aplicații se lansează din linkuri)

Tura 2 a recenziei (cod + date, fără biblioteci externe):
- Etichetele „v1.0 · 112 / v5.9 · 112 / v1.2 · 118” de pe carduri citesc acum versiunile reale (1D 2.1.0, 2D 6.2.0, 3D 2.1.0) dintr-o constantă `UO_APPS`, nu din chei i18n învechite. `tests/versions.test.mjs`: compară cu `application-version` al depozitelor vecine (sărit explicit dacă lipsesc), numărul de intrări, copia catalogului hub = 1D, `docs/DISCREPANTE.md` la zi, etichetele afișate în ro/en/de/hu.
- `tools/compare-catalogs.mjs` + `docs/DISCREPANTE.md`: cele 8 distanțe diferite 1D↔2D și semnul z al Andromedei, cu verificare aritmetică internă (nu sursă). Nicio valoare nu a fost aleasă (NED/SIMBAD inaccesibile în sesiune).
- NU s-a făcut: unificarea cataloagelor într-un fișier comun (ar presupune alegerea între valori în conflict).
- Versiune în `index.html`, `sw.js`, `app.json`.

---

## 2.0.1 — 2026-10-27 (anterior: 2.0.0)

Stare: stabil
Offline: complet (un singur fișier; cele trei aplicații se lansează din linkuri)

Recenzie (doar texte):
- README (8 limbi): secțiune nouă „Mărimea cataloagelor în serie”: hub 112, 1D 112, 2D 112 (111 galaxii + CMB), 3D 118 („peste 115”); diferențele sunt documentate, nu corectate. Unificarea cataloagelor într-un fișier comun NU s-a făcut (vezi PR).
- Conflictul 1D ↔ 2D (8 distanțe diferite și semnul z al Andromedei) este listat, de verificat cu surse.
- README: versiunile aplicațiilor în listă actualizate (1D 2.0.0, 2D 6.0.0, 3D 2.0.0). Linkurile spre cele trei variante (butoane „Lansează” și „GITHUB MIRRORS”) erau deja prezente și neschimbate.
- Versiune în `index.html`, `sw.js`, `app.json`.

---

## Istoric anterior (din README.md)

#### 2.0.0 — 2026-10-26
- Unified 1D·2D·3D explorer with synchronous selection and a two-model comparison (Planck ↔ SH0ES), also in the calculator.

#### 1.2.8 — 2026-10-23
- `prefers-reduced-motion` is now honoured by the JavaScript animations too (nebula, starfield twinkle, click particles, typing effect, card tilt, cursor follow, counter); before, only the CSS animations were reduced.
- Cosmic calculator: only plain decimals are accepted (`0x10`, `1e1`, `0b11` are no longer read as numbers).
- On touch screens (`pointer: coarse`) links, language selector, chips and tabs have a 44 px touch target.

#### 1.2.7 — 2026-10-23
- fff-kit 1.2.0: the language is now stored under `universul-observabil.lang`; the old `uo_lang` key is migrated automatically at start-up (also after importing an old .fff.json backup). The footer version text now follows the version in every language.

#### 1.2.5 — 2026-10-22
- fff-kit 1.1.4: touch targets and minimum text size; touch targets/text fixed

#### 1.2.4 — 2026-10-22
- fff-kit 1.1.2: PBKDF2 600,000 iterations, anti-clickjacking protection.

#### 1.2.3 — 2026-10-22
- Mobile: text is at least 12 px and buttons and fields have larger touch targets on narrow screens.

- 1.2.2 — 2026-10-22: Translation fix: the description (and name) in the transparency panel now follow the interface language.
- 1.2.1 — 2026-10-22: the page title now follows the interface language (<title> updated on language change).

- 1.1.0 — 2026-10-14: Backup and data labelling (fff-kit).

- 1.0.0 — 2026-10-12: the version and the date of the last update are shown in the app
- Round 7: the cosmology calculator now also provides the scale factor, the luminosity distance and the angular diameter distance (RO/EN); file size reduced from ~616 KB to ~461 KB by removing 8 unused @font-face declarations (Barlow 300/500/300 italic and JetBrains Mono 300), verified by screenshot comparison and enumeration of the computed fonts; no loss of content.
- Added the offline cosmology calculator; removed the 2 px horizontal overflow (the separator line); the decorative floating labels in the header are now generated content (they no longer cause contrast fluctuations in axe-core); CSP: `script-src` based on a SHA-256 hash, without `'unsafe-inline'`.
- The number of galaxies is now consistent: 1D and 2D = 112, 3D and the total catalogue = 118 (previously the table said "115+" and the header said 118).
- Added a visible note that the page is for presentation only and that launching the versions requires internet.
- The main content is in `<main>`, decorative elements are hidden from screen readers, the comparison table and the tabs no longer overflow the screen at 360 px, and the contrast of the dimmed labels was increased; axe-core: 0 violations at 1280 and 360 px.
- The MoM-z14 record (z = 14.44) remains worded "as of the catalogue date (May 2026)"; in the search of 11.10.2026 we found no later spectroscopic confirmation that surpasses it, but the dated wording was kept intentionally. Sources checked on 11.10.2026: arXiv 2505.11263 (Naidu et al.).
