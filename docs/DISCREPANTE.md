# Discrepanțe între cataloagele 1D și 2D (generat de `tools/compare-catalogs.mjs`)

Catalog 1D: 112 intrări · catalog 2D: 112 intrări · diferă acum 0 intrări.

**Stare (recenzia 3, 2026-10-28): toate cele 9 discrepanțe din tura 2 sunt rezolvate.** Regula: o discrepanță se rezolvă doar cu ≥ 2 surse independente sau cu o derivare corectă din redshift-ul măsurat, cu formula și parametrii scriși mai jos. Sursele sunt pagini citite în sesiune (Wikipedia, ESA/Hubble, arXiv, Chandra); NED/SIMBAD nu au fost consultate direct (Wikipedia le citează pentru Andromeda).

## Convenția aplicațiilor

ΛCDM plat, Planck 2018: H0 = 67,4 km/s/Mpc, Ωm = 0,315, ΩΛ = 0,685 (constantele COSMO din 1D și 2D); d = lb = lookback(z) în Mly. Valorile din surse depind de modelul folosit de autori (H0 = 69–71, Ωm = 0,27–0,3), deci se compară aici în aceeași convenție (lookback / comobilă / luminozitate), nu brut. Formula: lookback(z) = (977 792 / H0) · ∫₀ᶻ dz' / [(1+z')·√(Ωm(1+z')³ + ΩΛ)] Mani; comobilă D_C = (c / H0) · ∫₀ᶻ dz' / √(Ωm(1+z')³ + ΩΛ); D_L = (1+z)·D_C. Integrare Simpson, 2000 pași.

## 1. Distanțe: rezolvate (d = lb, în Mly / Mani)

| Obiect | z | 1D | 2D (vechi) | 2D acum | lookback(z), H0=67,4 | comobilă | D_L | 2D vechi / lookback |
|---|---|---|---|---|---|---|---|---|
| NGC 1132 (Relicvă Fosil) | 0.0232 | 330 | 1,020 | 330 | 331 | 335 | 342 | 3.08× |
| IC 310 (Perseus) | 0.0189 | 270 | 780 | 270 | 270 | 273 | 278 | 2.88× |
| 3C 48 | 0.367 | 4,150 | 5,200 | 4,150 | 4,149 | 4,845 | 6,623 | 1.25× |
| Abell 370 (Arc gravitational) | 0.375 | 4,200 | 5,900 | 4,200 | 4,218 | 4,940 | 6,792 | 1.40× |
| CL 0024+1654 | 0.395 | 4,400 | 5,500 | 4,400 | 4,388 | 5,175 | 7,219 | 1.25× |
| SDSS J1004+4112 (Cvintuplu quasar) | 1.734 | 10,050 | 7,000 | 10,050 | 10,049 | 15,969 | 43,659 | 0.70× |
| IC 4296 | 0.0124 | 180 | 130 | 180 | 178 | 179 | 182 | 0.73× |
| Abell 1689 (Lentilă) | 0.183 | 2,330 | 7,200 | 2,330 | 2,333 | 2,537 | 3,001 | 3.09× |

1D și 2D au acum aceeași valoare (330 · 270 · 4,150 · 4,200 · 4,400 · 10,050 · 180 · 2,330). Valoarea păstrată este cea din 1D, care coincide (±1 %) cu lookback(z) în convenția aplicațiilor; valorile vechi din 2D nu coincid cu lookback, comobila sau distanța de luminozitate la z-ul măsurat.

### NGC 1132 (Relicvă Fosil)

- **Rezolvare:** d = lb = 330 Mly (z = 0.0232); lookback(z) = 331 Mly; 2D avea 1,020.
- **Surse pentru z:**
  - Wikipedia, NGC 1132 (infobox: 0,023189): https://en.wikipedia.org/wiki/NGC_1132
  - arXiv:1106.5804 (z = 0,023, după Collobert et al. 2006): https://ar5iv.arxiv.org/html/1106.5804
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - ESA/Hubble heic0804: „300 million light years”: https://esahubble.org/images/heic0804a/
  - Wikipedia (citând Phys.org, Nowakowski 2017): „about 318 million light-years”: https://en.wikipedia.org/wiki/NGC_1132
  - arXiv:1106.5804: distanță de luminozitate 99,5 Mpc (≈ 324 Mly; H0 = 71, Ωm = 0,27): https://ar5iv.arxiv.org/html/1106.5804
- **Note:** Sursele dau 300–324 Mly (H0 ≈ 70–71); 330 Mly vine din H0 = 67,4 (diferența de ~4 % este modelul cosmologic). Nicio sursă nu susține 1 020 Mly. Infobox-ul Wikipedia mai conține și „263,9 Mly”, fără sursă; ignorat.

### IC 310 (Perseus) (fost „Perseus (BCG IC 310)”)

- **Rezolvare:** d = lb = 270 Mly (z = 0.0189); lookback(z) = 270 Mly; 2D avea 780.
- **Surse pentru z:**
  - arXiv:1009.2155, MAGIC (z = 0,019): https://arxiv.org/pdf/1009.2155
  - Wikipedia, IC 310 (z = 0,018849; „265 million light-years”): https://en.wikipedia.org/wiki/IC_310
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, IC 310: 265 Mly (81,2 Mpc), în acord cu lookback 260–263 Mly la H0 = 70: https://en.wikipedia.org/wiki/IC_310
- **Note:** IDENTIFICARE: IC 310 NU este BCG-ul roiului Perseus. arXiv:1009.2155: „located in the Perseus cluster at 0.6° (corresponding to ~1 Mpc) from the cluster’s central galaxy, NGC 1275”; Wikipedia: „IC 310 belongs to the NGC 1275 group, which is part of the Perseus Cluster”. NGC 1275 are intrare separată („NGC 1275 (Perseus A)”, z = 0,0176). Coordonatele (49,2; 41,3) și z = 0,0189 sunt cele ale lui IC 310, deci s-a corectat doar eticheta: „Perseus (BCG IC 310)” → „IC 310 (Perseus)” (în 1D, 2D și hub, inclusiv cheile din dicționarele de traducere).

### 3C 48

- **Rezolvare:** d = lb = 4,150 Mly (z = 0.367); lookback(z) = 4,149 Mly; 2D avea 5,200.
- **Surse pentru z:**
  - Wikipedia, 3C 48 (z = 0,367; Greenstein & Matthews 1963, Nature 197, 1041): https://en.wikipedia.org/wiki/3C_48
  - Kellermann, prezentare 50 de ani de quasari (scrisoarea Bolton 1960: „the redshift is 0.367”): https://crasr.aut.ac.nz/__data/assets/pdf_file/0017/32615/Ken-Kellermann-NZ_quasars_50_KIK.pdf
  - perseus.gr (z = 0,367): https://www.perseus.gr/Astro-DSO-QSO-3C48.htm
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, 3C 48: 3,9 Gly „light travel time”, 4,5 Gly „present” (cosmologie nespecificată): https://en.wikipedia.org/wiki/3C_48
  - perseus.gr: „3.95 billion light-years”: https://www.perseus.gr/Astro-DSO-QSO-3C48.htm
- **Note:** Lookback la H0 = 70, Ωm = 0,3: 4 009 Mly (surse: 3 900–3 950, ~2–3 % diferență de model). 5 200 Mly nu corespunde niciunei convenții la z = 0,367.

### Abell 370 (Arc gravitational)

- **Rezolvare:** d = lb = 4,200 Mly (z = 0.375); lookback(z) = 4,218 Mly; 2D avea 5,900.
- **Surse pentru z:**
  - arXiv:1611.01513, MUSE (z = 0,375): https://ar5iv.arxiv.org/html/1611.01513
  - arXiv:0910.5553, HST (z = 0,375): https://arxiv.org/pdf/0910.5553
  - Wikipedia, Abell 370 (z = 0,375): https://en.wikipedia.org/wiki/Abell_370
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, Abell 370: 1,464 Gpc (4,775 Gly), h = 0,705 (tipul distanței nespecificat; coincide cu comobila la H0 = 70,5, Ωm = 0,27: 4 780 Mly): https://en.wikipedia.org/wiki/Abell_370
- **Note:** Verificare de coerență a lui z: comobilă la H0 = 70,5, Ωm = 0,27 = 4 780 Mly vs 4 775 Mly în Wikipedia. 5 900 Mly nu este nici lookback (4 218), nici comobilă (4 940), nici distanță de luminozitate (6 793) la parametrii aplicației.

### CL 0024+1654

- **Rezolvare:** d = lb = 4,400 Mly (z = 0.395); lookback(z) = 4,388 Mly; 2D avea 5,500.
- **Surse pentru z:**
  - arXiv:1605.01058 („z = 0.395”): https://arxiv.org/pdf/1605.01058
  - ESA/Hubble heic0709 și Wikipedia (z = 0,39): https://esahubble.org/images/heic0709b/ · https://en.wikipedia.org/wiki/CL0024%2B17
  - arXiv:astro-ph/0112409 (z = 0,39): https://ar5iv.arxiv.org/html/astro-ph/0112409
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - Wikipedia, CL0024+17: „about 4 billion light years distant” (fără metodă): https://en.wikipedia.org/wiki/CL0024%2B17
- **Note:** z = 0,39–0,395 în surse (rotunjire); lookback 4 346 Mly (z = 0,39) – 4 388 Mly (z = 0,395); s-a păstrat 4 400 din 1D. Sursa de distanță („~4 Gly”) este vagă, deci rezolvarea se sprijină pe z. 5 500 Mly nu este susținut.

### SDSS J1004+4112 (Cvintuplu quasar)

- **Rezolvare:** d = lb = 10,050 Mly (z = 1.734); lookback(z) = 10,049 Mly; 2D avea 7,000.
- **Surse pentru z:**
  - Inada et al. 2003, Nature 426, 810, arXiv:astro-ph/0312427 (quasar z = 1,734 ± 0,002; roi la z ≈ 0,68): https://arxiv.org/pdf/astro-ph/0312427
  - Ota et al. 2006, Chandra, arXiv:astro-ph/0601700 („z = 1.734 quasar … cluster … at z = 0.68”): https://arxiv.org/pdf/astro-ph/0601700
- **Note:** Nicio sursă citabilă de distanță găsită; rezolvarea este derivarea din z măsurat (2 surse independente pentru z). Lookback la z = 1,734 = 10 049 Mly (H0 = 67,4); 7 000 Mly ar corespunde lui z ≈ 0,78, incompatibil cu z-ul măsurat. Comobilă: 15 969 Mly (nu e convenția aplicațiilor).

### IC 4296

- **Rezolvare:** d = lb = 180 Mly (z = 0.0124); lookback(z) = 178 Mly; 2D avea 130.
- **Surse pentru z:**
  - arXiv:2106.05340 (z heliocentric = 0,01247 ± 0,00003, Smith et al. 2000): https://arxiv.org/pdf/2106.05340
  - arXiv:astro-ph/9906023 (viteză heliocentrică 3 785 ± 19 km/s ⇒ z = 0,0126): https://arxiv.org/pdf/astro-ph/9906023
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - arXiv:2106.05340: distanțe SBF 49,4 Mpc (Lauer 1998) și 49 Mpc (Mei 2000) ≈ 160 Mly: https://arxiv.org/pdf/2106.05340
  - Chandra Early-Type Galaxy Atlas: 50,8 Mpc ≈ 166 Mly: https://cxc.cfa.harvard.edu/GalaxyAtlas/NGA/v1/nga_target_I4296_90101.html
- **Note:** ATENȚIE: distanța din z (178–180 Mly) este cu ~8–10 % mai mare decât distanțele SBF independente (160–166 Mly): articolul avertizează că „the redshift distance may differ significantly from the actual distance” (viteză proprie). Aplicațiile folosesc convenția z → lookback, deci 180 e coerent cu ele; 130 Mly (≈ 40 Mpc) nu e susținut de nicio sursă. z-ul din catalog (0,0124) este rotunjit în jos față de 0,01247 (diferență < 1 Mly, neschimbat).

### Abell 1689 (Lentilă)

- **Rezolvare:** d = lb = 2,330 Mly (z = 0.183); lookback(z) = 2,333 Mly; 2D avea 7,200.
- **Surse pentru z:**
  - Wikipedia, Abell 1689 (z = 0,1832): https://en.wikipedia.org/wiki/Abell_1689
  - ESA/Hubble opo0301 („z=0.183”): https://esahubble.org/images/opo0301a/
- **Distanțe din literatură (convenții/cosmologii proprii):**
  - ESA/Hubble: „2.2 billion light-years” (lookback 2 243 Mly la H0 = 70,5): https://esahubble.org/images/opo0301a/
  - Wikipedia: 754 Mpc (2 459 Mly), „over 2.3 billion light-years” (comobilă la H0 = 70,5, Ωm = 0,27: 2 440 Mly): https://en.wikipedia.org/wiki/Abell_1689
- **Note:** 7 200 Mly nu este susținut de nicio sursă (3× mai mare).

## 2. Semnul redshift-ului: rezolvat

- **Andromeda (M31)**: M31 este spre albastru (se apropie de noi), deci z este **negativ**: z = v/c = −301 / 299 792 = −0,001004. Catalog acum: 1D z = -0.001, 2D z = -0.001 (2D avea +0,001). Ambele aplicații afișează acum z negativ (2D: „-0.0010 (blueshift)” și săgeata albastră; verificat în browser de `tests/blueshift.test.mjs` din depozitele 1D și 2D).
  - Wikipedia, Andromeda Galaxy: viteză radială heliocentrică −301 ± 1 km/s, z = −0,001004 („negative sign indicates blueshift”), citând NED: https://en.wikipedia.org/wiki/Andromeda_Galaxy
  - Sky & Telescope: M31 se apropie de noi cu ~300 km/s față de Soare: https://skyandtelescope.org/astronomy-resources/astronomy-questions-answers/is-it-true-that-the-andromeda-galaxy-is-blueshifted-and-moving-toward-us
  - van der Marel et al. 2012, arXiv:1205.6864: viteza radială față de Calea Lactee −109,3 ± 4,4 km/s (alt cadru de referință; nu se folosește pentru z): https://arxiv.org/abs/1205.6864v1

## 3. Diferențe rămase între 1D și 2D

Nicio diferență în câmpurile `ra, dec, d, t, z, lb` pentru cele 112 intrări comune.

## 4. Observații NEverificate și necorectate (audit z ↔ lookback)

Intrări cu z > 0,02 al căror `lb` diferă cu > 3 % de lookback(z) calculat în convenția aplicațiilor (aceleași în 1D și 2D). Nu sunt surse: pot reflecta un alt z publicat sau o altă convenție de distanță; **nu au fost verificate cu surse și nu au fost modificate** (rămân pentru o tură viitoare).

| Obiect | z | lb în catalog | lookback(z) | diferență |
|---|---|---|---|---|
| NGC 4874 | 0.0239 | 321 | 341 | -5.8 % |
| 3C 273 (Quasar) | 0.158 | 2,440 | 2,049 | 19.1 % |
| Mrk 421 | 0.03 | 397 | 426 | -6.8 % |
| Stephan's Quintet | 0.0215 | 280 | 307 | -8.8 % |
| 3C 279 | 0.536 | 5,800 | 5,467 | 6.1 % |
| PKS 2155-304 | 0.116 | 1,400 | 1,549 | -9.6 % |
| TON 618 | 2.219 | 10,400 | 10,844 | -4.1 % |
| MACS J0025 (Glonț) | 0.586 | 5,200 | 5,806 | -10.4 % |
| RXCJ0232 (Pandora) | 0.4 | 4,700 | 4,429 | 6.1 % |

## 5. Alte observații

- Hub-ul conține o copie a catalogului 1D (câmpurile `n, ra, dec, d, t, z, lb`); `tests/versions.test.mjs` verifică că rămâne identică, iar `tests/catalog-consistency.test.mjs` verifică valorile corectate și coerența 1D ↔ 2D ↔ hub.
- 3D are catalog propriu (118 intrări, alte nume și unități), care nu conține aceste 8 obiecte; dintre intrările cu discrepanțe, doar Andromeda apare și acolo (distanța 2,537 Mly, ca în 1D și 2D).
- Cataloagele 1D și 2D nu mai au valori în conflict, deci o unificare într-un fișier de date comun ar fi acum posibilă fără a alege între valori; NU s-a făcut în această tură (ar schimba structura a trei aplicații single-file fără pas de build comun).
