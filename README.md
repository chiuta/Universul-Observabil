# Observable Universe — 1D · 2D · 3D

**English** · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version:** 2.1.1 · **Last updated:** 2026-10-28

**Status:** stable · **Offline:** complete (a single file; the three apps are launched from the links)

Interface languages: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

Landing page that presents and compares the three versions (1D, 2D, 3D) of the observable Universe visualisation.

**Live:** https://chiuta.github.io/Universul-Observabil/

![Screenshot](screenshot.en.png)

## What it is

This HTML file is the hub page of the "Observable Universe" series: it does not contain the visualisations themselves (it only has a small offline cosmology calculator), but presents them, compares them and links to them. The three versions, as described on the page:

- 1D (v2.1.1, "Radial Axis"): 112 galaxies on a single axis, with four axis modes (lookback time, comoving, redshift z, scale factor); approx. 160 KB.
- 2D (v6.2.1, "Flat Map"): 12 cosmic horizons, adaptive zoom, permalink with state, quiz with leaderboard; approx. 550 KB.
- 3D (v2.1.1, "Real Space"): real RA/Dec coordinates, ΛCDM cosmology, H₀ selector (Planck 67.4 vs. SH0ES 73.0), WebGL with Three.js r128; approx. 1 MB.

The page cites a catalogue updated in May 2026 and MoM-z14 (z = 14.44, spectroscopically confirmed with JWST; Naidu et al. 2025) as the distance record **as of the catalogue date (May 2026)**; we do not guarantee that it remains the record afterwards. The figures above are those declared by the page, not verified here.

## Features

- "How far, how long ago?": an offline cosmology calculator (z between 0 and 20, H₀ = 67.4 Planck or 73.0 SH0ES) that gives the lookback time, comoving distance, age of the Universe at emission, scale factor a = 1/(1+z), luminosity distance D_L = (1+z)·D_C and angular diameter distance D_A = D_C/(1+z) (D_L and D_A follow from the definitions; at z = 1: D_L = 22.19 Gly, D_A = 5.55 Gly); flat ΛCDM model with Ωm = 0.315, radiation neglected (indicative values; checked against an independent integration, e.g. z = 1 → 7.95 Gyr and 3.40 Gpc at H₀ = 67.4).
- Presentation of the three versions, with "Launch" buttons and links to the GitHub copies ("GitHub mirror").
- Comparison table by category (visualisation, cosmology, UX and export, technical) for 1D / 2D / 3D.
- Language selector (RO, EN, FR, IT, ES, PT, DE, HU) in the corner of the page.
- Buy Me a Coffee links.

- **Unified 1D · 2D · 3D explorer** (v2.0): the catalogue of 112 objects from the 1D app is built into the page; pick a galaxy in any of the three views (lookback axis, RA/distance map, rotating 3D cloud with real RA/Dec) or from the list and it is highlighted in the other two, with the same cosmological calculator as the Calculator section. The card compares two models (Planck 2018, H₀ = 67.4 vs SH0ES, H₀ = 73.0) and shows the differences; the calculator has a comparison mode with the same table. Links to 1D and 2D carry the chosen galaxy; 3D opens without a selection (the 3D app has no galaxy link yet). Permalink `#x=<number>`.

## User guide

1. Read the presentation and the comparison table to choose a version.
2. Press "🔭 Launch 3D (recommended)", "🌐 2D version" or "📡 1D version"; each one opens in a new tab on alexio.tf.
3. Alternatively, use the "GITHUB MIRRORS" 1D / 2D / 3D links to the copies on chiuta.github.io.
4. Change the language with the EN / RO button.

## Privacy and network

- Only the chosen language (`universul-observabil.lang`) is stored in `localStorage`.
- The page makes no automatic network requests (no `fetch`, no external scripts or styles). Links lead, on click, to alexio.tf, chiuta.github.io, Buy Me a Coffee and the partner sites shown in the footer (including centrulstring.ro).
- The launched versions are separate applications with their own policies; they are not analysed here.

## Running locally / offline

Download `index.html` and open it in a browser: the page displays without internet, but the launch buttons and mirrors require a connection, because they point to pages hosted online.

## Catalogue sizes across the series (2.0.1)

- **Counts.** Hub: 112 entries (a copy of the 1D catalogue, identical). 1D: 112. 2D: 112 (111 galaxies + the CMB horizon; some texts say 111). 3D: 118 ("over 115" in the descriptions). The numbers differ because the catalogues are separate, not because of a counting error.
- **Not unified.** 3D has its own catalogue in a different structure (RA in hours, other names and spellings), so its names only partly match 1D/2D. Merging into one shared file was not done: each app is a single offline file with no shared build step, and merging would change data in three apps without a way to validate it here. Flagged for the author.
- **1D ↔ 2D conflict (resolved on 2026-10-28; sources and formulas in `docs/DISCREPANTE.md` of the hub).** The 8 distances (NGC 1132, IC 310, 3C 48, Abell 370, CL 0024+1654, SDSS J1004+4112, IC 4296, Abell 1689) now follow one convention in both apps: d = lb = lookback(z), in Mly, flat ΛCDM Planck 2018 (H₀ = 67.4, Ωm = 0.315), with z confirmed by at least 2 sources; 2D adopted the 1D values (330, 270, 4150, 4200, 4400, 10050, 180, 2330). The redshift of Andromeda (M31) is −0.001 in both (M31 is blueshifted, −301 km/s). The label "Perseus (BCG IC 310)" became "IC 310 (Perseus)": IC 310 is not the brightest cluster galaxy (that is NGC 1275, a separate entry).

## Real versions and discrepancies (2.1.0)

- **Card labels** ("v2.1.0 · 112", "v6.2.0 · 112", "v2.1.0 · 118") are no longer stale translation keys: the numbers come from one constant (`UO_APPS`), checked by `tests/versions.test.mjs` against `application-version` in the 1D/2D/3D repositories and against the real entry counts.
- **Catalogue copy** in the hub is compared with 1D (fields `n, ra, dec, d, t, z, lb`): identical.
- **1D ↔ 2D discrepancies** (8 distances and the sign of Andromeda's z) are now in a generated table, `docs/DISCREPANTE.md` (`node tools/compare-catalogs.mjs <1D> <2D> --md docs/DISCREPANTE.md`). **No value was chosen:** NED/SIMBAD were not reachable in the session. The table also shows an internal arithmetic check (the 1D values match the lookback computed from the catalogue's own z; the 2D ones do not), which is **not a source**.
- **Merging the catalogues into one shared file: not done**; it would have required picking one of the conflicting values.

## History / Changelog

### 2.1.1 — 2026-10-28
- Catalogue corrections: the hub copy follows 1D (label "IC 310 (Perseus)"); the 8 distances and the sign of Andromeda's z are resolved with sources in `docs/DISCREPANTE.md` (generator `tools/compare-catalogs.mjs`); new test `tests/catalog-consistency.test.mjs`; cards show 1D 2.1.1 / 2D 6.2.1 / 3D 2.1.1.


### 2.1.0 — 2026-10-27
- Labels with the real version, version test, `docs/DISCREPANTE.md`.


### 2.0.0 — 2026-10-26
- Unified 1D·2D·3D explorer with synchronous selection and a two-model comparison (Planck ↔ SH0ES), also in the calculator.

### 1.2.8 — 2026-10-23
- `prefers-reduced-motion` is now honoured by the JavaScript animations too (nebula, starfield twinkle, click particles, typing effect, card tilt, cursor follow, counter); before, only the CSS animations were reduced.
- Cosmic calculator: only plain decimals are accepted (`0x10`, `1e1`, `0b11` are no longer read as numbers).
- On touch screens (`pointer: coarse`) links, language selector, chips and tabs have a 44 px touch target.

### 1.2.7 — 2026-10-23
- fff-kit 1.2.0: the language is now stored under `universul-observabil.lang`; the old `uo_lang` key is migrated automatically at start-up (also after importing an old .fff.json backup). The footer version text now follows the version in every language.

### 1.2.5 — 2026-10-22
- fff-kit 1.1.4: touch targets and minimum text size; touch targets/text fixed

### 1.2.4 — 2026-10-22
- fff-kit 1.1.2: PBKDF2 600,000 iterations, anti-clickjacking protection.

### 1.2.3 — 2026-10-22
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

## License

MIT — see the LICENSE file

## Audit

Audit: 2026-10-10; round 3: 2026-10-11 — perishable claims ("JWST record 2026") reworded "as of the catalogue date (May 2026)" with the source; removed the reference to "Zenodo DOI" from the 3D description (the 3D app has no DOI).

## Author

Alexio — Alexandru-Ionuț Chiuță, contact: alexio@trom.tf. The page footer also links to Centrul StrING.

## Summary

A single-file landing page for the "Observable Universe" series, presenting and comparing its 1D, 2D and 3D versions (radial axis, flat map, real-space WebGL view) with launch links and GitHub mirrors, in 8 languages, plus a small offline cosmology calculator (redshift to lookback time and comoving distance). It stores only the language choice locally and makes no automatic network requests; launch and mirror links open external pages.
